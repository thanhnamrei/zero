using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using ProductAPI.Data;
using ProductAPI.DTOs;
using ProductAPI.Entities;

namespace ProductAPI.Apis;

public static class BrandsApi
{
    public static IEndpointRouteBuilder MapBrandsApi(this IEndpointRouteBuilder app)
    {
        var api = app.MapGroup("api/Brands");

        api.MapGet("/", GetAllBrands);
        api.MapGet("/{id}", GetBrandById);
        api.MapPost("/", CreateBrand);
        api.MapPut("/{id}", UpdateBrand);
        api.MapDelete("/{id}", DeleteBrand);

        return app;
    }

    private static async Task<Results<Ok, BadRequest<string>, NotFound>> DeleteBrand(ProductDbContext context, int id)
    {
        var brand = await context.Brands.FindAsync(id);

        if (brand == null) return TypedResults.NotFound();

        context.Brands.Remove(brand);

        var result = await context.SaveChangesAsync() > 0;

        if (!result) return TypedResults.BadRequest("Brand could not save changes to the DB");

        return TypedResults.Ok();
    }

    private static async Task<Results<Ok, BadRequest<string>, NotFound>> UpdateBrand(ProductDbContext context, int id, CreateBrandDto brandDto)
    {
        var brand = await context.Brands.FindAsync(id);

        if (brand == null) return TypedResults.NotFound();

        brand.Name = brandDto.Name;
        brand.Description = brandDto.Description;

        var result = await context.SaveChangesAsync() > 0;

        if (!result) return TypedResults.BadRequest("Brand could not save changes to the DB");

        return TypedResults.Ok();
    }

    private static async Task<Results<Ok<Brand>, NotFound>> GetBrandById(ProductDbContext context, int id)
    {
        var brand = await context.Brands.FindAsync(id);

        if (brand == null) return TypedResults.NotFound();

        return TypedResults.Ok(brand);
    }

    private static async Task<Ok<List<Brand>>> GetAllBrands(ProductDbContext context)
    {
        var result = await context.Brands.ToListAsync();

        return TypedResults.Ok(result);
    }

    private static async Task<Results<Created, BadRequest<string>>> CreateBrand(ProductDbContext context, CreateBrandDto brandDto)
    {
        var brand = new Brand
        {
            Name = brandDto.Name,
            Description = brandDto.Description,
        };

        context.Brands.Add(brand);

        var result = await context.SaveChangesAsync() > 0;

        if (!result) return TypedResults.BadRequest("Brand could not save changes to the DB");

        return TypedResults.Created(nameof(GetBrandById));
    }
}