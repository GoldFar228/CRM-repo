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
    public class ClientController : ControllerBase
    {
        private readonly ILogger<ClientController> _logger;
        private readonly ClientService _service;
        private readonly CRMDbContext _context;

        public ClientController(ILogger<ClientController> logger, ClientService service)
        {
            _logger = logger;
            _service = service;
        }

        [HttpGet(Name = "GetClients")]
        public async Task<ActionResult<List<Client>>> GetClients() //IActionResult - полезная штука, посмотреть
        {
            var clients = await _service.GetClientsAsync();
            return Ok(clients);
        }

        [HttpGet]
        public async Task<IActionResult> GetClientById([FromQuery] int id)
        {
            var client = await _service.GetClientByIdCachedAsync(id);
            return Ok(client);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateClient([FromBody] Client client)
        {
            var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userIdStr == null) return Unauthorized();

            client.CreatedById = int.Parse(userIdStr);

            await _service.CreateClientAsync(client);
            return Ok(client);
        }

        [Authorize]
        [HttpGet("my")]
        public async Task<IActionResult> GetMyClients()
        {
            var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userIdStr == null) return Unauthorized();

            var userId = int.Parse(userIdStr);

            var clients = await _service.GetUserClientsAsync(userId);

            return Ok(clients);
        }

    }
}
