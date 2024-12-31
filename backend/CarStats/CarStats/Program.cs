using CarStats.Data.DbContexts;
using CarStats.Data.DTOs;
using CarStats.Data.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using BCrypt.Net;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<AccountDbContext>(options =>
    options.UseNpgsql("Host=localhost;Port=5432;Database=AccountDb; Username=postgres;Password=POSTGRES"));

// Session add
builder.Services.AddSession(o =>
{
    o.IdleTimeout = TimeSpan.FromMinutes(30);
    
});
builder.Services.AddDistributedMemoryCache();

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
app.UseSession();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapPost("/registerAccount", async (HttpContext httpContext, AccountDbContext db, [FromBody] AccountRegisterDTO request) =>
{
    var encReqPass = BCrypt.Net.BCrypt.HashPassword(request.password);
    Account account = new Account(request.email, request.username, encReqPass, DateTime.Now);
    db.accounts.Add(account);
    await db.SaveChangesAsync();
    httpContext.Session.SetString("email", request.email);
    httpContext.Session.SetString("username", request.username);
    httpContext.Session.SetString("uuid", account.id.ToString());
    return Results.Ok(account);
});

app.MapPost("/loginAccount", async (HttpContext httpContext, AccountDbContext db, [FromBody] AccountLoginDTO request) =>
{
    Account foundAcc= await db.accounts.FirstOrDefaultAsync(acc => acc.email == request.email);
    String password = foundAcc.password;
 
    if (BCrypt.Net.BCrypt.Verify(request.password, password)) {
        httpContext.Session.SetString("email", foundAcc.email);
        httpContext.Session.SetString("username", foundAcc.username);
        httpContext.Session.SetString("uuid", foundAcc.id.ToString());
        return Results.Ok(foundAcc);
    } else
    {
        return Results.Problem();
    }
});

app.MapGet("/requestData", async (HttpContext httpContext) => 
{
    return httpContext.Session.GetString("email");

});

app.UseHttpsRedirection();
 
app.Run();

 