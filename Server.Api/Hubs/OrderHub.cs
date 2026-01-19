using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace Server.Api.Hubs;

[Authorize]
public class OrderHub : Hub
{
 
    public async Task Group(string orderNumber)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, orderNumber);
    }
}