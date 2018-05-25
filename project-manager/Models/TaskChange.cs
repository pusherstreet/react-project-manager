using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace project_manager.Models
{
    public class TaskChange{
        public int TaskChangeID {get; set;}
        public string FieldName {get; set;}
        public string OldValue {get; set;}
        public string NewValue {get; set;}
        public int TaskHistoryID {get; set;}
        public TaskHistory TaskHistory {get; set;}
    }
}