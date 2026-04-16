namespace backend.Models
{
    public class Match
    {
        public int Id { get; set; }

        public string Title { get; set; } = null!;
        public string? Description { get; set; }

        public int SportId { get; set; }
        public int CityId { get; set; }

        public string? LocationDetails { get; set; }

        public DateTime MatchDate { get; set; }
        public int RequiredPlayers { get; set; }

        public string RequiredLevel { get; set; } = null!;

        public int CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}