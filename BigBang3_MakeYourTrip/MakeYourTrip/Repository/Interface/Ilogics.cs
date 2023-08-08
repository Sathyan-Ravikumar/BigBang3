using MakeYourTrip.Models;
using MakeYourTrip.Repository.Buffer;

namespace MakeYourTrip.Repository.Interface
{
    public interface Ilogics
    {
        public Task<List<PackageHotelBuffer>> GetHotels(int packid);
        public Task<List<ItineraryBuffer>> GetItinerary(int packid);

        public Task<Package> GetPackagebyUserId(int userid);

    }
}
