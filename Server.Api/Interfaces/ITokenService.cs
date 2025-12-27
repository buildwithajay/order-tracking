using System;
using Server.Api.Models.ApplicationUser;

namespace Server.Api.Interfaces;

public interface ITokenService
{
    string GenerateToken(AppUser appUser, IList<string> Roles);
}
