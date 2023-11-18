using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace POS.Models
{
    public class EOD
    {
        public decimal id { get; set; }
        public string currencyRatio { get; set; }
        public int numberOfEmployeesShift1 { get; set; }
        public int numberOfEmployeesShift2 { get; set; }
        public int numberOfEmployeesShift3 { get; set; }
        public decimal cashUsd { get; set; }
        public decimal cashLbp { get; set; }
        public List<ShiftEOD> shifts { get; set; }
        public List<KardHasanPayments> kardHasanPayments { get; set; }
        public List<EPayments> ePayments { get; set; }
    }

    public class EodPaylod
    {
        public string date { get; set; }

    }

    public class ShiftEOD
    {
        public decimal id { get; set; }
        public int shiftNumber { get; set; }
        public List<WetProductEOD> wetProductSummaries { get; set; }
        public List<GazProductSummary> gazProductSummaries { get; set; }
        public List<EmployeeWetProductSummary> employeeWetProductSummaries { get; set; }
        public List<DryProductSummaries> dryProductSummaries { get; set; }
        public List<StationServiceSummaries> stationServiceSummaries { get; set; }
        public List<EmployeeDryProductSummaries> employeeDryProductSummaries { get; set; }
        public List<EmployeeStationServiceSummaries> employeeStationServiceSummaries { get; set; }
        public List<CarWashSummariy> carWashSummaries { get; set; }
        public List<EmployeeCarWashSummaries> employeeCarWashSummaries { get; set; }
        public List<EmployeeMoneyAmounts> employeeMoneyAmounts { get; set; }
    }

    public class CarWashSummariy
    {
        public string name { get; set; }
        //public VehicleType vehiceType;//which is the predefined enum {	CAR, MOTO_CYCLE, TRUCK,RANGE,BUS}
        public decimal currentPriceLbp { get; set; }
        public decimal currentPriceUsd { get; set; }
        public int quantityWashedCash { get; set; }
        public decimal totalCashLbp { get; set; }
        public decimal totalCashUSd { get; set; }
    }


    public class WetProductEOD
    {
        public decimal wetProductId { get; set; }
        public string wetProductName { get; set; }
        public List<NozzleEOD> nozzleSummaries { get; set; }
    }

    public class NozzleEOD
    {
        public int nozzleNumber { get; set; }
        public int tankNumber { get; set; }
        public decimal initialCounter { get; set; }
        public decimal finalCounter { get; set; }
        public decimal totalLittersSold { get; set; }
        public decimal littersReturned { get; set; }
        public decimal totalLittersSoldCash { get; set; }
        public decimal currentUnitPriceOfLitterLbp { get; set; }
        public decimal currentUnitPriceOfLitterUsd { get; set; }
        public decimal totalCashAmountLbp { get; set; }
        public decimal totalCashUsd { get; set; }
    }

    public class GazProductSummary
    {
        public decimal productId { get; set; }
        public string productName { get; set; }
        public int quantitySaledCash { get; set; }
        public decimal totalCashLbp { get; set; }
        public decimal totalCashUSd { get; set; }
        public decimal currentPriceLbp { get; set; }
        public decimal currentPriceUsd { get; set; }
    }

    public class EmployeeWetProductSummary
    {
        public decimal employeeId { get; set; }
        public string employeeName { get; set; }
        public List<EmployeeWetProduct> employeeWetProducts { get; set; }
    }

    public class EmployeeWetProduct
    {
        public decimal wetProductId { get; set; }
        public string wetProductName { get; set; }
        public decimal littersAmount { get; set; }
        public decimal totalLbp { get; set; }
        public decimal totalUsd { get; set; }
    }


    public class DryProductSummaries
    {
        public long productId { get; set; }
        public string productName { get; set; }
        public string category { get; set; }
        public int purchasedQuantity { get; set; }
        public int quantityAtStart { get; set; }
        public int quantitySaledCash { get; set; }
        public decimal totalCashLbp { get; set; }
        public decimal totalCashUSd { get; set; }
        public decimal discountAmount { get; set; }
        public decimal currentPriceLbp { get; set; }
        public decimal currentPriceUsd { get; set; }
    }

    public class StationServiceSummaries
    {
        public string serviceType;
        public string name { get; set; }
        public decimal currentPriceLbp { get; set; }
        public decimal currentPriceUsd { get; set; }
        public int quantity { get; set; }
        public decimal totalCashLbp { get; set; }
        public decimal totalCashUSd { get; set; }
    }

    public class EmployeeDryProductSummaries
    {
        public string employeeId { get; set; }
        public string employeeName { get; set; }
        public int quantity { get; set; }
        public decimal totalLbp { get; set; }
        public decimal totalUsd { get; set; }
    }

    public class EmployeeStationServiceSummaries
    {
        public string employeeId { get; set; }
        public string employeeName { get; set; }
        public int numberOfStationServices { get; set; }
        public decimal stationServicesTotalLbp { get; set; }
        public decimal stationServicesTotalUsd { get; set; }
    }

    public class EmployeeCarWashSummaries
    {
        public string employeeId { get; set; }
        public string employeeName { get; set; }
        public int quantity { get; set; }
        public decimal totalLbp { get; set; }
        public decimal totalUsd { get; set; }
    }

    public class EmployeeMoneyAmounts
    {
        public string employeeId { get; set; }
        public string employeeName { get; set; }
        public List<MoneyAmount> moneyAmounts { get; set; }
    }

    public class MoneyAmount
    {
        public int quantity { get; set; }
        public int currencyCardUsd { get; set; }
        public int currencyCardLbp { get; set; }
    }

    public class KardHasanPayments
    {
        public string name { get; set; }
        public string accountNumber { get; set; }
        public string receiptNumber { get; set; }
        public string checkNumber { get; set; }
        //public CurrencyType currencyCheck { get; set; }
        public decimal checkValue { get; set; }
        public  string description { get; set; }
        public  decimal usdAmount { get; set; }
        public decimal lbpAmount { get; set; }
}

    public class EPayments
    {
        public string name { get; set; }
        public string accountNumber { get; set; }
        public int numberOfReceipts { get; set; }
        public string checkNumber { get; set; }
        public string dueDate { get; set; }
        public string receiveDate { get; set; }
        public decimal usdAmount { get; set; }
        public decimal lbpAmount { get; set; }
    }


}