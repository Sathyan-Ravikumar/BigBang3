using MakeYourTrip.Models;
using MakeYourTrip.Repository.Interface;
using MakeYourTrip.Temp;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using System.Security.Cryptography;
using System.Text;

namespace MakeYourTrip.Repository.Services
{
    public class UserService : IUser
    {

            private readonly MakeYourTripContext _context;
        private readonly IWebHostEnvironment _hostEnvironment;


        public UserService(MakeYourTripContext context, IWebHostEnvironment hostEnvironment)
            {
                _context = context;
               _hostEnvironment = hostEnvironment;
            }

            public async Task<User> AddUser([FromForm] UserIdProof uip)
            {
                string ImagePath = await SaveIdProof(uip.IdProofImg);
                var obj = new User();
                obj.Name = uip.Name;
                obj.Email = uip.Email;
                obj.Password = obj.Password;
                obj.Role = uip.Role;
                obj.Gender = uip.Gender;
                obj.Address=uip.Address;
                obj.ContactNo = uip.ContactNo;
                obj.IdProof = ImagePath;
                obj.AgencyName = uip.AgencyName;
                obj.StatusForAgents = uip.StatusForAgents;
                _context.Users.Add(obj);
                await _context.SaveChangesAsync();
                return obj;
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
            var imageList = new List<User>();
            foreach (var image in pendingUsers)
            {
                var uploadsFolder = Path.Combine(_hostEnvironment.WebRootPath, "Idproof");
                var filePath = Path.Combine(uploadsFolder, image.IdProof);

                var imageBytes = System.IO.File.ReadAllBytes(filePath);
                var tourData = new User
                {
                    UserId =image.UserId,
                    Name = image.Name,
                    Email = image.Email,
                    Password = image.Password,
                    Role = image.Role,
                    Gender = image.Gender,
                    Address = image.Address,
                    ContactNo = image.ContactNo,
                    IdProof = Convert.ToBase64String(imageBytes),
                    AgencyName = image.AgencyName,
                    StatusForAgents = image.StatusForAgents
                
                };
                imageList.Add(tourData);
            }
            return imageList;
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
        [NonAction]
        public async Task<string> SaveIdProof(IFormFile imageFile)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "wwwroot/IdProof", imageName);
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return imageName;
        }
    }
    
}
