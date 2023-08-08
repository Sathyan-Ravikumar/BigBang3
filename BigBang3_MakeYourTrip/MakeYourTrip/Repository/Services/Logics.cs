using MakeYourTrip.Models;
using MakeYourTrip.Repository.Buffer;
using MakeYourTrip.Repository.Interface;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using System;
using System.IO; // Make sure to include this namespace for the Path class
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MakeYourTrip.Repository.Services
{
    public class Logics : Ilogics
    {
        private readonly MakeYourTripContext _dbcontext;
        private readonly IWebHostEnvironment _hostEnvironment;

        public Logics(MakeYourTripContext dbcontext, IWebHostEnvironment hostEnvironment)
        {
            _dbcontext = dbcontext;
            _hostEnvironment = hostEnvironment;
        }

        public async Task<List<PackageHotelBuffer>> GetHotels(int packid)
        {
            var uploadsFolder = Path.Combine(_hostEnvironment.WebRootPath, "hotels");

            var hotels = await (from h in _dbcontext.Hotels
                                join p in _dbcontext.Packages on h.PackageId equals p.PackageId
                                where h.PackageId == packid
                                select new PackageHotelBuffer
                                {
                                    PackageId = h.PackageId,
                                    HotelId = h.HotelId,
                                    HotelName = h.HotelName,
                                    HotelRating = h.HotelRating,
                                    HotelPrice = h.HotelPrice,
                                    HotelsImage = Convert.ToBase64String(File.ReadAllBytes(Path.Combine(uploadsFolder, h.HotelsImage)))
                                }).ToListAsync();

            if (hotels == null || hotels.Count == 0)
            {
                throw new ArithmeticException("No Data Found");
            }

            return hotels;
        }

        public async Task<List<ItineraryBuffer>> GetItinerary(int packid)
        {
            var uploadsFolder = Path.Combine(_hostEnvironment.WebRootPath, "Itinerary");

            var Itineraries = await (from I in _dbcontext.ItineraryDetails
                                join p in _dbcontext.Packages on I.PackageId equals p.PackageId
                                where I.PackageId == packid
                                select new ItineraryBuffer
                                {
                                    PackageId = I.PackageId,
                                    ItineraryId=I.ItineraryId,
                                    DayNumber=I.DayNumber,
                                    ItineraryPlace=I.ItineraryPlace,
                                    Activities=I.Activities,
                                    Time=I.Time,
                                    ItineraryImage = Convert.ToBase64String(File.ReadAllBytes(Path.Combine(uploadsFolder, I.ItineraryImage)))
                                }).ToListAsync();

            if (Itineraries == null || Itineraries.Count == 0)
            {
                throw new ArithmeticException("No Data Found");
            }

            return Itineraries;
        }

        public async Task<Package> GetPackagebyUserId(int userid)
        {
            var images = await _dbcontext.Packages.ToListAsync();
            Package byid =  images.FirstOrDefault(p => p.UserId == userid);

            var uploadsFolder = Path.Combine(_hostEnvironment.WebRootPath, "Package");
            var filePath = Path.Combine(uploadsFolder, byid.PlaceImage);

            var imageBytes = await System.IO.File.ReadAllBytesAsync(filePath);
            var tourData = new Package
            {
                PackageId = byid.PackageId,
                UserId = byid.UserId,
                Place = byid.Place,
                Duration = byid.Duration,
                PackagePrice = byid.PackagePrice,
                Description = byid.Description,
                PlaceImage = Convert.ToBase64String(imageBytes)
            };
            return tourData;
        }


    }
}
