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
        [Route("gevents")]
        [HttpPost]
        public void ImportGoogleEvents([FromBody]IEnumerable<GoogleEvent> events){
            var eventsList = events;
        }
    }
}