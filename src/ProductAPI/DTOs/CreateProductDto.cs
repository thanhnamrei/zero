﻿namespace ProductAPI.DTOs;

public class CreateProductDto
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public int BrandId { get; set; }

    public List<VariantDto> Variants { get; set; }
}