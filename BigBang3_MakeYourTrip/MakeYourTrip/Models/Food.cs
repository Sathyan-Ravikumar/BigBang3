using System;
using System.Collections.Generic;

namespace MakeYourTrip.Models;

public partial class Food
{
    public int FoodId { get; set; }

    public int? PackageId { get; set; }

    public string? FoodType { get; set; }

    public decimal? FoodPrice { get; set; }

    public virtual Package? Package { get; set; }
}
