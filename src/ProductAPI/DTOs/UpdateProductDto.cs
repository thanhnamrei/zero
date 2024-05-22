using ProductAPI.Entities;

namespace ProductAPI.DTOs
{
    public class UpdateProductDto
    {
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public ICollection<ProductVariant> Variants { get; set; }
    }
}