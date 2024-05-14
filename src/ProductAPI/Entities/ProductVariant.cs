using System.ComponentModel.DataAnnotations;

namespace ProductAPI.Entities;

public class ProductVariant
{
    [Key]
    public int VariantId { get; set; }
    public string Sku { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public int Stock { get; set; }
    public string? Color { get; set; }
    public string? Size { get; set; }
    public string? Material { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime? UpdatedAt { get; set; }

    public int ProductId { get; set; }
    public Product Product { get; set; }
}