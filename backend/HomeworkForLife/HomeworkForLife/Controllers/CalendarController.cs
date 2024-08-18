using HomeworkForLife.Models;
using Microsoft.AspNetCore.Mvc;

namespace HomeworkForLife.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CalendarController : ControllerBase
    {
        private readonly ILogger<CalendarController> _logger;
        private readonly HomeworkForLifeContext _context;

        public CalendarController(ILogger<CalendarController> logger, HomeworkForLifeContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet("GetDays")]
        public IList<Day> GetDays()
        {
            var daysFromDb = _context.Day.ToList();

            return daysFromDb;
        }

        [HttpPost("AddDay")]
        public Task AddDay(Day day)
        {
            _logger.LogInformation("Adding day to database");
            var ifDayExists = _context.Day.FirstOrDefault(x => x.Date.Date == day.Date.Date);
            if (ifDayExists == null)
            {
                _context.Day.Add(day);
            }
            else
            {
                ifDayExists.Note = day.Note;
            }
            
            _logger.LogInformation("Saving day to database");
            _context.SaveChanges();

            return Task.CompletedTask;
        }
    }
}
