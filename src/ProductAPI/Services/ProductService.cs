using Microsoft.AspNetCore.Http.HttpResults;
using ProductAPI.Data;
using ProductAPI.DTOs;
using ProductAPI.Entities;

namespace ProductAPI.Services;

public interface IProductService
{
	Task<Results<Created, BadRequest>> CreateProduct(CreateProductDto createProductDto);
}

public class ProductService : IProductService
{
	private readonly ProductDbContext _context;

	public ProductService(ProductDbContext context)
	{
		_context = context;
	}

	public async Task<Results<Created, BadRequest>> CreateProduct(CreateProductDto createProductDto)
	{

		var product = CreateProductFromDto(createProductDto);

		_context.Products.Add(product);

		var changed = await _context.SaveChangesAsync() > 0;

		return changed ? TypedResults.Created() : TypedResults.BadRequest();
	}

	private Product CreateProductFromDto(CreateProductDto createProductDto)
	{
		var product = new Product
		{
			Name = createProductDto.Name,
			Description = createProductDto.Description
		};

		var variants = createProductDto.Variants.Select(x =>
			new ProductVariant
			{
				Sku = x.Sku,
				Color = x.Color,
				Size = x.Size,
				Price = x.Price,
				Stock = x.Stock,
				Material = x.Material,
				ProductImage = new ProductImage
				{
					Url = x.ProductImage.Url,
					IsPrimary = x.ProductImage.IsPrimary,
				}
			}).ToList();

		product.Variants.AddRange(variants);

		var existingCategoryIds = createProductDto.Categories.Where(c => c.Id != 0).Select(c => c.Id).ToList();

		var existsCategories = _context.Categories
			.Where(x => existingCategoryIds.Contains(x.Id));

		product.Categories.AddRange(existsCategories);

		return product;
	}
}