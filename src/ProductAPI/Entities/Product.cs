﻿using System.Reflection.Emit;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ProductAPI.Entities;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime? UpdatedAt { get; set; }

    public ICollection<ProductVariant> Variants { get; set; }

    public ICollection<Category> Categories { get; set; }
    public int BrandId { get; set; }
    public Brand Brand { get; set; }
}

public class ProductEntityTypeConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder
            .HasMany(x => x.Variants)
            .WithOne(x => x.Product)
            .HasForeignKey(x => x.ProductId)
            .IsRequired(false);

        builder
            .HasOne(x => x.Brand)
            .WithOne(x => x.Product)
            .HasForeignKey<Product>(x => x.BrandId)
            .IsRequired(false);
    }
}