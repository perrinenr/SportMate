using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SportsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SportsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var sports = await _context.Sports
                .OrderBy(s => s.Name)
                .Select(s => new { s.Id, s.Name })
                .ToListAsync();

            return Ok(sports);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var sport = await _context.Sports
                .Where(s => s.Id == id)
                .Select(s => new { s.Id, s.Name })
                .FirstOrDefaultAsync();

            if (sport == null)
                return NotFound(new { message = "Sport not found." });

            return Ok(sport);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Sport item)
        {
            if (string.IsNullOrWhiteSpace(item.Name))
                return BadRequest(new { message = "Sport name is required." });

            var name = item.Name.Trim();

            if (await _context.Sports.AnyAsync(s => s.Name.ToLower() == name.ToLower()))
                return BadRequest(new { message = "Sport already exists." });

            var sport = new Sport { Name = name };

            _context.Sports.Add(sport);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = sport.Id }, sport);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] Sport item)
        {
            if (string.IsNullOrWhiteSpace(item.Name))
                return BadRequest(new { message = "Sport name is required." });

            var sport = await _context.Sports.FindAsync(id);

            if (sport == null)
                return NotFound(new { message = "Sport not found." });

            var name = item.Name.Trim();

            var exists = await _context.Sports
                .AnyAsync(s => s.Id != id && s.Name.ToLower() == name.ToLower());

            if (exists)
                return BadRequest(new { message = "Sport already exists." });

            sport.Name = name;

            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Sport updated successfully.",
                sport = new
                {
                    sport.Id,
                    sport.Name
                }
            });
        }
    }
}