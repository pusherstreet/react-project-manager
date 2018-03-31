using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace project_manager.Models
{
    public class Configuration{
        public int ConfigurationID {get; set;}
        public int UserID {get; set;}
        public User User {get; set;}
        public string CurrentTheme {get; set;}
    }
}