using MakeYourTrip.Models;
using MakeYourTrip.NewFolder;
using MakeYourTrip.Repository.Interface;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;

namespace MakeYourTrip.Repository.Services
{
    public class AdminImageUploadService : IAdminImageUpload
    {

        private readonly MakeYourTripContext? _dbcontext;
        private readonly IWebHostEnvironment _hostEnvironment;

        public AdminImageUploadService(MakeYourTripContext dbcontext, IWebHostEnvironment hostEnvironment)
        {
            _dbcontext = dbcontext;
            _hostEnvironment = hostEnvironment;
        }
        
        /*public async Task<string> PostAdminImageUpload(IFormFile file)
        {
            string originalFileName = Path.GetFileNameWithoutExtension(file.FileName);
            string uniqueFileName = $"{originalFileName}_{DateTime.Now.ToString("yyyyMMddHHmmss")}{Path.GetExtension(file.FileName)}";
            string path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/AdminImage", uniqueFileName);

            using (Stream stream = new FileStream(path, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            string imagePath = "~/AdminImage/" + uniqueFileName;
            return imagePath;
        }*/
        public async Task<List<AdminImageUpload>> Postall([FromForm] FileModel aiu)
        {
            string ImagePath = await SaveImage(aiu.FormFile);
            var newAdminImageUpload = new AdminImageUpload();
            newAdminImageUpload.UserId = aiu.UserId;
            newAdminImageUpload.ImagePath = ImagePath;
            newAdminImageUpload.ImageDetail = aiu.ImageDetail;
            var obj = await _dbcontext.AdminImageUploads.AddAsync(newAdminImageUpload);
            await _dbcontext.SaveChangesAsync();
            return await _dbcontext.AdminImageUploads.ToListAsync();
        }
        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "wwwroot/AdminImage", imageName);
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return imageName;
        }

        public async Task<List<AdminImageUpload>> Getall()
        {
            var images = _dbcontext.AdminImageUploads.ToList();
            var imageList = new List<AdminImageUpload>();
            foreach (var image in images)
            {
                var uploadsFolder = Path.Combine(_hostEnvironment.WebRootPath, "AdminImage");
                var filePath = Path.Combine(uploadsFolder, image.ImagePath);

                var imageBytes = System.IO.File.ReadAllBytes(filePath);
                var tourData = new AdminImageUpload
                {
                    ImageId = image.ImageId,
                    UserId = image.UserId,
                    ImageDetail = image.ImageDetail,
                    ImagePath = Convert.ToBase64String(imageBytes)
                };
                imageList.Add(tourData);
            }
            return imageList;
        }

        public async Task<AdminImageUpload> Getadminid(int id)
        {
            var images = _dbcontext.AdminImageUploads.ToList();
            AdminImageUpload byid = images.SingleOrDefault(p => p.ImageId == id);
            
            var uploadsFolder = Path.Combine(_hostEnvironment.WebRootPath, "AdminImage");
            var filePath = Path.Combine(uploadsFolder, byid.ImagePath);

            var imageBytes = System.IO.File.ReadAllBytes(filePath);
            var tourData = new AdminImageUpload
            {
                ImageId = byid.ImageId,
                UserId = byid.UserId,
                ImageDetail = byid.ImageDetail,
                ImagePath = Convert.ToBase64String(imageBytes)
            };
            
            return tourData;

        }

    }

}

