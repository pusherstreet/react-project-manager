using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace project_manager.Models
{
    public class Context: DbContext
    {
        public DbSet<Task> Tasks { get; set; }
        public DbSet<Status> Statuses { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<TaskLine> TaskLines { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<UserToProject> UserToProjects { get; set; }

        public Context(DbContextOptions<Context> options)
            : base(options)
        {
        }
    }
}
