using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server
{
    public class CRMDbContext : DbContext
    {
        public DbSet<User> Users {  get; set; }

        public DbSet<Client> Clients { get; set; }
        public DbSet<Note> Notes { get; set; }
        public DbSet<Deal> Deals { get; set; }

        public CRMDbContext(DbContextOptions<CRMDbContext> options) : base(options) 
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Здесь можно настроить связи между таблицами
            modelBuilder.Entity<Client>().HasKey(c => new { c.Id });
        }
    }
}
