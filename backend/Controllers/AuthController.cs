using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.DTOs;
using backend.Models;

using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace backend.Controllers
{
    // Indique que cette classe est un contrôleur API
    [ApiController]

    // Route principale : api/auth
    [Route("api/[controller]")]
    public class AuthController : ControllerBase//mon backend est une API retourne du json non pas une page html
    {
        private readonly AppDbContext _context;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly IConfiguration _configuration;

        // Constructeur : injection des services nécessaires
        public AuthController(
            AppDbContext context,
            IPasswordHasher<User> passwordHasher,
            IConfiguration configuration)
        {
            _context = context;
            _passwordHasher = passwordHasher;
            _configuration = configuration;
        }

        // Endpoint pour créer un nouveau compte
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            // Vérifie si les données envoyées sont valides
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Nettoie et convertit l'email en minuscule
            var email = dto.Email.Trim().ToLower();

            // Vérifie si l'email existe déjà dans la base de données
            var emailExists = await _context.Users
                .AnyAsync(u => u.Email.ToLower() == email);

            if (emailExists)
                return BadRequest(new { message = "Email already exists." });

            // Vérifie si la ville choisie existe vraiment
            if (dto.CityId.HasValue &&
                !await _context.Cities.AnyAsync(c => c.Id == dto.CityId.Value))
            {
                return BadRequest(new { message = "Selected city does not exist." });
            }

            // Création d'un nouvel utilisateur
            var user = new User
            {
                FirstName = dto.FirstName.Trim(),
                LastName = dto.LastName.Trim(),
                Email = email,
                PasswordHash = "",
                Phone = string.IsNullOrWhiteSpace(dto.Phone) ? null : dto.Phone.Trim(),
                CityId = dto.CityId,
                CreatedAt = DateTime.UtcNow
            };

            // Hash du mot de passe avant de le stocker
            user.PasswordHash = _passwordHasher.HashPassword(user, dto.Password);

            // Ajoute l'utilisateur dans la base de données
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Recharge l'utilisateur avec sa ville
            var created = await _context.Users
                .Include(u => u.City)
                .FirstAsync(u => u.Id == user.Id);

            // Génère un token JWT après l'inscription
            var token = GenerateJwtToken(user);

            // Retourne le token et les infos sécurisées de l'utilisateur
            return Ok(new
            {
                message = "Register successful",
                token,
                user = ToSafeUser(created)
            });
        }

        // Endpoint pour connecter un utilisateur
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            // Vérifie si les données envoyées sont valides
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Nettoie et convertit l'email en minuscule
            var email = dto.Email.Trim().ToLower();

            // Cherche l'utilisateur dans la base de données
            var user = await _context.Users
                .Include(u => u.City)
                .FirstOrDefaultAsync(u => u.Email.ToLower() == email);

            // Si l'utilisateur n'existe pas
            if (user == null)
                return Unauthorized(new { message = "Invalid email or password." });

            // Vérifie si le mot de passe est correct
            var result = _passwordHasher.VerifyHashedPassword(
                user,
                user.PasswordHash,
                dto.Password
            );

            // Si le mot de passe est faux
            if (result == PasswordVerificationResult.Failed)
                return Unauthorized(new { message = "Invalid email or password." });

            // Génère un token JWT après connexion
            var token = GenerateJwtToken(user);

            // Retourne le token et les infos sécurisées de l'utilisateur
            return Ok(new
            {
                message = "Login successful.",
                token,
                user = ToSafeUser(user)
            });
        }

        // Fonction qui crée le token JWT
        private string GenerateJwtToken(User user)
        {
            // Récupère la clé JWT depuis appsettings.json
            var jwtKey = _configuration["Jwt:Key"];

            // Vérifie que la clé existe
            if (string.IsNullOrWhiteSpace(jwtKey))
                throw new Exception("JWT Key is missing in appsettings.json.");

            // Les claims sont les informations stockées dans le token
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, $"{user.FirstName} {user.LastName}")
            };

            // Crée la clé de sécurité avec la clé secrète
            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(jwtKey)
            );

            // Définit l'algorithme utilisé pour signer le token
            var credentials = new SigningCredentials(
                key,
                SecurityAlgorithms.HmacSha256
            );

            // Crée le token JWT avec issuer, audience, claims et expiration
            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(2),
                signingCredentials: credentials
            );

            // Convertit le token en string et le retourne
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        // Retourne seulement les informations sécurisées de l'utilisateur
        // On ne retourne jamais PasswordHash
        private static object ToSafeUser(User user) => new
        {
            user.Id,
            user.FirstName,
            user.LastName,
            user.Email,
            user.Phone,
            user.ProfileImage,
            user.Bio,
            user.CityId,
            CityName = user.City != null ? user.City.Name : null,
            user.CreatedAt
        };
    }
}