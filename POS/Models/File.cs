using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace POS.Models
{
    public class File
    {
        public string fileName { get; set; }
        public string contentType { get; set; }
        public string size { get; set; }
        public string description { get; set; }
        public string notes { get; set; }
        public string attachementtype { get; set; }
        public string base64encoded { get; set; }
    }
}