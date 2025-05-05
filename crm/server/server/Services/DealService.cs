using DotNetOpenAuth.OpenId.Extensions.UI;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using server.Models;
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
                .AsQueryable();

            var response = await query.OrderBy(x => x.Id).ToListAsync();
            return response;
        }

        private async Task<Deal?> GetDealByIdAsync(ReddisKey key)
        {
            return await _context.Deals
                .Include(d => d.CreatedBy)
                .FirstOrDefaultAsync(d => d.Id == key.Id);
        }
    }
}
