using ProductAPI.Services;

namespace ProductAPI.Apis;

public static class CategoriesApi
{
	public static IEndpointRouteBuilder MapCategoriesApi(this IEndpointRouteBuilder app)
	{
		var api = app.MapGroup("api/categories");

		api.MapGet("", (ICategoryService service) => service.GetAllCategories());
		//api.MapPost("", CreateCategory);
		//api.MapPost("/many", CreateCategories);
		//api.MapDelete("/{id}", DeleteCategory);

		return app;
	}
}
