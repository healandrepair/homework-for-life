import styles from './dayComponent.module.css';

function DayComponent({ day, month, id, note, hasNote, onClick}: {day: number,  id: number, month: number, note: string, hasNote: boolean, onClick: () => void}) {
    return (
        <div
            className={`${styles.dayComponent} ${hasNote ? styles.hasNote : ""}`}
            onClick={onClick}
        >
            <h1>Day: {day}</h1>
            {/*<p>ID: {id}</p>*/} {/* Debug for debug purposes */}
            {note && <p style={{margin: "auto"}}> {note} </p>}
        </div>
    );
}
export default DayComponent;