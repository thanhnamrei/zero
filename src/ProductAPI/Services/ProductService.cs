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
        var product = new Product
        {
            Name = createProductDto.Name,
            Description = createProductDto.Description,
            Variants = createProductDto.Variants.Select(x =>
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
                }).ToList(),
            Categories = createProductDto.CreateCategories.Select(x =>
                new Category
                {
                    Name = x.Name,
                }).ToList()
        };

        _context.Products.Add(product);

        var changed = await _context.SaveChangesAsync() > 0;

        return changed ? TypedResults.Created() : TypedResults.BadRequest();
    }
}