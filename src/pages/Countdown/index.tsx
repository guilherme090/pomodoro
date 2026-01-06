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

  const [timerValue, setTimerValue] = useState('0:00:00');

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

  function normalizeTime (hours: number, minutes: number, seconds: number) {
    minutes += Math.floor(seconds/60);
    seconds = seconds%60;

    hours += Math.floor(minutes/60);
    minutes = minutes%60;

    return {hours, minutes, seconds}
  }

  function onLoad() {
    const { hours, minutes, seconds } = normalizeTime(Number(loaderCountdown.hours), Number(loaderCountdown.minutes), Number(loaderCountdown.seconds));
    setTimerValue(`${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
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

      <Burndown value={loaderCountdown} onChange={onChangeCountdown} onLoad={onLoad} />

      <AppBtns startText='Start Counter' startIcon='play_arrow' resetText='Reset Counter' resetIcon='autorenew' />

    </div>
  );
}