using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Dapper;
using System;
using System.Linq;
using System.ComponentModel.DataAnnotations;

namespace bws_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class Calculation2Controller : ControllerBase
    {
    
        [HttpPost]
        public IActionResult Update(CalcRequest calc)
        {

            string qry = "SELECT BrokerId, BrokerName, BillDate CalcDate, TotalSales, " +
                        "c.ConfigPercentage CalcPercentage, TotalSales * (c.ConfigPercentage/100) CalcAmount " +
                        "FROM " +
                        "(SELECT ss.BrokerId, b.BrokerName, ss.BillDate, SUM(ss.BillAmount) TotalSales " +
                        "FROM sales_summary ss " +
                        "LEFT JOIN brokers b on ss.BrokerId = b.Id " +
                        "GROUP BY ss.BrokerId, ss.BillDate) ss " +
                        "INNER JOIN config c on ss.TotalSales BETWEEN c.FromAmount AND c.ToAmount " +
                        "WHERE c.ConfigField = @calcField AND ss.BillDate BETWEEN @from AND @to ";
            if (calc.BrokerId > 0)
            {
                qry = qry + "AND ss.BrokerId = @brokerId ";
            }
            qry = qry + "ORDER BY BrokerName, BillDate";

            using (var con = Connect())
            {
                var calculations = con.Query<Calculation>(qry, calc);
                UpdateCalc(calc.CalcField, calc.From, calc.To, calculations.ToArray());
                return Ok(new { Success = true, Message = "Calculated successfully" });
            }
        }

        private void UpdateCalc(string calcField, DateTime from, DateTime to, Calculation[] calculations)
        {
            using (var con = Connect())
            {
                var dbCalculations = con.Query<Calculation>(
                    "UPDATE Calc SET Changed=0 WHERE CalcField=@calcField AND CalcDate BETWEEN @from AND @to; " +
                    "SELECT Id, CalcDate, BrokerId, TotalSales, CalcPercentage, CalcAmount " +
                    "FROM Calc c " +
                    "WHERE c.CalcField=@calcField AND c.CalcDate BETWEEN @from AND @to",
                    new { calcField, from, to }).ToList();

                foreach (var calc in calculations)
                {
                    int records = con.ExecuteScalar<int>("SELECT COUNT(*) FROM Calc " +
                    "WHERE CalcField=@calcField " +
                    "AND CalcDate=@calcDate AND BrokerId=@brokerId",
                    new
                    {
                        calcField,
                        calc.CalcDate,
                        calc.BrokerId
                    });

                    if (records == 0)
                    {
                        // insert
                        con.Execute("INSERT INTO Calc(CalcField, CalcDate, BrokerId, CalcAmount, " +
                            "TotalSales, CalcPercentage, Changed) " +
                            "VALUES(@calcField, @calcDate, @brokerId, @calcAmount, @totalSales, @calcPercentage, 1)",
                            new { calcField, calc.CalcDate, calc.BrokerId, calc.CalcAmount, calc.TotalSales, calc.CalcPercentage });
                    }
                    else if (records > 0)
                    {
                        // update
                        con.Execute("UPDATE Calc SET CalcAmount=@calcAmount, TotalSales=@totalSales, " +
                            "CalcPercentage=@calcPercentage, Changed=1 " +
                            "WHERE CalcField=@calcField AND CalcDate=@calcDate AND BrokerId=@brokerId",
                            new { calcField, calc.CalcDate, calc.BrokerId, calc.CalcAmount, calc.TotalSales, calc.CalcPercentage });
                    }
                }
                // delete
                con.Execute("DELETE FROM Calc WHERE CalcField=@calcField AND Changed=0 AND CalcDate BETWEEN @from AND @to",
                    new { calcField, from, to });
            }

        }

        // [HttpDelete("{date1},{date2}")]
        // public IActionResult Delete(string date1, string date2)
        // {
        //     using (var con = Connect())
        //     {
        //         var affectedCount = con.Execute("delete from calc where CalcDate between '@date1' and '@date2'", new { date1, date2 });
        //         if (affectedCount == 0)
        //         {
        //             return NotFound("Broker id not found");
        //         }
        //         return NoContent();
        //     }

        // }

        private MySqlConnection Connect()
        {
            var con = new MySqlConnection("server=localhost;database=bws;user id=root;password=tbm@123");
            con.Open();
            return con;
        }
    }
}