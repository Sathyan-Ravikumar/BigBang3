using MakeYourTrip.Models;
using MakeYourTrip.NewFolder;
using Microsoft.AspNetCore.Mvc;

namespace MakeYourTrip.Repository.Interface
{
    public interface IAdminImageUpload
    {
        //public Task<string> PostAdminImageUpload(IFormFile files);
        public Task<List<AdminImageUpload>> Postall([FromForm] FileModel aiu);

        public Task<List<AdminImageUpload>> Getall();
        public Task<AdminImageUpload> Getadminid(int id);


    }
}
