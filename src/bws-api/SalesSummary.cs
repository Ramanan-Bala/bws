using System;

namespace bws_api
{
    public class SalesSummary
    {
        public int Id { get; set; }
        public int BrokerId { get; set; }
        public string BillNumber { get; set; }
        public string BillDate { get; set; }
        public decimal BillQuantity { get; set; }
        public decimal BillAmount { get; set; }
        public string BrokerName { get; set; }
    }
}