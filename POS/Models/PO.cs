using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace POS.Models
{
    public class PO
    {
        public decimal id { get; set; }
        public decimal supplierId { get; set; }
        public string supplierName { get; set; }
        public string status { get; set; }
        public string creator { get; set; }
        public string creationDate { get; set; }
        public int numOfTrucks { get; set; }
        public List<PODetail> poDetail { get; set; }
    }

    public class PODetail
    {
        public decimal id { get; set; }
        public decimal truckId { get; set; }
        public decimal driverId { get; set; }
        public List<POFuelAmountsDetail> poFuelAmountsDetail { get; set; }
    }

    public class POFuelAmountsDetail
    {
        public decimal id { get; set; }
        public decimal stationId { get; set; }
        public decimal wetProductId { get; set; }
        public decimal productVolume { get; set; }
        public decimal subTankId { get; set; }
    }

    public class CreatePO
    {
        public decimal supplierId { get; set; }
        public string supplierName { get; set; }
        public string status { get; set; }
        public string creator { get; set; }
        public int numOfTrucks { get; set; }
        public List<CreatePODetail> poDetail { get; set; }
    }

    public class CreatePODetail
    {
        public decimal truckId { get; set; }
        public decimal driverId { get; set; }
        public List<CreatePOFuelAmountsDetail> poFuelAmountsDetail { get; set; }
    }

    public class CreatePOFuelAmountsDetail
    {
        public decimal wetProductId { get; set; }
        public decimal productVolume { get; set; }
        public decimal subTankId { get; set; }
    }

}