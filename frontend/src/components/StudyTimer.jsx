import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import RegisterStudyModal from '../modals/RegisterStudyModal';
import {
    Play,
    Pause,
    Square,
    RotateCcw,
    Maximize2,
    Minimize2,
    BookOpenCheck,
    Trophy
} from 'lucide-react';
export default function StudyTimer({ disciplines = [], onSaveStudy = () => { } }) {
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 1. MOTOR DO CRONÔMETRO PROGRESSIVO
    useEffect(() => {
        let interval = null;
        if (isRunning) {
            interval = setInterval(() => {
                setSeconds((prev) => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    // 2. CONTROLES DO TEMPO
    const togglePlay = () => setIsRunning((prev) => !prev);

    const handleReset = () => {
        setIsRunning(false);
        setSeconds(0);
    };

    // Converte segundos acumulados para { hours, minutes }
    const getInitialTime = () => ({
        hours: Math.floor(seconds / 3600),
        minutes: Math.floor((seconds % 3600) / 60),
    });

    // 3. AÇÕES DE ABERTURA DE MODAL
    const handleOpenRegister = () => {
        setIsRunning(false); // Pausa o tempo ao abrir o modal
        setIsModalOpen(true);
    };

    // Para o cronômetro e abre o modal de registro com o tempo atual
    const handleStop = () => {
        setIsRunning(false);
        setIsModalOpen(true);
    };

    const handleFinalizarMissao = () => {
        setIsRunning(false); // Pausa o tempo
        setIsFullscreen(false); // Fecha a tela preta
        setIsModalOpen(true); // Abre o modal branco de registro
    };

    // 4. FORMATADOR DE TEMPO (HH:MM:SS)
    const formatTime = (totalSecs) => {
        const hrs = Math.floor(totalSecs / 3600);
        const mins = Math.floor((totalSecs % 3600) / 60);
        const secs = totalSecs % 60;

        if (hrs > 0) {
            return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        }
        // Se não tem horas, mostra apenas MM:SS no modo normal (no modo Zen mostraremos tudo)
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    // Formato estendido sempre com HH:MM:SS para o Modo Zen
    const formatTimeZen = (totalSecs) => {
        const hrs = Math.floor(totalSecs / 3600);
        const mins = Math.floor((totalSecs % 3600) / 60);
        const secs = totalSecs % 60;
        return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    return (
        <>
            {/* ─────────────────────────────────────────────────────────── */}
            {/* BARRA COMPACTA NO HEADER COM TOKENS SEMÂNTICOS DAISYUI       */}
            {/* ─────────────────────────────────────────────────────────── */}
            <div className="flex items-center gap-1.5 bg-base-100 text-base-content px-2.5 py-1.5 rounded-2xl border border-base-300/70 shadow-xs font-['Plus_Jakarta_Sans']">

                {/* BOTÃO 1: REGISTRAR ESTUDO (Abre Modal Rápido) */}
                <button
                    type="button"
                    onClick={handleOpenRegister}
                    className="w-7 h-7 rounded-xl flex items-center justify-center bg-primary/10 hover:bg-primary text-primary hover:text-primary-content transition-all cursor-pointer shadow-2xs"
                    title="Registrar Estudo"
                >
                    <BookOpenCheck size={15} />
                </button>

                {/* BOTÃO 2: PLAY / PAUSE */}
                <button
                    type="button"
                    onClick={togglePlay}
                    className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all cursor-pointer ${isRunning
                        ? 'bg-warning text-warning-content shadow-xs'
                        : 'bg-primary text-primary-content hover:bg-primary/90 shadow-xs'
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
                    className="w-7 h-7 rounded-xl flex items-center justify-center bg-error/10 hover:bg-error text-error hover:text-error-content transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Parar e Registrar"
                >
                    <Square size={12} fill="currentColor" />
                </button>

                {/* BOTÃO 4: RESET */}
                {!isRunning && seconds > 0 && (
                    <button
                        type="button"
                        onClick={handleReset}
                        className="w-7 h-7 rounded-xl flex items-center justify-center bg-base-200 hover:bg-base-300 text-neutral-content hover:text-base-content transition-all cursor-pointer"
                        title="Zerar Cronômetro"
                    >
                        <RotateCcw size={13} />
                    </button>
                )}

                {/* Divisor Vertical */}
                <div className="h-4 w-px bg-base-300 mx-1" />

                {/* Mostrador Numérico no Header */}
                <span className="font-mono text-xs sm:text-sm font-bold tracking-wider text-primary tabular-nums px-1">
                    {formatTime(seconds)}
                </span>

                {/* BOTÃO 4: MAXIMIZAR (Tela Cheia Zen) */}
                <button
                    type="button"
                    onClick={() => setIsFullscreen(true)}
                    className="w-7 h-7 rounded-xl flex items-center justify-center text-neutral-content hover:text-base-content hover:bg-base-200 transition-all cursor-pointer ml-0.5"
                    title="Modo Foco Zen"
                >
                    <Maximize2 size={14} />
                </button>
            </div>

            {/* ─────────────────────────────────────────────────────────── */}
            {/* MODAL DE REGISTRO DE ESTUDO (Visível quando isModalOpen)    */}
            {/* ─────────────────────────────────────────────────────────── */}
            {/* 🚀 Conexão Direta com o Modal Oficial */}
            {isModalOpen && (
                <RegisterStudyModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    recordedTime={new Date(seconds * 1000).toISOString().substring(11, 19)}
                    onSave={(dados) => {
                        if (onSaveStudy) onSaveStudy(dados);
                        setIsModalOpen(false);
                        setSeconds(0);
                        setIsRunning(false);
                    }}
                />
            )}

            {/* ─────────────────────────────────────────────────────────── */}
            {/* MODO FOCO TELA CHEIA (ZEN - ESTILO NEON DARK)               */}
            {/* ─────────────────────────────────────────────────────────── */}
            {
                isFullscreen && createPortal(
                    <div className="fixed inset-0 z-[9999] bg-[#0B0F19] flex flex-col p-6 sm:p-10 animate-in fade-in zoom-in-95 duration-200 select-none font-['Plus_Jakarta_Sans']">

                        {/* TOPO: BADGE E VOLTAR */}
                        <div className="flex justify-between items-start w-full max-w-7xl mx-auto">
                            <div className="flex flex-col gap-2.5">
                                <div className="inline-flex items-center gap-2 bg-[#00E599]/10 border border-[#00E599]/20 text-[#00E599] px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(0,229,153,0.1)] w-max">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#00E599] animate-pulse" />
                                    Modo Concentração
                                </div>
                                <div>
                                    <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                                        Sessão de Estudo Livre
                                    </h2>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">
                                        Cronômetro Global
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => setIsFullscreen(false)}
                                className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl transition-all cursor-pointer"
                                title="Voltar ao Painel"
                            >
                                <Minimize2 size={16} />
                                <span className="hidden sm:inline">Voltar ao Painel</span>
                            </button>
                        </div>

                        {/* CENTRO: RELÓGIO GIGANTE NEON */}
                        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-7xl mx-auto">
                            <div className="font-mono text-7xl sm:text-[120px] md:text-[160px] font-black tracking-tight text-[#00E599] drop-shadow-[0_0_45px_rgba(0,229,153,0.2)] tabular-nums leading-none">
                                {formatTimeZen(seconds)}
                            </div>

                            <p className="text-xs sm:text-sm uppercase tracking-[0.4em] text-slate-500 font-bold mt-4 sm:mt-8">
                                Tempo Líquido em Foco
                            </p>

                            <div className="flex items-center gap-5 mt-10 sm:mt-14">
                                <button
                                    type="button"
                                    onClick={togglePlay}
                                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-3xl flex items-center justify-center transition-all duration-200 active:scale-95 shadow-xl cursor-pointer ${isRunning
                                        ? 'bg-[#F59E0B] text-black hover:bg-[#D97706] shadow-[#F59E0B]/20'
                                        : 'bg-[#00E599] text-black hover:bg-emerald-400 shadow-[#00E599]/20'
                                        }`}
                                    title={isRunning ? "Pausar" : "Iniciar"}
                                >
                                    {isRunning ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1.5" />}
                                </button>

                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl flex items-center justify-center bg-[#1E293B] hover:bg-[#334155] text-slate-400 hover:text-white transition-all duration-200 active:scale-95 border border-white/5 cursor-pointer"
                                    title="Reiniciar tempo"
                                >
                                    <RotateCcw size={28} />
                                </button>
                            </div>
                        </div>

                        {/* BASE: FINALIZAR MISSÃO */}
                        <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-7xl mx-auto border-t border-white/10 pt-6 sm:pt-8 gap-4">
                            <span className="text-xs sm:text-sm text-slate-500 font-medium">
                                Foco total no papiro. Sem distrações.
                            </span>

                            <button
                                type="button"
                                onClick={handleFinalizarMissao}
                                className="w-full sm:w-auto bg-[#00E599] text-black px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-2.5 hover:bg-[#00c985] active:scale-95 transition-all shadow-[0_0_25px_rgba(0,229,153,0.15)] cursor-pointer"
                            >
                                <Trophy size={20} />
                                Finalizar Missão
                            </button>
                        </div>

                    </div>,
                    document.body
                )
            }
        </>
    );
}