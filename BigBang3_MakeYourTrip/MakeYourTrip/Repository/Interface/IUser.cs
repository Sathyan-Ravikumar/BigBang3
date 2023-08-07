using MakeYourTrip.Models;
using MakeYourTrip.Temp;
using Microsoft.AspNetCore.Mvc;

namespace MakeYourTrip.Repository.Interface
{
    public interface IUser
    {
        Task<User> AddUseronly(User user);
        Task<User> AddUser([FromForm] UserIdProof uip);
        Task<IEnumerable<User>> GetAllUsers();
        Task<User> GetUserByEmail(string email);
        Task<User> GetUserName(string name);
        Task<User> GetUserById(int userId);
        Task<IEnumerable<User>> GetPendingUsers();
        Task DeleteUser(User user);

        Task UpdateUser(User user);
    }
}
