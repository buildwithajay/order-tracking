using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Server.Api.DTOS;
using Server.Api.DTOS.Orders;
using Server.Api.Entities.Order;
using Server.Api.Hubs;
using Server.Api.Interfaces;

namespace Server.Api.Controllers
{
    [Route("api/order")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderRepository _orderRepo;
        private readonly IHubContext<OrderHub> _hubContext;
        private readonly ISmsService _smsService;
        public OrderController(IOrderRepository orderRepo, IHubContext<OrderHub> hubContext, ISmsService smsService)
        {
            _orderRepo=orderRepo;
            _hubContext = hubContext;
            _smsService=smsService;
        }

        [HttpGet("getAllOrders")]
        [Authorize(Roles = "Manager")]
        public async Task<IActionResult> GetAllOrders()
        {
            var orders = await _orderRepo.GetAllAsync();
            return Ok(orders.Select(s => new
            {
                s.OrderNumber,
                s.OrderStatus
            }));    
        }
        
        
        [HttpPost]
        [Authorize(Roles ="User")]
        public async Task<IActionResult> CreateOrder(CreateOrderRequest orderRequest)
        {
            var userId= User.FindFirst(ClaimTypes.NameIdentifier)!.Value;
            var order = await _orderRepo.CreateAsync(userId, orderRequest);
            await _hubContext.Clients.Group(order.OrderNumber!).SendAsync("updateOrderStatus", order.OrderNumber, order.OrderStatus);
            await _hubContext.Clients.Group("Managers").SendAsync("NewPendingOrder", new
            {
                order.OrderNumber,
                order.OrderStatus
            });
            var phone = order.AppUser?.PhoneNumber;
            if (string.IsNullOrWhiteSpace(phone))
            {
                return NotFound("number not available");
            }
            await _smsService.SendSmsAsync(phone,
                $"Your order #{order.OrderNumber} is now {order.OrderStatus}");
            return Ok(new
            {
                order.Id,
                order.OrderNumber,
                order.Total_Amount,
                order.OrderStatus,
                order.AppUser?.PhoneNumber
              
            });
        }
        [HttpPut]
        [Route("{ordernumber}/confirm")]
        [Authorize(Roles ="Manager")]
        public async Task<IActionResult> ConfirmOrder([FromRoute] string ordernumber)
        {
            var userid = User.FindFirst(ClaimTypes.NameIdentifier)!.Value;
            var order = await _orderRepo.ConfirmOrderAsync(ordernumber, userid);
            if(order is null) return NotFound("Your order not found");
            await _hubContext.Clients.Group(order.OrderNumber!).SendAsync("updateOrderStatus", order.OrderNumber, order.OrderStatus);

            return Ok(new
            {
                order.Id,
                order.OrderNumber,
                order.Total_Amount,
                order.OrderStatus,
                  items= order.OrderItems?.Select(i=>new
                {
                    i.Product?.Name,
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
        [HttpGet("pending-orders")]
        [Authorize(Roles = "Manager")]
        public async Task<IActionResult> GetPendingOrders()
        {
            var orders = await _orderRepo.GetAllPendingOrderAsync();
            if(orders == null)
            {
                return NotFound("no any pending orders");
            }
            return Ok(orders.Select(o=>new
            {
                o.OrderNumber,
                o.OrderStatus,
               
            }));
        }
        [HttpGet("available-for-delivery")]
        [Authorize(Roles = "DeliveryPerson")]
        public async Task<IActionResult> AvailableDeliveries()
        {
            var orders = await _orderRepo.AvailableOrderForDelivery();
            if(orders is null)
            {
                return NotFound("order not found");
            }
            return Ok(orders.Select(s=>new
            {
                s.OrderNumber,
                s.OrderStatus
            }));
        }
        [HttpPut("{ordernumber}/accept")]
        [Authorize(Roles = "DeliveryPerson")]
        public async Task<IActionResult> AcceptOrderByDeliveryPerson(string ordernumber)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)!.Value;
            if(userId is null)
            {
                return Unauthorized();
            }
            var order = await _orderRepo.AcceptOrderByDeliveryPerson(ordernumber, userId);
            if(order is null)
            {
                return NotFound("order not found");
            }
            await _hubContext.Clients.Group(order.OrderNumber!).SendAsync("updateOrderStatus", order.OrderNumber, order.OrderStatus);
            return Ok(new
            {
                order.deliveryPersonId,
                order.OrderNumber,
                order.OrderStatus
            });
        }

        [HttpGet("outfordeliveryorders")]
        [Authorize(Roles = "DeliveryPerson")]
        public async Task<IActionResult> GetOutForDeliveryOrders()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)!.Value;
            if (userId is null)
            {
                return Unauthorized("not authorized to look into");
            }
            var orders = await _orderRepo.GetOutForDeliveryOrdersByDeliveryPersonId(userId);
            if(orders is null)
            {
                return NotFound("order not found");
            }

            return Ok(orders.Select(s=> new
            {
                s.OrderNumber,
                s.OrderStatus,
                s.Total_Amount
            }));
        }
        [HttpPut("{ordernumber}/delivered")]
        [Authorize(Roles = "DeliveryPerson")]
        public async Task<IActionResult> MarkDelivered(string ordernumber)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)!.Value;
            if(userId is null)
            {
                return Unauthorized();
            }
            var order = await _orderRepo.MarkAsDeliveredAsync(ordernumber, userId);
            if(order is null)
            {
                return NotFound("order not found");
            }
            await _hubContext.Clients.Group(order.OrderNumber!).SendAsync("updateOrderStatus", order.OrderNumber, order.OrderStatus);

            return Ok(new
            {
                order.deliveryPersonId,
                order.OrderNumber,
                order.OrderStatus
            });
        }

        [HttpGet("{ordernumber}/order-status")]
        
        public async Task<IActionResult> GetOrderStatus(string ordernumber)
        {
            
            var status = await _orderRepo.GetOrderStatusHistoriesAsync(ordernumber);
            if(status == null)
            {
                return NotFound();
            }
            return Ok(status.Select(a=> new
            {
                a.OrderNumber,
                a.Order_Status,
                fullName = a.AppUser?.FirstName,
                a.Updated_At
            }));
        }
        

    }
}
