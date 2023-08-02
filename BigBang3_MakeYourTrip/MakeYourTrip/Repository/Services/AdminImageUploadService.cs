using MakeYourTrip.Models;
using MakeYourTrip.NewFolder;
using MakeYourTrip.Repository.Interface;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MakeYourTrip.Repository.Services
{
    public class AdminImageUploadService : IAdminImageUpload
    {

        private readonly MakeYourTripContext? _dbcontext;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public AdminImageUploadService(MakeYourTripContext dbcontext, IWebHostEnvironment webHostEnvironment)
        {
            _dbcontext = dbcontext;
            _webHostEnvironment = webHostEnvironment;
        }
        
        public async Task<string> PostAdminImageUpload(IFormFile file)
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
        }
        public async Task<List<AdminImageUpload>> Postall(AdminImageUpload aiu)
        {

            var obj = await _dbcontext.AdminImageUploads.AddAsync(aiu);
            await _dbcontext.SaveChangesAsync();
            return await _dbcontext.AdminImageUploads.ToListAsync();
        }

    }

}

