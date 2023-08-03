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
    public class ItineraryDetailsController : ControllerBase
    {
        private readonly IItinerary _context;

        public ItineraryDetailsController(IItinerary context)
        {
            _context = context;
        }

        // GET: api/ItineraryDetails
        [HttpGet]
        public async Task<ActionResult<List<ItineraryDetail>>> GetItineraryDetails()
        {
            var images = await _context.GetItineraryDetails();
            if (images == null)
            {
                return NotFound();
            }
            return new JsonResult(images);
        }

        // GET: api/ItineraryDetails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ItineraryDetail>> GetItineraryDetail(int id)
        {
            var images = await _context.GetItineraryDetail(id);
            if (images == null)
            {
                return NotFound();
            }
            return new JsonResult(images);
        }

        // PUT: api/ItineraryDetails/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<ActionResult<List<ItineraryDetail>>> PutItineraryDetail(int id, ItineraryDetail itineraryDetail)
        {
            return await _context.PutItineraryDetail(id, itineraryDetail);
        }

        // POST: api/ItineraryDetails
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<List<ItineraryDetail>>> PostItineraryDetail([FromForm] ItineraryImage II)
        {
            return await _context.PostItineraryDetail(II);
        }

        // DELETE: api/ItineraryDetails/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<List<ItineraryDetail>>> DeleteItineraryDetail(int id)
        {
            return await _context.DeleteItineraryDetail(id);
        }
    }
}
