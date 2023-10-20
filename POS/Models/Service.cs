using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace POS.Models
{
    public class CreateService
    {
        public string name { get; set; }
        public decimal priceMc { get; set; }
        public decimal priceSc { get; set; }
        public string serviceType { get; set; }
    }

    public class Service
    {
        public decimal id { get; set; }
        public string name { get; set; }
        public decimal priceMc { get; set; }
        public decimal priceSc { get; set; }
        public string serviceType { get; set; }
    }
}