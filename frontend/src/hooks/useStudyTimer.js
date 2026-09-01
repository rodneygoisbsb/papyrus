import { useState, useEffect } from 'react';

import { useLocalStorage } from './useLocalStorage';

export function useStudyTimer(onSaveStudy) {
    const [seconds, setSeconds] = useLocalStorage('@papyrus:timerSeconds', 0);
    const [isRunning, setIsRunning] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeContext, setActiveContext] = useState(null);

    useEffect(() => {
        let interval = null;
        if (isRunning) {
            interval = setInterval(() => {
                setSeconds((prev) => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    useEffect(() => {
        const handleOpenZenFocus = (e) => {
            const goal = e.detail;
            setActiveContext(goal || null);
            setSeconds(0);
            setIsFullscreen(true);
            setIsRunning(true);
        };
        window.addEventListener('papyrus:open-zen-focus', handleOpenZenFocus);
        return () => window.removeEventListener('papyrus:open-zen-focus', handleOpenZenFocus);
    }, []);

    const togglePlay = () => setIsRunning((prev) => !prev);

    const handleReset = () => {
        setIsRunning(false);
        setSeconds(0);
    };

    const handleOpenRegister = () => {
        setIsRunning(false);
        setActiveContext(null);
        setIsModalOpen(true);
    };

    const handleStop = () => {
        setIsRunning(false);
        setIsModalOpen(true);
    };

    const handleFinalizarMissao = () => {
        setIsRunning(false);
        setIsFullscreen(false);
        setIsModalOpen(true);
    };

    const handleSaveSession = (dados) => {
        if (onSaveStudy) onSaveStudy(dados);
        setIsModalOpen(false);
        setSeconds(0);
        setIsRunning(false);
    };

    return {
        seconds,
        isRunning,
        isFullscreen,
        isModalOpen,
        activeContext,
        setIsFullscreen,
        setIsModalOpen,
        togglePlay,
        handleReset,
        handleOpenRegister,
        handleStop,
        handleFinalizarMissao,
        handleSaveSession,
    };
}
