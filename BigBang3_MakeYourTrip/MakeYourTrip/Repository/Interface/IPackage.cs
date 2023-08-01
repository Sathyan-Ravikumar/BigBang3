using MakeYourTrip.Models;
using Microsoft.AspNetCore.Mvc;

namespace MakeYourTrip.Repository.Interface
{
    public interface IPackage
    {
        public Task<List<Package>> GetPackages();
        public  Task<Package> GetPackage(int id);
        public Task<List<Package>> PutPackage(int id, Package package);
        public Task<List<Package>> PostPackage(Package package);
        public  Task<List<Package>> DeletePackage(int id);


    }
}
