namespace MakeYourTrip.Temp
{
    public class UserIdProof
    {
        public int UserId { get; set; }

        public string Name { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string Password { get; set; } = null!;

        public string? Role { get; set; }

        public string? Gender { get; set; }

        public string? Address { get; set; }

        public long? ContactNo { get; set; }

        public IFormFile? IdProofImg { get; set; }

        public string? AgencyName { get; set; }

        public string? StatusForAgents { get; set; }
    }
}
