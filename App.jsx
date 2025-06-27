import React, { useState, useRef } from 'react';
import './style.css';

function formatTime(sec) {
  const m = String(Math.floor(sec / 60)).padStart(2, '0');
  const s = String(sec % 60).padStart(2, '0');
  return `${m}:${s}`;
}

export default function App() {
  const [selectedMinutes, setSelectedMinutes] = useState(5);
  const [timeLeft, setTimeLeft] = useState(5 * 60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [participants, setParticipants] = useState('Jan, Hein, Pit');
  const [selectedIdx, setSelectedIdx] = useState(-1);
  const timerRef = useRef();

  const handleTimeBtn = min => {
    setSelectedMinutes(min);
    setTimeLeft(min * 60);
    setTimerRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleStart = () => {
    setTimeLeft(selectedMinutes * 60);
    setTimerRunning(true);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSelectNext = () => {
    const names = participants.split(',').map(n => n.trim()).filter(Boolean);
    if (names.length === 0) return;
    setSelectedIdx(idx => (idx + 1) % names.length);
  };

  const names = participants.split(',').map(n => n.trim()).filter(Boolean);

  return (
    <div className="container">
      <h1>Break Timer</h1>
      <div className="timer-info">
        <div>Duration: <span>{formatTime(selectedMinutes * 60)}</span></div>
        <div>Time left: <span>{formatTime(timeLeft)}</span></div>
      </div>
      <div className="timer-buttons">
        {[5,10,15,45,60].map(min => (
          <button key={min} onClick={() => handleTimeBtn(min)}>{min === 60 ? '1 hour' : min + ' min'}</button>
        ))}
        <button onClick={handleStart}>Start Timer</button>
      </div>
      <h2>Participant Selector</h2>
      <div className="participant-selector">
        <input value={participants} onChange={e => setParticipants(e.target.value)} />
        <button id="select-next" onClick={handleSelectNext}>Select next participant</button>
      </div>
      <div id="selected-participant">{names.length && selectedIdx >= 0 ? names[selectedIdx] : 'Claas'}</div>
    </div>
  );
}
