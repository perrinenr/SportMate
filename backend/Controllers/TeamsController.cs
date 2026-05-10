using System.Security.Claims;
using backend.Data;
using backend.DTOs;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TeamsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TeamsController(AppDbContext context)
        {
            _context = context;
        }

        private int? GetCurrentUserId()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (string.IsNullOrWhiteSpace(userIdClaim))
                return null;

            if (!int.TryParse(userIdClaim, out int userId))
                return null;

            return userId;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] int? sportId, [FromQuery] int? cityId)
        {
            var currentUserId = GetCurrentUserId();

            var query = _context.Teams
                .Include(t => t.Sport)
                .Include(t => t.City)
                .Include(t => t.CreatedByUser)
                .Include(t => t.Members)
                .AsQueryable();

            if (sportId.HasValue && sportId.Value > 0)
                query = query.Where(t => t.SportId == sportId.Value);

            if (cityId.HasValue && cityId.Value > 0)
                query = query.Where(t => t.CityId == cityId.Value);

            var teams = await query
                .OrderByDescending(t => t.CreatedAt)
                .Select(t => new
                {
                    t.Id,
                    t.Name,
                    t.Description,
                    t.SportId,
                    SportName = t.Sport.Name,
                    t.CityId,
                    CityName = t.City.Name,
                    t.RequiredPlayers,
                    t.CreatedBy,
                    CreatorName = t.CreatedByUser.FirstName + " " + t.CreatedByUser.LastName,
                    t.CreatedAt,
                    MembersCount = t.Members.Count,
                    SpotsLeft = t.RequiredPlayers > t.Members.Count
                        ? t.RequiredPlayers - t.Members.Count
                        : 0,
                    IsFull = t.Members.Count >= t.RequiredPlayers,
                    IsMember = currentUserId.HasValue &&
                               t.Members.Any(m => m.UserId == currentUserId.Value)
                })
                .ToListAsync();

            return Ok(teams);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var currentUserId = GetCurrentUserId();

            var team = await _context.Teams
                .Include(t => t.Sport)
                .Include(t => t.City)
                .Include(t => t.CreatedByUser)
                .Include(t => t.Members)
                    .ThenInclude(m => m.User)
                .Where(t => t.Id == id)
                .Select(t => new
                {
                    t.Id,
                    t.Name,
                    t.Description,
                    t.SportId,
                    SportName = t.Sport.Name,
                    t.CityId,
                    CityName = t.City.Name,
                    t.RequiredPlayers,
                    t.CreatedBy,
                    CreatorName = t.CreatedByUser.FirstName + " " + t.CreatedByUser.LastName,
                    t.CreatedAt,
                    MembersCount = t.Members.Count,
                    SpotsLeft = t.RequiredPlayers > t.Members.Count
                        ? t.RequiredPlayers - t.Members.Count
                        : 0,
                    IsFull = t.Members.Count >= t.RequiredPlayers,
                    IsMember = currentUserId.HasValue &&
                               t.Members.Any(m => m.UserId == currentUserId.Value),
                    Members = t.Members
                        .OrderBy(m => m.JoinedAt)
                        .Select(m => new
                        {
                            m.Id,
                            m.UserId,
                            Name = m.User.FirstName + " " + m.User.LastName,
                            m.User.Email,
                            m.User.ProfileImage,
                            m.JoinedAt
                        })
                        .ToList()
                })
                .FirstOrDefaultAsync();

            if (team == null)
                return NotFound(new { message = "Team not found." });

            return Ok(team);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateTeamDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = GetCurrentUserId();

            if (!userId.HasValue)
                return Unauthorized(new { message = "Invalid or missing token." });

            if (!await _context.Users.AnyAsync(u => u.Id == userId.Value))
                return BadRequest(new { message = "Creator user does not exist." });

            if (!await _context.Sports.AnyAsync(s => s.Id == dto.SportId))
                return BadRequest(new { message = "Selected sport does not exist." });

            if (!await _context.Cities.AnyAsync(c => c.Id == dto.CityId))
                return BadRequest(new { message = "Selected city does not exist." });

            var team = new Team
            {
                Name = dto.Name.Trim(),
                Description = string.IsNullOrWhiteSpace(dto.Description) ? null : dto.Description.Trim(),
                SportId = dto.SportId,
                CityId = dto.CityId,
                RequiredPlayers = dto.RequiredPlayers,
                CreatedBy = userId.Value,
                CreatedAt = DateTime.UtcNow
            };

            _context.Teams.Add(team);
            await _context.SaveChangesAsync();

            _context.TeamMembers.Add(new TeamMember
            {
                TeamId = team.Id,
                UserId = userId.Value,
                JoinedAt = DateTime.UtcNow
            });

            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = team.Id }, new
            {
                message = "Team created successfully.",
                teamId = team.Id
            });
        }

        [Authorize]
        [HttpPost("{id:int}/join")]
        public async Task<IActionResult> Join(int id)
        {
            var userId = GetCurrentUserId();

            if (!userId.HasValue)
                return Unauthorized(new { message = "Invalid or missing token." });

            var team = await _context.Teams
                .Include(t => t.Members)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (team == null)
                return NotFound(new { message = "Team not found." });

            if (!await _context.Users.AnyAsync(u => u.Id == userId.Value))
                return BadRequest(new { message = "User does not exist." });

            if (team.Members.Any(m => m.UserId == userId.Value))
                return BadRequest(new { message = "You are already a member of this team." });

            if (team.Members.Count >= team.RequiredPlayers)
                return BadRequest(new { message = "This team is already full." });

            _context.TeamMembers.Add(new TeamMember
            {
                TeamId = id,
                UserId = userId.Value,
                JoinedAt = DateTime.UtcNow
            });

            await _context.SaveChangesAsync();

            return Ok(new { message = "You joined the team successfully." });
        }

        [Authorize]
        [HttpDelete("{id:int}/leave")]
        public async Task<IActionResult> Leave(int id)
        {
            var userId = GetCurrentUserId();

            if (!userId.HasValue)
                return Unauthorized(new { message = "Invalid or missing token." });

            var member = await _context.TeamMembers
                .FirstOrDefaultAsync(m => m.TeamId == id && m.UserId == userId.Value);

            if (member == null)
                return NotFound(new { message = "You are not a member of this team." });

            _context.TeamMembers.Remove(member);
            await _context.SaveChangesAsync();

            return Ok(new { message = "You left the team." });
        }

        [Authorize]
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateTeamDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var userId = GetCurrentUserId();

            if (!userId.HasValue)
                return Unauthorized(new { message = "Invalid or missing token." });

            var team = await _context.Teams.FindAsync(id);

            if (team == null)
                return NotFound(new { message = "Team not found." });

            if (team.CreatedBy != userId.Value)
                return Forbid();

            if (!await _context.Sports.AnyAsync(s => s.Id == dto.SportId))
                return BadRequest(new { message = "Selected sport does not exist." });

            if (!await _context.Cities.AnyAsync(c => c.Id == dto.CityId))
                return BadRequest(new { message = "Selected city does not exist." });

            team.Name = dto.Name.Trim();
            team.Description = string.IsNullOrWhiteSpace(dto.Description) ? null : dto.Description.Trim();
            team.SportId = dto.SportId;
            team.CityId = dto.CityId;
            team.RequiredPlayers = dto.RequiredPlayers;

            await _context.SaveChangesAsync();

            return Ok(new { message = "Team updated successfully." });
        }

        [Authorize]
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var userId = GetCurrentUserId();

            if (!userId.HasValue)
                return Unauthorized(new { message = "Invalid or missing token." });

            var team = await _context.Teams.FindAsync(id);

            if (team == null)
                return NotFound(new { message = "Team not found." });

            if (team.CreatedBy != userId.Value)
                return Forbid();

            var members = await _context.TeamMembers
                .Where(m => m.TeamId == id)
                .ToListAsync();

            _context.TeamMembers.RemoveRange(members);
            _context.Teams.Remove(team);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Team deleted successfully." });
        }
    }
}