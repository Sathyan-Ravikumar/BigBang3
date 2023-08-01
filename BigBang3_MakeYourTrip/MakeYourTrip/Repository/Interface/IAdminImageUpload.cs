using MakeYourTrip.Models;
using MakeYourTrip.NewFolder;
using Microsoft.AspNetCore.Mvc;

namespace MakeYourTrip.Repository.Interface
{
    public interface IAdminImageUpload
    {
        public Task<AdminImageUpload> PostAdminImageUpload([FromForm] FileModel file, AdminImageUpload Adi);

    }
}
