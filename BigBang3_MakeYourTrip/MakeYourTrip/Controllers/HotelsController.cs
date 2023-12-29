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
    public class HotelsController : ControllerBase
    {
        private readonly IHotel _context;

        public HotelsController(IHotel context)
        {
            _context = context;
        }

        // GET: api/Hotels
        [HttpGet]
        public async Task<ActionResult<List<Hotel>>> GetHotels()
        {
            var images = await _context.GetHotels();
            if (images == null)
            {
                return NotFound();
            }
            return new JsonResult(images);
        }

        // GET: api/Hotels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Hotel>> GetHotel(int id)
        {
            var image = await _context.GetHotel(id);
            if (image == null)
            {
                return NotFound();
            }
            return new JsonResult(image);
        }

        // PUT: api/Hotels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<ActionResult<List<Hotel>>> PutHotel(int id, Hotel hotel)
        {
            return await _context.PutHotel(id, hotel);

        }

        // POST: api/Hotels
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<List<Hotel>>> PostHotel([FromForm] HotelImg hotel)
        {
            try
            {
                return await _context.PostHotel(hotel);

            }
            catch (Exception ex)
            {
                if (hotel.HotelImage == null)
                {
                    return BadRequest(new { error = "Image Field is null" });
                }
                return StatusCode(StatusCodes.Status500InternalServerError, new { error = "An unknown server error occurred.",ex });

            }
        }

        // DELETE: api/Hotels/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Hotel>>> DeleteHotel(int id)
        {
            return await _context.DeleteHotel(id);

        }
    }
}
