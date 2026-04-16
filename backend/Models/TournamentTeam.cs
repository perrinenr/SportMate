namespace backend.Models
{
    public class TournamentTeam
    {
        public int Id { get; set; }

        public int TournamentId { get; set; }
        public int TeamId { get; set; }

        public DateTime JoinedAt { get; set; } = DateTime.Now;
    }
}