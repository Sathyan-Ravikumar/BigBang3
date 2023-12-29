using MakeYourTrip.Models;
using MakeYourTrip.Repository.Buffer;
using MakeYourTrip.Repository.Interface;
using Microsoft.AspNetCore.Mvc;

namespace MakeYourTrip.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LogicController : Controller
    {

        private readonly Ilogics _context;

        public LogicController(Ilogics context)
        {
            _context = context;
        }
        [HttpGet("Hotelbyid")]
        public async Task<ActionResult<List<Repository.Buffer.PackageHotelBuffer>>> GetHotels(int packid)
        {
            try
            {
                return Ok(await _context.GetHotels(packid));
            }
            catch (ArithmeticException ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("ItineraryByPackId")]
        public async Task<ActionResult<List<ItineraryBuffer>>> GetItinerary(int packid)
        {
            try
            {
                return Ok(await _context.GetItinerary(packid));
            }
            catch (ArithmeticException ex)
            {
                return NotFound(ex.Message);
            }
        }
        [HttpGet("PackageByUserId")]
        public async Task<ActionResult<List<Package>>> GetPackagebyUserId(int userid)
        {
            try
            {
                return Ok(await _context.GetPackagesByUserId(userid));
            }
            catch (ArithmeticException ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}
