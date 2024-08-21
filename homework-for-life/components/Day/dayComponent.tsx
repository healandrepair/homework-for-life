import styles from './dayComponent.module.css';

function DayComponent({ day, month, id, note, onClick}: {day: number,  id: number, month: number, note: string, onClick: any}) {
    return (
        <div className={styles.dayComponent}>
            <h1>Day: {day}</h1>
            <p>ID: {id}</p>
            <p>Notes: {note}</p>
        </div>
    );
}
export default DayComponent;