using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace POS.Models
{
    public class CreateTransaction
    {
        public decimal id { get; set; }
        public decimal firstCardTypeAmount { get; set; }
        public decimal secondCardTypeAmount { get; set; }
        public string firstCardType { get; set; }
        public string secondCardType { get; set; }
        public string firstCardId { get; set; }
        public string secondCardId { get; set; }
        public string firstCardCurrency { get; set; }
        public string secondCardCurrency { get; set; }
        public decimal netTotalMc { get; set; }
        public decimal netTotalSc { get; set; }
        public decimal cachAmountMc { get; set; }
        public decimal cachAmountSc { get; set; }
        public decimal invoiceAmountMc { get; set; }
        public decimal invoiceAmountSc { get; set; }
        public decimal currencyRatio { get; set; }
        public CreateSaleInvoice saleInvoice { get; set; }
        public List<TransactionDetail> saleTransactions { get; set; }
        public List<CarWash> carWashes { get; set; }
        public CustomerServiceTransaction customerServiceTransaction { get; set; }
        public string creator { get; set; }
    }

    public class Transaction
    {
        public decimal id { get; set; }
        public decimal customerId { get; set; }
        public decimal numberOfTransactions { get; set; }
        public decimal firstCardTypeAmount { get; set; }
        public decimal secondCardTypeAmount { get; set; }
        public string firstCardType { get; set; }
        public string secondCardType { get; set; }
        public string firstCardId { get; set; }
        public string secondCardId { get; set; }
        public string firstCardCurrency { get; set; }
        public string secondCardCurrency { get; set; }
        public decimal netTotalMc { get; set; }
        public decimal netTotalSc { get; set; }
        public decimal cachAmountMc { get; set; }
        public decimal cachAmountSc { get; set; }
        public decimal invoiceAmountMc { get; set; }
        public decimal invoiceAmountSc { get; set; }
        public decimal currencyRatio { get; set; }
        public SaleInvoice saleInvoice { get; set; }
        public List<TransactionDetail> saleTransactions { get; set; }
        public string creationDate { get; set; }
        public string creator { get; set; }
    }

    public class SaleInvoice
    {
        public decimal id { get; set; }
        public decimal customerId { get; set; }
        public decimal currencyRatio { get; set; }
        public decimal firstCardTypeAmount { get; set; }
        public decimal secondCardTypeAmount { get; set; }
        public decimal cachAmountMc { get; set; }
        public decimal cachAmountSc { get; set; }
        public decimal discountPercent { get; set; }
        public decimal netTotalMc { get; set; }
        public decimal netTotalSc { get; set; }
        public List<SaleDetail> saleDetails { get; set; }
    }

    public class CreateSaleInvoice
    {
        public decimal id { get; set; }
        public decimal currencyRatio { get; set; }
        public decimal cachAmountMc { get; set; }
        public decimal cachAmountSc { get; set; }
        public decimal discountPercent { get; set; }
        public decimal netTotalMc { get; set; }
        public decimal netTotalSc { get; set; }
        public List<CreateSaleDetail> saleDetails { get; set; }
    }

    public class SaleDetail
    {
        public decimal id { get; set; }
        public int productId { get; set; }
        public string productName { get; set; }
        public int quantity { get; set; }
        public int allowedQuantity { get; set; }
        public decimal priceMc { get; set; }
        public decimal priceSc { get; set; }
        public decimal discountPercent { get; set; }
        public decimal netTotalMc { get; set; }
        public decimal netTotalSc { get; set; }
        public bool sc { get; set; }
    }

    public class CreateSaleDetail
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

    public class TransactionDetail
    {
        public decimal id { get; set; }
        public decimal currencyRatio { get; set; }
        public decimal wetProductId { get; set; }
        public decimal dispensedVolume { get; set; }
        public bool gas { get; set; }
        public int pumpNumber { get; set; }
        public int nozzleNumber { get; set; }
        public decimal firstCardTypeAmount { get; set; }
        public decimal secondCardTypeAmount { get; set; }
        public decimal cachAmountMc { get; set; }
        public decimal cachAmountSc { get; set; }
        public decimal priceMc { get; set; }
        public decimal priceSc { get; set; }
        public decimal netTotalMc { get; set; }
        public decimal netTotalSc { get; set; }
    }

    public class CustomerServiceTransaction
    {
        public decimal id { get; set; }
        public decimal customerId { get; set; }
        public string currencyRatio { get; set; }
        public decimal netTotalMc { get; set; }
        public decimal netTotalSc { get; set; }
        public List<decimal> servicesIds { get; set; }
        public string currentMileagePerKm { get; set; }
        public string newMileagePerKm { get; set; }
        public string nextServiceDue { get; set; }

    }


}