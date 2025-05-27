using Microsoft.EntityFrameworkCore;
using server.Models.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.DTOs
{
    public class UpdateDealDTO
    {
        public DealStatusEnum Status { get; set; }
    }
}
