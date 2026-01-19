using System;
using Server.Api.DTOS;
using Server.Api.Entities.Order;

namespace Server.Api.Interfaces;

public interface IOrderRepository
{
   
      Task<Order> CreateAsync(string CustomerId,CreateOrderRequest orderRequest);

      Task<Order?> ConfirmOrderAsync(string ordernumber, string userId);
      Task<List<Order>> GetMyOrdersAsync(string CustomerId);
      Task<List<Order>> GetAllPendingOrderAsync();
      Task<List<Order>> AvailableOrderForDelivery();
      Task<Order> AcceptOrderByDeliveryPerson(string ordernumber, string deliveryPersonId);
      Task<Order> MarkAsDeliveredAsync(string ordernumber, string deliveryPersonId);
      Task<List<OrderStatusHistory>> GetOrderStatusHistoriesAsync(string ordernumber);
}
