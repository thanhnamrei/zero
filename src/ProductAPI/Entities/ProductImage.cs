using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ProductAPI.Entities;

public class ProductImage
{
    public int Id { get; set; }
    public string Url { get; set; } = string.Empty;
    public bool IsPrimary { get; set; }

    public int VariantId { get; set; }
    public ProductVariant ProductVariant { get; set; }
}

public class ProductImageEntityTypeConfiguration : IEntityTypeConfiguration<ProductImage>
{
    public void Configure(EntityTypeBuilder<ProductImage> builder)
    {
        builder
            .HasOne(i => i.ProductVariant)
            .WithOne(v => v.ProductImage)
            .HasForeignKey<ProductImage>(i => i.VariantId);
    }
}