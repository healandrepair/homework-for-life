import styles from '@/styles/calendar.module.css';
import DayComponent from "../../components/Day/dayComponent";
import {useEffect, useRef, useState} from "react";
import {Day} from "../../interfaces/day";

function calendar() {
    
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1)
    const [daysInYear, setDaysInYear] = useState<Day[]>([]);
    const [dayModalisOpen, setDayModalisOpen] = useState(false);
    const [dayModalContent, setDayModalContent] = useState<Day | null>(null);
    const [notesContent, setNotesContent] = useState<string>("");
    const [yearValue, setYear] = useState(new Date().getFullYear());
    const [notification, setNotification] = useState("");

    useEffect(() => {
        initialiseDays(new Date(yearValue).getFullYear());
    }, [currentMonth]);

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                setNotification("");
            }, 3000); // Auto-hide after 3 seconds

            return () => clearTimeout(timer);
        }
    }, [notification]);

    const months : { [key:number ]: string} = {
        1: "January",
        2: "February",
        3: "March",
        4: "April",
        5: "May",
        6: "June",
        7: "July",
        8: "August",
        9: "September",
        10:"October",
        11:"November",
        12:"December",
    }

    async function initialiseDays(year: number) {
        const dayArray: Day[] = [];

        for (let month = 1; month <= 12; month++) {
            const daysInMonth = new Date(yearValue, month, 0).getDate(); // Get the number of days in the month

            for (let day = 1; day <= daysInMonth; day++) {
                dayArray.push({
                    id: dayArray.length + 1,
                    day,
                    month,
                    note: "",
                    date: new Date(yearValue, month - 1, day)
                });
            }
        }

        const storedDays = await GetDays() ?? [];

        storedDays.forEach((day) => {
            // Convert the date string to a Date object
            const dateObject = new Date(day.date);

            if (dateObject.getFullYear() !== yearValue) { 
                return;
            }
            
            const month = dateObject.getMonth(); // 0-indexed (January is 0, December is 11)
            const dayOfMonth = dateObject.getDate(); // Day of the month

            // Calculate the day number in the year
            const daysInMonths = [31, isLeapYear(yearValue) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            let dayNumber = 0;

            // Sum up all the days in the previous months
            for (let i = 0; i < month; i++) {
                dayNumber += daysInMonths[i];
            }

            // Add the day of the current month to get the day of the year
            dayNumber += dayOfMonth;

            // Place the day in the correct position in the array (subtract 1 to get the correct index)
            const index = dayNumber - 1; // 0-indexed
            dayArray[index] = { ...day, date: dateObject };
        });

        setDaysInYear(dayArray);
    }

// Helper function to check if a year is a leap year
    function isLeapYear(year: number): boolean {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    const createDaysComponent = () => {
        let daysInCurrentMonth = daysInYear.filter((day) => day.month === currentMonth && day.date.getFullYear() === yearValue);

        const daysToReturn = daysInCurrentMonth.map((day) => (
            <DayComponent
                key={`${day.date}`}
                day={day.day}
                month={day.month}
                id={day.id}
                note= {`Note: ${day.note}`}
                hasNote={day.note !== ""}
                onClick={() => OpenDayModal(day)}
            />
        ))
        return daysToReturn;
    };

    const previousMonth = () => {
        if (currentMonth === 1) {
            setCurrentMonth(12);
            initialiseDays(new Date().getFullYear() - 1);
            setYear(yearValue - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const nextMonth = () => {
        if (currentMonth === 12) {
            setCurrentMonth(1);
            initialiseDays(new Date().getFullYear() + 1);
            setYear(yearValue + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };
    
    const OpenDayModal = (day : Day) => {
        console.log("Open Day Modal");
        setDayModalisOpen(true);
        setDayModalContent(day)
    }
    
    const CloseDayModal = () => { 
        console.log("Close Day Modal");
        
        setDayModalisOpen(false);
        setDayModalContent(null)
        setNotesContent("");
    }
    
    async function GetDays() {
        
        const fetchDays = await fetch('http://localhost:5240/api/Calendar/GetDays');
        
        const days : Day[] = await fetchDays.json();

        if (fetchDays.ok) {
            // Convert `date` strings to `Date` objects
            const daysConvert = days.map(day => ({
                ...day,
                day: day.date ? new Date(day.date).getDate() : -1, // Convert if `day.date` is not null
                date: day.date ? new Date(day.date) : "2023-01-01", // Convert if `day.date` is not null
                month: day.date? new Date(day.date).getMonth() + 1: -1
            }))
            
            return daysConvert;
        }

        else {
            console.log("Error fetching days");
        }
    }
    
    async function handleNotesChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setNotesContent(event.target.value);
    }
    
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {

        event.preventDefault();
        
        if (dayModalContent != null) {
            dayModalContent.note = notesContent;

            await AddDayData(dayModalContent);
            setNotification("Note added successfully✅✅");
        }
    }
    
    async function AddDayData(day: Day) {
        console.log(typeof(day))
        console.log(day)
        try {
            const response = await fetch('http://localhost:5240/api/Calendar/AddDay', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(day)
            });

            if (response.ok) {
                console.log("Day added successfully");
            }
            else {
                console.log("Error adding day");
            }
        }
        catch (error) { 
            console.log("Error occurreddd")
        }
    }
    
    return (
        <div>
            <h2 className={styles.calendarHeading}>Calendar</h2>
            <h1 className={styles.heading}>{months[currentMonth]} {yearValue}</h1>
            {dayModalisOpen && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h1>{dayModalContent?.day} {months[currentMonth]}</h1>
                        <p>Details about the day...</p>
                        <form onSubmit={handleSubmit}>
                        <textarea
                            className={styles.formBox}
                            id="notes"
                            name="notes"
                            onChange={handleNotesChange}
                            value={notesContent || dayModalContent?.note || ""}
                        />
                            <br/>
                                <input type="submit" value="Submit"/>
                        </form>
                        {notification && (
                            <div className={styles.notification}>
                                {notification}
                            </div>
                        )}
                        <br/>
                        <button onClick={CloseDayModal}>Close</button>
                    </div>
                </div>
            )}
            <div className={styles.container}>
                {createDaysComponent()}
            </div>

            <div className={styles.monthButtonsDiv}>
                <button className={styles.monthButtons} onClick={previousMonth}>
                    Previous Month
                </button>
                <button className={styles.monthButtons} onClick={nextMonth}>
                    Next Month
                </button>
            </div>
        </div>
    )
}

export default calendar;