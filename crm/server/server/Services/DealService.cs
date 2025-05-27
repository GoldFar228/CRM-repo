using DotNetOpenAuth.OpenId.Extensions.UI;
using DotNetOpenAuth.OpenId.Provider;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using server.Models;
using server.Models.Enums;
using StackExchange.Redis;

namespace server.Services
{
    public class DealService : AbstractCachedService
    {
        private const string Table = "Deal";
        private readonly CRMDbContext _context;
        public DealService(CRMDbContext context, IConnectionMultiplexer muxer) : base(muxer) 
        {
            _context = context;
        }

        public async Task<Deal?> GetDealByIdCachedAsync(int id)
        {
            return await GetCachedAsync(new ReddisKey( id ,Table ), GetDealByIdAsync);
        }
        
        public async Task<List<Deal>> GetDealsAsync()
        {
            var query = _context.Deals
                .Include(d => d.CreatedBy)
                .Include(d => d.AssignedTo)
                .AsQueryable();

            var response = await query.OrderBy(x => x.Id).ToListAsync();
            return response;
        }
        public async Task<List<Deal>> GetUserDealsAsync(int id)
        {
            var query = _context.Deals
                .Include(d => d.CreatedBy)
                .Include(d => d.AssignedTo)
                .Where(d => d.CreatedById == id)
                .AsQueryable();

            var response = await query.OrderBy(x => x.Id).ToListAsync();
            return response;
        }

        private async Task<Deal?> GetDealByIdAsync(ReddisKey key)
        {
            return await _context.Deals
                .Include(d => d.CreatedBy)
                .Include(d => d.AssignedTo)
                .FirstOrDefaultAsync(d => d.Id == key.Id);
        }

        public async Task<AuthResponse?> CreateDealAsync(Deal request)
        {
           
            await _context.Deals.AddAsync(request);
            await _context.SaveChangesAsync();
            return new AuthResponse("Deal created");
        }
        public async Task<AuthResponse> UpdateDealAsync(int id, Deal dto, int userId)
        {
            var deal = await _context.Deals.FindAsync(id);
            if (deal == null) return new AuthResponse("Deal not found");

            deal.Status = dto.Status;
            deal.CreatedById = userId;
            await _context.SaveChangesAsync();
            return new AuthResponse("Deal created");
        }
        public record class AuthResponse(string? Message = null);
    }
}
