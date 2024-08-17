using HomeworkForLife.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<HomeworkForLifeContext>(options =>
    options.UseSqlite("Data Source=./Database/Homework4Life.db"));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

// Connection string
string? connectionString = app.Configuration.GetConnectionString("database") ?? "Data Source=HomeworkForLife.db";

// builder.Services.AddSqlite<HomeworkForLifeDB>(connectionString);

app.MapControllers();

app.Run();