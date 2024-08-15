import styles from '@/styles/calendar.module.css';
import DayComponent from "../../components/Day/dayComponent";
import {useEffect, useState} from "react";
import dayComponent from "../../components/Day/dayComponent";
import {Day} from "../../interfaces/day";
import {number} from "prop-types";

function calendar() {
    
    const [currentMonth, setCurrentMonth] = useState(1);
    const [daysInMonth, setDaysInMonth] = useState<Day[]>([]);

    useEffect(() => {
        initaliseDays();
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

    const initaliseDays = () => {
        const dayArray: Day[] = Array.from({ length: days[currentMonth] }, (_, index) => ({
            id: index + 1,
            day: index + 1,
            month: currentMonth,
            notes: ""
        }));
        
        // const dayComponents = dayArray.map((day) => {
        //     return <DayComponent day={day.day} month={day.month} id={day.id}/>
        // });

        setDaysInMonth(dayArray);
    }

    const createDaysComponent = () => {
        return daysInMonth.map((day) => (
            <DayComponent key={day.id} day={day.day} month={day.month} id={day.id} note={""} />
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
    
    return (
        <div>
            <h1>{months[currentMonth]} 2024</h1>
            
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

export default calendar;