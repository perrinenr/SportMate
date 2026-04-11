using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TeamMembersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TeamMembersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TeamMember>>> GetAll()
        {
            return await _context.TeamMembers.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TeamMember>> GetById(int id)
        {
            var item = await _context.TeamMembers.FindAsync(id);
            if (item == null) return NotFound();
            return item;
        }

        [HttpPost]
        public async Task<ActionResult<TeamMember>> Create(TeamMember item)
        {
            item.JoinedAt = DateTime.Now;
            _context.TeamMembers.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = item.Id }, item);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, TeamMember item)
        {
            if (id != item.Id) return BadRequest();

            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _context.TeamMembers.FindAsync(id);
            if (item == null) return NotFound();

            _context.TeamMembers.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}