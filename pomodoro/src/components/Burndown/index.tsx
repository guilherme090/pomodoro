import './burndown.style.css'

export function Burndown({state}: {state: string}) {
    if(state === 'COUNTDOWN'){
        return(
            <>
                <div id="burndown">
                    <div id="burndown-percent">
                    </div>
                </div>
                <div> 
                    <label className="timeLoaderLabel" htmlFor="input-hours">Hours:</label>
                    <input type="number" className="countdown-time" id="input-hours" value="1" min="0"/>
                    <label className="timeLoaderLabel" htmlFor="input-minutes">Minutes:</label>
                    <input type="number" className="countdown-time" id="input-minutes" value="0" min="0" max="59"/>
                    <label className="timeLoaderLabel" htmlFor="input-seconds">Seconds:</label>
                    <input type="number" className="countdown-time" id="input-seconds" value="0" min="0" max="59"/>
                    <input type="button" className="app-btn" id="input-btn" value="Load Counter"/>
                </div>
            </>
        )
    }
    return <></>
}