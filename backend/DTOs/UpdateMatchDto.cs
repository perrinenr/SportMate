using System.ComponentModel.DataAnnotations;

namespace backend.DTOs
{
    public class UpdateMatchDto
    {
        [Required]
        public string Title { get; set; } = null!;
        public string? Description { get; set; }
        [Range(1, int.MaxValue)] public int SportId { get; set; }
        [Range(1, int.MaxValue)] public int CityId { get; set; }
        public string? LocationDetails { get; set; }
        [Required] public DateTime MatchDate { get; set; }
        [Range(2, 200)] public int RequiredPlayers { get; set; }
        [Required] public string RequiredLevel { get; set; } = null!;
    }
}
