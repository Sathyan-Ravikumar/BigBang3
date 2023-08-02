﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MakeYourTrip.Models;
using MakeYourTrip.Repository.Interface;
using MakeYourTrip.NewFolder;

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
        [HttpPost]
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
        }

        [HttpPost("AllAdminColumn")]
        public async Task<ActionResult<List<AdminImageUpload>>> Postall(AdminImageUpload aiu)
        {
            return await _context.Postall(aiu);
        }

        
    }
}
