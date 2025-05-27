using Microsoft.EntityFrameworkCore;
using server.Models.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.DTOs
{
    public class CreateNoteDTO
    {
        public int AssignedToId { get; set; }
        public string Content { get; set; }
        public int CreatedById { get; set; }
    }
}
