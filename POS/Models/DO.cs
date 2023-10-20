using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace POS.Models
{
    public class DO
    {
        public decimal id { get; set; }
        public decimal po_id { get; set; }
        public decimal truckId { get; set; }
        public string driverId { get; set; }
        public string deliveryDate { get; set; }
        public string status { get; set; }
        public string creator { get; set; }
        public string sendState { get; set; }
        public string synchState { get; set; }
        public string creationDate { get; set; }
        public List<decimal> stationIds { get; set; }

    }

    public class CreateDO
    {
        public decimal po_id { get; set; }
        public decimal truckId { get; set; }
        public string driverId { get; set; }
        public string deliveryDate { get; set; }
        public string creator { get; set; }
        public string status { get; set; }
        public List<decimal> stationIds { get; set; }
    }
}