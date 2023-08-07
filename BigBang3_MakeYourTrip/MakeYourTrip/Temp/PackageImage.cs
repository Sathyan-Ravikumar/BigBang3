using System.ComponentModel.DataAnnotations.Schema;

namespace MakeYourTrip.Temp
{
    public class PackageImage
    {
        public int PackageId { get; set; }

        public int? UserId { get; set; }

        public string? Place { get; set; }

        public int Duration { get; set; }

        public decimal? PackagePrice { get; set; }

        public string? Description { get; set; }

        [NotMapped]
        public IFormFile? PackImg { get; set; }
    }
}
