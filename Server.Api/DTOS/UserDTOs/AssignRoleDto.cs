using System;

namespace Server.Api.DTOS.UserDTOs;

public class AssignRoleDto
{
    public string? Email { get; set; }= string.Empty;
    public string? Role { get; set; }= string.Empty;
}
