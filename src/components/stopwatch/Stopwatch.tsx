import React, { useState, useRef, useEffect } from "react";
import "./Stopwatch.css";

interface StopwatchBtnTextInterface {
  leftBtn: string;
  rightBtn: string;
}

interface StopwatchBtnTextCollection {
  start: string;
  reset: string;
  stop: string;
  lap: string;
}

const Stopwatch: React.FC = () => {
  const [isRunningState, setIsRunningState] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [lapState, setLapState] = useState<JSX.Element[]>([]);
  // const intervalRef = useRef<number | undefined>();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const stopwatchBtnTextCollection: StopwatchBtnTextCollection = {
    start: "Start",
    reset: "Reset",
    stop: "Stop",
    lap: "Lap",
  };

  const startStopwatch = () => {
    setIsRunningState(true);
    console.log("Start timer");
    intervalRef.current = setInterval(() => {
      setElapsedTime((prevElapsedTime) => prevElapsedTime + 10);
    }, 10);
  };

  const stopStopTimer = () => {
    setIsRunningState(false);
    if (!intervalRef.current) return;
    clearInterval(intervalRef.current);
  };

  const formatTime = (time: number): string => {
    const date = new Date(time);
    // const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    // const seconds = date.getUTCSeconds().toString().padStart(2, "0");
    // const milliseconds = Math.floor(date.getUTCMilliseconds() / 10)
    //   .toString()
    //   .padStart(2, "0");

    const minutes = Math.floor(time / 60000)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor((time % 60000) / 1000)
      .toString()
      .padStart(2, "0");
    const milliseconds = Math.floor((time % 1000) / 10)
      .toString()
      .padStart(2, "0");

    return `${minutes}:${seconds}.${milliseconds}`;
  };

  const lapStopwatch = () => {
    if (!intervalRef.current) return;
    setLapState((prevLaps) => [
      ...prevLaps,
      <span>
        <div>{`Lap ${lapState.length + 1}`}</div>
        <div>{formatTime(elapsedTime)}</div>
      </span>,
    ]);
  };

  const resetStopwatch = () => {
    if (!intervalRef.current) return;
    setElapsedTime(0);
    setLapState([]);
  };

  useEffect(() => {
    console.log("Component has re-rendered.");
  });

  return (
    <div className="stopwatch-container">
      <h1 className="stopwatch-header">{formatTime(elapsedTime)}</h1>
      <div className="stopwatch-buttons">
        {isRunningState ? (
          <>
            <button onClick={lapStopwatch}>
              {stopwatchBtnTextCollection.lap}
            </button>
            <button onClick={stopStopTimer}>
              {stopwatchBtnTextCollection.stop}
            </button>
          </>
        ) : (
          <>
            <button onClick={startStopwatch}>
              {stopwatchBtnTextCollection.start}
            </button>
            <button onClick={resetStopwatch}>
              {stopwatchBtnTextCollection.reset}
            </button>
          </>
        )}
      </div>

      <ul className="lap-list">
        {lapState.map((lap, index) => (
          <li key={index}>{lap}</li>
        ))}
      </ul>
    </div>
  );
};

export default Stopwatch;
