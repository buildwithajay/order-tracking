using System;
using System.ComponentModel.DataAnnotations;

namespace Server.Api.DTOS.UserDTOs;

public class RegisterDto
{ 
    [EmailAddress]
    [Required]
    public string? Email { get; set; }
    [Required]
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    [Required]
    [MinLength(6)]
    public string? Password { get; set; }
    public string? Role { get; set; } = "User";
}
