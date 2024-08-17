using HomeworkForLife.Models;
using Microsoft.AspNetCore.Mvc;

namespace HomeworkForLife.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CalendarController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<CalendarController> _logger;
        private readonly HomeworkForLifeContext _context;

        public CalendarController(ILogger<CalendarController> logger, HomeworkForLifeContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet("GetWeatherForecast")]
        public IEnumerable<WeatherForecast> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }

        [HttpGet("GetDays")]
        public IList<Day> GetDays()
        {
            // var days = new List<Day>()
            // {
            //     new Day()
            //     {
            //         Date = new DateTime(2023, 1, 1),
            //         Note = "New Year's Day",
            //     }
            // };

            var daysFromDb = _context.Day.ToList();
        
            return daysFromDb;
        }
    }
}
