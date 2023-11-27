using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace POS.Models
{
    public class Refund
    {

        public decimal id { get; set; }
        public int pumpNumber { get; set; }
        public int nozzleNumber { get; set; }
        public decimal tankId { get; set; }
        public int tankNumber { get; set; }
        public decimal volume { get; set; }
        public decimal wetProductId { get; set; }
        public decimal saleTransactionId { get; set; }

        public decimal currencyRatio { get; set; }
        public string creator { get; set; }
        public string creationDate { get; set; }
        public string fuelType { get; set; }

        //dry
        public decimal saleId { get; set; }
        public decimal customerId { get; set; }
        public string firstCardType { get; set; }
        public int firstCardId { get; set; }
        public string firstCardCurrency { get; set; }
        public decimal firstCardTypeAmount { get; set; }
        public decimal secondCardTypeAmount { get; set; }
        public decimal cachAmountMc { get; set; }
        public decimal cachAmountSc { get; set; }
        public decimal cardReturnedLc { get; set; }
        public decimal cardReturnedSc { get; set; }
        public decimal netTotalMc { get; set; } 
        public decimal netTotalSc { get; set; }
        public List<SaleDetail> saleDetailReturn { get; set; }
    }

    public class Calibration{

        public decimal tankId { get; set; }
        public decimal wetProductId { get; set; }
        public decimal saleTransactionId { get; set; }
        public string creator { get; set; }
    }

    public class CreateCalibration
    {

        public int tankNumber { get; set; }
        public decimal wetProductId { get; set; }
        public decimal saleTransactionId { get; set; }
        public int nozzleNumber { get; set; }
        public string creator { get; set; }
    }

    public class RefundDry
    {

        public string creator { get; set; }
        public decimal customerId { get; set; }
        public decimal saleId { get; set; }
        public int firstCardId { get; set; }
        public string firstCardType { get; set; }
        public string firstCardCurrency { get; set; }
        public decimal firstCardTypeAmount { get; set; }
        public decimal cachAmountMc { get; set; }
        public decimal netTotalMc { get; set; }
        public decimal netTotalSc { get; set; }
        public List<SaleDetailReturn> saleDetailReturn { get; set; }
    }

    public class SaleDetailReturn
    {
        public int productId { get; set; }
        public string productName { get; set; }
        public int quantity { get; set; }
        public decimal priceMc { get; set; }
        public decimal priceSc { get; set; }
        public decimal discountPercent { get; set; }
        public decimal netTotalMc { get; set; }
        public decimal netTotalSc { get; set; }
    }


}