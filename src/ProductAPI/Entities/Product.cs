﻿using System.Reflection.Emit;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ProductAPI.Entities;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }

    public int BrandId { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime? UpdatedAt { get; set; }

    // navigations
    public ICollection<ProductVariant> Variants { get; set; }

    //public ICollection<Category> Categories { get; set; }
    public Brand Brand { get; set; } = null!;
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

        //builder
        //    .HasOne(x => x.Brand)
        //    .WithMany()
        //    .HasForeignKey(x => x.BrandId)
        //    .IsRequired();
    }
}