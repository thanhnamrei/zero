namespace ProductAPI.DTOs;

public class VariantDto
{
    public string Sku { get; set; } = string.Empty;

    public decimal Price { get; set; }
    public int Stock { get; set; }
    public string? Color { get; set; }
    public string? Size { get; set; }
    public string? Material { get; set; }
}

public class CreateProductDto
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public int BrandId { get; set; }

    public List<VariantDto> Variants { get; set; }
}