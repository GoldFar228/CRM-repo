using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    public class RegisterRequest
    {
        [Column(TypeName = "Varchar(32)")]
        public string? Name { get; set; }

        [Column(TypeName = "Varchar(64)")]
        public string? Email { get; set; }

        [Column(TypeName = "Varchar(64)")]
        public string? Password { get; set; }

        [Column(TypeName = "Varchar(16)")]
        public string? Phone { get; set; }
    }
}
