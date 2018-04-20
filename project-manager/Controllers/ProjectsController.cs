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
        [HttpGet]
        [Route("users/{projectID}")]
        public IEnumerable<UserInfo> GetProjectUsers( int projectID){
            return db.UserToProjects.Include(x => x.User)
                .Where(x => x.ProjectID == projectID)
                .Select(x => x.User)
                .Distinct()
                .Select(x => new UserInfo{
                    UserID = x.UserID,
                    Email = x.Email
                });
        }
    }
    public class UserInfo{
        public Guid UserID {get; set;}
        public string Email {get; set;}
    }
}