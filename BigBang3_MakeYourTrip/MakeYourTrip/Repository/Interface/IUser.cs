using MakeYourTrip.Models;

namespace MakeYourTrip.Repository.Interface
{
    public interface IUser
    {
        Task<User> AddUser(User user);
        Task<IEnumerable<User>> GetAllUsers();
        Task<User> GetUserByEmail(string email);
        Task<User> GetUserById(int userId);
        Task<IEnumerable<User>> GetPendingUsers();
        Task DeleteUser(User user);

        Task UpdateUser(User user);
    }
}
