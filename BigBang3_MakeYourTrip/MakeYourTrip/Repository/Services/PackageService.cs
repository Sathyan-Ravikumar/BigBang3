using MakeYourTrip.Models;
using MakeYourTrip.NewFolder;
using MakeYourTrip.Repository.Interface;
using MakeYourTrip.Temp;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MakeYourTrip.Repository.Services
{
    public class PackageService : IPackage
    {
        private readonly MakeYourTripContext? _dbcontext;
        private readonly IWebHostEnvironment _hostEnvironment;

        public PackageService(MakeYourTripContext dbcontext, IWebHostEnvironment hostEnvironment)
        {
            _dbcontext = dbcontext;
            _hostEnvironment = hostEnvironment;
        }
        public async Task<List<Package>> GetPackages()
        {
            var images = _dbcontext.Packages.ToList();
            var imageList = new List<Package>();
            foreach (var image in images)
            {
                var uploadsFolder = Path.Combine(_hostEnvironment.WebRootPath, "package");
                var filePath = Path.Combine(uploadsFolder, image.PlaceImage);

                var imageBytes = System.IO.File.ReadAllBytes(filePath);
                var tourData = new Package
                {
                    PackageId = image.PackageId,
                    UserId=image.UserId,
                    Place=image.Place,
                    Duration=image.Duration,
                    PackagePrice=image.PackagePrice,
                    Description=image.Description,
                    PlaceImage = Convert.ToBase64String(imageBytes)
                };
                imageList.Add(tourData);
            }
            return imageList;

        }
        public async Task<Package> GetPackage(int id)
        {
            var images = _dbcontext.Packages.ToList();
            Package byid = images.SingleOrDefault(p=> p.PackageId==id);
          
                var uploadsFolder = Path.Combine(_hostEnvironment.WebRootPath, "Package");
                var filePath = Path.Combine(uploadsFolder, byid.PlaceImage);

                var imageBytes = System.IO.File.ReadAllBytes(filePath);
                var tourData = new Package
                {
                    PackageId = byid.PackageId,
                    UserId=byid.UserId,
                    Place=byid.Place,
                    Duration=byid.Duration,
                    PackagePrice=byid.PackagePrice,
                    Description=byid.Description,
                    PlaceImage = Convert.ToBase64String(imageBytes)
                };
            return  tourData;
        
        }
        public async Task<List<Package>> PutPackage(int id, Package package)
        {
            var obj = await _dbcontext!.Packages.FindAsync(id);
            obj.Duration = package.Duration;
            obj.PackagePrice = package.PackagePrice;
            obj.Description = package.Description;
            obj.PlaceImage = package.PlaceImage;

            await _dbcontext.SaveChangesAsync();
            return await _dbcontext.Packages.ToListAsync();

        }
        public async Task<List<Package>> PostPackage([FromForm] PackageImage pi)
        {
            string ImagePath = await SavepackageImage(pi.PackImg);
            var pack = new Package();
            pack.UserId = pi.UserId;
            pack.Place = pi.Place;
            pack.Duration = pi.Duration;
            pack.PackagePrice = pi.PackagePrice;
            pack.Description = pi.Description;
            pack.PlaceImage = ImagePath;
            var obj = await _dbcontext.Packages.AddAsync(pack);
            await _dbcontext.SaveChangesAsync();
            return await _dbcontext.Packages.ToListAsync();
        }


        public async Task<List<Package>> DeletePackage(int id)
        {

            var obj = await _dbcontext.Packages.FindAsync(id);
            _dbcontext.Packages.Remove(obj);
            await _dbcontext.SaveChangesAsync();
            return await _dbcontext.Packages.ToListAsync();
        }

        [NonAction]
        public async Task<string> SavepackageImage(IFormFile imageFile)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "wwwroot/Package", imageName);
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return imageName;
        }
    }
}
