using System.ComponentModel.DataAnnotations;

namespace backend.DTOs
{
    public class CreateTeamDto
    {
        [Required]
        public string Name { get; set; } = null!;

        public string? Description { get; set; }

        [Range(1, int.MaxValue)]
        public int SportId { get; set; }

        [Range(1, int.MaxValue)]
        public int CityId { get; set; }

        [Range(2, 200)]
        public int RequiredPlayers { get; set; }

        public int? CreatedBy { get; set; }
    }
}
