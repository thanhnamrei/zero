namespace ProductAPI.Entities;

public class ProductImage
{
    public int Id { get; set; }
    public string Url { get; set; } = string.Empty;
    public bool IsPrimary { get; set; }
    public int VariantId { get; set; }
}