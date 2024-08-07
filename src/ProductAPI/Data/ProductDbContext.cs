﻿using Microsoft.EntityFrameworkCore;
using ProductAPI.Entities;

namespace ProductAPI.Data;

public class ProductDbContext : DbContext
{
    public ProductDbContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Product> Products { get; set; }
    public DbSet<ProductVariant> ProductVariants { get; set; }
    public DbSet<ProductImage> ProductImages { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<ProductCategory> ProductCategories { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        new ProductEntityTypeConfiguration().Configure(modelBuilder.Entity<Product>());
        new ProductVariantEntityTypeConfiguration().Configure(modelBuilder.Entity<ProductVariant>());
        new ProductImageEntityTypeConfiguration().Configure(modelBuilder.Entity<ProductImage>());
    }
}