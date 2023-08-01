using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace MakeYourTrip.Models;

public partial class MackYourTripNewContext : DbContext
{
    public MackYourTripNewContext()
    {
    }

    public MackYourTripNewContext(DbContextOptions<MackYourTripNewContext> options)
        : base(options)
    {
    }

    public virtual DbSet<AdminImageUpload> AdminImageUploads { get; set; }

    public virtual DbSet<BookingTrip> BookingTrips { get; set; }

    public virtual DbSet<Feedback> Feedbacks { get; set; }

    public virtual DbSet<Food> Foods { get; set; }

    public virtual DbSet<Hotel> Hotels { get; set; }

    public virtual DbSet<ItineraryDetail> ItineraryDetails { get; set; }

    public virtual DbSet<Package> Packages { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("data source = .\\SQLEXPRESS; initial catalog = MackYourTripNew; integrated security=SSPI;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<AdminImageUpload>(entity =>
        {
            entity.HasKey(e => e.ImageId).HasName("PK__AdminIma__7516F70CB6B1391E");

            entity.ToTable("AdminImageUpload");

            entity.HasOne(d => d.User).WithMany(p => p.AdminImageUploads)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__AdminImag__UserI__4BAC3F29");
        });

        modelBuilder.Entity<BookingTrip>(entity =>
        {
            entity.HasKey(e => e.BookingTripid).HasName("PK__BookingT__5AF2DFD1B3336F86");

            entity.ToTable("BookingTrip");

            entity.Property(e => e.DateOfTheTrip).HasColumnType("date");
            entity.Property(e => e.DateofBooking)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.TotalAmount).HasColumnType("money");

            entity.HasOne(d => d.User).WithMany(p => p.BookingTrips)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__BookingTr__UserI__5165187F");
        });

        modelBuilder.Entity<Feedback>(entity =>
        {
            entity.HasKey(e => e.Feedbackid).HasName("PK__Feedback__6A4AE1FE8ED0D31A");

            entity.ToTable("Feedback");

            entity.HasOne(d => d.User).WithMany(p => p.Feedbacks)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__Feedback__UserId__4E88ABD4");
        });

        modelBuilder.Entity<Food>(entity =>
        {
            entity.HasKey(e => e.FoodId).HasName("PK__Food__856DB3EB1BF5C74B");

            entity.ToTable("Food");

            entity.Property(e => e.FoodId).ValueGeneratedNever();
            entity.Property(e => e.FoodPrice).HasColumnType("money");
            entity.Property(e => e.FoodType).HasMaxLength(50);

            entity.HasOne(d => d.Package).WithMany(p => p.Foods)
                .HasForeignKey(d => d.PackageId)
                .HasConstraintName("FK__Food__PackageId__5DCAEF64");
        });

        modelBuilder.Entity<Hotel>(entity =>
        {
            entity.HasKey(e => e.Hotelid).HasName("PK__Hotels__46033FE796474F95");

            entity.Property(e => e.Hotelid).ValueGeneratedNever();
            entity.Property(e => e.HotelPrice).HasColumnType("money");

            entity.HasOne(d => d.Package).WithMany(p => p.Hotels)
                .HasForeignKey(d => d.PackageId)
                .HasConstraintName("FK__Hotels__PackageI__5AEE82B9");
        });

        modelBuilder.Entity<ItineraryDetail>(entity =>
        {
            entity.HasKey(e => e.ItineraryId).HasName("PK__Itinerar__361216C611553432");

            entity.Property(e => e.ItineraryId).ValueGeneratedNever();
            entity.Property(e => e.DayNumber)
                .HasMaxLength(20)
                .HasColumnName("Day_Number");
            entity.Property(e => e.Time).HasMaxLength(50);

            entity.HasOne(d => d.Package).WithMany(p => p.ItineraryDetails)
                .HasForeignKey(d => d.PackageId)
                .HasConstraintName("FK__Itinerary__Packa__5812160E");
        });

        modelBuilder.Entity<Package>(entity =>
        {
            entity.HasKey(e => e.PackageId).HasName("PK__Package__322035CC2E336205");

            entity.ToTable("Package");

            entity.Property(e => e.PackageId).ValueGeneratedNever();
            entity.Property(e => e.Duration).HasMaxLength(50);
            entity.Property(e => e.PackagePrice).HasColumnType("money");
            entity.Property(e => e.Place)
                .HasMaxLength(50)
                .HasColumnName("place");

            entity.HasOne(d => d.User).WithMany(p => p.Packages)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__Package__UserId__5535A963");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__User__1788CC4CC739EE83");

            entity.ToTable("User");

            entity.Property(e => e.Contactno).HasColumnName("contactno");
            entity.Property(e => e.Email).HasMaxLength(40);
            entity.Property(e => e.Gender).HasMaxLength(10);
            entity.Property(e => e.Idproof).HasColumnName("idproof");
            entity.Property(e => e.Password)
                .HasMaxLength(20)
                .HasColumnName("password");
            entity.Property(e => e.Role).HasMaxLength(30);
            entity.Property(e => e.StatusForAgents).HasMaxLength(30);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
