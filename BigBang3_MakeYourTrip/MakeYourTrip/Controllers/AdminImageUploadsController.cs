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
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using MakeYourTrip.Exceptioncustom;

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
      

        [HttpPost("AllAdminColumn")]
      
        public async Task<ActionResult<List<AdminImageUpload>>> Postall([FromForm] FileModel aiu)
        {
            try
            {
                return await _context.Postall(aiu);
            }
            catch(Exception ex)
            {
                if (aiu.FormFile == null)
                {
                    return BadRequest(new { error = "Image Field is null" });
                }
                if (CustomException.ExceptionMessages.TryGetValue(ex.GetType().Name, out var errorMessage))
                {
                    return BadRequest(new { error = errorMessage });
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, new { error = "An unknown error occurred." });
                }
            }
            
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
