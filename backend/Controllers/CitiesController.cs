using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CitiesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CitiesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var cities = await _context.Cities
                .OrderBy(c => c.Name)
                .Select(c => new { c.Id, c.Name })
                .ToListAsync();

            return Ok(cities);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var city = await _context.Cities
                .Where(c => c.Id == id)
                .Select(c => new { c.Id, c.Name })
                .FirstOrDefaultAsync();

            if (city == null) return NotFound(new { message = "City not found." });
            return Ok(city);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] City item)
        {
            if (string.IsNullOrWhiteSpace(item.Name)) return BadRequest(new { message = "City name is required." });

            var name = item.Name.Trim();
            if (await _context.Cities.AnyAsync(c => c.Name.ToLower() == name.ToLower()))
                return BadRequest(new { message = "City already exists." });

            var city = new City { Name = name };
            _context.Cities.Add(city);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = city.Id }, city);
        }
    }
}
