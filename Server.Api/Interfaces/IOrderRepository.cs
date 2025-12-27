using System;
using Server.Api.DTOS;
using Server.Api.Entities.Order;

namespace Server.Api.Interfaces;

public interface IOrderRepository
{
      Task<List<Order>> GetOrderAsync();
      Task<Order> CreateAsync(string CustomerId,CreateOrderRequest orderRequest);

      Task<Order?> ConfirmOrderAsync(int orderId);
}
