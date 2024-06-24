using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ProductAPI.Entities;

public class Brand
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }

    public List<Product> Products { get; set; } = new List<Product>();
}

public class BrandEntityTypeConfiguration : IEntityTypeConfiguration<Brand>
{
    public void Configure(EntityTypeBuilder<Brand> builder)
    {
        builder.HasMany(x => x.Products)
            .WithOne(p => p.Brand)
            .HasForeignKey(p => p.BrandId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}