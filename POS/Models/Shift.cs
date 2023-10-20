using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace POS.Models
{
    public class Shift
    {
        public string employeeName { get; set; }
        public string employeeId { get; set; }
        public string currencyRatio { get; set; }
        public string dateOfCreation { get; set; }
        public string timeOfCreation { get; set; }
        public List<NozzleCounter> nozzleCounters { get; set; }
    }

    public class CloseShift
    {
        public List<NozzleCounter> counters { get; set; }
        public List<Amount> amounts { get; set; }
    }

    public class CloseSession
    {
        public string usdAmount { get; set; }
        public string lbpAmount { get; set; }
        public string requiredUsdAmount { get; set; }
        public string requiredLbpAmount { get; set; }
        public string creationDate { get; set; }
        public string creationTime { get; set; }
        public string previousCurrencyRatio { get; set; }
        public string currenctCurrencyRatio { get; set; }
        public List<NozzleCounter> counters { get; set; }

    }

    public class NozzleCounter
    {
        public int nozzleNumber { get; set; }
        public string oldNozzleCounter { get; set; }
        public string newNozzleCounter { get; set; }

    }

    public class Amount
    {
        public int quantity { get; set; }
        public string currencyCardUsd { get; set; }
        public string currencyCardLbp { get; set; }
    }

}