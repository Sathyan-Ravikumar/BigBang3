using MakeYourTrip.Models;
using MakeYourTrip.Repository.Interface;
using MakeYourTrip.Temp;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MakeYourTrip.Repository.Services
{
    public class HotelService : IHotel
    {
        private readonly MakeYourTripContext? _dbcontext;
        private readonly IWebHostEnvironment _hostEnvironment;

        public HotelService(MakeYourTripContext dbcontext, IWebHostEnvironment hostEnvironment)
        {
            _dbcontext = dbcontext;
            _hostEnvironment = hostEnvironment;
        }
        public async Task<List<Hotel>> GetHotels()
        {
            var images = await _dbcontext!.Hotels.ToListAsync();
            var imageList = new List<Hotel>();
            foreach (var image in images)
            {
                var uploadsFolder = Path.Combine(_hostEnvironment.WebRootPath, "hotels");
                var filePath = Path.Combine(uploadsFolder, image.HotelsImage);

                var imageBytes = System.IO.File.ReadAllBytes(filePath);
                var tourData = new Hotel
                {
                    HotelId=image.HotelId,
                    PackageId = image.PackageId,
                    HotelName = image.HotelName,
                    HotelRating = image.HotelRating,
                    HotelPrice = image.HotelPrice,
                    HotelsImage = Convert.ToBase64String(imageBytes)
                };
                imageList.Add(tourData);
            }
            return imageList;
        }
        public async Task<Hotel> GetHotel(int id)
        {
            var images = await _dbcontext!.Hotels.ToListAsync();
            Hotel hotelget = images.SingleOrDefault(p => p.HotelId == id);
            var uploadsFolder = Path.Combine(_hostEnvironment.WebRootPath, "hotels");
            var filePath = Path.Combine(uploadsFolder, hotelget.HotelsImage);

            var imageBytes = System.IO.File.ReadAllBytes(filePath);
            var tourData = new Hotel
            {
                HotelId = hotelget.HotelId,
                PackageId = hotelget.PackageId,
                HotelName = hotelget.HotelName,
                HotelRating = hotelget.HotelRating,
                HotelPrice = hotelget.HotelPrice,
                HotelsImage = Convert.ToBase64String(imageBytes)
            };
            return tourData;
        }

        public async Task<List<Hotel>> PostHotel([FromForm] HotelImg hotel)
        {
            string ImagePath = await SaveHotelImage(hotel.HotelImage);
            var hot = new Hotel();
            hot.PackageId = hotel.PackageId;
            hot.HotelName = hotel.HotelName;
            hot.HotelRating = hotel.HotelRating;
            hot.HotelPrice = hotel.HotelPrice;
            hot.HotelsImage = ImagePath;
            var obj = await _dbcontext!.Hotels.AddAsync(hot);
            await _dbcontext.SaveChangesAsync();
            return await _dbcontext.Hotels.ToListAsync();
        }

        public async Task<List<Hotel>> PutHotel(int id, Hotel hotel)
        {
            var obj = await _dbcontext!.Hotels.FindAsync(id);
            obj.HotelRating = hotel.HotelRating;
            obj.HotelPrice = hotel.HotelPrice;
            await _dbcontext.SaveChangesAsync();
            return await _dbcontext.Hotels.ToListAsync();
        }
        public async Task<List<Hotel>> DeleteHotel(int id)
        {
            var obj = await _dbcontext!.Hotels.FindAsync(id);
            _dbcontext.Hotels.Remove(obj!);
            await _dbcontext.SaveChangesAsync();
            return await _dbcontext.Hotels.ToListAsync();
        }

        

        [NonAction]
        public async Task<string> SaveHotelImage(IFormFile imageFile)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "wwwroot/hotels", imageName);
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return imageName;
        }

    }
}
