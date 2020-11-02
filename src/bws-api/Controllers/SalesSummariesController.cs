using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Dapper;

namespace bws_api.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class SalesSummaryController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAll()
        {
            using (var con = Connect())
            {
                var summary = con.Query<SalesSummary>("select s.Id ,s.BrokerId , s.BillNumber , date_format(s.BillDate , '%Y-%m-%d') billDate , s.BillQuantity , s.BillAmount ,b2.BrokerName" +
                   " from sales_summary s left join brokers b2 on s.BrokerId = b2.Id ");
                return Ok(summary);
            }
        }
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            using (var con = Connect())
            {
                var summary = con.QuerySingle<SalesSummary>("select s.Id ,s.BrokerId , s.BillNumber , date_format(s.BillDate , '%Y-%m-%d') billDate , s.BillQuantity , s.BillAmount ,b2.BrokerName" +
                   " from sales_summary s left join brokers b2 on s.BrokerId = b2.Id WHERE s.Id=@id", new { id });
                return Ok(summary);
            }
        }

        [HttpPost]
        public IActionResult Post(SalesSummary summary)
        {
            using (var con = Connect())
            {
                summary.Id = con.QuerySingle<int>("INSERT INTO sales_summary (BrokerId,BillNumber,BillDate,BillQuantity,BillAmount)" +
                "VALUES (@brokerId,@billnumber,@billDate,@billQuantity,@billAmount);SELECT last_insert_id()", summary);
                return CreatedAtAction(nameof(GetById), new { id = summary.Id }, summary);
            }
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, SalesSummary summary)
        {
            if (id != summary.Id)
            {
                return BadRequest("Id MisMatch");
            }
            using (var con = Connect())
            {
                con.Execute("UPDATE sales_summary SET BrokerId=@brokerId,BillNumber=@billNumber,BillDate=@billDate,BillQuantity=@billQuantity,BillAmount=@billAmount" +
                " WHERE Id=@id", summary);
                return Ok(summary);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            using (var con = Connect())
            {
                var affectedCount = con.Execute("delete from sales_summary where Id = @id", new { id });
                if (affectedCount == 0)
                {
                    return NotFound("Summary not found");
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