import styles from '@/styles/calendar.module.css';
import DayComponent from "../../components/Day/dayComponent";
import {useState} from "react";
import dayComponent from "../../components/Day/dayComponent";
import {Day} from "../../interfaces/day";

function calendar() {
    
    const [currentMonth, setCurrentMonth] = useState(1);
    const [daysInMonth, setDaysInMonth] = useState<Day[]>([]);
        
        const days = {
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
    const configureCalendar = () => {
        var iterateOverNumber = currentMonth;

        const dayComponents = Array.from({length: iterateOverNumber}, (_, index) => (
            <DayComponent day={index + 1} id={0} month={currentMonth} key={index}/>
        ));

        setDaysInMonth(dayComponents);
    }
    
    return (
        <div className={styles.container}>
            <DayComponent/>
            <DayComponent/>
            <DayComponent/>
            <DayComponent/>
            <DayComponent/>
            <DayComponent/>
            <DayComponent/>
            <DayComponent/>
            <DayComponent/>
            <DayComponent/> 
            <DayComponent/>
            <DayComponent/>
            <DayComponent/>
            <DayComponent/>
            <DayComponent/> 
            <DayComponent/>
            <DayComponent/>
            <DayComponent/>
            <DayComponent/>
            <DayComponent/> 
            <DayComponent/>
            <DayComponent/>
            <DayComponent/>
            <DayComponent/>
            <DayComponent/> 
            <DayComponent/>
            <DayComponent/>
            <DayComponent/>
            <DayComponent/>
            <DayComponent/>
        </div>
    );
}

export default calendar;