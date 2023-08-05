namespace MakeYourTrip.Exception
{
    public class Exceptions
    {
        public static Dictionary<string, string> ExceptionMessages { get; } =
        new Dictionary<string, string>
        {
            { "Key1", "Account No not Valid" },
            { "Key2", "Low Balance" },
            { "Key3", "Amount should be greater than zero" }
        };
    }
}
