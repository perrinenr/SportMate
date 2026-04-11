using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TournamentsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TournamentsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tournament>>> GetAll()
        {
            return await _context.Tournaments.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Tournament>> GetById(int id)
        {
            var item = await _context.Tournaments.FindAsync(id);
            if (item == null) return NotFound();
            return item;
        }

        [HttpPost]
        public async Task<ActionResult<Tournament>> Create(Tournament item)
        {
            item.CreatedAt = DateTime.Now;
            _context.Tournaments.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = item.Id }, item);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Tournament item)
        {
            if (id != item.Id) return BadRequest();

            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _context.Tournaments.FindAsync(id);
            if (item == null) return NotFound();

            _context.Tournaments.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}