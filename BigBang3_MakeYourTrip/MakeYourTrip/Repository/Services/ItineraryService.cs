using MakeYourTrip.Models;
using MakeYourTrip.Repository.Interface;
using MakeYourTrip.Temp;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;

namespace MakeYourTrip.Repository.Services
{
    public class ItineraryService : IItinerary
    {
        private readonly MakeYourTripContext? _dbcontext;
        private readonly IWebHostEnvironment _hostEnvironment;

        public ItineraryService(MakeYourTripContext dbcontext, IWebHostEnvironment hostEnvironment)
        {
            _dbcontext = dbcontext;
            _hostEnvironment = hostEnvironment;
        }
        public async Task<List<ItineraryDetail>> GetItineraryDetails()
        {
            var images = await _dbcontext!.ItineraryDetails.ToListAsync();
            var imageList = new List<ItineraryDetail>();
            foreach (var image in images)
            {
                var uploadsFolder = Path.Combine(_hostEnvironment.WebRootPath, "Itinerary");
                var filePath = Path.Combine(uploadsFolder, image.ItineraryImage);

                var imageBytes = System.IO.File.ReadAllBytes(filePath);
                var tourData = new ItineraryDetail
                {
                    ItineraryId=image.ItineraryId,
                    PackageId = image.PackageId,
                    DayNumber = image.DayNumber,
                    Activities = image.Activities,
                    Time = image.Time,
                    ItineraryPlace = image.ItineraryPlace,
                    ItineraryImage = Convert.ToBase64String(imageBytes)
                };
                imageList.Add(tourData);
            }
            return imageList;

        }
        public async Task<ItineraryDetail> GetItineraryDetail(int id)
        {
            var images = await _dbcontext!.ItineraryDetails.ToListAsync();
            ItineraryDetail iti = images.SingleOrDefault(p => p.ItineraryId == id);

            var uploadsFolder = Path.Combine(_hostEnvironment.WebRootPath, "Itinerary");
            var filePath = Path.Combine(uploadsFolder, iti.ItineraryImage);

            var imageBytes = System.IO.File.ReadAllBytes(filePath);
            var tourData = new ItineraryDetail
            {
                ItineraryId = iti.ItineraryId,
                PackageId = iti.PackageId,
                DayNumber = iti.DayNumber,
                Activities = iti.Activities,
                Time = iti.Time,
                ItineraryPlace = iti.ItineraryPlace,
                ItineraryImage = Convert.ToBase64String(imageBytes)
            };
            return tourData;

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
        public async Task<List<ItineraryDetail>> PostItineraryDetail([FromForm] ItineraryImage II)
        {

            string ImagePath = await SaveItineraryImage(II.ItineraryImg);
            var itinerary = new ItineraryDetail();
            itinerary.PackageId = II.PackageId;
            itinerary.DayNumber = II.DayNumber;
            itinerary.Activities = II.Activities;
            itinerary.Time = II.Time;
            itinerary.ItineraryPlace = II.ItineraryPlace;
            itinerary.ItineraryImage = ImagePath;
            var obj = await _dbcontext!.ItineraryDetails.AddAsync(itinerary);
            await _dbcontext.SaveChangesAsync();
            return await _dbcontext.ItineraryDetails.ToListAsync();
        }
        public async Task<List<ItineraryDetail>> DeleteItineraryDetail(int id)
        {

            var obj = await _dbcontext!.ItineraryDetails.FindAsync(id);
            _dbcontext.ItineraryDetails.Remove(obj!);
            await _dbcontext.SaveChangesAsync();
            return await _dbcontext.ItineraryDetails.ToListAsync();
        }


        [NonAction]
        public async Task<string> SaveItineraryImage(IFormFile imageFile)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "wwwroot/Itinerary", imageName);
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return imageName;
        }
    }
}
