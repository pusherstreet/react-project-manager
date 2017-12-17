using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace project_manager.Models
{
    public class TaskLine
    {
        public int TaskLineID { get; set; }
        public int FromID { get; set; }
        public Task From { get; set; }
        public int ToID { get; set; }
        public Task To { get; set; }
        public string Type { get; set; }
    }
}
