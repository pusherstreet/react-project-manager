using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using project_manager.Models;
using Microsoft.AspNetCore.Authorization;

namespace project_manager.Controllers
{
    [Produces("application/json")]
    [Route("api/Tasks")]
    
    public class TasksController : BaseController
    {
        public TasksController(Context context) : base(context)
        {
            db = context;
        }

        // GET: api/Tasks
        
        private IEnumerable<Task> GetUserTasks()
        {
            var identity = User.Identity.Name;
            var userid = db.Users.FirstOrDefault(x => x.Email == identity).UserID;
            var tasks = db.Tasks.Include(x => x.Status).Where(x => x.UserID == userid).ToList();
            return tasks;
        }

        [HttpGet]
        [Route("list/{projectid}")]
        public IEnumerable<Task> GetTasks(int projectid)
        {
            var tasks = db.Tasks.Include(x => x.Status).Where(x => x.ProjectID == projectid).ToList(); 
            return tasks;
        }

        [Route("gantt")]
        [HttpGet]
        public GanttModel GetGantt()
        {
            var tasks = db.Tasks.ToList();
            var links = db.TaskLines.Where(l => tasks.Any(t => t.TaskID == l.FromID || t.TaskID == l.ToID));
            var gantt = new GanttModel(tasks, links);
            return gantt;
        }

        [HttpGet]
        [Route("boards")]
        public IEnumerable<Grouping<Status, Task>> GetBoards()
        {
            var tasks = db.Tasks.Include(x => x.Status);
            return tasks.GroupBy(x => x.Status)
                .Select(x => new Grouping<Status, Task> { Key = x.Key, Value = x.ToList() });
        }
        // GET: api/Tasks/5
        [HttpGet("{id}", Name = "Get")]
        public Task Get(int id)
        {
            return db.Tasks.Include(x => x.User).FirstOrDefault(x => x.TaskID == id);
        }
        
        // POST: api/Tasks
        [HttpPost]
        [Route("{projectid}")]
        public Task Post([FromBody]Task task, int projectid)
        {
            task.Created = DateTime.Now;
            var user = db.Users.FirstOrDefault(x => x.Email == User.Identity.Name);
            if(user != null)
            {
                task.UserID = user.UserID;
                task.TaskID = db.Tasks.Count() + 1;
                task.ProjectID = projectid;
                task.Status = db.Statuses.Find(task.StatusID);

                db.Add(task);
                db.SaveChanges();
                return task;
            }
            return null;
        }
        
        // PUT: api/Tasks/5
        [HttpPut("{id}")]
        public Task Put(int id, [FromBody]Task task)
        {      
            db.Entry(task).State = EntityState.Modified;
            db.SaveChanges();

            return db.Tasks.Include(x => x.Status).Include(x => x.User).FirstOrDefault(x => x.TaskID == task.TaskID);
        }

        [Route("setstatus/{id}")]
        [HttpPut]
        public void ChangeStatus(int id, [FromBody] int statusID)
        {
            var task = db.Tasks.Find(id);
            task.StatusID = statusID;
            db.Entry(task).State = EntityState.Modified;
            db.SaveChanges();
        }
        
        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var task = db.Tasks.Find(id);
            if(task != null)
            {
                db.Remove(task);
                db.SaveChanges();
            }
        }
    }
}