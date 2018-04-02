using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace project_manager.Models
{
    public class User
    {
        public Guid UserID { get; set; }
        public string Email { get; set; }
        public string Name { get;  set; }
        public string LastName { get;  set;}
        public string Password { get; set; }
        public virtual IEnumerable<Task> Tasks { get; set; }
    }
}
