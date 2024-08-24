import styles from '@/styles/calendar.module.css';
import DayComponent from "../../components/Day/dayComponent";
import {useEffect, useRef, useState} from "react";
import dayComponent from "../../components/Day/dayComponent";
import {Day} from "../../interfaces/day";
import {func, instanceOf, number, string} from "prop-types";

function calendar() {
    
    const [currentMonth, setCurrentMonth] = useState(1);
    const [daysInMonth, setDaysInMonth] = useState<Day[]>([]);
    const [dayModalisOpen, setDayModalisOpen] = useState(false);
    const [dayModalContent, setDayModalContent] = useState<Day | null>(null);
    const [notesContent, setNotesContent] = useState<string>("");

    useEffect(() => {
        initialiseDays();
    }, [currentMonth]);

    const days : { [key:number ]: number} = {
        1: 31,
        2: 28,
        3: 31,
        4: 30,
        5: 31,
        6: 30,
        7: 31,
        8: 31,
        9: 30,
        10: 31,
        11: 30,
        12: 31
    }

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
    
    const calculateMonthFromIndexOfDay = (dayIndex: number) => {
        let dayCount = 0;
        let month = 1;
        
        for (let i = 1; i <= 12; i++) {
            dayCount += days[i];
            
            if (dayIndex <= dayCount) {
                month = i;
                break;
            }
        }
        
        return month;
    }

    const calculateDayOfMonth = (dayIndex: number) => {
        let dayCount = 0;
        let month = 1;
        
        for (let i = 1; i <= 12; i++) {
            dayCount += days[i];
            
            if (dayIndex <= dayCount) {
                month = i;
                break;
            }
        }
        
        return dayIndex - (dayCount - days[month]);
    }

    async function initialiseDays() {
        const dayArray: Day[] = Array.from({ length: 365 }, (_, index) => ({
            id: index + 1,
            day: calculateDayOfMonth(index + 1),
            month: calculateMonthFromIndexOfDay(index + 1),
            notes: "",
            date: new Date(2024, calculateMonthFromIndexOfDay(index + 1) - 1, calculateDayOfMonth(index + 1))
        }));
        
        var storedDays = await GetDays() ?? [];

        storedDays.forEach((day) => {
            // Convert the date string to a Date object if it's not already
            const dateObject = new Date(day.date);

            // Calculate the correct index (dayNumber) in the 365-day array
            const startOfYear = new Date(dateObject.getFullYear(), 0, 1); // January 1st of the year
            const dayNumber = Math.floor((dateObject.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)) + 1;
            
            dayArray[dayNumber - 1] = { ...day, date: dateObject };  // Ensure you convert date to a Date object
        });
        
        setDaysInMonth(dayArray);
    }

    const createDaysComponent = () => {
        let daysInCurrentMonth = daysInMonth.filter((day) => day.month === currentMonth);

        return daysInCurrentMonth.map((day) => (
            <DayComponent
                key={day.id}
                day={day.day}
                month={day.month}
                id={day.id}
                note={day.note}
                onClick={() => OpenDayModal(day)}
            />
        ));
    };
    
    const previousMonth = () => {
        if (currentMonth === 1) {
            setCurrentMonth(12);
        }
        else {
            setCurrentMonth(currentMonth - 1);
        }
    }
    
    const nextMonth = () => {
        if (currentMonth === 12) {
            setCurrentMonth(1);
        }
        else {
            setCurrentMonth(currentMonth + 1);
        }
    }
    
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
                day: day.date ? new Date(day.date).getDate() + 1 : -1, // Convert if `day.date` is not null
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
            <h1>{months[currentMonth]} 2024</h1>
            {dayModalisOpen && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h1>{dayModalContent?.day} {months[currentMonth]}</h1>
                        <p>Details about the day...</p>
                        <form onSubmit={handleSubmit}>
                            {/*<label htmlFor="fname">Notes:</label>*/}
                            <textarea className={styles.formBox} id="notes" name="notes" onChange={handleNotesChange}/><br/><br/>
                            <input type="submit" value="Submit"/>
                        </form>
                        <br/>
                        <button onClick={CloseDayModal}>Close</button>
                    </div>
                </div>
            )}
            <div className={styles.container}>
                {createDaysComponent()}
            </div>


            <button onClick={previousMonth}>
                Previous Month
            </button>
            <button onClick={nextMonth}>
                Next Month
            </button>
        </div>
    )
}

// things to do:

// set the submit button to insert into DB
// set month to be system current time.
// Set notes to be what it was before when editing

export default calendar;