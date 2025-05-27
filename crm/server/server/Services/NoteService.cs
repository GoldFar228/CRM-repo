using DotNetOpenAuth.OpenId.Extensions.UI;
using Microsoft.EntityFrameworkCore;
using server.DTOs;
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
        public async Task<List<Note>> GetNotesForClientAsync(int assignedToId)
        {
            return await _context.Notes
                .Include(d => d.CreatedBy)
                .Include(d => d.AssignedTo)
                .Where(d => d.AssignedToId == assignedToId)
                .ToListAsync();
        }
        public async Task<Note?> GetNoteByIdCachedAsync(int id)
        {
            return await GetCachedAsync(new ReddisKey(id, Table), GetNoteByIdAsync);
        }

        public async Task<AuthResponse> CreateNoteAsync(Note note)
        {
            await _context.Notes.AddAsync(note);
            await _context.SaveChangesAsync();
            return new AuthResponse("Note created");
        } 
        public async Task<AuthResponse> UpdateNoteAsync(int id, Note dto, int userId)
        {
            var note = await _context.Notes.FindAsync(id);
            if (note == null) return new AuthResponse("Note not found");

            note.Content = dto.Content;
            note.CreatedById = userId;
            await _context.SaveChangesAsync();
            return new AuthResponse("Note created");
        }
        public record class AuthResponse(string? Message = null);
    }
}
