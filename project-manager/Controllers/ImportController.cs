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
    
    public class ImportController : BaseController
    {
        public ImportController(Context context): base(context)
        {
            db = context;
        }
        [Route("gevents")]
        [HttpPost]
        public GoogleImportResult ImportGoogleEvents([FromBody]IEnumerable<GoogleEvent> events, int projectid){
            var eventsList = events;
            int count = db.Tasks.Count();
            var userid = db.Users.FirstOrDefault(x => x.Email == User.Identity.Name).UserID;
            var result = new GoogleImportResult();
            foreach(var e in eventsList){
                var existTask = db.Tasks.SingleOrDefault(x => x.GoogleID == e.ID);
                if(existTask == null){
                    count++;
                    result.Added++;
                    var task = new Task{
                        TaskID = count,
                        Title = e.Summary,
                        Description = "Google event",
                        Created = e.Created,
                        StatusID = 1,
                        UserID = userid,
                        Start = e.Start == DateTime.MinValue ? e.Created : e.Start,
                        End = e.End == DateTime.MinValue ? e.Created : e.End,
                        GoogleID = e.ID,
                        ProjectID = projectid
                    };
                    db.Tasks.Add(task);
                }else{
                    result.Updated++;
                    existTask.Title = e.Summary;
                    existTask.Start = e.Start == DateTime.MinValue ? e.Created : e.Start;
                    existTask.End = e.End == DateTime.MinValue ? e.Created : e.End;
                    db.Entry(existTask).State = EntityState.Modified;
                }
                
            }
            db.SaveChanges();
            return result;
        }
    }
}