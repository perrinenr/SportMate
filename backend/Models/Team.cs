namespace backend.Models
{
    public class Team
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Description { get; set; }

        public int SportId { get; set; }
        public Sport Sport { get; set; } = null!;

        public int CityId { get; set; }
        public City City { get; set; } = null!;

        public int RequiredPlayers { get; set; }

        public int CreatedBy { get; set; }
        public User CreatedByUser { get; set; } = null!;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<TeamMember> Members { get; set; } = new List<TeamMember>();
    }
}
