using System;

namespace bws_api
{
    public class Calculation
    {
        public int Id { get; set; }
        public int BrokerId { get; set; }
        public string BrokerName { get; set; }
        public DateTime CalcDate { get; set; }
        public int TotalSales { get; set; }
        public float CalcPercentage { get; set; }
        public decimal CalcAmount { get; set; }
        public string CalcField { get; set; }
    }

    public class CalcRequest
    {
        public int BrokerId { get; set; }
        public string CalcField { get; set; }
        public DateTime From { get; set; }
        public DateTime To { get; set; }
    }
}