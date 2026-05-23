using System.Security.Claims;
using backend.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    // Indique que cette classe est un contrôleur API
    [ApiController]

    // Route principale : api/dashboard
    [Route("api/[controller]")]

    // Cette route nécessite un token JWT valide
    [Authorize]
    public class DashboardController : ControllerBase
    {
        private readonly AppDbContext _context; // _context représente la connexion avec la base de données.

        // Injection du DbContext pour accéder à la base de données
        public DashboardController(AppDbContext context)
        {
            _context = context;
        }

        // GET api/dashboard
        // Retourne les informations du dashboard de l'utilisateur connecté
        [HttpGet]
        public async Task<IActionResult> GetDashboard()
        {
            // Récupère l'id de l'utilisateur depuis le token JWT
            var currentUserId = GetCurrentUserId();

            // Si le token est invalide ou ne contient pas l'id
            if (!currentUserId.HasValue)
            {
                return Unauthorized(new { message = "Invalid or missing token." });
            }

            // Récupère les informations de l'utilisateur connecté
            var user = await _context.Users
                .Include(u => u.City) // Inclut la ville liée à l'utilisateur
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

            // Si l'utilisateur n'existe pas dans la base de données
            if (user == null)
            {
                return NotFound(new { message = "User not found." });
            }

            // Compte le nombre total de matches dans la plateforme
            var totalMatches = await _context.Matches.CountAsync();

            // Compte le nombre total d'équipes dans la plateforme
            var totalTeams = await _context.Teams.CountAsync();

            // Compte les matches auxquels l'utilisateur participe
            var myMatches = await _context.MatchParticipants
                .CountAsync(mp => mp.UserId == currentUserId.Value);

            // Compte les équipes dont l'utilisateur est membre
            var myTeams = await _context.TeamMembers
                .CountAsync(tm => tm.UserId == currentUserId.Value);

            // Récupère les 4 prochains matches
            var upcomingMatches = await _context.Matches
                .Include(m => m.Sport) // Inclut le sport du match
                .Include(m => m.City) // Inclut la ville du match
                .Include(m => m.Participants) // Inclut les participants du match
                .Where(m => m.MatchDate >= DateTime.UtcNow.AddDays(-1))
                .OrderBy(m => m.MatchDate)
                .Take(4)
                .Select(m => new
                {
                    m.Id,
                    m.Title,
                    SportName = m.Sport != null ? m.Sport.Name : null,
                    CityName = m.City != null ? m.City.Name : null,
                    m.MatchDate,
                    m.RequiredLevel,
                    ParticipantsCount = m.Participants.Count,
                    m.RequiredPlayers,

                    // Vérifie si l'utilisateur connecté a déjà rejoint ce match
                    IsJoined = m.Participants.Any(p => p.UserId == currentUserId.Value)
                })
                .ToListAsync();

            // Récupère les 4 équipes les plus récentes
            var recentTeams = await _context.Teams
                .Include(t => t.Sport) // Inclut le sport de l'équipe
                .Include(t => t.City) // Inclut la ville de l'équipe
                .Include(t => t.Members) // Inclut les membres de l'équipe
                .OrderByDescending(t => t.CreatedAt)
                .Take(4)
                .Select(t => new
                {
                    t.Id,
                    t.Name,
                    SportName = t.Sport != null ? t.Sport.Name : null,
                    CityName = t.City != null ? t.City.Name : null,
                    MembersCount = t.Members.Count,
                    t.RequiredPlayers,

                    // Vérifie si l'utilisateur connecté est membre de cette équipe
                    IsMember = t.Members.Any(m => m.UserId == currentUserId.Value)
                })
                .ToListAsync();

            // Retourne toutes les données nécessaires au dashboard
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

        // Fonction qui récupère l'id de l'utilisateur depuis le token JWT
        private int? GetCurrentUserId()
        {
            // Cherche le claim NameIdentifier dans le token
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            // Si le claim n'existe pas
            if (string.IsNullOrWhiteSpace(userIdClaim))
            {
                return null;
            }

            // Convertit l'id de string vers int
            if (!int.TryParse(userIdClaim, out int userId))
            {
                return null;
            }

            // Retourne l'id de l'utilisateur connecté
            return userId;
        }
    }
}