import { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Stopwatch } from './pages/Clock/stopwatch';
import { Countdown } from './pages/Clock/countdown';

export const mode: string[] = [
  'STOPWATCH', 'COUNTDOWN'
]

function App() {

  const navigate = useNavigate();

  const loadPage = useEffect(()=>{
    navigate('/countdown');
  }, []);

  return ( 
    <Routes>
      <Route path='/stopwatch' element={<Stopwatch/>} />
      <Route path='/countdown' element={<Countdown/>} />
    </Routes>
  );
}

export default App;
