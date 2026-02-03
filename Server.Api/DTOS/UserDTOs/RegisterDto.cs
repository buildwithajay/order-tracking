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
    public string? PhoneNumber { get; set; }
    public string? Address { get; set; }
    public string? City { get; set; }
    public string? State { get; set; }
    public string? ZipCode { get; set; }
   
}
