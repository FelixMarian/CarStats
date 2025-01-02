using CarStats.Data.DbContexts;
using CarStats.Data.DTOs;
using CarStats.Data.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using BCrypt.Net;
using System.Reflection.Metadata.Ecma335;
using CarStats;
using System.Net;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<AccountDbContext>(options =>
    options.UseNpgsql("Host=localhost;Port=5432;Database=AccountDb; Username=postgres;Password=POSTGRES"));
builder.Services.AddDbContext<CarDbContext>(options =>
    options.UseNpgsql("Host=localhost;Port=5432;Database=CarsDb;Username=postgres;Password=POSTGRES"));
 

// Enable CORS from react frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
                      builder =>
                      {
                          builder
                          .WithOrigins("http://localhost:5173")
                          .AllowAnyMethod()
                          .AllowAnyHeader()
                          .AllowCredentials();
                      });
});

// For dateTime
AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);


var app = builder.Build();

 

// Use CORSr
app.UseCors("AllowAll");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapPost("/registerAccount", async (AccountDbContext db,   [FromBody] AccountRegisterDTO request) =>
{
    var encReqPass = BCrypt.Net.BCrypt.HashPassword(request.password);
    Account account = new Account(request.email, request.username, encReqPass, DateTime.Now);
    db.accounts.Add(account);
    await db.SaveChangesAsync();
 
    return Results.Ok(account);
});

app.MapPost("/loginAccount", async (AccountDbContext db , [FromBody] AccountLoginDTO request) =>
{
Account foundAcc = await db.accounts.FirstOrDefaultAsync(acc => acc.email == request.email);
String password = foundAcc.password;

if (BCrypt.Net.BCrypt.Verify(request.password, password)) {
        return Results.Ok(foundAcc);
    } else
    {
        return Results.Problem();
    }
});


app.MapPost("/getCars", async (CarDbContext db, [FromBody] GetCarDTO request) =>
{
    return await db.cars.Where(c => c.player_id == request.player_id).ToListAsync();
});

app.MapPost("/addCar", async (CarDbContext db, [FromBody] CarAddDTO request) =>
{
    Car car = new Car(request.player_uuid, request.car_name);
    db.cars.Add(car);
    await db.SaveChangesAsync();
    return Results.Ok(car);
});

app.MapDelete("/deleteCar/{id}", async (CarDbContext db, String id) =>
{
    var carToDel = db.cars.Find(id);
    var expensesList = db.expenses.Where(exp => exp.car_id == id).ToList();

    if(carToDel is null)
    {
        return Results.NotFound();
    }
    foreach (CarExpenses expense in expensesList)
    {
        db.expenses.Remove(expense);
    }
    db.cars.Remove(carToDel);
    await db.SaveChangesAsync();
    return Results.Ok();
});

app.MapGet("getExpenses/{car_id}", async (CarDbContext db, String car_id) =>
{
    return await db.expenses.Where(exp => exp.car_id == car_id).ToListAsync();
});

app.MapPost("addExpense/", async (CarDbContext db, [FromBody] ExpenseAddDTO requst) =>{
    CarExpenses newExpense = new CarExpenses(requst.car_id, requst.title, DateTime.Now.ToString("dd-MMM-yyyy hh:mm"), requst.price);
    db.expenses.Add(newExpense);
    await db.SaveChangesAsync();
    return Results.Ok(newExpense);
});

app.UseHttpsRedirection();
 
app.Run();

 