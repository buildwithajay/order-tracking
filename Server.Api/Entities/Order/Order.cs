using System;
using Server.Api.Enums;
using Server.Api.Models.ApplicationUser;

namespace Server.Api.Entities.Order;

public class Order
{
   public int Id { get; set; }
   public string? OrderNumber { get; set; }
   public string? CustomerId { get; set; }
   public AppUser? AppUser { get; set; }
   public OrderStatus?  OrderStatus { get; set; }
   public decimal Total_Amount { get; set; }
   public DateTime Created_At { get; set; }
   public List<OrderItem>? OrderItems { get;  set; } 
}
