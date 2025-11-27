import './app-btns.style.css'

export function AppBtns() {
    return(<>
        <span className="app-btn" id="start-btn">
            <i className="material-icons" id="start-btn-icon">play_arrow</i>    
            <span id="start-btn-label">Start Counter</span>
        </span>

        <span className="app-btn" id="reset-btn">
            <i className="material-icons" id="reset-btn-icon">autorenew</i>    
            <span id="start-btn-label">Reset Counter</span>
        </span>
    </>)
}