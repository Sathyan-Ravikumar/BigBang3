using System.ComponentModel.DataAnnotations.Schema;

namespace MakeYourTrip.Temp
{
    public class ItineraryImage
    {
        public int ItineraryId { get; set; }

        public int? PackageId { get; set; }

        public string? DayNumber { get; set; }

        public string? Activities { get; set; }

        public string? Time { get; set; }

        public string? ItineraryPlace { get; set; }

        [NotMapped]
        public IFormFile? ItineraryImg { get; set; }
    }
}
