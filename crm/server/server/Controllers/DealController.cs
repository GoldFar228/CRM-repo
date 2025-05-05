using DotNetOpenAuth.OpenId.Extensions.UI;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Models;
using server.Services;

namespace server.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class DealController : ControllerBase
    {
        private readonly ILogger<DealController> _logger;
        private readonly DealService _service;

        public DealController(ILogger<DealController> logger,DealService service)
        {
            _logger = logger;
            _service = service;
        }

        [HttpGet(Name = "GetDeals")]
        public async Task<ActionResult<List<Deal>>> GetDeals()
        {
            var deals = await _service.GetDealsAsync();
            return Ok(deals);
        }

        [HttpGet]
        public async Task<IActionResult> GetDealById([FromQuery] int id)
        {
            var deal = await _service.GetDealByIdCachedAsync(id);
            return Ok(deal);
        }
    }
}
