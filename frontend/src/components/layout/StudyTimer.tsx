import React from 'react';
import RegisterStudyModal from '../modals/RegisterStudyModal';
import ZenFocusModal from '../modals/ZenFocusModal';
import { useStudyTimer } from '../../hooks/useStudyTimer';
import { formatTimeDisplay, secondsToTimeString } from '../../utils/timeFormatters';
import {
    Play,
    Pause,
    Square,
    RotateCcw,
    Maximize2,
    BookOpenCheck
} from 'lucide-react';

export default function StudyTimer({ disciplines = [], onSaveStudy = () => { } }) {
    const {
        seconds,
        isRunning,
        isFullscreen,
        isModalOpen,
        activeContext,
        handleToggleTimer: togglePlay,
        handleReset,
        handleOpenFocus,
        handleCloseFocus,
        handleOpenManualRegister,
        handleOpenSaveModal: handleOpenRegister,
        handleCloseSaveModal,
        handleSaveSession,
    } = useStudyTimer({ onSaveStudy });

    const handleStop = handleOpenRegister;
    const setIsFullscreen = (val: boolean) => val ? handleOpenFocus() : handleCloseFocus();
    const setIsModalOpen = (val: boolean) => val ? handleOpenRegister() : handleCloseSaveModal();
    const handleFinalizarMissao = handleOpenRegister;

    return (
        <>
            {/* ─────────────────────────────────────────────────────────── */}
            {/* BARRA COMPACTA NO HEADER COM TOKENS SEMÂNTICOS DAISYUI       */}
            {/* ─────────────────────────────────────────────────────────── */}
            <div className="flex items-center gap-1.5 bg-base-100 text-base-content px-2.5 py-1.5 rounded-2xl border border-base-300/70 shadow-xs font-['Plus_Jakarta_Sans']">
                {/* BOTÃO 1: REGISTRAR ESTUDO (Abre Modal Rápido) */}
                <button
                    type="button"
                    onClick={handleOpenManualRegister}
                    className="w-7 h-7 rounded-xl flex items-center justify-center bg-primary/10 hover:bg-primary text-primary hover:text-primary-content transition-colors duration-150 cursor-pointer shadow-2xs transform-gpu"
                    title="Registrar Estudo"
                >
                    <BookOpenCheck size={15} />
                </button>

                {/* BOTÃO 2: PLAY / PAUSE */}
                <button
                    type="button"
                    onClick={togglePlay}
                    className={`w-7 h-7 rounded-xl flex items-center justify-center transition-transform duration-200 ease-out cursor-pointer transform-gpu ${isRunning
                        ? 'bg-accent text-accent-content hover:brightness-110 shadow-md'
                        : 'bg-primary text-primary-content hover:brightness-110 shadow-md'
                        }`}
                    title={isRunning ? "Pausar" : "Iniciar"}
                >
                    {isRunning ? <Pause size={13} fill="currentColor" /> : <Play size={13} fill="currentColor" className="ml-0.5" />}
                </button>

                {/* BOTÃO 3: PARAR (abre modal de registro) */}
                <button
                    type="button"
                    onClick={handleStop}
                    disabled={seconds === 0}
                    className="w-7 h-7 rounded-xl flex items-center justify-center bg-error/10 hover:bg-error text-error hover:text-error-content transition-colors duration-150 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transform-gpu"
                    title="Parar e Registrar"
                >
                    <Square size={12} fill="currentColor" />
                </button>

                {/* BOTÃO 4: RESET */}
                {!isRunning && seconds > 0 && (
                    <button
                        type="button"
                        onClick={handleReset}
                        className="w-7 h-7 rounded-xl flex items-center justify-center bg-base-200 hover:bg-base-300 text-neutral-content hover:text-base-content transition-colors duration-150 cursor-pointer transform-gpu"
                        title="Zerar Cronômetro"
                    >
                        <RotateCcw size={13} />
                    </button>
                )}

                {/* Divisor Vertical */}
                <div className="h-4 w-px bg-base-300 mx-1" />

                {/* Mostrador Numérico no Header */}
                <span className="font-mono text-xs sm:text-sm font-bold tracking-wider text-primary tabular-nums px-1">
                    {formatTimeDisplay(seconds)}
                </span>

                {/* BOTÃO 4: MAXIMIZAR (Tela Cheia Zen) */}
                <button
                    type="button"
                    onClick={() => setIsFullscreen(true)}
                    className="w-7 h-7 rounded-xl flex items-center justify-center text-neutral-content hover:text-base-content hover:bg-base-200 transition-colors duration-150 cursor-pointer ml-0.5"
                    title="Modo Foco Zen"
                >
                    <Maximize2 size={14} />
                </button>
            </div>

            {/* ─────────────────────────────────────────────────────────── */}
            {/* MODAL DE REGISTRO DE ESTUDO (Visível quando isModalOpen)    */}
            {/* ─────────────────────────────────────────────────────────── */}
            {isModalOpen && (
                <RegisterStudyModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    recordedTime={secondsToTimeString(seconds)}
                    initialData={activeContext}
                    onSave={handleSaveSession}
                />
            )}

            {/* ─────────────────────────────────────────────────────────── */}
            {/* MODO FOCO TELA CHEIA (ZEN - ESTILO NEON DARK)               */}
            {/* ─────────────────────────────────────────────────────────── */}
            {isFullscreen && (
                <ZenFocusModal
                    seconds={seconds}
                    isRunning={isRunning}
                    togglePlay={togglePlay}
                    handleReset={handleReset}
                    setIsFullscreen={setIsFullscreen}
                    handleFinalizarMissao={handleFinalizarMissao}
                />
            )}
        </>
    );
}
