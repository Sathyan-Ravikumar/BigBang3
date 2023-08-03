using MakeYourTrip.Models;
using MakeYourTrip.Temp;
using Microsoft.AspNetCore.Mvc;

namespace MakeYourTrip.Repository.Interface
{
    public interface IPackage
    {
        public Task<List<Package>> GetPackages();
        public  Task<Package> GetPackage(int id);
        public Task<List<Package>> PutPackage(int id, Package package);
        public Task<List<Package>> PostPackage([FromForm] PackageImage pi);
        public  Task<List<Package>> DeletePackage(int id);


    }
}
