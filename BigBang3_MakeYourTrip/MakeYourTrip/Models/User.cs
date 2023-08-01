using System;
using System.Collections.Generic;

namespace MakeYourTrip.Models;

public partial class User
{
    public int UserId { get; set; }

    public string Name { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string? Role { get; set; }

    public string? Gender { get; set; }

    public string? Address { get; set; }

    public long? ContactNo { get; set; }

    public string? IdProof { get; set; }

    public string? AgencyName { get; set; }

    public string? StatusForAgents { get; set; }

    public virtual ICollection<AdminImageUpload> AdminImageUploads { get; set; } = new List<AdminImageUpload>();

    public virtual ICollection<BookingTrip> BookingTrips { get; set; } = new List<BookingTrip>();

    public virtual ICollection<Feedback> Feedbacks { get; set; } = new List<Feedback>();

    public virtual ICollection<Package> Packages { get; set; } = new List<Package>();
}
