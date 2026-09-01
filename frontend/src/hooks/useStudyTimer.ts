import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export interface UseStudyTimerOptions {
  onSaveStudy?: (data: { durationSeconds: number; [key: string]: unknown }) => void;
}

export function useStudyTimer(options?: UseStudyTimerOptions) {
  const [seconds, setSeconds] = useLocalStorage<number>('@papyrus:timerSeconds', 0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, setSeconds]);

  const handleToggleTimer = () => {
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  const handleOpenFocus = () => {
    setIsFullscreen(true);
  };

  const handleCloseFocus = () => {
    setIsFullscreen(false);
  };

  const handleOpenSaveModal = () => {
    setIsRunning(false);
    setIsFullscreen(false);
    setIsModalOpen(true);
  };

  const handleCloseSaveModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveSession = (data?: Record<string, unknown>) => {
    if (options?.onSaveStudy) {
      options.onSaveStudy({
        durationSeconds: seconds,
        ...data,
      });
    }
    setIsModalOpen(false);
    setSeconds(0);
    setIsRunning(false);
  };

  return {
    seconds,
    isRunning,
    isFullscreen,
    isModalOpen,
    handleToggleTimer,
    handleReset,
    handleOpenFocus,
    handleCloseFocus,
    handleOpenSaveModal,
    handleCloseSaveModal,
    handleSaveSession,
  };
}
