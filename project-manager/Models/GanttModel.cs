using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace project_manager.Models
{
    public class GanttModel
    {
        public GanttModel(IEnumerable<Task> tasks, IEnumerable<TaskLine> links)
        {
            Data = tasks.Select(x => new GanttTask
            {
                Id = x.TaskID,
                Text = x.Title,
                start_date = x.Start.ToString("dd-MM-yyyy"),
                Duration = (int)Math.Ceiling((x.End.Date - x.Start.Date).TotalDays) + 1,
                Progress = x.Progress
            });
            Links = links.Select(x => new GanttLink
            {
                Id = x.TaskLineID,
                Source = x.FromID,
                Target = x.ToID,
                Type = x.Type
            });
        }
        public IEnumerable<GanttTask> Data { get; set; }
        public IEnumerable<GanttLink> Links { get; set; }
    }
    public class GanttTask
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public string start_date { get; set; }
        public int Duration { get; set; }
        public decimal Progress { get; set; }
    }
    public class GanttLink
    {
        public int Id { get; set; }
        public int Source { get; set; }
        public int Target { get; set; }
        public string Type { get; set; }
    }
}
