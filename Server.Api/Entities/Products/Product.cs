using System;
using Server.Api.Entities.Order;

namespace Server.Api.Entities.Products;

public class Product
{
     public int Id { get; set; }
    public string? Name { get; set; }
    public decimal Price { get; set; }
    public bool IsAvailable { get; set; }
    public ICollection<OrderItem>? OrderItems { get; set; }
}
