import './burndown.style.css'

type burndownProps = {
    state: string,
    value: {hours: number, minutes: number, seconds: number},
    onChange: ((e: React.ChangeEvent<HTMLInputElement>) => void)
}

export function Burndown({state, value, onChange}: burndownProps) {
    if(state === 'COUNTDOWN'){
        return(
            <>
                <div id="burndown">
                    <div id="burndown-percent">
                    </div>
                </div>
                <div> 
                    <label className="timeLoaderLabel" htmlFor="input-hours">Hours:</label>
                    <input type="number" className="countdown-time" id="input-hours" value={value.hours} min="0" onChange={onChange}/>
                    <label className="timeLoaderLabel" htmlFor="input-minutes">Minutes:</label>
                    <input type="number" className="countdown-time" id="input-minutes" value={value.minutes} min="0" max="59" onChange={onChange}/>
                    <label className="timeLoaderLabel" htmlFor="input-seconds">Seconds:</label>
                    <input type="number" className="countdown-time" id="input-seconds" value={value.seconds} min="0" max="59" onChange={onChange}/>
                    <input type="button" className="app-btn" id="input-btn" value="Load Counter"/>
                </div>
            </>
        )
    }
    return <></>
}