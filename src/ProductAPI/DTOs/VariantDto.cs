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