using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TournamentTeamsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TournamentTeamsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TournamentTeam>>> GetAll()
        {
            return await _context.TournamentTeams.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TournamentTeam>> GetById(int id)
        {
            var item = await _context.TournamentTeams.FindAsync(id);
            if (item == null) return NotFound();
            return item;
        }

        [HttpPost]
        public async Task<ActionResult<TournamentTeam>> Create(TournamentTeam item)
        {
            item.JoinedAt = DateTime.Now;
            _context.TournamentTeams.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = item.Id }, item);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, TournamentTeam item)
        {
            if (id != item.Id) return BadRequest();

            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _context.TournamentTeams.FindAsync(id);
            if (item == null) return NotFound();

            _context.TournamentTeams.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}