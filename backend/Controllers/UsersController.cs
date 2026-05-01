using backend.Data;
using backend.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var users = await _context.Users
                .Include(u => u.City)
                .OrderBy(u => u.FirstName)
                .Select(u => new
                {
                    u.Id,
                    u.FirstName,
                    u.LastName,
                    u.Email,
                    u.Phone,
                    u.ProfileImage,
                    u.Bio,
                    u.CityId,
                    CityName = u.City != null ? u.City.Name : null,
                    u.CreatedAt
                })
                .ToListAsync();

            return Ok(users);
        }

        [HttpGet("{id:int}")]
        [HttpGet("{id:int}/profile")]
        public async Task<IActionResult> GetProfile(int id)
        {
            var user = await _context.Users
                .Include(u => u.City)
                .FirstOrDefaultAsync(u => u.Id == id);

            if (user == null) return NotFound(new { message = "User not found." });

            var joinedMatches = await _context.MatchParticipants.CountAsync(mp => mp.UserId == id);
            var createdMatches = await _context.Matches.CountAsync(m => m.CreatedBy == id);
            var joinedTeams = await _context.TeamMembers.CountAsync(tm => tm.UserId == id);
            var createdTeams = await _context.Teams.CountAsync(t => t.CreatedBy == id);

            return Ok(new
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
                user.CreatedAt,
                Stats = new
                {
                    JoinedMatches = joinedMatches,
                    CreatedMatches = createdMatches,
                    JoinedTeams = joinedTeams,
                    CreatedTeams = createdTeams
                }
            });
        }

        [HttpPut("{id:int}")]
        [HttpPut("{id:int}/profile")]
        public async Task<IActionResult> UpdateProfile(int id, [FromBody] UpdateProfileDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);
            if (user == null) return NotFound(new { message = "User not found." });

            if (dto.CityId.HasValue && !await _context.Cities.AnyAsync(c => c.Id == dto.CityId.Value))
                return BadRequest(new { message = "Selected city does not exist." });

            user.FirstName = dto.FirstName.Trim();
            user.LastName = dto.LastName.Trim();
            user.Phone = string.IsNullOrWhiteSpace(dto.Phone) ? null : dto.Phone.Trim();
            user.ProfileImage = string.IsNullOrWhiteSpace(dto.ProfileImage) ? null : dto.ProfileImage.Trim();
            user.Bio = string.IsNullOrWhiteSpace(dto.Bio) ? null : dto.Bio.Trim();
            user.CityId = dto.CityId;

            await _context.SaveChangesAsync();

            var updated = await _context.Users.Include(u => u.City).FirstAsync(u => u.Id == id);
            return Ok(new
            {
                message = "Profile updated successfully.",
                user = new
                {
                    updated.Id,
                    updated.FirstName,
                    updated.LastName,
                    updated.Email,
                    updated.Phone,
                    updated.ProfileImage,
                    updated.Bio,
                    updated.CityId,
                    CityName = updated.City != null ? updated.City.Name : null,
                    updated.CreatedAt
                }
            });
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound(new { message = "User not found." });

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
