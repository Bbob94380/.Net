using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace POS.Models
{
    public class SalesSummary
    {
        public int numberOfItems { get; set; }
        public decimal dryProductTotalLbp { get; set; }
        public decimal dryProductTotalUsd { get; set; }
        public int numberOfStationServices { get; set; }
        public decimal stationServicesTotalLbp { get; set; }
        public decimal stationServicesTotalUsd { get; set; }
        public int numberOfVehicles { get; set; }
        public decimal carWashTotalLbp { get; set; }
        public decimal carWashTotalUsd { get; set; }
        public List<WetProduct> wetProductDtos { get; set; }
        public int numberOfRefunds { get; set; }
        public decimal refundTotalLbp { get; set; }
        public decimal refundTotalUsd { get; set; }
        public CalibrationTransaction calibrationTransaction { get; set; }
        public int numberOfPostPaidCoupons { get; set; }
        public decimal postPaidCouponsTotalLbp { get; set; }
        public decimal postPaidCouponsTotalUSd { get; set; }
        public decimal totalLbp { get; set; }
        public decimal totalUsd { get; set; }
        public List<EmployeeSession> employeeSessionDtos { get; set; }

    }

    public class WetProduct
    {
        public string wetProductId { get; set; }
        public string name { get; set; }
        public decimal liters { get; set; }
        public decimal amountLbp { get; set; }
        public decimal amountUsd { get; set; }

    }

    public class EmployeeSession
    {
        public decimal previousCurrencyRatio { get; set; }
        public decimal currenctCurrencyRatio { get; set; }
        public decimal usdAmount { get; set; }
        public decimal lbpAmount { get; set; }
        public decimal requiredUsdAmount { get; set; }
        public decimal requiredLbpAmount { get; set; }
        public string startDateTime { get; set; }
        public string endDateTime { get; set; }
        public List<NozzleCounterArchive> nozzleCounterArchives { get; set; }

    }

    public class NozzleCounterArchive
    {
        public decimal nozzleId { get; set; }
        public decimal oldNozzleCounter { get; set; }
        public decimal newNozzleCounter { get; set; }
        public int nozzleNumber { get; set; }

    }

    public class CalibrationTransaction
    {
        public decimal id { get; set; }
        public decimal tankId { get; set; }
        public decimal wetProductId { get; set; }
        public decimal saleTransactionId { get; set; }
        public int nozzleNumber { get; set; }
        public decimal volume { get; set; }
        public int tankNumber { get; set; }
        public string fuelType { get; set; }
        public string stationId { get; set; }
        public string creator { get; set; }
        public string creatorId { get; set; }
        public string creationDate { get; set; }
        public string lastUpdate { get; set; }
        public string deactivationDate { get; set; }
        public string note { get; set; }
        public string reasonOfDeactivation { get; set; }


}

}