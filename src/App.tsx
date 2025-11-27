import { useState } from 'react';
import './App.css';
import { TimeLabels } from './components/time-labels';
import { SubjectLabels } from './components/subject-labels';
import { TimerBox } from './components/timer-box';
import { AppBtns } from './components/app-btns';
import { Burndown } from './components/Burndown';

const startTime: Date= new Date();
const endTime: Date = new Date();

const mode: string[] = [
  'STOPWATCH', 'COUNTDOWN'
]

function App() {
  const [currentState, setCurrentState] = useState(mode[1]);
  
  return (
    <div className="App">
      <header className="App-header">
        <h3 className="main-title">
          Stopwatch
        </h3>
      </header>

      <TimeLabels start={startTime} end={endTime} state={currentState}/>
      <SubjectLabels/>

      <TimerBox state={currentState}/>
      
      <Burndown state={currentState}/>

      <AppBtns/>


    </div>
  );
}

export default App;
