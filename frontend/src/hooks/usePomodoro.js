import { useState, useEffect } from 'react';

export function usePomodoro(initialFocusMinutes = 25, initialBreakMinutes = 5) {
    const focusSeconds = initialFocusMinutes * 60;
    const breakSeconds = initialBreakMinutes * 60;

    const [pomodoroSeconds, setPomodoroSeconds] = useState(focusSeconds);
    const [isPomodoroRunning, setIsPomodoroRunning] = useState(false);
    const [pomodoroMode, setPomodoroMode] = useState('focus'); // 'focus' | 'break'

    useEffect(() => {
        let interval = null;
        if (isPomodoroRunning && pomodoroSeconds > 0) {
            interval = setInterval(() => {
                setPomodoroSeconds((prev) => prev - 1);
            }, 1000);
        } else if (pomodoroSeconds === 0) {
            setIsPomodoroRunning(false);
            if (interval) clearInterval(interval);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isPomodoroRunning, pomodoroSeconds]);

    const togglePomodoro = () => setIsPomodoroRunning(!isPomodoroRunning);

    const resetPomodoro = (mode = pomodoroMode) => {
        setIsPomodoroRunning(false);
        setPomodoroMode(mode);
        setPomodoroSeconds(mode === 'focus' ? focusSeconds : breakSeconds);
    };

    return {
        pomodoroSeconds,
        isPomodoroRunning,
        pomodoroMode,
        togglePomodoro,
        resetPomodoro,
    };
}
