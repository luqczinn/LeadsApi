using LeadsApi.Models;
using Microsoft.EntityFrameworkCore;

namespace LeadsApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Lead> Leads { get; set; }
    }
}
