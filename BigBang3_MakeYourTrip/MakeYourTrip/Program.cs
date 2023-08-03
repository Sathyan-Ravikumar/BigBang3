using MakeYourTrip.Models;
using MakeYourTrip.Repository.Interface;
using MakeYourTrip.Repository.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<MakeYourTripContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("SQLConnection")));
builder.Services.AddScoped<IAdminImageUpload, AdminImageUploadService>();
builder.Services.AddScoped<IPackage, PackageService>();
builder.Services.AddScoped<IFeedback,FeedbackService>();
builder.Services.AddScoped<IItinerary,ItineraryService>();
builder.Services.AddScoped<IHotel, HotelService>();
builder.Services.AddScoped<IUser,UserService>();

builder.Services.AddCors(opts =>
{
    opts.AddPolicy("AngularCORS", options =>
    {
        options.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors("AngularCORS");
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
