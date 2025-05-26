using DotNetOpenAuth.OpenId.Extensions.UI;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Models;
using server.Services;

namespace server.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class ClientController : ControllerBase
    {
        private readonly ILogger<ClientController> _logger;
        private readonly ClientService _service;

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
            var newClient = await _service.CreateClientAsync(client);
            return Ok(newClient);
        }
    }
}
