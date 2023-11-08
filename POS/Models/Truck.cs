using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace POS.Models
{
    public class Truck
    {
        public decimal id { get; set; }
        public decimal supplierId { get; set; }
        public int plateNumber { get; set; }
        public string engineNumber { get; set; }
        public string cheseNumber { get; set; }
        public string transportPartyNumber { get; set; }
        public decimal height { get; set; }
        public decimal width { get; set; }
        public decimal depth { get; set; }
        public string creator { get; set; }
        public string creationDate { get; set; }
        public List<SubTank> subTanks { get; set; }
    }

    public class CreateTruck
    {
        public string creator { get; set; }
        public decimal supplierId { get; set; }
        public int plateNumber { get; set; }
        public string engineNumber { get; set; }
        public string cheseNumber { get; set; }
        public string transportPartyNumber { get; set; }
        public decimal height { get; set; }
        public decimal width { get; set; }
        public decimal depth { get; set; }
        public List<CreateSubTank> subTanks { get; set; }
        public List<File> truckFiles { get; set; }
    }
}