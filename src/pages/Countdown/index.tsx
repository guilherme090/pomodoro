import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TimeLabels } from '../../components/time-labels';
import { SubjectLabels } from '../../components/subject-labels';
import { TimerBox } from '../../components/timer-box';
import { AppBtns } from '../../components/app-btns';
import { Burndown } from '../../components/Burndown';
import { ModeSelector } from '../../components/ModeSelector';
import { mode } from "../../App";
import { useCountdownLoader } from "../../hooks/useCountdownLoader";

export const Countdown = () => {

  const navigate = useNavigate();
  const { loaderCountdown, onChange, onLoad, timerValue } = useCountdownLoader();

  function onChangeMode(e: React.ChangeEvent<HTMLSelectElement>) {
    navigate(`/${e.target.value.toLowerCase()}`);
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

      <Burndown value={loaderCountdown} onChange={onChange} onLoad={onLoad} />

      <AppBtns startText='Start Counter' startIcon='play_arrow' resetText='Reset Counter' resetIcon='autorenew' />

    </div>
  );
}