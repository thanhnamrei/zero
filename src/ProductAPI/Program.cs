using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using ProductAPI.Apis;
using ProductAPI.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ProductDbContext>(options =>
{
    options
        .UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
        .UseSnakeCaseNamingConvention();
});

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(o =>
{
    o.AddDefaultPolicy(x =>
    {
        x.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();

	});
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();

app.UseHttpsRedirection();

app.MapControllers();
app.MapBrandsApi();

app.Run();