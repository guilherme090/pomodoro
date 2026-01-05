import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TimeLabels } from '../../components/time-labels';
import { SubjectLabels } from '../../components/subject-labels';
import { TimerBox } from '../../components/timer-box';
import { AppBtns } from '../../components/app-btns';
import { Burndown } from '../../components/Burndown';
import { ModeSelector } from '../../components/ModeSelector';
import { mode } from "../../App";

export const Countdown = () => {

  const navigate = useNavigate();

  const [loaderCountdown, setLoaderCountdown] = useState({
    hours: 1,
    minutes: 0,
    seconds: 0
  }); // time to load for countdown

  const [timerValue, setTimerValue] = useState('00:00:00');

  function onChangeMode(e: React.ChangeEvent<HTMLSelectElement>) {
    navigate(`/${e.target.value.toLowerCase()}`);
  }

  function onChangeCountdown(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;
    // labels are id'd starting with input-(hours/minutes/seconds)
    const countdownLabel = id.replace('input-', '');
    setLoaderCountdown(prev => ({
      ...prev,
      [countdownLabel]: value
    }))
  }

  return (
    <div className="App">
      <header className="App-header">
        <h3 className="main-title">
          COUNTDOWN
        </h3>
      </header>

      <SubjectLabels />
      <ModeSelector value={'COUNTDOWN'} options={mode} onChange={onChangeMode}></ModeSelector>

      <TimerBox value={timerValue} />

      <Burndown value={loaderCountdown} onChange={onChangeCountdown} />

      <AppBtns startText='Start Counter' startIcon='play_arrow' resetText='Reset Counter' resetIcon='autorenew' />

    </div>
  );
}