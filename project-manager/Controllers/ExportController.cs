using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using project_manager.Models;
using Microsoft.AspNetCore.Authorization;
using System.IO;
using OfficeOpenXml;
using OfficeOpenXml.Style;

namespace project_manager.Controllers
{
    [Route("api/export")]
    public class ExportController: Controller {
        private Context db;
        public ExportController(Context _db){
            db = _db;
        }
        [Route("xlsx/{projectID}")]
        public void ExportCsv(int projectID){
            var tasks = db.Tasks.Include(x => x.Status).Where(x => x.ProjectID == projectID);
            using(var excel = new ExcelPackage()){
                var worksheet = excel.Workbook.Worksheets.Add("Tasks Report");
                worksheet.Cells[1, 1].Value = "Title";
                worksheet.Cells[1, 2].Value = "Status";
                worksheet.Row(1).Style.Font.Bold = true;

                int row = 2;
                foreach(var task in tasks){
                    worksheet.Cells[row, 1].Value = task.Title;
                    worksheet.Cells[row, 2].Value = task.Status.Name;
                    row++;
                }
                using(var stream = new MemoryStream()){
                    excel.SaveAs(stream);
                    byte[] array = stream.ToArray();
                    Response.Body.WriteAsync(array, 0, array.Length);
                }
            }
        }
    }
}