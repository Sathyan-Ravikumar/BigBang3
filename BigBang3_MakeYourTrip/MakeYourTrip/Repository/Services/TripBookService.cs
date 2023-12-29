using MakeYourTrip.Models;
using MakeYourTrip.Repository.Interface;
using Microsoft.EntityFrameworkCore;

namespace MakeYourTrip.Repository.Services
{
    public class TripBookService : ITripBook
    {
        private readonly MakeYourTripContext? _dbcontext;
        private readonly IWebHostEnvironment _hostEnvironment;

        public TripBookService(MakeYourTripContext dbcontext, IWebHostEnvironment hostEnvironment)
        {
            _dbcontext = dbcontext;
            _hostEnvironment = hostEnvironment;
        }
        public async Task<List<TripBooking>> GetTripBookings()
        {
            return await _dbcontext!.TripBookings.ToListAsync();
        }
        public async Task<TripBooking> GetTripBooking(int id)
        {
            var obj = await _dbcontext!.TripBookings.FindAsync(id);
            return obj!;
        }
        public async Task<TripBooking> PostTripBooking(TripBooking tripBooking)
        {
            var obj = await _dbcontext!.TripBookings.AddAsync(tripBooking);
            await _dbcontext.SaveChangesAsync();
            var newlyCreatedObject = obj.Entity;
            return newlyCreatedObject;
        }

    }
}
