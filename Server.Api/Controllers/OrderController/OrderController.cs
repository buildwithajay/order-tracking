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
                order.OrderStatus
            });
        }
        [HttpPut]
        [Route("{id:int}/confirm")]
        [Authorize(Roles ="Manager")]
        public async Task<IActionResult> ConfirmOrder([FromRoute] int id)
        {
            var order = await _orderRepo.ConfirmOrderAsync(id);
            if(order is null) return NotFound("Your order not found");
            return Ok(new
            {
                order.Id,
                order.OrderNumber,
                order.Total_Amount,
                order.OrderStatus
            });
        }
    }
}
