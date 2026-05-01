using backend.Data;
using backend.DTOs;
using backend.Helpers;
using backend.Models;
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

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] int? sportId, [FromQuery] int? cityId)
        {
            var currentUserId = ControllerHelpers.ResolveUserId(Request);

            var query = _context.Teams
                .Include(t => t.Sport)
                .Include(t => t.City)
                .Include(t => t.CreatedByUser)
                .Include(t => t.Members)
                .AsQueryable();

            if (sportId.HasValue && sportId.Value > 0) query = query.Where(t => t.SportId == sportId.Value);
            if (cityId.HasValue && cityId.Value > 0) query = query.Where(t => t.CityId == cityId.Value);

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
                    SpotsLeft = t.RequiredPlayers > t.Members.Count ? t.RequiredPlayers - t.Members.Count : 0,
                    IsFull = t.Members.Count >= t.RequiredPlayers,
                    IsMember = currentUserId.HasValue && t.Members.Any(m => m.UserId == currentUserId.Value)
                })
                .ToListAsync();

            return Ok(teams);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var currentUserId = ControllerHelpers.ResolveUserId(Request);

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
                    SpotsLeft = t.RequiredPlayers > t.Members.Count ? t.RequiredPlayers - t.Members.Count : 0,
                    IsFull = t.Members.Count >= t.RequiredPlayers,
                    IsMember = currentUserId.HasValue && t.Members.Any(m => m.UserId == currentUserId.Value),
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

            if (team == null) return NotFound(new { message = "Team not found." });
            return Ok(team);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateTeamDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var userId = ControllerHelpers.ResolveUserId(Request, dto.CreatedBy);
            if (!userId.HasValue) return BadRequest(new { message = "UserId is required. Login first or send X-User-Id." });

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

        [HttpPost("{id:int}/join")]
        public async Task<IActionResult> Join(int id, [FromBody] JoinRequestDto? dto)
        {
            var userId = ControllerHelpers.ResolveUserId(Request, dto?.UserId);
            if (!userId.HasValue) return BadRequest(new { message = "UserId is required. Login first or send X-User-Id." });

            var team = await _context.Teams
                .Include(t => t.Members)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (team == null) return NotFound(new { message = "Team not found." });
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

        [HttpDelete("{id:int}/leave")]
        public async Task<IActionResult> Leave(int id, [FromQuery] int? userId)
        {
            var currentUserId = ControllerHelpers.ResolveUserId(Request, userId);
            if (!currentUserId.HasValue) return BadRequest(new { message = "UserId is required." });

            var member = await _context.TeamMembers
                .FirstOrDefaultAsync(m => m.TeamId == id && m.UserId == currentUserId.Value);

            if (member == null) return NotFound(new { message = "You are not a member of this team." });

            _context.TeamMembers.Remove(member);
            await _context.SaveChangesAsync();
            return Ok(new { message = "You left the team." });
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateTeamDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var team = await _context.Teams.FindAsync(id);
            if (team == null) return NotFound(new { message = "Team not found." });

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

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var team = await _context.Teams.FindAsync(id);
            if (team == null) return NotFound(new { message = "Team not found." });

            _context.Teams.Remove(team);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
