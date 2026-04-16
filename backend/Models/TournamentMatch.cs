namespace backend.Models
{
    public class TournamentMatch
    {
        public int Id { get; set; }

        public int TournamentId { get; set; }

        public int Team1Id { get; set; }
        public int Team2Id { get; set; }

        public string Round { get; set; } = null!;
        public DateTime? MatchDate { get; set; }

        public int? WinnerTeamId { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}