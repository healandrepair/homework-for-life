using Microsoft.EntityFrameworkCore;

namespace HomeworkForLife.Models;

public class HomeworkForLifeContext : DbContext
{
    public HomeworkForLifeContext(DbContextOptions<HomeworkForLifeContext> options)
        : base(options)
    {
    }
    
    public DbSet<Day> Day { get; set; }
    public DbSet<User> User { get; set; }
}