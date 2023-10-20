using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace POS.Models
{
    public class CarOptionCategory
    {
        public decimal id { get; set; }
        public string name { get; set; }
        public decimal priceMc { get; set; }
        public decimal priceSc { get; set; }
        public string creator { get; set; }
        public string creationDate { get; set; }
    }
    public class CarWash
    {
        public decimal id { get; set; }
        public string currencyRatio { get; set; }
        public decimal netTotalMc { get; set; }
        public decimal netTotalSc { get; set; }
        public string creator { get; set; }
        public string vehiceType { get; set; }
        public List<decimal> washSubCategoriesId { get; set; }
    }
}