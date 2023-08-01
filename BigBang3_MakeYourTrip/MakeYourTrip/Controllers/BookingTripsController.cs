using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MakeYourTrip.Models;

namespace MakeYourTrip.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingTripsController : ControllerBase
    {
        private readonly MakeYourTripContext _context;

        public BookingTripsController(MakeYourTripContext context)
        {
            _context = context;
        }

        // GET: api/BookingTrips
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookingTrip>>> GetBookingTrips()
        {
          if (_context.BookingTrips == null)
          {
              return NotFound();
          }
            return await _context.BookingTrips.ToListAsync();
        }

        // GET: api/BookingTrips/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BookingTrip>> GetBookingTrip(int id)
        {
          if (_context.BookingTrips == null)
          {
              return NotFound();
          }
            var bookingTrip = await _context.BookingTrips.FindAsync(id);

            if (bookingTrip == null)
            {
                return NotFound();
            }

            return bookingTrip;
        }

        // PUT: api/BookingTrips/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBookingTrip(int id, BookingTrip bookingTrip)
        {
            if (id != bookingTrip.BookingTripId)
            {
                return BadRequest();
            }

            _context.Entry(bookingTrip).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookingTripExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/BookingTrips
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<BookingTrip>> PostBookingTrip(BookingTrip bookingTrip)
        {
          if (_context.BookingTrips == null)
          {
              return Problem("Entity set 'MakeYourTripContext.BookingTrips'  is null.");
          }
            _context.BookingTrips.Add(bookingTrip);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBookingTrip", new { id = bookingTrip.BookingTripId }, bookingTrip);
        }

        // DELETE: api/BookingTrips/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBookingTrip(int id)
        {
            if (_context.BookingTrips == null)
            {
                return NotFound();
            }
            var bookingTrip = await _context.BookingTrips.FindAsync(id);
            if (bookingTrip == null)
            {
                return NotFound();
            }

            _context.BookingTrips.Remove(bookingTrip);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BookingTripExists(int id)
        {
            return (_context.BookingTrips?.Any(e => e.BookingTripId == id)).GetValueOrDefault();
        }
    }
}
