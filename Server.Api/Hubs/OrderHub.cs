using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace Server.Api.Hubs;


public class OrderHub : Hub
{
 
    public async Task JoinOrder(string orderNumber)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, orderNumber);
    }

     public override async Task OnConnectedAsync()
    {
        if (Context.User?.IsInRole("Manager") == true)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, "Manager");
        }
        if(Context.User?.IsInRole("DeliveryPerson") == true)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, "Delivery");
        }

        await base.OnConnectedAsync();
    }
    
}