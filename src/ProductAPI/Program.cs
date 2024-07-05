using Mapster;
using Microsoft.EntityFrameworkCore;
using ProductAPI.Apis;
using ProductAPI.Data;
using ProductAPI.Services;

var builder = WebApplication.CreateBuilder(args);

//builder.Services.AddDbContext<ProductDbContext>(options =>
//{
//    options
//        .UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
//        .UseSnakeCaseNamingConvention();
//});

builder.Services.AddDbContext<ProductDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("SQLServerConnection"));
});

#region services

builder.Services.AddScoped<IProductService, ProductService>();

#endregion services

builder.Services.AddMapster();
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

app.MapBrandsApi();
app.MapProductsApi();

app.Run();