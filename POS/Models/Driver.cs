using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace POS.Models
{
    public class Driver
    {
        public decimal id { get; set; }
        public string name { get; set; }
        public string supplierId { get; set; }
        public string phoneNum { get; set; }
        public string drivingLisenceNum { get; set; }
        public string address { get; set; }
        public string creator { get; set; }
        public string creationDate { get; set; }
    }

    public class CreateDriver
    {
        public string name { get; set; }
        public string supplierId { get; set; }
        public string phoneNum { get; set; }
        public string drivingLisenceNum { get; set; }
        public string address { get; set; }
        public string creator { get; set; }
        public string creationDate { get; set; }
    }
}