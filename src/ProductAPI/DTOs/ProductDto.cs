namespace ProductAPI.DTOs;

public class ProductDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public List<VariantDto> Variants { get; set; } = new();
    public List<CategoryDto> Categories { get; set; } = new();
}

public class CreateProductDto
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public List<CreateVariantDto> Variants { get; set; } = new();
    public List<CreateCategoryDto> Categories { get; set; } = new();
}