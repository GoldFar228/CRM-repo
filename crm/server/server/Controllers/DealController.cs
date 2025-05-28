using DotNetOpenAuth.OpenId.Extensions.UI;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.DTOs;
using server.Models;
using server.Models.Enums;
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
        private int userId => int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

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

        [HttpGet]
        public async Task<IActionResult> GetUserDeals()
        {
            var deal = await _service.GetUserDealsAsync(userId);
            return Ok(deal);
        }


        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateDeal([FromBody] CreateDealDto dto)
        {

            var deal = new Deal
            {
                CreatedAt = DateTime.UtcNow,
                CreatedById = userId,
                AssignedToId = dto.AssignedToId,
                Status = dto.Status,
                Budget = dto.Budget,
                Priority = dto.Priority
            };

            await _service.CreateDealAsync(deal);
            return Ok(deal);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDealStatus(int id, [FromBody] DealStatusEnum status)
        {

            var deal = await _service.UpdateDealAsync(id, status);
            return Ok(deal);
        }
    }
}
