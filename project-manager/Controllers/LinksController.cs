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
    [Route("api/links")]
    public class LinksController : Controller
    {
        private Context db;
        public LinksController(Context _db){
            db = _db;
        }
        [HttpPost]
        public void Post([FromBody]TaskLine link){
            if(link == null){
                HttpContext.Response.StatusCode = 500;
            }
            db.Add(link);
            db.SaveChanges();
        }
    }
}