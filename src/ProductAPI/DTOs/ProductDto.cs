namespace ProductAPI.DTOs;

public class ProductDto
{
	public int Id { get; set; }
	public string Name { get; set; } = string.Empty;
	public string? Description { get; set; }

	public int BrandId { get; set; }
	public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public List<VariantDto> Variants { get; set; }
    public BrandDto Brand { get; set; }

}
