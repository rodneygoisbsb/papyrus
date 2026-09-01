import { useState, useEffect } from 'react';

export type PomodoroMode = 'focus' | 'break';

export function usePomodoro(initialFocusMinutes: number = 25, initialBreakMinutes: number = 5) {
    const focusSeconds = initialFocusMinutes * 60;
    const breakSeconds = initialBreakMinutes * 60;

    const [pomodoroSeconds, setPomodoroSeconds] = useState<number>(focusSeconds);
    const [isPomodoroRunning, setIsPomodoroRunning] = useState<boolean>(false);
    const [pomodoroMode, setPomodoroMode] = useState<PomodoroMode>('focus');

    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | null = null;
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

    const resetPomodoro = (mode: PomodoroMode = pomodoroMode) => {
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
