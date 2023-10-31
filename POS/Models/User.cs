using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace POS.Models
{
    public class User
    {
        public string id { get; set; } //receipt id
        public string name { get; set; }
        public string employee { get; set; }
        public string[] roles { get; set; }
    }
}