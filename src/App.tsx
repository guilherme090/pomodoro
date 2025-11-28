import { useState } from 'react';
import './App.css';
import { TimeLabels } from './components/time-labels';
import { SubjectLabels } from './components/subject-labels';
import { TimerBox } from './components/timer-box';
import { AppBtns } from './components/app-btns';
import { Burndown } from './components/Burndown';
import { ModeSelector } from './components/ModeSelector';

const startTime: Date= new Date();
const endTime: Date = new Date();

const mode: string[] = [
  'STOPWATCH', 'COUNTDOWN'
]

function App() {
  const [currentState, setCurrentState] = useState(mode[1]); // mode select
  const [loaderCountdown, setLoaderCountdown] = useState({
    hours: 1,
    minutes: 0,
    seconds: 0
  }); // time to load for countdown
  
  function onChangeMode(e: React.ChangeEvent<HTMLSelectElement>) {
    setCurrentState(e.target.value);
  }

  function onChangeCountdown(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;
    // labels are id'd starting with input-(hours/minutes/seconds), while the state doesn't have the prefix input-
    const countdownLabel = id.replace('input-',''); 
    setLoaderCountdown( prev => ({
      ...prev,
      [countdownLabel]: value
    }))
  }

  return (
    <div className="App">
      <header className="App-header">
        <h3 className="main-title">
          {currentState}
        </h3>
      </header>

      <TimeLabels start={startTime} end={endTime} state={currentState}/>
      <SubjectLabels/>
      <ModeSelector value={currentState} options={mode} onChange={onChangeMode}></ModeSelector>

      <TimerBox state={currentState}/>
      
      <Burndown state={currentState} value={loaderCountdown} onChange={onChangeCountdown}/>

      <AppBtns startText='Start Counter' startIcon='play_arrow' resetText='Reset Counter' resetIcon='autorenew'/>

    </div>
  );
}

export default App;
