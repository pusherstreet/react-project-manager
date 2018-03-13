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
    [Route("api/projects")]
    public class ProjectController: BaseController{
        public ProjectController(Context _db) : base(_db){
            db = _db;
        }
        [HttpGet]
        public IEnumerable<Project> Get(){
            return GetUserData(db.Projects);
        }
    }
}