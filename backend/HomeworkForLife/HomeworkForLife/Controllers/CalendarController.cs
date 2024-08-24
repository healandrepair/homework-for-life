using HomeworkForLife.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
        public async Task<IActionResult> AddDay(Day day)
        {
            // Set Date to the current timezone.
            day.Date = day.Date.ToLocalTime();
            _logger.LogInformation("Adding day to database");
            Console.WriteLine("Adding day to database");

            var ifDayExists = await _context.Day.FirstOrDefaultAsync(x => x.Date.Date == day.Date.Date);
            if (ifDayExists == null)
            {
                day.Id = 0;
                _context.Day.Add(day);
            }
            else
            {
                ifDayExists.Note = day.Note;
            }
            
            _logger.LogInformation("Saving day to database");
            Console.WriteLine("Saving day to database");
            await _context.SaveChangesAsync();

            _logger.LogInformation("Saved day to database");
            return Ok();
        }
    }
}
