using CarStats.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace CarStats.Data.DbContexts
{
    public class CarDbContext : DbContext
    {
        public DbSet<Car> cars { set; get; }
        public DbSet<CarExpenses> expenses { set; get; }
        public CarDbContext(DbContextOptions<CarDbContext> options) : base(options)
        {
        }

        protected CarDbContext()
        {
        }
    }
}
