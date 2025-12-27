using System;
using Microsoft.AspNetCore.Identity;

namespace Server.Api.Models.ApplicationUser;

public class AppUser : IdentityUser
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
}
