using System;
using Server.Api.DTOS;
using Server.Api.Entities.Order;

namespace Server.Api.Interfaces;

public interface IOrderRepository
{
   
      Task<Order> CreateAsync(string CustomerId,CreateOrderRequest orderRequest);

      Task<Order?> ConfirmOrderAsync(string ordernumber);
      Task<List<Order>> GetMyOrdersAsync(string CustomerId);
}
