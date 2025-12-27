using System;
using Server.Api.DTOS.Orders;

namespace Server.Api.DTOS;

public class CreateOrderRequest
{
  
    public List<CreateOrderItemDto>? Items {get; set;}

}
