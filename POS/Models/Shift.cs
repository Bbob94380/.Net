using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace POS.Models
{

    public class ShiftPayload
    {
        public string id { get; set; }
        public string employeeName { get; set; }
        public string employeeId { get; set; }
        public string shiftNumber { get; set; }
        public string dateOfCreation { get; set; }
        public string timeOfCreation { get; set; }
        public string closeTime { get; set; }
        public decimal totalLbp { get; set; }
        public decimal totalUsd { get; set; }
        public decimal wetProductTotalLbp { get; set; }
        public decimal wetProductTotalUsd { get; set; }
        public int numberOfItems { get; set; }
        public decimal dryProductTotalLbp { get; set; }
        public decimal dryProductTotalUsd { get; set; }
        public int numberOfVehicles { get; set; }
        public decimal carWashTotalLbp { get; set; }
        public decimal carWashTotalUsd { get; set; }
        public int numberOfStationServices { get; set; }
        public decimal stationServicesTotalLbp { get; set; }
        public decimal stationServicesTotalUsd { get; set; }
        public int numberOfPostPaidCoupons { get; set; }
        public decimal postPaidCouponsTotalLbp { get; set; }
        public decimal postPaidCouponsTotalUSd { get; set; }
        public int numberOfRefunds { get; set; }
        public decimal refundTotalLbp { get; set; }
        public decimal refundTotalUsd { get; set; }
        public List<NozzleCounterShift> nozzleCounter { get; set; }
        public List<WetProductShift> wetProductSales { get; set; }
        public List<MoneyAmountsShift> moneyAmounts { get; set; }
    }


    public class NozzleCounterShift
    {
        public decimal id { get; set; }
        public decimal nozzleId { get; set; }
        public decimal wetProductId { get; set; }
        public int nozzleNumber { get; set; }
        public string startDateTime { get; set; }
        public string endDateTime { get; set; }
        public decimal litersCounterStart { get; set; }
        public decimal litersCounterEnd { get; set; }
        public decimal totalLbp { get; set; }
        public decimal totalUsd { get; set; }

    }

    public class WetProductShift
    {
        public decimal id { get; set; }
        public decimal wetProductId { get; set; }
        public decimal liters { get; set; }
        public string name { get; set; }
        public decimal amountLbp { get; set; }
        public decimal amountUsd { get; set; }
    }

    public class MoneyAmountsShift
    {
        public decimal id { get; set; }
        public int quantity { get; set; }
        public string currencyCardUsd { get; set; }
        public string currencyCardLbp { get; set; }

    }

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

    public class AssignNozzle
    {
        public int employeeId { get; set; }
        public string employeeName { get; set; }
        public List<decimal> nozzles { get; set; }

    }

    public class Amount
    {
        public int quantity { get; set; }
        public string currencyCardUsd { get; set; }
        public string currencyCardLbp { get; set; }
    }

}