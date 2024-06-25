using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations;

namespace ProductAPI.Entities;

public class ProductVariant
{
    [Key]
    public int VariantId { get; set; }
    public int ProductId { get; set; }
    public string Sku { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public int Stock { get; set; }
    public string? Color { get; set; }
    public string? Size { get; set; }
    public string? Material { get; set; }
    public int? ProductImageId { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }

    // navigations
    public Product Product { get; set; } = null!;
    public ProductImage? ProductImage { get; set; }
}


public class ProductVariantEntityTypeConfiguration : IEntityTypeConfiguration<ProductVariant>
{
	public void Configure(EntityTypeBuilder<ProductVariant> builder)
	{
		builder
			.HasOne(x => x.ProductImage)
			.WithOne()
			.HasForeignKey<ProductVariant>(x => x.ProductImageId)
			.IsRequired(false);
	}
}