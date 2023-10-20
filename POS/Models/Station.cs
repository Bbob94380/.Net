using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace POS.Models
{
    public class Station
    {
        public decimal id { get; set; }
        public string stationName { get; set; }
        public string stationNumber { get; set; }
        public string stationManagerName { get; set; }
        public string location { get; set; }
    }

    public class StationToPO
    {
        public decimal po_id { get; set; }
        public decimal truck_id { get; set; }
        public decimal do_id { get; set; }
        public decimal stationId { get; set; }
        public List<StationDetail> addStationDetails { get; set; }
    }

    public class StationDetail
    {
        public decimal subTankId { get; set; }
        public decimal wetProductId { get; set; }
        public decimal productVolume { get; set; }
    }

}