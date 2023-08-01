using MakeYourTrip.Models;
using MakeYourTrip.Repository.Interface;
using Microsoft.EntityFrameworkCore;

namespace MakeYourTrip.Repository.Services
{
    public class ItineraryService : IItinerary
    {
        private readonly MakeYourTripContext? _dbcontext;
        public ItineraryService(MakeYourTripContext dbcontext)
        {
            _dbcontext = dbcontext;
        }
        public async Task<List<ItineraryDetail>> GetItineraryDetails()
        {
            return await _dbcontext!.ItineraryDetails.ToListAsync();

        }
        public async Task<ItineraryDetail> GetItineraryDetail(int id)
        {
            var obj = await _dbcontext!.ItineraryDetails.FindAsync(id);
            return obj;

        }
        public async Task<List<ItineraryDetail>> PutItineraryDetail(int id, ItineraryDetail itineraryDetail)
        {
            var obj = await _dbcontext!.ItineraryDetails.FindAsync(id);
            obj.Activities = itineraryDetail.Activities;
            obj.Time = itineraryDetail.Time;
            obj.ItineraryPlace = itineraryDetail.ItineraryPlace;
            obj.ItineraryImage = itineraryDetail.ItineraryImage;

            await _dbcontext.SaveChangesAsync();
            return await _dbcontext.ItineraryDetails.ToListAsync();

        }
        public async Task<List<ItineraryDetail>> PostItineraryDetail(ItineraryDetail itineraryDetail)
        {
            var obj = await _dbcontext.ItineraryDetails.AddAsync(itineraryDetail);
            await _dbcontext.SaveChangesAsync();
            return await _dbcontext.ItineraryDetails.ToListAsync();
        }
        public async Task<List<ItineraryDetail>> DeleteItineraryDetail(int id)
        {

            var obj = await _dbcontext.ItineraryDetails.FindAsync(id);
            _dbcontext.ItineraryDetails.Remove(obj);
            await _dbcontext.SaveChangesAsync();
            return await _dbcontext.ItineraryDetails.ToListAsync();
        }
    }
}
