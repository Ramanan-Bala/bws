using System;

namespace bws_api
{
    public class Calc
    {
        public int Id { get; set; }
        public string Calcfield { get; set; }
        public DateTime CalcDate { get; set; }
        public decimal CalcAmount { get; set; }
        public int BrokerId { get; set; }
    }
}