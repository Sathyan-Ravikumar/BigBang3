using System;
using System.Collections.Generic;

namespace MakeYourTrip.Models;

public partial class BookingTrip
{
    public int BookingTripid { get; set; }

    public int? UserId { get; set; }

    public int? NumberOfPeople { get; set; }

    public DateTime? DateOfTheTrip { get; set; }

    public decimal? TotalAmount { get; set; }

    public DateTime? DateofBooking { get; set; }

    public virtual User? User { get; set; }
}
