using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Tasks;
using Server.Api.DTOS.UserDTOs;
using Server.Api.Interfaces;
using Server.Api.Models.ApplicationUser;

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
        public async Task<IActionResult> Register([FromBody ]RegisterDto registerDto)
        {
            var userExist = await _userManager.FindByEmailAsync(registerDto.Email!);
            if (userExist != null)
            {
                throw new Exception("user already exist");

            }
            var user = new AppUser
            {
                Email= registerDto.Email,
                FirstName= registerDto.FirstName,
                LastName=registerDto.LastName,
                UserName= registerDto.Email!.Trim(),
                SecurityStamp= Guid.NewGuid().ToString()
            };
            var result = await _userManager.CreateAsync(user, registerDto.Password!);
            if (!result.Succeeded)
            {
               return BadRequest(new {message=result.Errors});
            }
            var roleAssign = await _userManager.AddToRoleAsync(user, "User");
            if (!roleAssign.Succeeded)
            {
                throw new Exception($"{roleAssign.Errors}");
            }

            return Ok(new{message=$"{user.FirstName} {user.LastName}! Congratulations your account has been Created"});
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
                Roles = roles
            });
        }
    }
   

}
