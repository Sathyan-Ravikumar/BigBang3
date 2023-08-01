using System;
using System.Collections.Generic;

namespace MakeYourTrip.Models;

public partial class ItineraryDetail
{
    public int ItineraryId { get; set; }

    public int? PackageId { get; set; }

    public string? DayNumber { get; set; }

    public string? Activities { get; set; }

    public string? Time { get; set; }

    public string? ItineraryPlace { get; set; }

    public string? ItineraryImage { get; set; }

    public virtual Package? Package { get; set; }
}
