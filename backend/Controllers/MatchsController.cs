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
    public class MatchesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MatchesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] int? sportId, [FromQuery] int? cityId)
        {
            var currentUserId = ControllerHelpers.ResolveUserId(Request);

            var query = _context.Matches
                .Include(m => m.Sport)
                .Include(m => m.City)
                .Include(m => m.CreatedByUser)
                .Include(m => m.Participants)
                .AsQueryable();

            if (sportId.HasValue && sportId.Value > 0) query = query.Where(m => m.SportId == sportId.Value);
            if (cityId.HasValue && cityId.Value > 0) query = query.Where(m => m.CityId == cityId.Value);

            var matches = await query
                .OrderBy(m => m.MatchDate)
                .Select(m => new
                {
                    m.Id,
                    m.Title,
                    m.Description,
                    m.SportId,
                    SportName = m.Sport.Name,
                    m.CityId,
                    CityName = m.City.Name,
                    m.LocationDetails,
                    m.MatchDate,
                    m.RequiredPlayers,
                    m.RequiredLevel,
                    m.CreatedBy,
                    CreatorName = m.CreatedByUser.FirstName + " " + m.CreatedByUser.LastName,
                    m.CreatedAt,
                    ParticipantsCount = m.Participants.Count,
                    SpotsLeft = m.RequiredPlayers > m.Participants.Count ? m.RequiredPlayers - m.Participants.Count : 0,
                    IsFull = m.Participants.Count >= m.RequiredPlayers,
                    IsJoined = currentUserId.HasValue && m.Participants.Any(p => p.UserId == currentUserId.Value)
                })
                .ToListAsync();

            return Ok(matches);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var currentUserId = ControllerHelpers.ResolveUserId(Request);

            var match = await _context.Matches
                .Include(m => m.Sport)
                .Include(m => m.City)
                .Include(m => m.CreatedByUser)
                .Include(m => m.Participants)
                    .ThenInclude(p => p.User)
                .Where(m => m.Id == id)
                .Select(m => new
                {
                    m.Id,
                    m.Title,
                    m.Description,
                    m.SportId,
                    SportName = m.Sport.Name,
                    m.CityId,
                    CityName = m.City.Name,
                    m.LocationDetails,
                    m.MatchDate,
                    m.RequiredPlayers,
                    m.RequiredLevel,
                    m.CreatedBy,
                    CreatorName = m.CreatedByUser.FirstName + " " + m.CreatedByUser.LastName,
                    m.CreatedAt,
                    ParticipantsCount = m.Participants.Count,
                    SpotsLeft = m.RequiredPlayers > m.Participants.Count ? m.RequiredPlayers - m.Participants.Count : 0,
                    IsFull = m.Participants.Count >= m.RequiredPlayers,
                    IsJoined = currentUserId.HasValue && m.Participants.Any(p => p.UserId == currentUserId.Value),
                    Participants = m.Participants
                        .OrderBy(p => p.JoinedAt)
                        .Select(p => new
                        {
                            p.Id,
                            p.UserId,
                            Name = p.User.FirstName + " " + p.User.LastName,
                            p.User.Email,
                            p.User.ProfileImage,
                            p.JoinedAt
                        })
                        .ToList()
                })
                .FirstOrDefaultAsync();

            if (match == null) return NotFound(new { message = "Match not found." });
            return Ok(match);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateMatchDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var userId = ControllerHelpers.ResolveUserId(Request, dto.CreatedBy);
            if (!userId.HasValue) return BadRequest(new { message = "UserId is required. Login first or send X-User-Id." });

            var userExists = await _context.Users.AnyAsync(u => u.Id == userId.Value);
            if (!userExists) return BadRequest(new { message = "Creator user does not exist." });

            var sportExists = await _context.Sports.AnyAsync(s => s.Id == dto.SportId);
            if (!sportExists) return BadRequest(new { message = "Selected sport does not exist." });

            var cityExists = await _context.Cities.AnyAsync(c => c.Id == dto.CityId);
            if (!cityExists) return BadRequest(new { message = "Selected city does not exist." });

            var match = new Match
            {
                Title = dto.Title.Trim(),
                Description = string.IsNullOrWhiteSpace(dto.Description) ? null : dto.Description.Trim(),
                SportId = dto.SportId,
                CityId = dto.CityId,
                LocationDetails = string.IsNullOrWhiteSpace(dto.LocationDetails) ? null : dto.LocationDetails.Trim(),
                MatchDate = dto.MatchDate,
                RequiredPlayers = dto.RequiredPlayers,
                RequiredLevel = dto.RequiredLevel.Trim(),
                CreatedBy = userId.Value,
                CreatedAt = DateTime.UtcNow
            };

            _context.Matches.Add(match);
            await _context.SaveChangesAsync();

            _context.MatchParticipants.Add(new MatchParticipant
            {
                MatchId = match.Id,
                UserId = userId.Value,
                JoinedAt = DateTime.UtcNow
            });
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = match.Id }, new
            {
                message = "Match created successfully.",
                matchId = match.Id
            });
        }

        [HttpPost("{id:int}/join")]
        public async Task<IActionResult> Join(int id, [FromBody] JoinRequestDto? dto)
        {
            var userId = ControllerHelpers.ResolveUserId(Request, dto?.UserId);
            if (!userId.HasValue) return BadRequest(new { message = "UserId is required. Login first or send X-User-Id." });

            var match = await _context.Matches
                .Include(m => m.Participants)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (match == null) return NotFound(new { message = "Match not found." });
            if (!await _context.Users.AnyAsync(u => u.Id == userId.Value))
                return BadRequest(new { message = "User does not exist." });

            if (match.Participants.Any(p => p.UserId == userId.Value))
                return BadRequest(new { message = "You already joined this match." });

            if (match.Participants.Count >= match.RequiredPlayers)
                return BadRequest(new { message = "This match is already full." });

            _context.MatchParticipants.Add(new MatchParticipant
            {
                MatchId = id,
                UserId = userId.Value,
                JoinedAt = DateTime.UtcNow
            });
            await _context.SaveChangesAsync();

            return Ok(new { message = "You joined the match successfully." });
        }

        [HttpDelete("{id:int}/leave")]
        public async Task<IActionResult> Leave(int id, [FromQuery] int? userId)
        {
            var currentUserId = ControllerHelpers.ResolveUserId(Request, userId);
            if (!currentUserId.HasValue) return BadRequest(new { message = "UserId is required." });

            var participant = await _context.MatchParticipants
                .FirstOrDefaultAsync(p => p.MatchId == id && p.UserId == currentUserId.Value);

            if (participant == null) return NotFound(new { message = "You are not in this match." });

            _context.MatchParticipants.Remove(participant);
            await _context.SaveChangesAsync();
            return Ok(new { message = "You left the match." });
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateMatchDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var match = await _context.Matches.FindAsync(id);
            if (match == null) return NotFound(new { message = "Match not found." });

            if (!await _context.Sports.AnyAsync(s => s.Id == dto.SportId))
                return BadRequest(new { message = "Selected sport does not exist." });

            if (!await _context.Cities.AnyAsync(c => c.Id == dto.CityId))
                return BadRequest(new { message = "Selected city does not exist." });

            match.Title = dto.Title.Trim();
            match.Description = string.IsNullOrWhiteSpace(dto.Description) ? null : dto.Description.Trim();
            match.SportId = dto.SportId;
            match.CityId = dto.CityId;
            match.LocationDetails = string.IsNullOrWhiteSpace(dto.LocationDetails) ? null : dto.LocationDetails.Trim();
            match.MatchDate = dto.MatchDate;
            match.RequiredPlayers = dto.RequiredPlayers;
            match.RequiredLevel = dto.RequiredLevel.Trim();

            await _context.SaveChangesAsync();
            return Ok(new { message = "Match updated successfully." });
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var match = await _context.Matches.FindAsync(id);
            if (match == null) return NotFound(new { message = "Match not found." });

            _context.Matches.Remove(match);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
