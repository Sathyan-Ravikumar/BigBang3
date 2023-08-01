using System;
using System.Collections.Generic;

namespace MakeYourTrip.Models;

public partial class Package
{
    public int PackageId { get; set; }

    public int? UserId { get; set; }

    public string? Place { get; set; }

    public string? Duration { get; set; }

    public decimal? PackagePrice { get; set; }

    public string? Description { get; set; }

    public string? PlaceImage { get; set; }

    public virtual ICollection<Food> Foods { get; set; } = new List<Food>();

    public virtual ICollection<Hotel> Hotels { get; set; } = new List<Hotel>();

    public virtual ICollection<ItineraryDetail> ItineraryDetails { get; set; } = new List<ItineraryDetail>();

    public virtual User? User { get; set; }
}
