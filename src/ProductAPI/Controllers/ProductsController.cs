using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductAPI.Data;
using ProductAPI.DTOs;
using ProductAPI.Entities;

namespace ProductAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly ProductDbContext _context;

    public ProductsController(ProductDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllProducts(string name)
    {
        var result = await _context.Products
            .Where(x => string.IsNullOrEmpty(name) || x.Name.Contains(name))
            .Include(x => x.Variants)
            .Include(x => x.Brand)
            .ToListAsync();

        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<Results<Ok<Product>, NotFound>> GetProductById(int id)
    {
        var result = await _context.Products
            .FindAsync(id);

        if (result == null)
        {
            return TypedResults.NotFound();
        }

        return TypedResults.Ok(result);
    }

    [HttpPost]
    public async Task<Results<Created, BadRequest<string>>> CreateProduct(CreateProductDto createProductDto)
    {
        var product = new Product
        {
            Name = createProductDto.Name,
            Description = createProductDto.Description,
            Variants = new List<ProductVariant>
            {
                new ProductVariant
                {
                    Sku = createProductDto.Sku,
                    Color = createProductDto.Color,
                    Size = createProductDto.Size,
                    Price = createProductDto.Price,
                    Stock = createProductDto.Stock,
                    Material = createProductDto.Material,
                }
            }
        };

        _context.Products.Add(product);

        var result = await _context.SaveChangesAsync() > 0;

        if (!result) TypedResults.BadRequest("Product could not save changes to the DB");

        return TypedResults.Created(nameof(GetProductById));
    }

    [HttpPut("{id}")]
    public async Task<Results<NotFound, BadRequest, Ok<Product>>> UpdateProduct(int id, UpdateProductDto updateProductDto)
    {
        var product = await _context.Products.FirstOrDefaultAsync(x => x.Id == id);

        if (product == null) TypedResults.NotFound();

        //TODO

        var result = await _context.SaveChangesAsync() > 0;

        if (result) return TypedResults.Ok(product);

        return TypedResults.BadRequest();
    }

    [HttpDelete("{id}")]
    public async Task<Results<NotFound, Ok, BadRequest>> DeleteProduct(int id)
    {
        var product = await _context.Products.FindAsync(id);

        if (product != null) return TypedResults.NotFound();

        _context.Products.Remove(product);

        var result = await _context.SaveChangesAsync() > 0;

        if (result) return TypedResults.Ok();

        return TypedResults.BadRequest();
    }
}