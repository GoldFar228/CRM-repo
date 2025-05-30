﻿using Microsoft.EntityFrameworkCore;
using server.Models.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.DTOs
{
    public class CreateDealDto
    {
        public int AssignedToId { get; set; }
        public DealStatusEnum Status { get; set; }
        public decimal Budget { get; set; }
        public DealPriorityEnum Priority { get; set; }
    }
}
