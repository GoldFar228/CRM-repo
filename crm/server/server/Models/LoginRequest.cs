using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    //[PrimaryKey(nameof(Id))] такая вещь идентична атрибуту [Key]
    public class LoginRequest
    {
        [Column(TypeName = "Varchar(64)")]
        public string? Email { get; set; }

        [Column(TypeName = "Varchar(64)")]
        public string? Password { get; set; }
    }
}
