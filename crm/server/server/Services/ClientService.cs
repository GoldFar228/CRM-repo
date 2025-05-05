using DotNetOpenAuth.OpenId.Extensions.UI;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Models;
using StackExchange.Redis;

namespace server.Services
{
    public class ClientService : AbstractCachedService
    {
        private const string Table = "Client";
        private readonly CRMDbContext _context;

        public ClientService(CRMDbContext context, IConnectionMultiplexer muxer) : base(muxer) 
        {
            _context = context;
        }

        public async Task<List<Client>> GetClientsAsync()
        {
            var query = _context.Clients
                .AsQueryable();

            var response = await query.OrderBy(x => x.Id).ToListAsync();
            return response;
        }

        private async Task<Client?> GetClientByIdAsync(ReddisKey key)
        {
            return await _context.Clients
                .Include(c => c.CreatedBy)
                .FirstOrDefaultAsync(c => c.Id == key.Id);
        }

        public async Task<Client?> GetClientByIdCachedAsync(int id)
        {
            return await GetCachedAsync(new ReddisKey(id, Table), GetClientByIdAsync);
        }
    }
}
