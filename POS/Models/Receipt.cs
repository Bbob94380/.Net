using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace POS.Models
{
    public class Receipt
    {
        public decimal id { get; set; } //receipt id
        public List<Transaction> transactions { get; set; }
        public string creationDate { get; set; }
        public string creator { get; set; }

    }
}