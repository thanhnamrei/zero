namespace ProductAPI.DTOs;

public class VariantDto
{
    public int ProductId { get; set; }
    public int VariantId { get; set; }
    public string Sku { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public int Stock { get; set; }
    public string? Color { get; set; }
    public string? Size { get; set; }
    public string? Material { get; set; }
    public ProductImageDto ProductImage { get; set; } = new();
}

public class CreateVariantDto
{
    public string Sku { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public int Stock { get; set; }
    public string? Color { get; set; }
    public string? Size { get; set; }
    public string? Material { get; set; }
    public CreateProductImageDto ProductImage { get; set; } = new();
}