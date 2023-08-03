using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MakeYourTrip.Models;
using MakeYourTrip.Repository.Interface;
using MakeYourTrip.NewFolder;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Hosting;

namespace MakeYourTrip.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminImageUploadsController : ControllerBase
    {
        private readonly IAdminImageUpload _context;

        public AdminImageUploadsController(IAdminImageUpload context)
        {
            _context = context;
        }
        // POST: api/AdminImageUploads
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        /*[HttpPost]
        public async Task<ActionResult<string>> PostAdminImageUpload( IFormFile files)
        {
            try
            {
                return Ok(await _context.PostAdminImageUpload(files));
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }*/

        [HttpPost("AllAdminColumn")]
        public async Task<ActionResult<List<AdminImageUpload>>> Postall([FromForm] FileModel aiu)
        {
            return await _context.Postall(aiu);
        }

        [HttpGet("GetAllDetailsFromAdminTable")]
        public async Task<ActionResult<List<AdminImageUpload>>> Getall()
        {
            var images = await _context.Getall();
            if (images == null)
            {
                return NotFound();
            }
            return new JsonResult(images);

        }

        [HttpGet("GetById")]
        public async Task<ActionResult<AdminImageUpload>> Getadminid(int id)
        {

            var images = await _context.Getadminid(id);
            if (images == null)
            {
                return NotFound();
            }
            return new JsonResult(images);
        }

    }
}
