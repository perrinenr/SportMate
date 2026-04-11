using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TournamentMatchesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TournamentMatchesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TournamentMatch>>> GetAll()
        {
            return await _context.TournamentMatches.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TournamentMatch>> GetById(int id)
        {
            var item = await _context.TournamentMatches.FindAsync(id);
            if (item == null) return NotFound();
            return item;
        }

        [HttpPost]
        public async Task<ActionResult<TournamentMatch>> Create(TournamentMatch item)
        {
            item.CreatedAt = DateTime.Now;
            _context.TournamentMatches.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = item.Id }, item);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, TournamentMatch item)
        {
            if (id != item.Id) return BadRequest();

            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _context.TournamentMatches.FindAsync(id);
            if (item == null) return NotFound();

            _context.TournamentMatches.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}