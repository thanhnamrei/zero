namespace ProductAPI.Entities;

public class ProductReview
{
    public int ReviewId { get; set; }
    public int ProductId { get; set; }
    public int CustomerId { get; set; }
    public int Rating { get; set; }
    public string? Comment { get; set; }
}