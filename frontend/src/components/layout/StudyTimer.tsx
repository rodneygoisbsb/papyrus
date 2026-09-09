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

export default function StudyTimer({ disciplines = [], onSaveStudy = () => { }, isFloating = false }) {
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

    // Tamanhos dinâmicos
    const btnClass = isFloating ? "w-8 h-8 rounded-xl" : "w-7 h-7 rounded-xl";
    const iconSize = isFloating ? 15 : 13;
    const textSize = isFloating ? "text-sm sm:text-base" : "text-xs sm:text-sm";
    const containerPad = isFloating ? "px-3.5 py-2" : "px-2.5 py-1.5";
    const shadowClass = isFloating 
        ? "shadow-[0_8px_30px_rgba(0,0,0,0.12)]" 
        : "shadow-xs";

    return (
        <>
            {/* ─────────────────────────────────────────────────────────── */}
            {/* BARRA COMPACTA NO HEADER COM EFEITOS PREMIUM                */}
            {/* ─────────────────────────────────────────────────────────── */}
            <div className={`flex items-center gap-1.5 ${containerPad} rounded-2xl border transition-all duration-500 font-['Plus_Jakarta_Sans'] ${shadowClass} ${
                isRunning 
                    ? `bg-base-100 border-accent/40 ${isFloating ? 'shadow-[0_12px_40px_rgba(34,197,94,0.25)] ring-2 ring-accent/30' : 'shadow-[0_0_20px_rgba(34,197,94,0.15)] ring-1 ring-accent/20'}`
                    : 'bg-base-100 border-base-300/70'
            }`}>
                {/* BOTÃO 1: REGISTRAR ESTUDO (Abre Modal Rápido) */}
                <button
                    type="button"
                    onClick={handleOpenManualRegister}
                    className={`${btnClass} flex items-center justify-center bg-primary/10 hover:bg-primary text-primary hover:text-primary-content transition-colors duration-150 cursor-pointer shadow-2xs transform-gpu`}
                    title="Registrar Estudo"
                >
                    <BookOpenCheck size={isFloating ? 17 : 15} />
                </button>

                {/* BOTÃO 2: PLAY / PAUSE */}
                <button
                    type="button"
                    onClick={togglePlay}
                    className={`${btnClass} flex items-center justify-center transition-transform duration-200 ease-out cursor-pointer transform-gpu ${isRunning
                        ? 'bg-accent text-accent-content hover:brightness-110 shadow-md animate-pulse'
                        : 'bg-primary text-primary-content hover:brightness-110 shadow-md'
                        }`}
                    title={isRunning ? "Pausar" : "Iniciar"}
                >
                    {isRunning ? <Pause size={iconSize} fill="currentColor" /> : <Play size={iconSize} fill="currentColor" className="ml-0.5" />}
                </button>

                {/* BOTÃO 3: PARAR (abre modal de registro) */}
                <button
                    type="button"
                    onClick={handleStop}
                    disabled={seconds === 0}
                    className={`${btnClass} flex items-center justify-center bg-error/10 hover:bg-error text-error hover:text-error-content transition-colors duration-150 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transform-gpu`}
                    title="Parar e Registrar"
                >
                    <Square size={iconSize - 1} fill="currentColor" />
                </button>

                {/* BOTÃO 4: RESET */}
                {!isRunning && seconds > 0 && (
                    <button
                        type="button"
                        onClick={handleReset}
                        className={`${btnClass} flex items-center justify-center bg-base-200 hover:bg-base-300 text-neutral-content hover:text-base-content transition-colors duration-150 cursor-pointer transform-gpu`}
                        title="Zerar Cronômetro"
                    >
                        <RotateCcw size={iconSize} />
                    </button>
                )}

                {/* Divisor Vertical */}
                <div className={`h-5 w-px mx-1.5 transition-colors duration-300 ${isRunning ? 'bg-accent/30' : 'bg-base-300'}`} />

                {/* Mostrador Numérico no Header */}
                <span className={`font-mono ${textSize} font-bold tracking-wider tabular-nums px-1 transition-all duration-300 ${
                    isRunning 
                        ? 'text-accent drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]' 
                        : 'text-primary'
                }`}>
                    {formatTimeDisplay(seconds)}
                </span>

                {/* BOTÃO 4: MAXIMIZAR (Tela Cheia Zen) */}
                <button
                    type="button"
                    onClick={() => setIsFullscreen(true)}
                    className={`${btnClass} flex items-center justify-center text-neutral-content hover:text-base-content hover:bg-base-200 transition-colors duration-150 cursor-pointer ml-1`}
                    title="Modo Foco Zen"
                >
                    <Maximize2 size={isFloating ? 16 : 14} />
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
