using Microsoft.EntityFrameworkCore;
using server.Models.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace server.Models
{
    //[PrimaryKey(nameof(Id))] такая вещь идентична атрибуту [Key]
    public class Deal
    {
        [Key]
        public int Id { get; set; }             //идентично этому

        public DateTime CreatedAt { get; set; }
        public int CreatedById { get; set; }

        //[JsonIgnore]
        [ForeignKey(nameof(CreatedById))]
        public User? CreatedBy { get; set; }
        public int AssignedToId { get; set; }

        //[JsonIgnore]
        [ForeignKey(nameof(AssignedToId))]
        public Client AssignedTo { get; set; }

        public DealStatusEnum Status { get; set; }

        public decimal Budget{ get; set; }

        public DealPriorityEnum Priority { get; set; }


    }
}
