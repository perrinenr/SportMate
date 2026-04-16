namespace backend.Models
{
    public class TeamMember
    {
        public int Id { get; set; }
        
        public int TeamId { get; set; }
        public int UserId { get; set; }

        public DateTime JoinedAt { get; set; } = DateTime.Now;
    }
}