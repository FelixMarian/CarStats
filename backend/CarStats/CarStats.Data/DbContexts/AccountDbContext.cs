using CarStats.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace CarStats.Data.DbContexts
{
    public class AccountDbContext : DbContext
    {
        public AccountDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Account> accounts { get; set; }
    }
}
