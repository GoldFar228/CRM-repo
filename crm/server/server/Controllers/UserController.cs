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
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly UserService _service;

        public UserController(ILogger<UserController> logger,UserService service)
        {
            _logger = logger;
            _service = service;
        }

        [HttpGet(Name = "GetUsers")]
        public async Task<ActionResult<List<User>>> GetUsers()
        {
            var users = await _service.GetUsersAsync();
            return Ok(users);
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetUserById([FromQuery] int id)
        {
            var user = await _service.GetUserByIdCachedAsync(id);
            return Ok(user);
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetRole()
        {
            //когда пишем new { } - создаем анонимный объект, внутри него могут быть любые свойства
            return Ok(new { Role = User.FindFirst(ClaimTypes.Role).Value });
        }

    }
}
