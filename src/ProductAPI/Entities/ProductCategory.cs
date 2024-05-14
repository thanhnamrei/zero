using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ProductAPI.Entities;

public class ProductCategory
{
    public int ProductId { get; set; }
    public int CategoryId { get; set; }
}

public class ProductCategoryEntityTypeConfiguration : IEntityTypeConfiguration<ProductCategory>
{
    public void Configure(EntityTypeBuilder<ProductCategory> builder)
    {
        builder.HasKey(x => new { x.ProductId, x.CategoryId });
    }
}