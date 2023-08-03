using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MakeYourTrip.Models;
using MakeYourTrip.Repository.Interface;
using MakeYourTrip.Temp;

namespace MakeYourTrip.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PackagesController : ControllerBase
    {
        private readonly IPackage _context;

        public PackagesController(IPackage context)
        {
            _context = context;
        }

        // GET: api/Packages
        [HttpGet]
        public async Task<ActionResult<List<Package>>> GetPackages()
        {
            var images = await _context.GetPackages();
            if (images == null)
            {
                return NotFound();
            }
            return new JsonResult(images);
        }

        // GET: api/Packages/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Package>> GetPackage(int id)
        {
            var images = await _context.GetPackage(id);
            if (images == null)
            {
                return NotFound();
            }
            return new JsonResult(images);
        }

        // PUT: api/Packages/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<ActionResult<List<Package>>> PutPackage(int id, Package package)
        {
            return await _context.PutPackage(id,package);
        }

        // POST: api/Packages
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<List<Package>>> PostPackage([FromForm] PackageImage pi)
        {
            return await _context.PostPackage(pi);
        }

        // DELETE: api/Packages/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Package>>> DeletePackage(int id)
        {
            return await _context.DeletePackage(id);
        }

        
    }
}
