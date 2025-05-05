using DotNetOpenAuth.OpenId.Extensions.UI;
using Microsoft.EntityFrameworkCore;
using server.Models;
using StackExchange.Redis;

namespace server.Services
{
    public class NoteService : AbstractCachedService
    {
        private const string Table = "Note";
        private readonly CRMDbContext _context;

        public NoteService(CRMDbContext context, IConnectionMultiplexer muxer) : base(muxer)
        {
            _context = context;
        }

        public async Task<List<Note>> GetNotesAsync()
        {
            var query = _context.Notes
                .Include(n => n.AssignedTo)
                .ThenInclude(c => c.CreatedBy)
                .AsQueryable();

            var response = await query.OrderBy(x => x.Id).ToListAsync();
            return response;
        }

        private async Task<Note?> GetNoteByIdAsync(ReddisKey key)
        {
            return await _context.Notes
                .FirstOrDefaultAsync(n => n.Id == key.Id);
        }

        public async Task<Note?> GetNoteByIdCachedAsync(int id)
        {
            return await GetCachedAsync(new ReddisKey(id, Table), GetNoteByIdAsync);
        }
    }
}
