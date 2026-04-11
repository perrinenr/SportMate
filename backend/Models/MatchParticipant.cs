namespace backend.Models
{
    public class MatchParticipant
    {
        public int Id { get; set; }

        public int MatchId { get; set; }
        public int UserId { get; set; }

        public DateTime JoinedAt { get; set; } = DateTime.Now;
    }
}