using System;
using System.Collections.Generic;

namespace MakeYourTrip.Models;

public partial class Package
{
    public int PackageId { get; set; }

    public int? UserId { get; set; }

    public string? Place { get; set; }

    public int Duration { get; set; }

    public decimal? PackagePrice { get; set; }

    public string? Description { get; set; }

    public string? PlaceImage { get; set; }

    public virtual ICollection<Hotel> Hotels { get; set; } = new List<Hotel>();

    public virtual ICollection<ItineraryDetail> ItineraryDetails { get; set; } = new List<ItineraryDetail>();

    public virtual ICollection<TripBooking> TripBookings { get; set; } = new List<TripBooking>();

    public virtual User? User { get; set; }
}
