using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace project_manager.Models
{
    public class Task : IUserData
    {
        public int TaskID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Created { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }

        public int StatusID { get; set; }
        public virtual Status Status { get; set; }

        public Guid UserID { get; set; }

        public User User { get; set; }
        public int ProjectID  { get; set; }
        public Project Project { get; set; }
        public decimal Progress { get; set; }
    }
}
