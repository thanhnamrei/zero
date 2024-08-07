﻿namespace ProductAPI.DTOs;

public class CategoryDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
}

public class CreateCategoryDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
}