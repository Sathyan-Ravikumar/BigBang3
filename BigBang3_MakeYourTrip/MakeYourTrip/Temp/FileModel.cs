namespace MakeYourTrip.NewFolder
{
    public class FileModel
    {
        public int ImageId { get; set; }

        public int? UserId { get; set; }
        public string? ImageDetail { get; set; }
        public IFormFile? FormFile { get; set; }
    }
}

