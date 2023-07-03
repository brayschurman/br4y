import Head from "next/head";
import { useEffect, useState } from "react";

interface Timer {
  id: number;
  name: string;
  timeRemaining: number;
  isRunning: boolean;
  duration: number;
  lastActive: boolean;
}

export default function Home() {
  const [timers, setTimers] = useState<Timer[]>([
    // {
    //   id: 1,
    //   name: "Timer 1",
    //   timeRemaining: 0,
    //   duration: 0,
    //   isRunning: false,
    //   lastActive: false,
    // },
    // {
    //   id: 2,
    //   name: "Timer 2",
    //   timeRemaining: 0,
    //   duration: 0,
    //   isRunning: false,
    //   lastActive: false,
    // },
    // {
    //   id: 3,
    //   name: "Timer 3",
    //   timeRemaining: 0,
    //   duration: 0,
    //   isRunning: false,
    //   lastActive: false,
    // },
  ]);
  const [editing, setEditing] = useState({ id: null, field: null });
  const [inputString, setInputString] = useState("");
  const [inputNumber, setInputNumber] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      let startNextTimerIndex = null;

      const newTimers = timers.map((timer, index) => {
        const updatedTimer = handleTimer(timer, index);
        if (updatedTimer.isRunning !== timer.isRunning) {
          startNextTimerIndex = index + 1;
        }
        return updatedTimer;
      });

      const updatedTimers = handleNextTimer(newTimers, startNextTimerIndex);

      setTimers(updatedTimers);
    }, 1000);

    return () => clearInterval(interval);
  }, [timers]);

  const handleTimer = (timer: Timer, index) => {
    if (!timer.isRunning) return timer;
    if (timer.timeRemaining !== 0) {
      return { ...timer, timeRemaining: timer.timeRemaining - 1 };
    }

    return {
      ...timer,
      isRunning: false,
      lastActive: true,
      timeRemaining: timer.duration,
    };
  };

  const handleNextTimer = (newTimers: Timer[], startNextTimerIndex: number) => {
    if (startNextTimerIndex === null) {
      return newTimers;
    }

    if (startNextTimerIndex >= newTimers.length) {
      startNextTimerIndex = 0;
    }

    handleSpeak(newTimers[startNextTimerIndex]);

    newTimers[startNextTimerIndex] = {
      ...newTimers[startNextTimerIndex],
      isRunning: true,
      lastActive: true,
      timeRemaining: newTimers[startNextTimerIndex].duration,
    };

    return newTimers;
  };

  const handleSpeak = (timer: Timer) => {
    // const audio = new Audio("/sounds/timer_a.mp3");
    // try {
    //   await audio.play();
    // } catch (err) {
    //   console.log(err);
    // }

    const speech = new SpeechSynthesisUtterance(timer.name);
    speech.lang = "en-US";
    speechSynthesis.speak(speech);

    setTimeout(() => {
      const speech = new SpeechSynthesisUtterance(
        timer.duration.toString() + "seconds"
      );
      speech.lang = "en-US";
      speechSynthesis.speak(speech);
    }, 1000);
  };

  const startEditing = (id, field, value) => {
    setEditing({ id, field });
    if (field === "name") {
      setInputString(value);
    } else if (field === "duration") {
      setInputNumber(value);
    }
  };

  const finishEditing = () => {
    const newTimers = timers.map((timer) => {
      if (timer.id === editing.id) {
        if (editing.field === "name") {
          return { ...timer, [editing.field]: inputString };
        } else if (editing.field === "duration") {
          return { ...timer, [editing.field]: Number(inputNumber) };
        }
      } else {
        return timer;
      }
    });
    setTimers(newTimers);
    setEditing({ id: null, field: null });
    setInputString("");
    setInputNumber(0);
  };

  const handlePlayPause = () => {
    const runningTimer = timers.find((timer) => timer.isRunning);

    if (!runningTimer) {
      const newTimers = timers.map((timer) => {
        if (timer.lastActive) {
          return { ...timer, isRunning: true };
        } else {
          const firstIndex = timers[0];
          if (timer.id === firstIndex.id) {
            if (timer.timeRemaining === 0) {
              return {
                ...timer,
                isRunning: true,
                timeRemaining: timer.duration,
              };
            } else {
              return { ...timer, isRunning: true };
            }
          } else {
            return timer;
          }
        }
      });
      setTimers(newTimers);
    } else {
      const newTimers = timers.map((timer) => {
        if (timer.id === runningTimer.id) {
          return { ...timer, isRunning: false, lastActive: true };
        } else {
          return timer;
        }
      });
      setTimers(newTimers);
    }
  };

  const selectTimer = (id: number) => {
    const newTimers = timers.map((timer) => {
      if (timer.id === id) {
        return { ...timer, selected: true };
      } else {
        return { ...timer, selected: false };
      }
    });
    setTimers(newTimers);
  };

  // a function to add a new timer to the array
  const addTimer = () => {
    const newTimer: Timer = {
      id: timers.length + 1,
      name: "Timer " + (timers.length + 1).toString(),
      timeRemaining: 0,
      isRunning: false,
      lastActive: false,
      duration: 0,
    };
    setTimers([...timers, newTimer]);
  };

  const handleSkip = () => {
    let foundRunning = false;
    const newTimers = timers.map((timer, index) => {
      if (timer.isRunning) {
        foundRunning = true;
        return { ...timer, isRunning: false, lastActive: false };
      }
      if (!timer.isRunning && foundRunning) {
        foundRunning = false; // Reset the flag after we start the next timer
        return { ...timer, isRunning: true, lastActive: true };
      }
      return timer;
    });
    setTimers(newTimers);
  };

  const handlePrevious = () => {
    let previousTimer = null;
    let foundRunning = false;
    const newTimers = timers.map((timer, index) => {
      if (timer.isRunning) {
        foundRunning = true;
        return { ...timer, isRunning: false, lastActive: false };
      }
      if (!foundRunning) {
        previousTimer = timer; // Keep track of the last non-running timer
      }
      return timer;
    });
    // If there was a non-running timer before the running one, start it
    if (previousTimer) {
      newTimers[previousTimer.id - 1] = {
        ...previousTimer,
        isRunning: true,
        lastActive: true,
      };
    }
    setTimers(newTimers);
  };

  const resetAllTimers = () => {
    const newTimers = timers.map((timer) => {
      return {
        ...timer,
        isRunning: false,
        lastActive: false,
        timeRemaining: 0,
      };
    });
    setTimers(newTimers);
  };

  return (
    <>
      <Head>
        <title>Block Timer</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          {/* <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Block <span className="text-[hsl(280,100%,70%)]">Timer</span>
          </h1> */}
          {timers.map((timer) => (
            <div
              className={`grid max-w-lg cursor-pointer grid-cols-1 gap-4 gap-4 rounded-xl bg-white/10 p-4 
                text-white transition duration-200 ease-in-out hover:bg-white/20 ${
                  timer.lastActive ? "bg-white/20 text-3xl" : "text-xl"
                }`}
              key={timer.id}
              onClick={() => selectTimer(timer.id)}
            >
              <div className="text-lg">
                <h3 className="font-mono text-2xl font-bold">
                  {editing.id === timer.id && editing.field === "name" ? (
                    <input
                      type="text"
                      className="text-black"
                      value={inputString}
                      onChange={(e) => setInputString(e.target.value)}
                      onBlur={finishEditing}
                      autoFocus
                    />
                  ) : (
                    <div
                      onClick={() => startEditing(timer.id, "name", timer.name)}
                    >
                      {timer.name}
                    </div>
                  )}
                </h3>
                <div>
                  {editing.id === timer.id && editing.field === "duration" ? (
                    <input
                      type="number"
                      className="text-black"
                      value={inputNumber}
                      onChange={(e) => setInputNumber(e.target.value)}
                      onBlur={finishEditing}
                      autoFocus
                    />
                  ) : (
                    <div
                      onClick={() =>
                        startEditing(timer.id, "duration", timer.duration)
                      }
                    >
                      {timer.isRunning ? timer.timeRemaining : timer.duration}
                    </div>
                  )}
                </div>
                <div>{timer.isRunning ? <p>Pause</p> : <p>Play</p>}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <button onClick={() => addTimer()}>Add Timer</button>
          <button onClick={() => handlePlayPause()}>Play/Pause</button>
          <button onClick={() => handleSkip()}>Skip</button>
          <button onClick={() => handlePrevious()}>Previous</button>
          <button onClick={() => resetAllTimers()}>Reset All</button>
        </div>
      </main>
    </>
  );
}
