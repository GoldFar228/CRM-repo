using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.DTOs
{
    //[PrimaryKey(nameof(Id))] такая вещь идентична атрибуту [Key]
    public class CreateDealRequest
    {
        public int Budget { get; set; }
        public int Priority { get; set; }
        public int Status { get; set; }
        public int ClientId { get; set; }
    }
}
