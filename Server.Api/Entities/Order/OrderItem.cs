using System.ComponentModel.DataAnnotations;
using Server.Api.Entities.Products;

namespace Server.Api.Entities.Order;

public class OrderItem
{
    [Key]
    public int Id { get; set; }

    public int Order_Id { get; set; }
    public Order? Order { get; set; }

    public int Product_Id { get; set; }
    public Product? Product { get; set; }

    public int Quantity { get; set; }
    public decimal Unit_Price { get; set; }
}
