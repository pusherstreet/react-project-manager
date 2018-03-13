using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace project_manager.Models
{
    public class UserToProject : IUserData
    {
        public int UserToProjectID{ get; set; }
        public Guid UserID { get; set; }
        public int ProjectID { get; set; }
    }
}