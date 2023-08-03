using MakeYourTrip.Models;
using MakeYourTrip.Temp;
using Microsoft.AspNetCore.Mvc;

namespace MakeYourTrip.Repository.Interface
{
    public interface IHotel
    {
        public Task<List<Hotel>> PostHotel([FromForm] HotelImg hotel);
        public Task<List<Hotel>> GetHotels();
        public Task<Hotel> GetHotel(int id);
        public Task<List<Hotel>> DeleteHotel(int id);
       public Task<List<Hotel>> PutHotel(int id, Hotel hotel);

    }
}
