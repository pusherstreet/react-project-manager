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
    [Route("api/import")]
    
    public class ImportController : Controller
    {
        private Context db;
        public ImportController(Context context)
        {
            db = context;
        }
        [Route("gevents")]
        [HttpPost]
        public void ImportGoogleEvents([FromBody]IEnumerable<GoogleEvent> events){
            var eventsList = events;
            int count = db.Tasks.Count();
            var userid = db.Users.FirstOrDefault(x => x.Email == User.Identity.Name).UserID;
            foreach(var e in eventsList){
                count++;
                var task = new Task{
                    TaskID = count,
                    Title = e.Summary,
                    Description = "Google event",
                    Created = e.Created,
                    StatusID = 1,
                    UserID = userid,
                    Start = e.Start == DateTime.MinValue ? e.Created : e.Start,
                    End = e.End == DateTime.MinValue ? e.Created : e.End
                };
                db.Tasks.Add(task);
            }
            db.SaveChanges();
        }
    }
}