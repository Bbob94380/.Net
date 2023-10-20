using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace POS.Models
{
    public class Supplier
    {
        public decimal id { get; set; }
        public string companyName { get; set; }
        public string address { get; set; }
        public string phoneNumber { get; set; }
        public string secondPhoneNumber { get; set; }
        public string contactPerson { get; set; }
        public string contactEmail { get; set; }
        public string website { get; set; }
        public int registrationNumber { get; set; }
        public int numOfTrucks { get; set; }
        public int numOfPurchases { get; set; }
        public string creator  { get; set; }
        public string creationDate { get; set; }
    }

    public class CreateSupplier
    {
        public string companyName { get; set; }
        public string address { get; set; }
        public string phoneNumber { get; set; }
        public string secondPhoneNumber { get; set; }
        public string contactPerson { get; set; }
        public string contactEmail { get; set; }
        public string website { get; set; }
        public int registrationNumber { get; set; }
        public string creator { get; set; }
    }
}