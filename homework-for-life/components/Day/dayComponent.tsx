function DayComponent({ day, month, id, note}: {day: number,  id: number, month: number, note: string}) {
    return (
        <div>
            <h1>Day: {day}</h1>
            <p>ID: {id}</p>
            <p>Notes: {note}</p>
        </div>
    );
}
export default DayComponent;