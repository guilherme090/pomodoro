import './countdownControl.style.css'

type burndownProps = {
    value: {hours: number, minutes: number, seconds: number},
    onChange: ((e: React.ChangeEvent<HTMLInputElement>) => void),
    onLoad: () => void
}

export function CountdownControl({value, onChange, onLoad}: burndownProps) {
    return(
        <>
            <div id="burndown">
                <div id="burndown-percent">
                </div>
            </div>
            <div> 
                <label className="timeLoaderLabel" htmlFor="input-hours">Hours:</label>
                <input type="number" className="countdown-time" name="hours" id="input-hours" value={value.hours} min="0" onChange={onChange}/>
                <label className="timeLoaderLabel" htmlFor="input-minutes">Minutes:</label>
                <input type="number" className="countdown-time" name="minutes" id="input-minutes" value={value.minutes} min="0" max="59" onChange={onChange}/>
                <label className="timeLoaderLabel" htmlFor="input-seconds">Seconds:</label>
                <input type="number" className="countdown-time" name="seconds" id="input-seconds" value={value.seconds} min="0" max="59" onChange={onChange}/>
                <input type="button" className="app-btn" id="input-btn" value="Load Counter" onClick={onLoad}/>
            </div>
        </>
    )
}