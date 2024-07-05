using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
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
    public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
    public int ProductId { get; set; }
    public Product? Product { get; set; }
    public ProductImage ProductImage { get; set; }
}

public class ProductVariantEntityTypeConfiguration : IEntityTypeConfiguration<ProductVariant>
{
    public void Configure(EntityTypeBuilder<ProductVariant> builder)
    {
        builder.Property(x => x.Price)
            .HasPrecision(18, 4);

        builder.Property(x => x.Sku)
            .HasMaxLength(50);

        builder.Property(x => x.Color)
            .HasMaxLength(50);

        builder.Property(x => x.Size)
            .HasMaxLength(50);

        builder.Property(x => x.Material)
            .HasMaxLength(50);

        //builder
        //    .HasOne(x => x.Product)
        //    .WithMany(z => z.Variants)
        //    .HasPrincipalKey(x => x.Id)
        //    .OnDelete(DeleteBehavior.ClientSetNull);
    }
}