using System;
using Microsoft.EntityFrameworkCore;
using Server.Api.ApplicationData;
using Server.Api.DTOS;
using Server.Api.Entities.Order;
using Server.Api.Enums;
using Server.Api.Interfaces;

namespace Server.Api.Repository;

public class OrderRepository : IOrderRepository
{
    private readonly ApplicationDbContext _context;
    public OrderRepository(ApplicationDbContext context)
    {
        _context = context;
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
}
