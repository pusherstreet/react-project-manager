using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace project_manager.Models
{
    public class GoogleEvent{
        public string ID {get; set;}
        public DateTime Created {get; set;}
        public GoogleUser Creator {get; set;}
        public DateTime Start {get; set;}
        public DateTime End {get; set;}
        public GoogleUser Organizer {get; set;}
        public string Status {get; set;}
        public string Summary {get; set;}

    }
    public class GoogleUser{
        public string Email {get; set;}
        public string DisplayName {get; set;}
        public bool Self {get; set;}
    }
}