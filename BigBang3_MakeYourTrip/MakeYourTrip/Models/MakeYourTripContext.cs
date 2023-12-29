using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace MakeYourTrip.Models;

public partial class MakeYourTripContext : DbContext
{
    public MakeYourTripContext()
    {
    }

    public MakeYourTripContext(DbContextOptions<MakeYourTripContext> options)
        : base(options)
    {
    }

    public virtual DbSet<AdminImageUpload> AdminImageUploads { get; set; }

    public virtual DbSet<Feedback> Feedbacks { get; set; }

    public virtual DbSet<Hotel> Hotels { get; set; }

    public virtual DbSet<ItineraryDetail> ItineraryDetails { get; set; }

    public virtual DbSet<Package> Packages { get; set; }

    public virtual DbSet<TripBooking> TripBookings { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("data source=.\\SQLEXPRESS;Database=MakeYourTrip;integrated security=SSPI;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<AdminImageUpload>(entity =>
        {
            entity.HasKey(e => e.ImageId).HasName("PK__AdminIma__7516F70C0D4E32B1");

            entity.ToTable("AdminImageUpload");

            entity.HasOne(d => d.User).WithMany(p => p.AdminImageUploads)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__AdminImag__UserI__4E88ABD4");
        });

        modelBuilder.Entity<Feedback>(entity =>
        {
            entity.HasKey(e => e.FeedbackId).HasName("PK__Feedback__6A4BEDD69702CDC7");

            entity.ToTable("Feedback");

            entity.Property(e => e.EntryDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("date");
            entity.Property(e => e.Name).HasMaxLength(50);
            entity.Property(e => e.Rating).HasColumnType("decimal(3, 1)");

            entity.HasOne(d => d.User).WithMany(p => p.Feedbacks)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__Feedback__UserId__52593CB8");
        });

        modelBuilder.Entity<Hotel>(entity =>
        {
            entity.HasKey(e => e.HotelId).HasName("PK__Hotels__46023BDF97DB1676");

            entity.Property(e => e.HotelPrice).HasColumnType("money");
            entity.Property(e => e.HotelRating).HasColumnType("decimal(3, 1)");

            entity.HasOne(d => d.Package).WithMany(p => p.Hotels)
                .HasForeignKey(d => d.PackageId)
                .HasConstraintName("FK__Hotels__PackageI__628FA481");
        });

        modelBuilder.Entity<ItineraryDetail>(entity =>
        {
            entity.HasKey(e => e.ItineraryId).HasName("PK__Itinerar__361216C6217B8B75");

            entity.Property(e => e.DayNumber)
                .HasMaxLength(20)
                .HasColumnName("Day_Number");
            entity.Property(e => e.Time).HasMaxLength(50);

            entity.HasOne(d => d.Package).WithMany(p => p.ItineraryDetails)
                .HasForeignKey(d => d.PackageId)
                .HasConstraintName("FK__Itinerary__Packa__5FB337D6");
        });

        modelBuilder.Entity<Package>(entity =>
        {
            entity.HasKey(e => e.PackageId).HasName("PK__Package__322035CC9B8B2AB7");

            entity.ToTable("Package");

            entity.Property(e => e.PackagePrice).HasColumnType("money");
            entity.Property(e => e.Place).HasMaxLength(50);

            entity.HasOne(d => d.User).WithMany(p => p.Packages)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__Package__UserId__5629CD9C");
        });

        modelBuilder.Entity<TripBooking>(entity =>
        {
            entity.HasKey(e => e.BookingTripId).HasName("PK__TripBook__5AF3DBC9800F23EB");

            entity.ToTable("TripBooking");

            entity.Property(e => e.DateOfBooking)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.DateOfTheTrip).HasColumnType("date");
            entity.Property(e => e.TotalAmount).HasColumnType("money");

            entity.HasOne(d => d.Hotel).WithMany(p => p.TripBookings)
                .HasForeignKey(d => d.HotelId)
                .HasConstraintName("FK__TripBooki__Hotel__71D1E811");

            entity.HasOne(d => d.Package).WithMany(p => p.TripBookings)
                .HasForeignKey(d => d.PackageId)
                .HasConstraintName("FK__TripBooki__Packa__70DDC3D8");

            entity.HasOne(d => d.User).WithMany(p => p.TripBookings)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__TripBooki__UserI__6FE99F9F");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__User__1788CC4C75A917AC");

            entity.ToTable("User");

            entity.Property(e => e.Email).HasMaxLength(40);
            entity.Property(e => e.Gender).HasMaxLength(10);
            entity.Property(e => e.Name).HasMaxLength(100);
            entity.Property(e => e.Password).HasColumnName("password");
            entity.Property(e => e.Role).HasMaxLength(30);
            entity.Property(e => e.StatusForAgents).HasMaxLength(30);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
