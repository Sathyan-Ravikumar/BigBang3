using System;
using System.Collections.Generic;

namespace MakeYourTrip.Models;

public partial class Feedback
{
    public int Feedbackid { get; set; }

    public int? UserId { get; set; }

    public string? FeedbackMessage { get; set; }

    public int? Rating { get; set; }

    public virtual User? User { get; set; }
}
