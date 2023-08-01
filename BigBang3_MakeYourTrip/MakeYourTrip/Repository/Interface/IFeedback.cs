using MakeYourTrip.Models;

namespace MakeYourTrip.Repository.Interface
{
    public interface IFeedback
    {
        public Task<List<Feedback>> GetFeedbacks();
        public Task<List<Feedback>> PostFeedback(Feedback feedback);

    }
}
