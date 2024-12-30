using CarStats.Data.DbContexts;
using CarStats.Data.DTOs;
using CarStats.Data.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<AccountDbContext>(options =>
    options.UseNpgsql("Host=localhost;Port=5432;Database=AccountDb; Username=postgres;Password=POSTGRES"));

// Enable CORS from react frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
                      builder =>
                      {
                          builder
                          .WithOrigins("http://localhost:5173")
                          .AllowAnyMethod()
                          .AllowAnyHeader();
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

app.MapPost("/registerAccount", (AccountDbContext db, [FromBody] AccountRegisterDTO request) =>
{
    Account account = new Account(request.email, request.username, request.password, DateTime.Now);
    db.accounts.Add(account);
    db.SaveChanges();
    return Results.Ok(account);
});

app.MapPost("/loginAccount", async (AccountDbContext db, [FromBody] AccountLoginDTO request) =>
{
    Account foundAcc= await db.accounts.FirstOrDefaultAsync(acc => acc.email == request.email);
    String password = foundAcc.password;
    return Results.Ok(password);
});

app.UseHttpsRedirection();
 
app.Run();

 