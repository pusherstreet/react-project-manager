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
    public class TasksController : Controller
    {
        private Context db;
        public TasksController(Context context)
        {
            db = context;
        }

        // GET: api/Tasks
        [Authorize]
        [HttpGet]
        public IEnumerable<Task> Get()
        {
            var identity = User.Identity.Name;
            var userid = db.Users.FirstOrDefault(x => x.Email == identity).UserID;
            var tasks = db.Tasks.Include(x => x.Status).Where(x => x.UserID == userid).ToList();
            return tasks;
        }

        // GET: api/Tasks/5
        [Authorize]
        [HttpGet("{id}", Name = "Get")]
        public Task Get(int id)
        {
            return db.Tasks.Find(id);
        }
        
        // POST: api/Tasks
        [HttpPost]
        public void Post([FromBody]Task task)
        {
            db.Add(task);
            db.SaveChanges();
        }
        
        // PUT: api/Tasks/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]Task task)
        {
            
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
