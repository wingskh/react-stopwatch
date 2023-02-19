import React, { useState, useEffect, useRef } from "react";
import "./Stopwatch.css";

const Stopwatch: React.FC = () => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [laps, setLaps] = useState<number[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const startTimer = () => {
    if (intervalRef.current) return;
    startRef.current = Date.now();
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => prevTime + Date.now() - startRef.current!);
      startRef.current = Date.now();
    }, 10);
  };

  const stopTimer = () => {
    if (!intervalRef.current) return;
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsRunning(false);
  };

  const resetTimer = () => {
    setTime(0);
    setLaps([]);
  };

  const lapTimer = () => {
    setLaps((prevLaps) => [...prevLaps, time]);
  };

  const formatTime = (time: number): string => {
    const date = new Date(time);
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const seconds = date.getUTCSeconds().toString().padStart(2, "0");
    const milliseconds = Math.floor(date.getUTCMilliseconds() / 10)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}.${milliseconds}`;
  };

  return (
    <div className="stopwatch-container">
      <h1 className="stopwatch-heading">{formatTime(time)}</h1>
      <div className="stopwatch-buttons">
        {isRunning ? (
          <button onClick={stopTimer}>Stop</button>
        ) : (
          <button onClick={startTimer}>Start</button>
        )}
        {isRunning ? (
          <button onClick={lapTimer}>Lap</button>
        ) : (
          <button onClick={resetTimer}>Reset</button>
        )}
      </div>
      <ul className="lap-list">
        {laps.map((lap, index) => (
          <li key={index}>
            Lap {index + 1}: {formatTime(lap)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Stopwatch;
