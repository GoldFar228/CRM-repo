using DotNetOpenAuth.OpenId.Extensions.UI;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.DTOs;
using server.Models;
using server.Services;
using System.Security.Claims;

namespace server.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class NotesController : ControllerBase
    {
        private readonly ILogger<NotesController> _logger;
        private readonly NoteService _service;

        public NotesController(ILogger<NotesController> logger, NoteService service)
        {
            _logger = logger;
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<List<Note>>> GetNotes()
        {
            var notes = await _service.GetNotesAsync();
            return Ok(notes);
        }

        [HttpGet]
        public async Task<IActionResult> GetNoteById([FromQuery] int id)
        {
            var note = await _service.GetNoteByIdCachedAsync(id);
            return Ok(note);
        }
        [HttpGet]
        public async Task<IActionResult> GetNotesForClient([FromQuery]int id)
        {
            var note = await _service.GetNotesForClientAsync(id);
            return Ok(note);
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateNote([FromBody] CreateNoteDTO dto)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var note = new Note
            {
                CreatedAt = DateTime.UtcNow,
                CreatedById = userId,
                AssignedToId = dto.AssignedToId,
                Content = dto.Content,
            };

            await _service.CreateNoteAsync(note);
            return Ok(note);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateNote(int id, [FromBody] CreateNoteDTO dto)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            var note = new Note
            {
                CreatedById = userId,
                AssignedToId = dto.AssignedToId,
                Content = dto.Content,
            };

            await _service.UpdateNoteAsync(id, note, userId);
            return Ok(note);
        }
    }
}
