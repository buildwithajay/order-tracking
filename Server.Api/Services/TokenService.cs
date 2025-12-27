using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Server.Api.Interfaces;
using Server.Api.Models.ApplicationUser;

namespace Server.Api.Services;

public class TokenService : ITokenService
{
    private readonly IConfiguration _config;
    public TokenService(IConfiguration config)
    {
        _config=config;
    }
    public string GenerateToken(AppUser appUser, IList<string> Roles)
    {
        var claims = new List<Claim>
        {
          new Claim(ClaimTypes.NameIdentifier, appUser.Id),
          new Claim(ClaimTypes.Email, appUser.Email!),
          new Claim(ClaimTypes.Name, $"{appUser.FirstName} ${appUser.LastName}")  
        };
        foreach(var role in Roles)
        {
            claims.Add(new Claim(ClaimTypes.Role, role));
        }
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:Secret"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer:_config["JWT:Issuer"],
            audience:_config["JWT:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(45),
            signingCredentials: creds
        );
        return new JwtSecurityTokenHandler().WriteToken(token);
        
    }
}
