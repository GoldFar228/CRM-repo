using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    public class Note
    {
        [Key]
        public int Id { get; set; }

        [Column(TypeName = "Varchar(256)")]
        public string? Content { get; set; }
        public int? CreatedById{ get; set; }

        [ForeignKey(nameof(CreatedById))]
        public User? CreatedBy { get; set; }

        public int AssignedToId { get; set; }

        [ForeignKey(nameof(AssignedToId))]
        public Client AssignedTo { get; set; }

        public DateTime CreatedAt { get; set; }

    }
}
