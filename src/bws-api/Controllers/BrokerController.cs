using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

namespace bws_api.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class BrokerController : ControllerBase
    {
        public MySqlConnection Connect()
        {

        }
    }
}