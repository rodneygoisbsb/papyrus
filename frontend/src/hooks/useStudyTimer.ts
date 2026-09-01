import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

export interface UseStudyTimerOptions {
  onSaveStudy?: (data: { durationSeconds: number; [key: string]: unknown }) => void;
}

export function useStudyTimer(options?: UseStudyTimerOptions) {
  const [seconds, setSeconds] = useLocalStorage<number>('@papyrus:timerSeconds', 0);
  const [activeContext, setActiveContext] = useLocalStorage<Record<string, any> | null>('@papyrus:activeContext', null);
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

  useEffect(() => {
    const handleOpenFocus = (e: Event) => {
      const customEvent = e as CustomEvent;
      const goal = customEvent.detail;
      
      setActiveContext(goal);
      setSeconds(0);
      setIsRunning(true);
      // setIsFullscreen(true); // Opcional: abre a tela cheia. O usuário pediu para "abrir o cronometro e comecar a contabilizar"
      // Se não abrirmos o fullscreen, ele só começa a rodar no header. Vamos abrir o fullscreen por padrão se era "zen-focus"
      setIsFullscreen(true);
    };

    window.addEventListener('papyrus:open-zen-focus', handleOpenFocus);
    return () => window.removeEventListener('papyrus:open-zen-focus', handleOpenFocus);
  }, [setActiveContext, setSeconds]);

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

  const handleOpenManualRegister = () => {
    setActiveContext(null);
    setSeconds(0);
    setIsRunning(false);
    setIsFullscreen(false);
    setIsModalOpen(true);
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
