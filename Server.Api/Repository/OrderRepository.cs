using System;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Server.Api.ApplicationData;
using Server.Api.DTOS;
using Server.Api.Entities.Order;
using Server.Api.Enums;
using Server.Api.Interfaces;
using Server.Api.Models.ApplicationUser;

namespace Server.Api.Repository;

public class OrderRepository : IOrderRepository
{
    private readonly ApplicationDbContext _context;
    private readonly UserManager<AppUser> _userManager;
    public OrderRepository(ApplicationDbContext context, UserManager<AppUser> userManager)
    {
        _context = context;
        _userManager= userManager;
    }

 

    public async Task<Order> AcceptOrderByDeliveryPerson(string ordernumber, string deliveryPersonId)
    {
        var order = await _context.Orders.FirstOrDefaultAsync(s=>s.OrderNumber== ordernumber);
        if(order is null)
        {
            throw new Exception("order not found");
        }
        if(order.OrderStatus != OrderStatus.Confirmed)
        {
            throw new Exception("order must be confirmed before delivery accept");
        }
        
        var deliveryperson= await _userManager.FindByIdAsync(deliveryPersonId);
        if(deliveryperson is null)
        {
            throw new KeyNotFoundException("Delivery person not found");
        }
        order.OrderStatus = OrderStatus.OutForDelivery;
        order.deliveryPersonId= deliveryPersonId;
        await _context.SaveChangesAsync();
        return order;
    }

    public async Task<Order> AssignDeliveryAsync(string ordernumber, string deliveryPersonId)
    {
        var order = await _context.Orders.FirstOrDefaultAsync(s=>s.OrderNumber==ordernumber);
        if(order is null)
        {
            throw new Exception("order not found");
        }
        if(order.OrderStatus != OrderStatus.Confirmed)
        {
            throw new Exception("Order must be confirmed before assigning delivery");
        }
        var deliveryUser = await _userManager.FindByIdAsync(deliveryPersonId);
        if(deliveryUser is null)
        {
            throw new KeyNotFoundException("Delivery person not found");
        }
        order.deliveryPersonId = deliveryPersonId;
        order.OrderStatus = OrderStatus.OutForDelivery;
        await _context.SaveChangesAsync();
        await AddStatusHistoryAysnc(order.Id, OrderStatus.OutForDelivery, deliveryPersonId);
        return order;
    }

    public async Task<List<Order>> AvailableOrderForDelivery()
    {
        var order = await _context.Orders
                            .Where(o=>o.OrderStatus==OrderStatus.Confirmed)
                            .ToListAsync();
        if(order is null)
        {
            throw new Exception("no any order to deliver");
        }
        return order;
    }

    public async Task<Order?> ConfirmOrderAsync(string ordernumber)
    {
        var order = await _context.Orders.Include(o=>o.OrderItems).FirstOrDefaultAsync(s=>s.OrderNumber==ordernumber);
        if (order == null)
        {
            throw new Exception("Order not found");
        }
        order.OrderStatus = OrderStatus.Confirmed;
        await _context.SaveChangesAsync();
        return order;
    }

    public async Task<Order> CreateAsync(string CustomerId, CreateOrderRequest orderRequest)
    {
        var order = new Order
        {
            CustomerId= CustomerId,
            OrderStatus= OrderStatus.Pending,
            OrderItems = new List<OrderItem>()

        };
        decimal Total_Amount= 0;
        foreach(var item in orderRequest.Items!)
        {
            var product = await _context.Products.FindAsync(item.ProductId);
            if(product== null)
            {
                throw new Exception("Invalid Product");
            }
            var orderItem = new OrderItem
            {
                Product_Id=product.Id,
                Quantity= item.Quantity,
                Unit_Price= product.Price
            };
            Total_Amount += product.Price * item.Quantity;
            order.OrderItems!.Add(orderItem);
            order.Created_At= DateTime.Now;
        }
         order.Total_Amount= Total_Amount;
         _context.Orders.Add(order);
        await _context.SaveChangesAsync();

        order.OrderNumber= $"ORD-{DateTime.UtcNow.Year}-{order.Id:D6}";
        await _context.SaveChangesAsync();
        await AddStatusHistoryAysnc(order.Id, OrderStatus.Pending, CustomerId);
        return order;
    }

    public async Task<List<Order>> GetAllPendingOrderAsync()
    {
        var order= await _context.Orders
                    .Where(s=>s.OrderStatus== OrderStatus.Pending)
                    .ToListAsync();
        if(order == null)
        {
            throw new Exception("no order is pending");
        }
            
        return order;
    }

    public async Task<List<Order>> GetMyOrdersAsync(string CustomerId)
    {
        var orders= await _context.Orders
                .Include(x=>x.OrderItems)!
                .ThenInclude(p=>p.Product)
                .Where(s=>s.CustomerId==CustomerId)
                .OrderByDescending(x=>x.Created_At)
                .ToListAsync();

        return orders;
    }

    public Task<List<OrderStatusHistory>> GetOrderStatusHistoriesAsync(string ordernumber)
    {
        throw new NotImplementedException();
    }

    public async Task<Order> MarkAsDeliveredAsync(string ordernumber, string deliveryPersonId)
    {
        var order = await _context.Orders.FirstOrDefaultAsync(s=>s.OrderNumber== ordernumber);
        if(order is null)
        {
            throw new KeyNotFoundException("order not found");
        }
        if(order.deliveryPersonId != deliveryPersonId)
        {
            throw new UnauthorizedAccessException("you are not assign for this order");
        }
        if(order.OrderStatus != OrderStatus.OutForDelivery)
        {
            throw new Exception("order is not out for delivery");
        }
        order.OrderStatus = OrderStatus.Delivered;
        await _context.SaveChangesAsync();
        await AddStatusHistoryAysnc(order.Id, OrderStatus.Delivered, deliveryPersonId);
        return order;
    }

    private async Task AddStatusHistoryAysnc(int orderId, OrderStatus orderStatus, string userId)
    {
        var order = await _context.Orders.FindAsync(orderId);
        if(order is null)
        {
            throw new KeyNotFoundException("order not found");
        }
        var history = new OrderStatusHistory
        {
            Order= order,
            Order_Status= orderStatus,
            Update_By= userId,
            Updated_At= DateTime.UtcNow
        };
        await _context.OrderStatusHistory.AddAsync(history);
        await _context.SaveChangesAsync();
        

    }
}
