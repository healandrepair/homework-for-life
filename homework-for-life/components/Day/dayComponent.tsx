function DayComponent({ day, month, id }: {day: number,  id: number, month: number}) {
    return (
        <div>
            <h1>Day Component</h1>
            <p>Day: {day}</p>
            <p>ID: {id}</p>
        </div>
    );
}
export default DayComponent;