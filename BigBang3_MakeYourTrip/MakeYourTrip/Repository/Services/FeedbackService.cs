using MakeYourTrip.Models;
using MakeYourTrip.Repository.Interface;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MakeYourTrip.Repository.Services
{
    public class FeedbackService : IFeedback
    {
        private readonly MakeYourTripContext? _dbcontext;
        public FeedbackService(MakeYourTripContext dbcontext)
        {
            _dbcontext = dbcontext;
        }
        public async Task<List<Feedback>> GetFeedbacks()
        {
            return await _dbcontext!.Feedbacks.ToListAsync();
        }
        public async Task<List<Feedback>> PostFeedback(Feedback feedback)
        {
            var obj = await _dbcontext.Feedbacks.AddAsync(feedback);
            await _dbcontext.SaveChangesAsync();
            return await _dbcontext.Feedbacks.ToListAsync();
        }
    }
}
