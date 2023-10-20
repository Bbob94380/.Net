using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace POS.Models
{
    public class Reception
    {
        public decimal id { get; set; }
        public decimal delivOrderID { get; set; }
        public string supplierName { get; set; }
        public string driverName { get; set; }
        public bool truckNonConformityExists { get; set; }
        public IDictionary<string, string>  nonConf_Description { get; set; }
        public string receptionDate { get; set; }
        public string status { get; set; }
        public string creator { get; set; }
        public string sendState { get; set; }
        public string synchState { get; set; }
        public string creationDate { get; set; }
        public List<ReceivedSubTank> receivedSubTanks { get; set; }
        public List<TanksToBeFilled> tanksToBeFilled { get; set; }

    }

    public class ReceivedSubTank
    {
        public decimal id { get; set; }
        public decimal wetProductId { get; set; }
        public decimal subTankNumber { get; set; }
        public decimal volume { get; set; }
        public decimal quantity { get; set; }
        public decimal quantityOBS { get; set; }
        public bool nonConformityExists { get; set; }
        public bool seal_on_subTank_cover { get; set; }
        public bool seal_on_valve { get; set; }
        public bool subTankID_on_valve { get; set; }
        public bool fuel_below_indicator { get; set; }
        public bool fillingPayedByDriver { get; set; }
        public decimal ncFillingTransactionId { get; set; }

    }

    public class TanksToBeFilled
    {
        public decimal id { get; set; }
        public decimal tankId { get; set; }
        public decimal volumeBeforeReception { get; set; }
        public decimal volumeSoldDuringReception { get; set; }
        public decimal estVolAfterReception { get; set; }
        public decimal actualVolAfterReception { get; set; }
        public string qantitiesDifferenceReason { get; set; }
        public List<int> subTankNumbers { get; set; }

    }
}