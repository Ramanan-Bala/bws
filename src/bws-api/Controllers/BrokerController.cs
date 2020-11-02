using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Dapper;

namespace bws_api.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class BrokerController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAll()
        {
            using (var con = Connect())
            {
                var brokers = con.Query<Broker>("SELECT * FROM brokers");
                return Ok(brokers);
            }
        }
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            using (var con = Connect())
            {
                var brokers = con.QuerySingle<Broker>("SELECT * FROM brokers WHERE Id=@id", new { id });
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
                return CreatedAtAction(nameof(GetById), new { id = broker.Id }, broker);
            }
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Broker broker)
        {
            if (id != broker.Id)
            {
                return BadRequest("Id MisMatch");
            }
            using (var con = Connect())
            {
                con.Execute("UPDATE brokers SET BrokerName=@brokerName,AddressLine1=@addressLine1,AddressLine2=@addressLine2,City=@city,ContactNumber=@contactNumber" +
                " WHERE Id=@id", broker);
                return Ok(broker);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            using (var con = Connect())
            {
                var affectedCount = con.Execute("delete from brokers where Id = @id", new { id });
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