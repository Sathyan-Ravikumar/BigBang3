using System;
using System.Collections.Generic;

namespace MakeYourTrip.Models;

public partial class AdminImageUpload
{
    public int ImageId { get; set; }

    public int? UserId { get; set; }

    public string? ImagePath { get; set; }

    public string? ImageDetail { get; set; }

    public virtual User? User { get; set; }
}
