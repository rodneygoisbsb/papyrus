import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export interface UseStudyTimerOptions {
  onSaveStudy?: (data: { durationSeconds: number; [key: string]: unknown }) => void;
}

export function useStudyTimer(options?: UseStudyTimerOptions) {
  const [accumulated, setAccumulated] = useLocalStorage<number>('@papyrus:timerAccumulated', 0);
  const [startTime, setStartTime] = useLocalStorage<number | null>('@papyrus:timerStartTime', null);
  const [activeContext, setActiveContext] = useLocalStorage<Record<string, any> | null>('@papyrus:activeContext', null);
  
  const [seconds, setSeconds] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const isRunning = startTime !== null;

  // Sync visual seconds
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

    if (isRunning) {
      // Immediate update
      setSeconds(accumulated + Math.floor((Date.now() - startTime) / 1000));
      
      interval = setInterval(() => {
        setSeconds(accumulated + Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    } else {
      setSeconds(accumulated);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, startTime, accumulated]);

  useEffect(() => {
    const handleOpenFocus = (e: Event) => {
      const customEvent = e as CustomEvent;
      const goal = customEvent.detail;
      
      setActiveContext(goal);
      setAccumulated(0);
      setStartTime(Date.now());
      setIsFullscreen(true);
    };

    window.addEventListener('papyrus:open-zen-focus', handleOpenFocus);
    return () => window.removeEventListener('papyrus:open-zen-focus', handleOpenFocus);
  }, [setActiveContext, setAccumulated, setStartTime]);

  const handleToggleTimer = () => {
    if (isRunning) {
      // Pause
      setAccumulated(accumulated + Math.floor((Date.now() - startTime!) / 1000));
      setStartTime(null);
    } else {
      // Play manual
      if (accumulated === 0) {
        setActiveContext(null);
      }
      setStartTime(Date.now());
    }
  };

  const handleReset = () => {
    setStartTime(null);
    setAccumulated(0);
    setSeconds(0);
    setActiveContext(null);
  };

  const handleOpenFocus = () => {
    setIsFullscreen(true);
  };

  const handleCloseFocus = () => {
    setIsFullscreen(false);
  };

  const handleOpenManualRegister = () => {
    setActiveContext(null);
    handleReset();
    setIsFullscreen(false);
    setIsModalOpen(true);
  };

  const handleOpenSaveModal = () => {
    if (isRunning) {
      setAccumulated(accumulated + Math.floor((Date.now() - startTime!) / 1000));
      setStartTime(null);
    }
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
    handleReset();
    setActiveContext(null);
  };

  return {
    seconds,
    isRunning,
    isFullscreen,
    isModalOpen,
    activeContext,
    handleToggleTimer,
    handleReset,
    handleOpenFocus,
    handleCloseFocus,
    handleOpenManualRegister,
    handleOpenSaveModal,
    handleCloseSaveModal,
    handleSaveSession,
  };
}
