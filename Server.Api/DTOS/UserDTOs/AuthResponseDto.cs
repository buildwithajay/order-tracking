using System;

namespace Server.Api.DTOS.UserDTOs;

public class AuthResponseDto
{
    public string? Email { get; set; }
    public string? Token { get; set; }
    public List<string>? Roles { get; set; } = new();
}
