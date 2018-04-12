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
                    var worksheet = excel.Workbook.Worksheets["Tasks Report"];
                    int rowsCount = worksheet.Dimension.Rows;
                    var excelHelper = new ExcelHelper(worksheet);
                    var result = new ImportResult();
                    for(int i = 2; i <= rowsCount; i++){
                        excelHelper.CurrentRow = i;
                        int id = excelHelper.GetValue<int>(1);
                        var task = db.Tasks.Find(id);

                        string title = excelHelper.GetValue<string>(2);
                        int status = GetStatusFromName(excelHelper.GetValue<string>(3));
                        DateTime start = excelHelper.GetValue<DateTime>(4);
                        DateTime end = excelHelper.GetValue<DateTime>(5);
                        string description = excelHelper.GetValue<string>(6);

                        if(task != null){
                            result.Updated++;
                            task.Title = title;
                            task.StatusID = status;
                            task.Start = start;
                            task.End = end;
                            task.Description = description;
                            db.Entry(task).State = EntityState.Modified;
                        }else{
                            result.Added++;
                            var newEntry = new project_manager.Models.Task(){
                                TaskID = db.Tasks.Count() + 1,
                                Title = title,
                                Description = description,
                                Start = start,
                                End = end,
                                StatusID = status,
                                Created = DateTime.Now,
                                ProjectID = projectID
                            };
                            db.Tasks.Add(newEntry);
                        }
                    }
                    db.SaveChanges();
                    return result;
                }
            }
        }
        private int GetStatusFromName(string name){
            var status = db.Statuses.FirstOrDefault(x => x.Name == name);
            return status != null ? status.StatusID : 1;
        }
    }
    public class GoogleImportModel{
        public int projectID {get; set;}
        public IEnumerable<GoogleEvent> events {get; set;}
    }
    public class ExcelHelper{
        private ExcelWorksheet worksheet;
        public int CurrentRow { get; set;}
        public ExcelHelper(ExcelWorksheet _worksheet){
            worksheet = _worksheet;
        }
        public T GetValue<T>(int c){
            T value = worksheet.Cells[CurrentRow, c].GetValue<T>();
            return value;
        }
    }
}