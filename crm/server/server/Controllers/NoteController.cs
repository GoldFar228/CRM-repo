using DotNetOpenAuth.OpenId.Extensions.UI;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Models;
using server.Services;

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
    }
}
