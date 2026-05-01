using System.ComponentModel.DataAnnotations;

namespace backend.DTOs
{
    public class UpdateProfileDto
    {
        [Required]
        public string FirstName { get; set; } = null!;

        [Required]
        public string LastName { get; set; } = null!;

        public string? Phone { get; set; }
        public string? ProfileImage { get; set; }
        public string? Bio { get; set; }
        public int? CityId { get; set; }
    }
}
