using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace POS.Models
{
    public class CreateCustomer
    {
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string middleName { get; set; }
        public string address { get; set; }
        public string mobileNum { get; set; }
        public string hasAmanaCard { get; set; }
        public List<CreateCar> cars { get; set; }
    }

    public class Customer
    {
        public decimal id { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string middleName { get; set; }
        public string address { get; set; }
        public string mobileNum { get; set; }
        public bool hasAmanaCard { get; set; }
        public List<Car> cars { get; set; }
    }

    public class Car
    {
        public decimal id { get; set; }
        public string carPlate { get; set; }
        public string plateNumber { get; set; }
        public string type { get; set; }
    }

    public class CreateCar
    {
        public string carPlate { get; set; }
        public string plateNumber { get; set; }
        public string type { get; set; }
    }
}