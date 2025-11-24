import './timer-box.style.css'

export function TimerBox({state}: {state: string}) {
    if(state === 'STOPWATCH' || state === 'COUNTDOWN'){
        return (
            <div className="timer-box">
                <span id="timer">00:00:00</span>
                <span id="inside-buttons">
                    <i className="material-icons" id="start-btn-icon-2">play_arrow</i> 
                    <i className="material-icons" id="reset-btn-icon-2">autorenew</i> 
                </span>
            </div>)
    }
    return <></>
}