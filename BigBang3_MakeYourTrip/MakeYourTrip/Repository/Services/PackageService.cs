using MakeYourTrip.Models;
using MakeYourTrip.Repository.Interface;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MakeYourTrip.Repository.Services
{
    public class PackageService : IPackage
    {
        private readonly MakeYourTripContext? _dbcontext;
        public PackageService(MakeYourTripContext dbcontext)
        {
            _dbcontext = dbcontext;
        }
        public async Task<List<Package>> GetPackages()
        {
            return await _dbcontext!.Packages.ToListAsync();

        }
        public async Task<Package> GetPackage(int id)
        {
            var obj = await _dbcontext!.Packages.FindAsync(id);
            return obj;
        
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
        public async Task<List<Package>> PostPackage(Package package)
        {
            var obj = await _dbcontext.Packages.AddAsync(package);
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
    }
}
