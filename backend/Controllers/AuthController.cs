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
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly IConfiguration _configuration;

        public AuthController(
            AppDbContext context,
            IPasswordHasher<User> passwordHasher,
            IConfiguration configuration)
        {
            _context = context;
            _passwordHasher = passwordHasher;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var email = dto.Email.Trim().ToLower();

            var emailExists = await _context.Users
                .AnyAsync(u => u.Email.ToLower() == email);

            if (emailExists)
                return BadRequest(new { message = "Email already exists." });

            if (dto.CityId.HasValue &&
                !await _context.Cities.AnyAsync(c => c.Id == dto.CityId.Value))
            {
                return BadRequest(new { message = "Selected city does not exist." });
            }

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

            user.PasswordHash = _passwordHasher.HashPassword(user, dto.Password);

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var created = await _context.Users
                .Include(u => u.City)
                .FirstAsync(u => u.Id == user.Id);

            var token = GenerateJwtToken(user);

            return Ok(new
            {
                message = "Register successful",
                token = token,
                user = ToSafeUser(created)
            });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var email = dto.Email.Trim().ToLower();

            var user = await _context.Users
                .Include(u => u.City)
                .FirstOrDefaultAsync(u => u.Email.ToLower() == email);

            if (user == null)
                return Unauthorized(new { message = "Invalid email or password." });

            var result = _passwordHasher.VerifyHashedPassword(
                user,
                user.PasswordHash,
                dto.Password
            );

            if (result == PasswordVerificationResult.Failed)
                return Unauthorized(new { message = "Invalid email or password." });

            var token = GenerateJwtToken(user);

            return Ok(new
            {
                message = "Login successful.",
                token,
                user = ToSafeUser(user)
            });
        }

        private string GenerateJwtToken(User user)
        {
            var jwtKey = _configuration["Jwt:Key"];

            if (string.IsNullOrWhiteSpace(jwtKey))
                throw new Exception("JWT Key is missing in appsettings.json.");

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, $"{user.FirstName} {user.LastName}")
            };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(jwtKey)
            );

            var credentials = new SigningCredentials(
                key,
                SecurityAlgorithms.HmacSha256
            );

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(2),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

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