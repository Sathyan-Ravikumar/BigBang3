using System;
using System.Collections.Generic;

namespace MakeYourTrip.Models;

public partial class BookingTrip
{
    public int BookingTripId { get; set; }

    public int? UserId { get; set; }

    public int? PackageId { get; set; }

    public int? NumberOfPeople { get; set; }

    public DateTime? DateOfTheTrip { get; set; }

    public decimal? TotalAmount { get; set; }

    public DateTime? DateOfBooking { get; set; }

    public virtual Package? Package { get; set; }

    public virtual User? User { get; set; }
}
