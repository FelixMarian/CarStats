
using Microsoft.EntityFrameworkCore;

namespace CarStats.Data
{
    public class AccountDbContext:DbContext
    {
        public AccountDbContext(DbContextOptions options) : base(options)
        {
        }

        DbSet<Account> accounts { get; set; }
    }
}
