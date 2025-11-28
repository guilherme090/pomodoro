import './app-btns.style.css'

type appBtnsProps = {
    startText: string,
    startIcon: string,
    resetText: string,
    resetIcon: string
}

export function AppBtns(buttonTexts: appBtnsProps) {
    return(<>
        <span className="app-btn" id="start-btn">
            <i className="material-icons" id="start-btn-icon">{buttonTexts.startIcon}</i>    
            <span id="start-btn-label">{buttonTexts.startText}</span>
        </span>

        <span className="app-btn" id="reset-btn">
            <i className="material-icons" id="reset-btn-icon">{buttonTexts.resetIcon}</i>    
            <span id="start-btn-label">{buttonTexts.resetText}</span>
        </span>
    </>)
}