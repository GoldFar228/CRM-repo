using DotNetOpenAuth.OpenId.Extensions.UI;
using Microsoft.EntityFrameworkCore;
using server.Models;
using StackExchange.Redis;

namespace server.Services
{
    public class UserService : AbstractCachedService
    {
        private const string Table = "User";
        private readonly CRMDbContext _context;


        public UserService(CRMDbContext context, IConnectionMultiplexer muxer) : base(muxer) 
        {
            _context = context;
        }

        public async Task<List<User>> GetUsersAsync()
        {
            var query = _context.Users
                .AsQueryable();

            var response = await query.OrderBy(x => x.Id).ToListAsync();
            return response;
        }

        private async Task<User?> GetUserByIdAsync(ReddisKey key)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.Id == key.Id);
        }

        public async Task<User?> GetUserByIdCachedAsync(int id)
        {
            return await GetCachedAsync(new ReddisKey(id, Table), GetUserByIdAsync);
        }
    }
}
