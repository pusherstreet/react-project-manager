using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace project_manager.Models
{
    public class TaskHistory
    {
        public int TaskHistoryID { get; set;}
        public Guid UserID {get; set;}
        public User User {get; set;}
        public int TaskID {get; set;}
        public Task Task {get; set;}
        public string Message {get; set;}
        public DateTime Created {get; set;}
        public IEnumerable<TaskChange> Changes {get; set;}
    }
}