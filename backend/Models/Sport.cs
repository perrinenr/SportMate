namespace backend.Models
{
    public class Sport
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;

        public ICollection<Match> Matches { get; set; } = new List<Match>();
        public ICollection<Team> Teams { get; set; } = new List<Team>();
    }
}
