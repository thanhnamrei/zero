using Mapster;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using ProductAPI.Data;
using ProductAPI.DTOs;
using ProductAPI.Entities;

namespace ProductAPI.Services;

public interface ICategoryService
{
	Task<bool> CreateCategory(CreateCategoryDto createCategory);
	Task<bool> CreateCategories(List<CreateCategoryDto> createCategories);
	Task<Ok<List<CategoryDto>>> GetAllCategories();
}

public class CategoryService : ICategoryService
{
	private readonly ProductDbContext _context;

	public CategoryService(ProductDbContext context)
	{
		_context = context;
	}

	public async Task<bool> CreateCategory(CreateCategoryDto createCategory)
	{
		var category = new Category
		{
			Name = createCategory.Name
		};

		_context.Categories.Add(category);

		return await _context.SaveChangesAsync() > 0;
	}


	public async Task<bool> CreateCategories(List<CreateCategoryDto> createCategories)
	{
		var categories = createCategories.Select(x => new Category
		{
			Name = x.Name
		}).ToList();

		_context.Categories.AddRange(categories);

		return await _context.SaveChangesAsync() > 0;
	}

	public async Task<Ok<List<CategoryDto>>> GetAllCategories()
	{
		var result = await _context.Categories
			.ProjectToType<CategoryDto>()
			.ToListAsync();

		return TypedResults.Ok(result);
	}
}
