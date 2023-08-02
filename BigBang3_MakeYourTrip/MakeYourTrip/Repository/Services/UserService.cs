using MakeYourTrip.Models;
using MakeYourTrip.Repository.Interface;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace MakeYourTrip.Repository.Services
{
    public class UserService : IUser
    {

            private readonly MakeYourTripContext _context;

            public UserService(MakeYourTripContext context)
            {
                _context = context;
            }

            public async Task<User> AddUser(User user)
            {
                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                return user;
            }

            public async Task<IEnumerable<User>> GetAllUsers()
            {
                var users = await _context.Users.ToListAsync();
                return users;
            }

            public async Task<User> GetUserById(int userId)
            {
                return await _context.Users.FirstOrDefaultAsync(u => u.UserId == userId);
            }

            public async Task UpdateUser(User user)
            {
                _context.Users.Update(user);
                await _context.SaveChangesAsync();
            }

            public async Task DeleteUser(User user)
            {
                _context.Users.Remove(user);
                await _context.SaveChangesAsync();
            }

            public async Task<User> GetUserByEmail(string email)
            {
                return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            }

            public async Task<IEnumerable<User>> GetPendingUsers()
            {
                var pendingUsers = await _context.Users.Where(u => u.StatusForAgents == "InActive").ToListAsync();
                return pendingUsers;
            }

            private string Encrypt(string password)
            {
                // Example key and IV generation using hashing
                string passphrase = "your-passphrase";

                using (SHA256 sha256 = SHA256.Create())
                {
                    byte[] key = sha256.ComputeHash(Encoding.UTF8.GetBytes(passphrase));
                    byte[] iv = sha256.ComputeHash(Encoding.UTF8.GetBytes(passphrase)).Take(16).ToArray();

                    using (Aes aes = Aes.Create())
                    {
                        aes.Key = key;
                        aes.IV = iv;

                        ICryptoTransform encryptor = aes.CreateEncryptor(aes.Key, aes.IV);

                        using (MemoryStream memoryStream = new MemoryStream())
                        {
                            using (CryptoStream cryptoStream = new CryptoStream(memoryStream, encryptor, CryptoStreamMode.Write))
                            {
                                using (StreamWriter writer = new StreamWriter(cryptoStream))
                                {
                                    writer.Write(password);
                                }
                            }

                            byte[] encryptedData = memoryStream.ToArray();
                            return Convert.ToBase64String(encryptedData);
                        }
                    }
                }
            }

            private string Decrypt(string encryptedPassword)
            {
                // Example key and IV generation using hashing
                string passphrase = "your-passphrase";

                using (SHA256 sha256 = SHA256.Create())
                {
                    byte[] key = sha256.ComputeHash(Encoding.UTF8.GetBytes(passphrase));
                    byte[] iv = sha256.ComputeHash(Encoding.UTF8.GetBytes(passphrase)).Take(16).ToArray();

                    using (Aes aes = Aes.Create())
                    {
                        aes.Key = key;
                        aes.IV = iv;

                        ICryptoTransform decryptor = aes.CreateDecryptor(aes.Key, aes.IV);

                        byte[] encryptedData = Convert.FromBase64String(encryptedPassword);

                        using (MemoryStream memoryStream = new MemoryStream(encryptedData))
                        {
                            using (CryptoStream cryptoStream = new CryptoStream(memoryStream, decryptor, CryptoStreamMode.Read))
                            {
                                using (StreamReader reader = new StreamReader(cryptoStream))
                                {
                                    return reader.ReadToEnd();
                                }
                            }
                        }
                    }
                }
            }
        }
    
}
