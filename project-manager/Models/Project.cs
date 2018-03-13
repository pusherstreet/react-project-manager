using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace project_manager.Models
{
    public class Project : IUserData
    {
        public int ProjectID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Created { get; set; }
        public Guid UserID { get; set; }
        public User Creator { get; set; }
        public virtual IEnumerable<UserToProject> Users { get; set;}
        public virtual IEnumerable<Task> Tasks { get; set; }
    }
}