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
    public class FeedbacksController : ControllerBase
    {
        private readonly IFeedback _context;

        public FeedbacksController(IFeedback context)
        {
            _context = context;
        }

        // GET: api/Feedbacks
        [HttpGet]
        public async Task<ActionResult<List<Feedback>>> GetFeedbacks()
        {
            try
            {
                return await _context.GetFeedbacks();

            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        
        // POST: api/Feedbacks
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<List<Feedback>>> PostFeedback(Feedback feedback)
        {
            try
            {
                return await _context.PostFeedback(feedback);
            }
            catch
            {
                if (feedback.FeedbackMessage==null)
                {
                    return BadRequest(new { error = "Message is null" });
                }
                return StatusCode(StatusCodes.Status500InternalServerError, new { error = "An unknown server error occurred." });
            }

        }


    }
}
