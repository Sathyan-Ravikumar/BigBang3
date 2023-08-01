using MakeYourTrip.Models;

namespace MakeYourTrip.Repository.Interface
{
    public interface IItinerary
    {
        public Task<List<ItineraryDetail>> GetItineraryDetails();
        public Task<ItineraryDetail> GetItineraryDetail(int id);
        public Task<List<ItineraryDetail>> PutItineraryDetail(int id, ItineraryDetail itineraryDetail);
        public Task<List<ItineraryDetail>> PostItineraryDetail(ItineraryDetail itineraryDetail);
        public Task<List<ItineraryDetail>> DeleteItineraryDetail(int id);
    }
}
