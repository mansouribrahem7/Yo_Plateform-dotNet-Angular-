using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;

namespace Projects.Models
{
    public class ProjectContext:IdentityDbContext<User>
    {
        public DbSet<Project> Projects { get; set; }
        public ProjectContext(DbContextOptions<ProjectContext> options):base(options) 
        {

            
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Seed static data here
            modelBuilder.Entity<Project>().HasData(
                new Project { Id = 1, Name = "Project 1", Type = "Type 1", Date = DateTime.Now },
                new Project { Id = 2, Name = "Project 2", Type = "Type 2", Date = DateTime.Now },
                new Project { Id = 3, Name = "Project 3", Type = "Type 3", Date = DateTime.Now },
                new Project { Id = 4, Name = "Project 4", Type = "Type 4", Date = DateTime.Now },
                new Project { Id = 5, Name = "Project 5", Type = "Type 5", Date = DateTime.Now }

               
            );
        }
    }
}
