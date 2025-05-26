using DotNetOpenAuth.OpenId.Extensions.UI;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Models;
using server.Services;
using System.Security.Claims;

namespace server.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody]RegisterRequest request)
        {
            var success = await _authService.RegisterAsync(request);
            if (success.ErrorMessage != null) return BadRequest(success.ErrorMessage);

            return Ok(success);
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody]LoginRequest request)
        {
            var token = await _authService.LoginAsync(request);
            if (token == null) return Unauthorized("Invalid credentials");

            return Ok(token);
        }
    }
}
