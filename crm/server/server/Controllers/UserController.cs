using DotNetOpenAuth.OpenId.Extensions.UI;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Models;
using server.Services;

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

        [HttpGet]
        public async Task<IActionResult> GetUserById([FromQuery] int id)
        {
            var user = await _service.GetUserByIdCachedAsync(id);
            return Ok(user);
        }
    }
}
