using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Dapper;
using System;

namespace bws_api.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class GetBalanceController : ControllerBase
    {
        // [HttpGet]
        // public IActionResult GetAll()
        // {
        //     using (var con = Connect())
        //     {
        //         var payment = con.Query<Broker>("SELECT * FROM payment");
        //         return Ok(payment);
        //     }
        // }
        [HttpGet]
        public IActionResult GetBalance(int id, string field)
        {
            using (var con = Connect())
            {
                var balance = con.ExecuteScalar<int>("select sum(c.CalcAmount) - IFNULL(sum(p.PaymentAmount),0) ToBePaid " +
                            "from calc c " +
                            "left join payment p on c.BrokerId = p.BrokerId and c.CalcField = p.PaymentField " +
                            "where c.CalcField = @field and c.BrokerId = @id " +
                            "group by c.BrokerId", new { id, field });
                return Ok(balance);
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