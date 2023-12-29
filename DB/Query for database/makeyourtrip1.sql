use MakeYourTrip

Create table "User"(UserId int primary key identity(1,1),Name nvarchar(max) not null,Email nvarchar(40) not null,"password" nvarchar(20) not null,"Role" nvarchar(30),
         Gender nvarchar(10),"Address" nvarchar(max),contactno bigint,idproof nvarchar(max));

create table AdminImageUpload(ImageId int primary key identity(1,1),UserId int Foreign key references "User",ImagePath nvarchar(max));

create table Feedback(Feedbackid int primary key identity(1,1),UserId int Foreign key references "User",FeedbackMessage nvarchar(max),Rating int);
create table BookingTrip(BookingTripid int  primary key identity(1,1),UserId int Foreign key references "User",
                             NumberOfPeople int,DateOfTheTrip Date,TotalAmount money,DateofBooking DateTime Default GETDATE())

create table Package(PackageId int primary key ,UserId int Foreign key references "User",place nvarchar(50),Duration nvarchar(50),
                     PackagePrice money,"Description" nvarchar(max))

create table ItineraryDetails(ItineraryId int primary key,PackageId int Foreign key references Package ,Day_Number nvarchar(20),Activites nvarchar(max),"Time" nvarchar(50),Itineraryplace nvarchar(max));

create table Hotels(Hotelid int primary key,PackageId int Foreign key references Package,Hotelname nvarchar(max),HotelPrice money);

create table Food(FoodId int primary key,PackageId int Foreign key references Package,FoodType nvarchar(50),FoodPrice money )