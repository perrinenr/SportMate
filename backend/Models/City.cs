namespace backend.Models
{
    public class City
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;

        public ICollection<User> Users { get; set; } = new List<User>();
        public ICollection<Match> Matches { get; set; } = new List<Match>();
        public ICollection<Team> Teams { get; set; } = new List<Team>();
    }
}
