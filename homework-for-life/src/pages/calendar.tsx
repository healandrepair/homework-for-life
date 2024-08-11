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
            <DayComponent key={day.id} day={day.day} month={day.month} id={day.id} />
        ));
    };
        
    //
    // return (
    //     <div className={styles.container}>
    //         {daysInMonth.map((day) => (
    //             <DayComponent key={day.id} day={day.day} month={day.month} id={day.id}/>
    //         ))}
    //     </div>
    // );

    return (
        <div className={styles.container}>
            {createDaysComponent()}
        </div>)
}

export default calendar;