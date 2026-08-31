import { useState, useEffect } from 'react';

import { useLocalStorage } from './useLocalStorage';

export function useStudyTimer(onSaveStudy) {
    const [seconds, setSeconds] = useLocalStorage('@papyrus:timerSeconds', 0);
    const [isRunning, setIsRunning] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        let interval = null;
        if (isRunning) {
            interval = setInterval(() => {
                setSeconds((prev) => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    const togglePlay = () => setIsRunning((prev) => !prev);

    const handleReset = () => {
        setIsRunning(false);
        setSeconds(0);
    };

    const handleOpenRegister = () => {
        setIsRunning(false);
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
