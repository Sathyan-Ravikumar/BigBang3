using System.ComponentModel.DataAnnotations.Schema;

namespace MakeYourTrip.Temp
{
    public class HotelImg
    {
        public int HotelId { get; set; }

        public int? PackageId { get; set; }

        public string? HotelName { get; set; }

        public decimal? HotelRating { get; set; }

        public decimal? HotelPrice { get; set; }
       
        [NotMapped]
        public IFormFile? HotelImage { get; set; }
    }
}
