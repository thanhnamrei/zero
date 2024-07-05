namespace ProductAPI.DTOs;

public class ProductImageDto
{
    public int Id { get; set; }
    public string Url { get; set; } = string.Empty;
    public bool IsPrimary { get; set; }
    public int VariantId { get; set; }
}

public class CreateProductImageDto
{
    public string Url { get; set; } = string.Empty;
    public bool IsPrimary { get; set; }
}