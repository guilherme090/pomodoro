import { useState } from 'react';
import './timer-box.style.css'

export function TimerBox({ value }: { value: string }) {
    
    return (
        <div className="timer-box">
            <span id="timer">{ value }</span>
            <span id="inside-buttons">
                <i className="material-icons" id="start-btn-icon-2">play_arrow</i> 
                <i className="material-icons" id="reset-btn-icon-2">autorenew</i> 
            </span>
        </div>);
}