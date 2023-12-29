namespace MakeYourTrip.Exceptioncustom
{
    public class CustomException
    {
       
            public static Dictionary<string, string> ExceptionMessages { get; } =
            new Dictionary<string, string>
            {
                { "Key1", "No data found" },
                { "Key2", "error while fetching" },
                { "Key3", "Server Error" },
                { "Key4", "Image Field Cannot be Null" }
            };
        
    }
}
