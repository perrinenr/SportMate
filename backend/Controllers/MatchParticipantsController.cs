using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MatchParticipantsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MatchParticipantsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MatchParticipant>>> GetAll()
        {
            return await _context.MatchParticipants.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MatchParticipant>> GetById(int id)
        {
            var item = await _context.MatchParticipants.FindAsync(id);
            if (item == null) return NotFound();
            return item;
        }

        [HttpPost]
        public async Task<ActionResult<MatchParticipant>> Create(MatchParticipant item)
        {
            item.JoinedAt = DateTime.Now;
            _context.MatchParticipants.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = item.Id }, item);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, MatchParticipant item)
        {
            if (id != item.Id) return BadRequest();

            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _context.MatchParticipants.FindAsync(id);
            if (item == null) return NotFound();

            _context.MatchParticipants.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}