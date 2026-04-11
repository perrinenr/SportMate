namespace backend.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string PasswordHash { get; set; } = null!;
        public string? Phone { get; set; }
        public string? ProfileImage { get; set; }
        public string? Bio { get; set; }
        public int? CityId { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}