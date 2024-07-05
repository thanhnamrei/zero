using Mapster;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;
using ProductAPI.Data;
using ProductAPI.DTOs;
using ProductAPI.Entities;
using ProductAPI.Extensions;
using ProductAPI.Services;

namespace ProductAPI.Apis;

public static class ProductsApi
{
    public static IEndpointRouteBuilder MapProductsApi(this IEndpointRouteBuilder app)
    {
        var api = app.MapGroup("api/products");

        api.MapGet("/", GetAllProducts);
        api.MapGet("/{id}", GetProductById);
        api.MapPost("", CreateProduct);
        api.MapPost("/from-file", CreateProductsFromFile).DisableAntiforgery();
        api.MapDelete("/{id}", DeleteProduct);

        return app;
    }

    private static async Task<Results<Ok<List<ProductDataRow>>, BadRequest>> CreateProductsFromFile(IFormFile formFile)
    {
        if (formFile.Length <= 0 || !formFile.FileName.EndsWith(".xlsx"))
        {
            return TypedResults.BadRequest();
        }

        await using var stream = formFile.OpenReadStream();
        using var package = new ExcelPackage(stream);
        var worksheet = package.Workbook.Worksheets[0];
        var result = worksheet.ToList<ProductDataRow>();

        return TypedResults.Ok(result);
    }

    private static async Task<Ok<List<ProductDto>>> GetAllProducts(string? name, ProductDbContext context)
    {
        var result = await context.Products
            .Where(x => string.IsNullOrEmpty(name) || x.Name.Contains(name))
            .Include(x => x.Variants)
            //.Include(x => x.Brand)
            .Include(x => x.Categories)
            .ProjectToType<ProductDto>()
            .ToListAsync();

        return TypedResults.Ok(result);
    }

    private static async Task<Results<Ok<Product>, NotFound>> GetProductById(ProductDbContext context, int id)
    {
        var result = await context.Products
            .FindAsync(id);

        return result is null ? TypedResults.NotFound() : TypedResults.Ok(result);
    }

    private static async Task<Results<Created, BadRequest>> CreateProduct(IProductService service, CreateProductDto createProductDto)
    {
        return await service.CreateProduct(createProductDto);
    }

    private static async Task<Results<Ok, NotFound, BadRequest>> DeleteProduct(ProductDbContext context, int id)
    {
        var product = await context.Products.SingleOrDefaultAsync(x => x.Id == id);

        if (product is null) return TypedResults.NotFound();

        context.Products.Remove(product);

        var changed = await context.SaveChangesAsync() > 0;

        return changed ? TypedResults.Ok() : TypedResults.BadRequest();
    }
}