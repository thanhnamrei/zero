using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;
using ProductAPI.Data;
using ProductAPI.DTOs;
using ProductAPI.Entities;
using ProductAPI.Extensions;

namespace ProductAPI.Apis;

public static class ProductsApi
{
	public static IEndpointRouteBuilder MapProductsApi(this IEndpointRouteBuilder app)
	{
		var api = app.MapGroup("api/products");

		api.MapGet("/", GetAllProducts);
		api.MapGet("/{id}", GetProductById);
		api.MapPost("",CreateProduct);
		api.MapPost("/from-file", CreateProductsFromFile).DisableAntiforgery();

		return app;

	}

	private static async Task<Results<Ok<List<ProductDataRow>>,BadRequest>> CreateProductsFromFile(IFormFile formFile)
	{
		if(formFile.Length > 0 && formFile.FileName.EndsWith(".xlsx"))
		{
			using var stream = formFile.OpenReadStream();
			using var package = new ExcelPackage(stream);
			var worksheet = package.Workbook.Worksheets[0];
			var result = worksheet.ToList<ProductDataRow>();

			return TypedResults.Ok(result);
		}

		return TypedResults.BadRequest();
	}

	private static async Task<Ok<List<Product>>> GetAllProducts(string name, ProductDbContext context)
	{
		var result = await context.Products
			.Where(x => string.IsNullOrEmpty(name) || x.Name.Contains(name))
			.Include(x => x.Variants)
			.Include(x => x.Brand)
			.ToListAsync();

		return TypedResults.Ok(result);
	}

	private static async Task<Results<Ok<Product>, NotFound>> GetProductById(ProductDbContext context, int id)
	{
		var result = await context.Products
			.FindAsync(id);

		if (result == null)
		{
			return TypedResults.NotFound();
		}

		return TypedResults.Ok(result);
	}

	public static async Task<Results<Created, BadRequest<string>>> CreateProduct(ProductDbContext context, CreateProductDto createProductDto)
	{
		var product = new Product
		{
			Name = createProductDto.Name,
			Description = createProductDto.Description,
			Variants = createProductDto.Variants.Select(createProductDto => 
				new ProductVariant
				{
					Sku = createProductDto.Sku,
					Color = createProductDto.Color,
					Size = createProductDto.Size,
					Price = createProductDto.Price,
					Stock = createProductDto.Stock,
					Material = createProductDto.Material,
				}).ToList(),
		};

		context.Products.Add(product);
		
		await context.SaveChangesAsync();

		return TypedResults.Created();
	}
}
