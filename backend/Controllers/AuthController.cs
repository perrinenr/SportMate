using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.DTOs;
using backend.Models;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IPasswordHasher<User> _passwordHasher;

        public AuthController(AppDbContext context, IPasswordHasher<User> passwordHasher)
        {
            _context = context;
            _passwordHasher = passwordHasher;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var email = dto.Email.Trim().ToLower();
            var emailExists = await _context.Users.AnyAsync(u => u.Email.ToLower() == email);
            if (emailExists) return BadRequest(new { message = "Email already exists." });

            if (dto.CityId.HasValue && !await _context.Cities.AnyAsync(c => c.Id == dto.CityId.Value))
                return BadRequest(new { message = "Selected city does not exist." });

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

            var created = await _context.Users.Include(u => u.City).FirstAsync(u => u.Id == user.Id);
            return Ok(new
            {
                message = "User registered successfully.",
                user = ToSafeUser(created)
            });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var email = dto.Email.Trim().ToLower();
            var user = await _context.Users.Include(u => u.City).FirstOrDefaultAsync(u => u.Email.ToLower() == email);
            if (user == null) return Unauthorized(new { message = "Invalid email or password." });

            var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, dto.Password);
            if (result == PasswordVerificationResult.Failed)
                return Unauthorized(new { message = "Invalid email or password." });

            return Ok(new
            {
                message = "Login successful.",
                user = ToSafeUser(user)
            });
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
