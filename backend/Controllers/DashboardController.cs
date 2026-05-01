using backend.Data;
using backend.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DashboardController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetDashboard()
        {
            var currentUserId = ControllerHelpers.ResolveUserId(Request);
            if (!currentUserId.HasValue) return BadRequest(new { message = "UserId is required." });

            var user = await _context.Users
                .Include(u => u.City)
                .Where(u => u.Id == currentUserId.Value)
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
                .FirstOrDefaultAsync();

            if (user == null) return NotFound(new { message = "User not found." });

            var totalMatches = await _context.Matches.CountAsync();
            var totalTeams = await _context.Teams.CountAsync();
            var myMatches = await _context.MatchParticipants.CountAsync(mp => mp.UserId == currentUserId.Value);
            var myTeams = await _context.TeamMembers.CountAsync(tm => tm.UserId == currentUserId.Value);

            var upcomingMatches = await _context.Matches
                .Include(m => m.Sport)
                .Include(m => m.City)
                .Include(m => m.Participants)
                .Where(m => m.MatchDate >= DateTime.UtcNow.AddDays(-1))
                .OrderBy(m => m.MatchDate)
                .Take(4)
                .Select(m => new
                {
                    m.Id,
                    m.Title,
                    SportName = m.Sport.Name,
                    CityName = m.City.Name,
                    m.MatchDate,
                    m.RequiredLevel,
                    ParticipantsCount = m.Participants.Count,
                    m.RequiredPlayers,
                    IsJoined = m.Participants.Any(p => p.UserId == currentUserId.Value)
                })
                .ToListAsync();

            var recentTeams = await _context.Teams
                .Include(t => t.Sport)
                .Include(t => t.City)
                .Include(t => t.Members)
                .OrderByDescending(t => t.CreatedAt)
                .Take(4)
                .Select(t => new
                {
                    t.Id,
                    t.Name,
                    SportName = t.Sport.Name,
                    CityName = t.City.Name,
                    MembersCount = t.Members.Count,
                    t.RequiredPlayers,
                    IsMember = t.Members.Any(m => m.UserId == currentUserId.Value)
                })
                .ToListAsync();

            return Ok(new
            {
                User = user,
                Stats = new
                {
                    TotalMatches = totalMatches,
                    TotalTeams = totalTeams,
                    MyMatches = myMatches,
                    MyTeams = myTeams
                },
                UpcomingMatches = upcomingMatches,
                RecentTeams = recentTeams
            });
        }
    }
}
