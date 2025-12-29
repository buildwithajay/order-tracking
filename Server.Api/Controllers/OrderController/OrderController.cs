using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Api.DTOS;
using Server.Api.DTOS.Orders;
using Server.Api.Interfaces;

namespace Server.Api.Controllers
{
    [Route("api/order")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderRepository _orderRepo;
        public OrderController(IOrderRepository orderRepo)
        {
            _orderRepo=orderRepo;
        }
        [HttpPost]
        [Authorize(Roles ="User")]
        public async Task<IActionResult> CreateOrder(CreateOrderRequest orderRequest)
        {
            var userId= User.FindFirst(ClaimTypes.NameIdentifier)!.Value;
            var order = await _orderRepo.CreateAsync(userId, orderRequest);
            return Ok(new
            {
                order.Id,
                order.OrderNumber,
                order.Total_Amount,
                order.OrderStatus,
              
            });
        }
        [HttpPut]
        [Route("{ordernumber}/confirm")]
        [Authorize(Roles ="Manager")]
        public async Task<IActionResult> ConfirmOrder([FromRoute] string ordernumber)
        {
            var order = await _orderRepo.ConfirmOrderAsync(ordernumber);
            if(order is null) return NotFound("Your order not found");
            return Ok(new
            {
                order.Id,
                order.OrderNumber,
                order.Total_Amount,
                order.OrderStatus,
                  items= order.OrderItems!.Select(i=>new
                {
                    i.Product!.Name,
                    i.Quantity,
                    i.Unit_Price

                })
            });
        }
        [HttpGet("my-orders")]
        [Authorize]
        public async Task<IActionResult> GetOrderByCustomer()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId is null)    return Unauthorized();
            var order = await _orderRepo.GetMyOrdersAsync(userId!);
            if(order == null)
            {
                return NotFound();
            }
            return Ok(order.Select(o => new
            {
                o.OrderNumber,
                o.OrderStatus,
                items = o.OrderItems!.Select(s=>new
                {
                  ProductName = s.Product?.Name,
                  s.Quantity,
                  s.Unit_Price  
                }).ToList(),
                o.Total_Amount,
                o.Created_At
            }));
        }
    }
}
