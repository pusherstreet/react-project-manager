using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using project_manager.Models;
using Microsoft.AspNetCore.Authorization;
using project_manager.Utis;

namespace project_manager.Controllers
{
    public class BaseController: Controller{
        protected Context db;
        public BaseController(Context _db){
            db = _db;
        }
        protected IEnumerable<T> GetUserData<T>(IQueryable<T> list) where T : IUserData{
            
            if(!Request.IsAjax() && User.Identity.Name == null){
                return list;
            }
            var userid = db.Users.FirstOrDefault(x => x.Email == User.Identity.Name).UserID;
            return list.Where(x => x.UserID == userid);
        }
    }
}