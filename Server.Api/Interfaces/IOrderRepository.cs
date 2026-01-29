using System;
using Server.Api.DTOS;
using Server.Api.Entities.Order;

namespace Server.Api.Interfaces;

public interface IOrderRepository
{
   
      Task<Order> CreateAsync(string CustomerId,CreateOrderRequest orderRequest);
      Task<List<Order>> GetAllAsync();
      Task<Order?> ConfirmOrderAsync(string ordernumber, string userId);
      Task<List<Order>> GetMyOrdersAsync(string CustomerId);
      Task<List<Order>> GetAllPendingOrderAsync();
      Task<List<Order>> AvailableOrderForDelivery();
      Task<Order> AcceptOrderByDeliveryPerson(string ordernumber, string deliveryPersonId);
      Task<Order> MarkAsDeliveredAsync(string ordernumber, string deliveryPersonId);
      Task<List<OrderStatusHistory>> GetOrderStatusHistoriesAsync(string ordernumber);
      Task<List<Order>> GetOutForDeliveryOrdersByDeliveryPersonId(string deliveryPersonId);
      Task<List<Order>> AllDeliveredOrdersAsync();
      Task<List<Order>> GetDeliveredOrdersByDeliveryPersonId(string deliveryPersonId);
}
