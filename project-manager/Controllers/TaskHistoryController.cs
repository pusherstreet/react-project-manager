using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using project_manager.Models;
using Microsoft.AspNetCore.Authorization;
using System.IO;

namespace project_manager.Controllers
{
    [Route("api/history")]
    public class TaskHistoryController: BaseController {
        public TaskHistoryController(Context _db): base(_db){
            db = _db;
        }
        [Route("{taskid}")]
        public IEnumerable<TaskHistory> Get(int taskid){
            var list = db.TaskHistories.Include(x => x.Changes).Where(x => x.TaskID == taskid);
            return list;
        }
    }
}