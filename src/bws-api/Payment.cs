namespace bws_api
{
    public class Payment
    {
        public int Id { get; set; }

        public string PaymentField { get; set; }

        public DateTime PaymentDate { get; set; }

        public int BrokerId { get; set; }

        public decimal PaymentAmount { get; set; }

    }

}