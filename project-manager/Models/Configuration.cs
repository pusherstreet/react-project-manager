using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace project_manager.Models
{
    public class Configuration : IUserData{
        public int ConfigurationID {get; set;}
        public Guid UserID {get; set;}
        public User User {get; set;}
        public string Theme {get; set;}
        public bool Notifications {get; set;}
    }
}