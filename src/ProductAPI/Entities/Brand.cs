using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ProductAPI.Entities;

public class Brand
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
}

public class BrandEntityTypeConfiguration : IEntityTypeConfiguration<Brand>
{
    public void Configure(EntityTypeBuilder<Brand> builder)
    {
        builder.HasMany<Product>()
            .WithOne(x => x.Brand)
            .HasForeignKey(x => x.BrandId)
            .IsRequired();
    }
}