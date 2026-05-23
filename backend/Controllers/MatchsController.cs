using System.Security.Claims;
using backend.Data;
using backend.DTOs;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    // Indique que cette classe est un contrôleur API
    [ApiController]

    // Route principale : api/matches
    [Route("api/[controller]")]
    public class MatchesController : ControllerBase
    {
        private readonly AppDbContext _context;

        // Injection du DbContext pour accéder à la base de données
        public MatchesController(AppDbContext context)
        {
            _context = context;
        }

        // Fonction privée qui récupère l'id de l'utilisateur connecté depuis le token JWT
        private int? GetCurrentUserId()
        {
            // Cherche dans le token le claim qui contient l'id de l'utilisateur
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            // Si le token ne contient pas d'id
            if (string.IsNullOrWhiteSpace(userIdClaim))
                return null;

            // Convertit l'id de string vers int
            if (!int.TryParse(userIdClaim, out int userId))
                return null;

            // Retourne l'id de l'utilisateur connecté
            return userId;
        }

        // GET api/matches
        // Retourne tous les matchs, avec possibilité de filtrer par sportId et cityId
        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] int? sportId, [FromQuery] int? cityId)
        {
            // Récupère l'id de l'utilisateur connecté s'il y a un token
            var currentUserId = GetCurrentUserId();

            // Prépare la requête sur la table Matches
            var query = _context.Matches
                .Include(m => m.Sport)          // Inclut les infos du sport
                .Include(m => m.City)           // Inclut les infos de la ville
                .Include(m => m.CreatedByUser)  // Inclut les infos du créateur du match
                .Include(m => m.Participants)   // Inclut les participants du match
                .AsQueryable();                 // Permet d'ajouter des filtres après

            // Si un sportId est envoyé, on filtre les matchs par sport
            if (sportId.HasValue && sportId.Value > 0)
                query = query.Where(m => m.SportId == sportId.Value);

            // Si un cityId est envoyé, on filtre les matchs par ville
            if (cityId.HasValue && cityId.Value > 0)
                query = query.Where(m => m.CityId == cityId.Value);

            // Exécute la requête et prépare les données à retourner
            var matches = await query
                .OrderBy(m => m.MatchDate) // Trie les matchs par date
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

                    // Nombre de participants dans le match
                    ParticipantsCount = m.Participants.Count,

                    // Nombre de places restantes
                    SpotsLeft = m.RequiredPlayers > m.Participants.Count
                        ? m.RequiredPlayers - m.Participants.Count
                        : 0,

                    // Vérifie si le match est complet
                    IsFull = m.Participants.Count >= m.RequiredPlayers,

                    // Vérifie si l'utilisateur connecté a déjà rejoint ce match
                    IsJoined = currentUserId.HasValue &&
                               m.Participants.Any(p => p.UserId == currentUserId.Value)
                })
                .ToListAsync();

            // Retourne la liste des matchs
            return Ok(matches);
        }

        // GET api/matches/5
        // Retourne les détails d'un match précis
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            // Récupère l'id de l'utilisateur connecté s'il y a un token
            var currentUserId = GetCurrentUserId();

            // Cherche le match par son id avec ses relations
            var match = await _context.Matches
                .Include(m => m.Sport)
                .Include(m => m.City)
                .Include(m => m.CreatedByUser)
                .Include(m => m.Participants)
                    .ThenInclude(p => p.User) // Inclut aussi les infos de chaque utilisateur participant
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

                    SpotsLeft = m.RequiredPlayers > m.Participants.Count
                        ? m.RequiredPlayers - m.Participants.Count
                        : 0,

                    IsFull = m.Participants.Count >= m.RequiredPlayers,

                    IsJoined = currentUserId.HasValue &&
                               m.Participants.Any(p => p.UserId == currentUserId.Value),

                    // Liste des participants du match
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

            // Si aucun match n'est trouvé
            if (match == null)
                return NotFound(new { message = "Match not found." });

            // Retourne les détails du match
            return Ok(match);
        }

        // POST api/matches
        // Crée un nouveau match
        // [Authorize] signifie que l'utilisateur doit être connecté
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateMatchDto dto)
        {
            // Vérifie si les données envoyées sont valides
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Récupère l'id de l'utilisateur connecté
            var userId = GetCurrentUserId();

            // Si le token est absent ou invalide
            if (!userId.HasValue)
                return Unauthorized(new { message = "Invalid or missing token." });

            // Vérifie que l'utilisateur existe dans la base de données
            var userExists = await _context.Users.AnyAsync(u => u.Id == userId.Value);
            if (!userExists)
                return BadRequest(new { message = "Creator user does not exist." });

            // Vérifie que le sport choisi existe
            var sportExists = await _context.Sports.AnyAsync(s => s.Id == dto.SportId);
            if (!sportExists)
                return BadRequest(new { message = "Selected sport does not exist." });

            // Vérifie que la ville choisie existe
            var cityExists = await _context.Cities.AnyAsync(c => c.Id == dto.CityId);
            if (!cityExists)
                return BadRequest(new { message = "Selected city does not exist." });

            // Création de l'objet Match
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

            // Ajoute le match dans la base de données
            _context.Matches.Add(match);
            await _context.SaveChangesAsync();

            // Ajoute automatiquement le créateur comme participant du match
            _context.MatchParticipants.Add(new MatchParticipant
            {
                MatchId = match.Id,
                UserId = userId.Value,
                JoinedAt = DateTime.UtcNow
            });

            await _context.SaveChangesAsync();

            // Retourne une réponse 201 Created avec l'id du match créé
            return CreatedAtAction(nameof(GetById), new { id = match.Id }, new
            {
                message = "Match created successfully.",
                matchId = match.Id
            });
        }

        // POST api/matches/5/join
        // Permet à l'utilisateur connecté de rejoindre un match
        [Authorize]
        [HttpPost("{id:int}/join")]
        public async Task<IActionResult> Join(int id)
        {
            // Récupère l'id de l'utilisateur connecté
            var userId = GetCurrentUserId();

            if (!userId.HasValue)
                return Unauthorized(new { message = "Invalid or missing token." });

            // Cherche le match avec ses participants
            var match = await _context.Matches
                .Include(m => m.Participants)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (match == null)
                return NotFound(new { message = "Match not found." });

            // Vérifie que l'utilisateur existe
            var userExists = await _context.Users.AnyAsync(u => u.Id == userId.Value);
            if (!userExists)
                return BadRequest(new { message = "User does not exist." });

            // Vérifie si l'utilisateur a déjà rejoint ce match
            if (match.Participants.Any(p => p.UserId == userId.Value))
                return BadRequest(new { message = "You already joined this match." });

            // Vérifie si le match est déjà complet
            if (match.Participants.Count >= match.RequiredPlayers)
                return BadRequest(new { message = "This match is already full." });

            // Ajoute l'utilisateur dans les participants du match
            _context.MatchParticipants.Add(new MatchParticipant
            {
                MatchId = id,
                UserId = userId.Value,
                JoinedAt = DateTime.UtcNow
            });

            await _context.SaveChangesAsync();

            return Ok(new { message = "You joined the match successfully." });
        }

        // DELETE api/matches/5/leave
        // Permet à l'utilisateur connecté de quitter un match
        [Authorize]
        [HttpDelete("{id:int}/leave")]
        public async Task<IActionResult> Leave(int id)
        {
            // Récupère l'id de l'utilisateur connecté
            var userId = GetCurrentUserId();

            if (!userId.HasValue)
                return Unauthorized(new { message = "Invalid or missing token." });

            // Cherche la participation de cet utilisateur dans ce match
            var participant = await _context.MatchParticipants
                .FirstOrDefaultAsync(p => p.MatchId == id && p.UserId == userId.Value);

            // Si l'utilisateur n'est pas dans ce match
            if (participant == null)
                return NotFound(new { message = "You are not in this match." });

            // Supprime la participation
            _context.MatchParticipants.Remove(participant);
            await _context.SaveChangesAsync();

            return Ok(new { message = "You left the match." });
        }

        // PUT api/matches/5
        // Modifie un match existant
        [Authorize]
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] UpdateMatchDto dto)
        {
            // Vérifie si les données envoyées sont valides
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Récupère l'id de l'utilisateur connecté
            var userId = GetCurrentUserId();

            if (!userId.HasValue)
                return Unauthorized(new { message = "Invalid or missing token." });

            // Cherche le match à modifier
            var match = await _context.Matches.FindAsync(id);

            if (match == null)
                return NotFound(new { message = "Match not found." });

            // Vérifie que seul le créateur du match peut le modifier
            if (match.CreatedBy != userId.Value)
                return Forbid();

            // Vérifie que le sport existe
            if (!await _context.Sports.AnyAsync(s => s.Id == dto.SportId))
                return BadRequest(new { message = "Selected sport does not exist." });

            // Vérifie que la ville existe
            if (!await _context.Cities.AnyAsync(c => c.Id == dto.CityId))
                return BadRequest(new { message = "Selected city does not exist." });

            // Met à jour les informations du match
            match.Title = dto.Title.Trim();
            match.Description = string.IsNullOrWhiteSpace(dto.Description) ? null : dto.Description.Trim();
            match.SportId = dto.SportId;
            match.CityId = dto.CityId;
            match.LocationDetails = string.IsNullOrWhiteSpace(dto.LocationDetails) ? null : dto.LocationDetails.Trim();
            match.MatchDate = dto.MatchDate;
            match.RequiredPlayers = dto.RequiredPlayers;
            match.RequiredLevel = dto.RequiredLevel.Trim();

            // Sauvegarde les changements
            await _context.SaveChangesAsync();

            return Ok(new { message = "Match updated successfully." });
        }

        // DELETE api/matches/5
        // Supprime un match existant
        [Authorize]
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            // Récupère l'id de l'utilisateur connecté
            var userId = GetCurrentUserId();

            if (!userId.HasValue)
                return Unauthorized(new { message = "Invalid or missing token." });

            // Cherche le match à supprimer
            var match = await _context.Matches.FindAsync(id);

            if (match == null)
                return NotFound(new { message = "Match not found." });

            // Vérifie que seul le créateur du match peut le supprimer
            if (match.CreatedBy != userId.Value)
                return Forbid();

            // Récupère tous les participants de ce match
            var participants = await _context.MatchParticipants
                .Where(p => p.MatchId == id)
                .ToListAsync();

            // Supprime d'abord les participants liés au match
            _context.MatchParticipants.RemoveRange(participants);

            // Supprime ensuite le match
            _context.Matches.Remove(match);

            // Sauvegarde les changements
            await _context.SaveChangesAsync();

            return Ok(new { message = "Match deleted successfully." });
        }
    }
}