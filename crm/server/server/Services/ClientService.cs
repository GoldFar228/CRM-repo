using DotNetOpenAuth.OpenId.Extensions.UI;
using DotNetOpenAuth.OpenId.Provider;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Models;
using server.Models.Enums;
using StackExchange.Redis;
using System.Security.Claims;

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
                .Include(c => c.CreatedBy)
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

        public async Task<AuthResponse?> CreateClientAsync(Client request)
        {
            var exists = await _context.Clients
                .AnyAsync(c => c.Email == request.Email);

            if (exists) return new AuthResponse("Client exists");

            var client = new Client
            {
                Name = request.Name,
                Email = request.Email,
                Phone = request.Phone,
                CreatedAt = DateTime.UtcNow,
                CreatedById = request.CreatedById,
            };

            await _context.Clients.AddAsync(client);
            await _context.SaveChangesAsync();
            return new AuthResponse("Client created");
        }
        public async Task<List<Client>> GetUserClientsAsync(int id)
        {

            var clients = await _context.Clients
                .Where(c => c.CreatedById == id)
                .ToListAsync();

            return clients;
        }
        public record class AuthResponse(string? Message = null);
    }
}
