using System;

namespace Server.Api.DTOS.Orders;

public class CreateOrderItemDto
{
   public int ProductId { get; set; }
   public int Quantity { get; set; }
}
