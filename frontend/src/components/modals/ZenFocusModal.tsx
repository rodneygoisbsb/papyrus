import React from 'react';
import { createPortal } from 'react-dom';
import { Play, Pause, RotateCcw, Minimize2, Trophy } from 'lucide-react';
import { formatTimeDisplay } from '../../utils/timeFormatters';

export default function ZenFocusModal({
    seconds,
    isRunning,
    togglePlay,
    handleReset,
    setIsFullscreen,
    handleFinalizarMissao
}) {
    return createPortal(
        <div
            data-theme="papyrusDark"
            className="fixed inset-0 z-[9999] bg-base-200 text-base-content flex flex-col justify-between p-6 sm:p-10 select-none animate-in fade-in zoom-in-95 duration-200"
        >
            {/* TOPO: BADGE E VOLTAR */}
            <header className="flex justify-between items-start w-full max-w-6xl mx-auto">
                <div className="flex flex-col gap-2">
                    <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase w-max">
                        <span className={`w-1.5 h-1.5 rounded-full bg-primary ${isRunning ? 'animate-ping' : ''}`} />
                        Modo Concentração
                    </div>
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-base-content">
                            Sessão de Estudo Livre
                        </h2>
                        <p className="text-xs text-neutral-content font-bold uppercase tracking-widest mt-0.5">
                            Cronômetro Global
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={() => setIsFullscreen(false)}
                    className="flex items-center gap-2 text-sm font-semibold text-neutral-content hover:text-base-content bg-base-100 hover:bg-base-300/60 border border-base-300 px-4 py-2.5 rounded-2xl transition-colors duration-150 cursor-pointer shadow-sm"
                    title="Voltar ao Painel"
                >
                    <Minimize2 size={16} />
                    <span className="hidden sm:inline">Voltar ao Painel</span>
                </button>
            </header>

            {/* CENTRO: RELÓGIO GIGANTE E CONTROLES */}
            <main className="flex-1 flex flex-col items-center justify-center w-full max-w-6xl mx-auto py-8">
                {/* DÍGITOS DO CRONÔMETRO */}
                <div className="font-mono text-7xl sm:text-9xl md:text-[140px] font-black tracking-tight text-primary drop-shadow-[0_0_40px_rgba(94,148,255,0.22)] tabular-nums leading-none select-none">
                    {formatTimeDisplay(seconds, true)}
                </div>

                <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-neutral-content font-bold mt-6 sm:mt-8">
                    Tempo Líquido em Foco
                </p>

                {/* PAINEL DE COMANDOS */}
                <div className="flex items-center gap-6 mt-10 sm:mt-14">
                    {/* BOTÃO PRINCIPAL DE PLAY/PAUSE */}
                    <button
                        type="button"
                        onClick={togglePlay}
                        className={`w-20 h-20 sm:w-24 sm:h-24 rounded-[30px] flex items-center justify-center transition-transform duration-200 ease-out active:scale-95 cursor-pointer shadow-lg transform-gpu ${isRunning
                            ? 'bg-accent text-accent-content hover:brightness-110 shadow-accent/20'
                            : 'bg-primary text-primary-content hover:brightness-110 shadow-[0_0_35px_rgba(94,148,255,0.35)]'
                            }`}
                        title={isRunning ? "Pausar Sessão" : "Iniciar Sessão"}
                    >
                        {isRunning ? (
                            <Pause size={36} fill="currentColor" />
                        ) : (
                            <Play size={36} fill="currentColor" className="ml-1.5" />
                        )}
                    </button>

                    {/* BOTÃO DE RESET */}
                    <button
                        type="button"
                        onClick={handleReset}
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center bg-base-100 hover:bg-base-300 text-neutral-content hover:text-base-content border border-base-300 transition-transform duration-200 ease-out active:scale-95 cursor-pointer shadow-sm transform-gpu"
                        title="Reiniciar tempo"
                    >
                        <RotateCcw size={22} />
                    </button>
                </div>
            </main>

            {/* BASE: STATUS E CONCLUSÃO */}
            <footer className="flex flex-col sm:flex-row items-center justify-between w-full max-w-6xl mx-auto border-t border-base-300/70 pt-6 sm:pt-8 gap-4">
                <span className="text-xs sm:text-sm text-neutral-content font-medium">
                    Foco total no papiro. Sem distrações.
                </span>

                <button
                    type="button"
                    onClick={handleFinalizarMissao}
                    className="w-full sm:w-auto bg-primary text-secondary-content px-7 py-3.5 rounded-2xl font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 hover:brightness-110 active:scale-95 transition-transform duration-200 ease-out shadow-[0_0_25px_rgba(52,211,153,0.2)] cursor-pointer transform-gpu"
                >
                    <Trophy size={18} />
                    Finalizar Missão
                </button>
            </footer>
        </div>,
        document.body
    );
}