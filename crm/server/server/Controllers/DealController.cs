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

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateDeal([FromBody] Deal deal)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

            var newDeal = new Deal
            {
                CreatedById = userId,
                CreatedAt = DateTime.UtcNow,
                AssignedToId = deal.AssignedToId,
                Status = deal.Status,
                Budget = deal.Budget,
                Priority = deal.Priority
            };

            await _service.CreateDealAsync(newDeal);
            return Ok(newDeal);
        }
    }
}
