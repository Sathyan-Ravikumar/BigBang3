using MakeYourTrip.Models;
using Microsoft.AspNetCore.Mvc;

namespace MakeYourTrip.Repository.Interface
{
    public interface ITripBook
    {
        public  Task<List<TripBooking>> GetTripBookings();
        public  Task<TripBooking> GetTripBooking(int id);
        public  Task<TripBooking> PostTripBooking(TripBooking tripBooking);

    }
}
