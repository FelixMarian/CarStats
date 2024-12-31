using System.Net;
using CarStats.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace CarStats.Data.DbContexts
{
    public class AccountDbContext : DbContext
    {
        public AccountDbContext(DbContextOptions<AccountDbContext> options) : base(options)
        {
        }

        protected AccountDbContext()
        {
        }

        public DbSet<Account> accounts { get; set; }
    }
}
