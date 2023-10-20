using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace POS.Models
{
    public class WetProductType
    {
        public decimal id { get; set; }
        public string name { get; set; }
        public string productCode { get; set; }
        public string type { get; set; }
        public string abreviation { get; set; }
        public decimal priceMc { get; set; }
        public decimal priceSc { get; set; }
        public string creator { get; set; }
    }
}