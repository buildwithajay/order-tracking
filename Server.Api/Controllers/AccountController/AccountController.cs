using System.Linq;
using System.Security.Claims;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Tasks;
using Server.Api.DTOS.UserDTOs;
using Server.Api.Interfaces;
using Server.Api.Models.ApplicationUser;
using Twilio.Jwt.AccessToken;
using Twilio.Rest.Video.V1.Room.Participant;

namespace Server.Api.Controllers.AccountController
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly ITokenService _tokenService; 
        public AccountController(
            UserManager<AppUser> userManager,
            RoleManager<IdentityRole> roleManager,
            ITokenService tokenService
        )
        {
                _userManager=userManager;
                _roleManager=roleManager;
                _tokenService=tokenService;
        }
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            var userExist = await _userManager.FindByEmailAsync(registerDto.Email!);
            if (userExist != null)
            {
                return BadRequest(new { message = "User already exists" });
            }
            var user = new AppUser
            {
                Email = registerDto.Email,
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                UserName = registerDto.Email!.Trim(),
                PhoneNumber = registerDto.PhoneNumber,
                Address = registerDto.Address,
                City = registerDto.City,
                State = registerDto.State,
                ZipCode = registerDto.ZipCode,
                SecurityStamp = Guid.NewGuid().ToString()
            };
            var result = await _userManager.CreateAsync(user, registerDto.Password!);
            if (!result.Succeeded)
            {
               return BadRequest(new { message = "Failed to create user", errors = result.Errors.Select(e => e.Description).ToList() });
            }
            var role = String.IsNullOrWhiteSpace(registerDto.Role)?"User":registerDto.Role;
            var roleAssign= await _userManager.AddToRoleAsync(user, role);
            if (!roleAssign.Succeeded)
            {
                return BadRequest(new { message = "Failed to assign role", errors = roleAssign.Errors.Select(e => e.Description).ToList() });
            }

            return Ok(new
            {
                user.FirstName,
                user.LastName,
                user.Email,
                user.Address,
                user.City
            });
        }
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            if(loginDto.Email is null)
            {
                return BadRequest("email id is needed");
            }
            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            if (user ==null || !await _userManager.CheckPasswordAsync(user, loginDto.Password!))
            {
                return Unauthorized(new {messsage="invalid username and password"});
            }
            var roles = await _userManager.GetRolesAsync(user);
            var token = _tokenService.GenerateToken(user, roles);
            return Ok(new AuthResponseDto
            {
                Email= user.Email,
                Token= token,
                Roles= roles.ToList()
            });
        }
        [HttpPost("google-login")]
        public async Task<IActionResult> GoogleLogin([FromBody] GoogleLoginDto googleLoginDto)
        {
            var payload = await GoogleJsonWebSignature.ValidateAsync(googleLoginDto.TokenId);
            var user = await _userManager.FindByEmailAsync(payload.Email);
            if (user == null)
            {
                user = new AppUser
                {
                    Email = payload.Email,
                    UserName = payload.Email,
                    FirstName = payload.GivenName,
                    LastName = payload.FamilyName,
                    SecurityStamp = Guid.NewGuid().ToString()
                
                };
                var createResult = await _userManager.CreateAsync(user);
                if (!createResult.Succeeded)
                    return BadRequest(createResult.Errors);

                await _userManager.AddToRoleAsync(user, "User");
            }
            
            var getRole = await _userManager.GetRolesAsync(user);
            string jwt = _tokenService.GenerateToken(user,getRole);
            return Ok(new AuthResponseDto
            {
                Email = user.Email,
                Token = jwt,
                Roles = getRole.ToList()
            });
            
        }
        [HttpPut("update-userinfo")]
[Authorize]
public async Task<IActionResult> UpdateUserProfile([FromBody] UpdateUserProfile updateUser)
{
    if (!ModelState.IsValid)
    {
        return BadRequest(ModelState);
    }

    var userID = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

    if (string.IsNullOrEmpty(userID))
    {
        return Unauthorized();
    }

    var user = await _userManager.FindByIdAsync(userID);

    if (user == null)
    {
        return NotFound(new { message = "Invalid user" });
    }

    user.PhoneNumber = updateUser.PhoneNumber;
    user.Address = updateUser.Address;
    user.City = updateUser.City;
    user.State = updateUser.State;
    user.ZipCode = updateUser.ZipCode;

    var result = await _userManager.UpdateAsync(user);

    if (!result.Succeeded)
    {
        return BadRequest(result.Errors);
    }

    return Ok(new { message = "Profile updated successfully" });
}

        

        [HttpPost]
        [Route("assign-role")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AssignRoles([FromBody] AssignRoleDto assignRoleDto)
        {
            var user= await _userManager.FindByEmailAsync(assignRoleDto.Email!);
            if(user is null)
            {
                return NotFound(new {message="invalid email"});
            }
            if(!await _roleManager.RoleExistsAsync(assignRoleDto.Role!))
            {
                return BadRequest(new {message="role doesnot exist"});
            }
            var result = await _userManager.AddToRoleAsync(user, assignRoleDto.Role!);
            if(result.Succeeded)
            {
                return Ok(new {message=$"Role {assignRoleDto.Role} is assign to the {user.Email}" });
            }
            return BadRequest(new {errors=result.Errors.Select(e=>e.Description)});
        }
        [Authorize]
        [HttpGet("get-me")]
    public async Task<IActionResult> GetCurrentUser()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _userManager.FindByIdAsync(userId!);
            
            if (user == null)
            {
                return NotFound();
            }

            var roles = await _userManager.GetRolesAsync(user);

            return Ok(new
            {
                user.Id,
                user.Email,
                user.FirstName,
                user.LastName,
                user.PhoneNumber,
                user.Address,
                user.City,
                user.State,
                user.ZipCode,
                Roles = roles
            });
        }
    }
   

}
