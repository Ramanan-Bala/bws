using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Dapper;

namespace bws_api.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class CalculationController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAll()
        {
            using (var con = Connect())
            {
                var brokers = con.Query<Calc>("select BrokerId, BillDate, c.ConfigField, TotalSales * (c.ConfigPercentage/100) CommnAmount" +
                " from(select ss.BrokerId, ss.BillDate, sum(ss.BillAmount) TotalSales from sales_summary ss group by ss.BrokerId, ss.BillDate) ss" +
                " inner join config c on ss.TotalSales between c.FromAmount and c.ToAmount" +
                " where c.ConfigField = 'COMMN'" +
                " and ss.BillDate between '2020-10-01' and '2020-10-03'");
                return Ok(brokers);
            }
        }
        [HttpPost]
        public IActionResult Post(Broker broker)
        {
            using (var con = Connect())
            {
                broker.Id = con.QuerySingle<int>("INSERT INTO brokers (BrokerName,AddressLine1,AddressLine2,City,ContactNumber)" +
                "VALUES (@brokerName,@addressLine1,@addressLine2,@city,@contactNumber);SELECT last_insert_id()", broker);
                // return CreatedAtAction(nameof(GetById), new { id = broker.Id }, broker);
                return Ok();
            }
        }

        [HttpDelete("{date1},{date2}")]
        public IActionResult Delete(string date1, string date2)
        {
            using (var con = Connect())
            {
                var affectedCount = con.Execute("delete from calc where CalcDate between '@date1' and '@date2'", new { date1, date2 });
                if (affectedCount == 0)
                {
                    return NotFound("Broker id not found");
                }
                return NoContent();
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