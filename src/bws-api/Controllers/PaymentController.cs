using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Dapper;
using System;

namespace bws_api.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class PaymentController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAll(int id, string paymentField, DateTime from, DateTime to)
        {
            string query = "SELECT b.BrokerName ,p.PaymentDate ,p.PaymentAmount,p.BrokerID,p.Id " +
                    "FROM payment p " +
                    "LEFT JOIN brokers b on p.BrokerId = b.Id " +
                    "WHERE PaymentField = @paymentField AND PaymentDate BETWEEN @from AND @to ";

            if (id > 0)
            {
                query = query + " AND BrokerId = @id";
            }
            using (var con = Connect())
            {
                var payment = con.Query<Payment>(query, new { id, paymentField, from, to });
                return Ok(payment);
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            using (var con = Connect())
            {
                var payment = con.QuerySingle<Payment>("SELECT * FROM payment where Id=@id", new { id });
                return Ok(payment);
            }
        }

        [HttpPost]
        public IActionResult Post(Payment payment)
        {
            using (var con = Connect())
            {
                payment.Id = con.QuerySingle<int>("INSERT INTO payment (PaymentField,PaymentDate,BrokerId,PaymentAmount)" +
                "VALUES (@paymentField,@paymentDate,@brokerId,@paymentAmount);SELECT last_insert_id()", payment);
                return CreatedAtAction(nameof(GetById), new { id = payment.Id }, payment);
            }
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Payment payment)
        {
            if (id != payment.Id)
            {
                return BadRequest("Id MisMatch");
            }
            using (var con = Connect())
            {
                con.Execute("UPDATE payment SET PaymentField=@paymentField,PaymentDate=@paymentDate, BrokerId=@brokerId,PaymentAmount=@paymentAmount" +
                " WHERE Id=@id", payment);
                return Ok(payment);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            using (var con = Connect())
            {
                var affectedCount = con.Execute("delete from payment where Id = @id", new { id });
                if (affectedCount == 0)
                {
                    return NotFound("payment id not found");
                }
                return NoContent();
            }

        }

        [HttpGet("balance/{brokerId}/{field}")]
        public IActionResult GetBalance(int brokerId, string field)
        {
            field = field.ToUpper();
            using (var con = Connect())
            {
                var balance = con.ExecuteScalar<decimal>("select sum(c.CalcAmount) - IFNULL(sum(p.PaymentAmount),0) ToBePaid " +
                            "from calc c " +
                            "left join payment p on c.BrokerId = p.BrokerId and c.CalcField = p.PaymentField " +
                            "where c.CalcField = @field and c.BrokerId = @brokerId " +
                            "group by c.BrokerId", new { brokerId, field });
                return Ok(new { brokerId = brokerId, Field = field, Balance = balance });
            }
        }

        private MySqlConnection Connect()
        {
            var con = new MySqlConnection("server=localhost;database=bws;user id=root;password=tbm@123");
            con.Open();
            return con;
        }
    };
}