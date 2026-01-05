import './time-labels.style.css'

export function TimeLabels({start, end}: {start: Date, end: Date}) {
    return(
        <div>
            <p className="time-label"> Start Time: 
                <span className="clock" id="start-time">{start.toTimeString()}</span>
            </p>
            <p className="time-label"> End Time: 
                <span className="clock" id="end-time">{end.toTimeString()}</span>
            </p>
        </div>
    );
}