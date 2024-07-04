using Microsoft.EntityFrameworkCore;
using ProductAPI.Entities;

namespace ProductAPI.Data;

public class ProductDbContext : DbContext
{
    public ProductDbContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Product> Products { get; set; }
    public DbSet<ProductVariant> ProductVariants { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        new ProductEntityTypeConfiguration().Configure(modelBuilder.Entity<Product>());
        //new BrandEntityTypeConfiguration().Configure(modelBuilder.Entity<Brand>());
        new ProductVariantEntityTypeConfiguration().Configure(modelBuilder.Entity<ProductVariant>());
    }
}