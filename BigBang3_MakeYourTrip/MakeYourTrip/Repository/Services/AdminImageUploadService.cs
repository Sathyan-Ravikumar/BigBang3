using MakeYourTrip.Models;
using MakeYourTrip.NewFolder;
using MakeYourTrip.Repository.Interface;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace MakeYourTrip.Repository.Services
{
    public class AdminImageUploadService : IAdminImageUpload
    {

        private readonly MakeYourTripContext? _dbcontext;
        public AdminImageUploadService(MakeYourTripContext dbcontext)
        {
            _dbcontext = dbcontext;
        }
        public async Task<AdminImageUpload> PostAdminImageUpload([FromForm] FileModel file, AdminImageUpload Adi)
        {
            
                string path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/AdminImage", file.FileName);
                using (Stream stream = new FileStream(path, FileMode.Create))
                {
                    file.FormFile.CopyTo(stream);
                }

                AdminImageUpload imgtbl = new AdminImageUpload();
                imgtbl.ImagePath = "~/AdminImage/" + file.FileName;
                 
                _dbcontext.AdminImageUploads.Add(imgtbl);
                await _dbcontext.SaveChangesAsync();
                return imgtbl;
           
        }
    }

 }

