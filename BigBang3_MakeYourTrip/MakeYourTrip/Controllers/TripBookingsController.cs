using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MakeYourTrip.Models;
using MakeYourTrip.Repository.Interface;

namespace MakeYourTrip.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TripBookingsController : ControllerBase
    {
        private readonly ITripBook _context;

        public TripBookingsController(ITripBook context)
        {
            _context = context;
        }

        // GET: api/TripBookings
        [HttpGet]
        public async Task<ActionResult<List<TripBooking>>> GetTripBookings()
        {
            try
            {
                return Ok(await _context.GetTripBookings());
            }
            catch (ArithmeticException ex)
            {
                return NotFound(ex.Message);
            }
        }

        // GET: api/TripBookings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TripBooking>> GetTripBooking(int id)
        {
            try
            {
                return Ok(await _context.GetTripBooking(id));
            }
            catch (ArithmeticException ex)
            {
                return NotFound(ex.Message);
            }
        }

       

        // POST: api/TripBookings
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TripBooking>> PostTripBooking(TripBooking tripBooking)
        {
            return await _context.PostTripBooking(tripBooking);
            
        }

       
    }
}
