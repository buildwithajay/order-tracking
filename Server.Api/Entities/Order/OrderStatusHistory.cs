using System;
using Server.Api.Models.ApplicationUser;

namespace Server.Api.Entities.Order;

public class OrderStatusHistory
{
    public int  Id { get; set; }
    public int Order_Id { get; set; }
    public string? Order_Status { get; set; }
    public string? Update_By { get; set; }
    public AppUser? AppUser { get; set; }
    public DateTime Updated_At { get; set; }
}
