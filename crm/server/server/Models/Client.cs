using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    //[PrimaryKey(nameof(Id))] такая вещь идентична атрибуту [Key]
    public class Client
    {
        [Key]
        public int Id { get; set; }             //идентично этому

        [Column(TypeName = "Varchar(64)")]
        public string? Name { get; set; }

        [Column(TypeName = "Varchar(64)")]
        public string? Email{ get; set; }

        [Column(TypeName = "Varchar(16)")]
        public string? Phone { get; set; }

        public DateTime CreatedAt { get; set; }

        public int CreatedById { get; set; }

        [ForeignKey(nameof(CreatedById))]
        public User? CreatedBy { get; set; }
    }
}
