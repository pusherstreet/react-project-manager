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
    [Route("api/configuration")]
    public class ConfigurationController : BaseController{
        public ConfigurationController(Context _db): base(_db){
            db = _db;
        }

        [HttpGet]
        public Configuration Get(){
            var configuration = GetUserData<Configuration>(db.Configurations).FirstOrDefault();
            return configuration;
        }
        [HttpPut]
        public void Put([FromBody]Configuration configuration){
            db.Entry(configuration).State = EntityState.Modified;
            db.SaveChanges();
        }
    }
}