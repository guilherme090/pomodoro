import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TimeLabels } from '../../components/time-labels';
import { SubjectLabels } from '../../components/subject-labels';
import { TimerBox } from '../../components/timer-box';
import { AppBtns } from '../../components/app-btns';
import { Burndown } from '../../components/Burndown';
import { ModeSelector } from '../../components/ModeSelector';
import { mode } from "../../App";

export const Stopwatch = () => {

    const navigate = useNavigate();

    function onChangeMode(e: React.ChangeEvent<HTMLSelectElement>) {
        navigate(`/${e.target.value.toLowerCase()}`);
    }
    const startTime: Date = new Date();
    const endTime: Date = new Date();

    const [timerValue, setTimerValue] = useState('00:00:00.000');

    return (
        <div className="App">
            <header className="App-header">
                <h3 className="main-title">
                    STOPWATCH
                </h3>
            </header>

            <TimeLabels start={startTime} end={endTime} />
            <SubjectLabels />
            <ModeSelector value={timerValue} options={mode} onChange={onChangeMode}></ModeSelector>

            <TimerBox value="00:00:00.000" />

            <AppBtns startText='Start Counter' startIcon='play_arrow' resetText='Reset Counter' resetIcon='autorenew' />

        </div>
    );
}