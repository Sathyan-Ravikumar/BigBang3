using System.ComponentModel.DataAnnotations.Schema;

namespace MakeYourTrip.Temp
{
    public class PackageImage
    {
        public int PackageId { get; set; }

        public int? UserId { get; set; }

        public string? Place { get; set; }

        public string? Duration { get; set; }

        public decimal? PackagePrice { get; set; }

        public string? Description { get; set; }

        public string? PlaceImage { get; set; }

        [NotMapped]
        public IFormFile? PackImg { get; set; }
    }
}
