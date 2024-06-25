using ProductAPI.Entities;

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

    public int? ProductImageId { get; set; }
    public ProductImage? ProductImage { get; set; }
}