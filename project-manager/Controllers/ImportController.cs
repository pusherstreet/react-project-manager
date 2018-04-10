using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using project_manager.Models;
using Microsoft.AspNetCore.Authorization;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using System.IO;

namespace project_manager.Controllers
{
    [Produces("application/json")]
    [Route("api/import")]
    [Authorize]
    public class ImportController : BaseController
    {
        public ImportController(Context context): base(context)
        {
            db = context;
        }

        [Route("gevents")]
        [HttpPost]
        public ImportResult ImportGoogleEvents([FromBody]GoogleImportModel model){
            var eventsList = model.events;
            int projectID = model.projectID;

            int count = db.Tasks.Count();
            var userid = db.Users.FirstOrDefault(x => x.Email == User.Identity.Name).UserID;
            var result = new ImportResult();
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
                        ProjectID = projectID
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
        [Route("excel/{projectID}")]
        [HttpPost]
        public ImportResult ExcelImport([FromForm]IFormFile file, int projectID){
            using(var stream = file.OpenReadStream()){
                using(var excel = new ExcelPackage(stream)){

                }
            }
            return null;
        }
    }
    public class GoogleImportModel{
        public int projectID {get; set;}
        public IEnumerable<GoogleEvent> events {get; set;}
    }
}