using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace POS.Models
{
    public class Tank
    {
        public decimal id { get; set; }
        public decimal tankNumber { get; set; }
        public decimal height { get; set; }
        public decimal volume { get; set; }
        public WetProductType wetProduct { get; set; }
    }

    public class SubTank
    {
        public decimal id { get; set; }
        public int subTankNum { get; set; }
        public decimal subTankSize { get; set; }
        public decimal subTankUpSize { get; set; }
        public decimal subTankDownSize { get; set; }
    }

    public class CreateSubTank
    {
        public int subTankNum { get; set; }
        public decimal subTankSize { get; set; }
        public decimal subTankUpSize { get; set; }
        public decimal subTankDownSize { get; set; }
    }

    public class Dispenser
    {

    }
        
    public class Nozzle
    {
        public decimal id { get; set; }
        public int number { get; set; }
        public string wetProductId { get; set; }
        public string dispenser { get; set; }
        public string nozzleState { get; set; }
        public string nozzleWorkingState { get; set; }
        public string employeeName { get; set; }
        public string employeeId { get; set; }
        public decimal allLitersCounter { get; set; }
        public decimal litersCounterEnd { get; set; }
        public decimal dispenserId { get; set; }
        public string  wetProductName { get; set; }
        public string  wetProductType { get; set; }
        public decimal priceInUsd { get; set; }
        public decimal priceInLbp { get; set; }
        public string  creator { get; set; }
        public string  creationDate { get; set; }
        public string  deactivationDate { get; set; }
        public string  note { get; set; }
        public string  reasonOfDeactivation { get; set; }
    }


    public class NozzleAvailable
    {
        public decimal id { get; set; }
        public int number { get; set; }
        public string wetProductId { get; set; }
        public DispenserAvailable dispenser { get; set; }
        public string nozzleState { get; set; }
        public string nozzleWorkingState { get; set; }
        public string employeeName { get; set; }
        public string employeeId { get; set; }
        public decimal allLitersCounter { get; set; }
        public decimal litersCounterEnd { get; set; }
        public decimal dispenserId { get; set; }
        public string wetProductName { get; set; }
        public string wetProductType { get; set; }
        public decimal priceInUsd { get; set; }
        public decimal priceInLbp { get; set; }
        public string creator { get; set; }
        public string creationDate { get; set; }
        public string deactivationDate { get; set; }
        public string note { get; set; }
        public string reasonOfDeactivation { get; set; }
    }

    public class DispenserAvailable
    {
        public decimal id { get; set; }
        public string dispenserMode { get; set; }
        public List<Tank> tanks { get; set; }
    }


    public class FuelAmount
    {
        public decimal do_id { get; set; }
        public decimal station_id { get; set; }
    }

    public class FuelAmountDetail
    {
        public decimal wetProductId { get; set; }
        public decimal productVolume { get; set; }
        public decimal subTankId { get; set; }
        public decimal subTankSize { get; set; }
        public decimal subTankUpSize { get; set; }
        public decimal subTankDownSize { get; set; }
    }

}