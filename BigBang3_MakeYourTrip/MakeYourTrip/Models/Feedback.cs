﻿using System;
using System.Collections.Generic;

namespace MakeYourTrip.Models;

public partial class Feedback
{
    public int FeedbackId { get; set; }

    public int? UserId { get; set; }

    public string? FeedbackMessage { get; set; }

    public decimal? Rating { get; set; }

    public virtual User? User { get; set; }
}
