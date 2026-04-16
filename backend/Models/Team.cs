namespace backend.Models
{
    public class Team
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;
        public string? Description { get; set; }

        public int SportId { get; set; }
        public int CityId { get; set; }

        public int RequiredPlayers { get; set; }

        public int CreatedBy { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}