// src/components/layout/Header.jsx
import React, { useState } from 'react';
import { Flame, Play, Pause, Square, ChevronDown, Check } from 'lucide-react';

export default function Header({
    planosDisponiveis = [],
    selectedPlanId,
    setSelectedPlanId,
    timerSeconds = 0,
    isTimerRunning = false,
    setIsTimerRunning,
    formatStopwatch,
    handleStopAndRegister,
    streakDays = 0,
}) {
    const [isPlanOpen, setIsPlanOpen] = useState(false);

    const planoAtivo = planosDisponiveis.find((p) => p.id === selectedPlanId);
    const tempoFormatado = formatStopwatch ? formatStopwatch(timerSeconds) : '00:00:00';

    return (
        <header className="h-[68px] px-7 flex items-center justify-between bg-base-100 border-b border-base-300/60 sticky top-0 z-30 shrink-0 shadow-sm">

            {/* ESQUERDA: Seletor de plano */}
            <div className="flex items-center gap-3">
                <span className="text-[11px] uppercase font-bold tracking-widest text-neutral-content hidden sm:block">
                    Plano:
                </span>
                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setIsPlanOpen((v) => !v)}
                        className="flex items-center gap-2 bg-base-200/70 hover:bg-base-200 text-primary font-bold text-xs px-3.5 py-2 rounded-xl border border-base-300/70 transition-all cursor-pointer"
                    >
                        <span>{planoAtivo?.nome || 'Selecionar'}</span>
                        <ChevronDown size={13} className={`transition-transform duration-200 ${isPlanOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isPlanOpen && (
                        <>
                            <div className="fixed inset-0 z-40" onClick={() => setIsPlanOpen(false)} />
                            <ul className="absolute left-0 mt-2 w-56 bg-base-100 border border-base-300/70 rounded-2xl shadow-xl p-1.5 z-50 space-y-0.5 animate-in fade-in zoom-in-95 duration-150">
                                {planosDisponiveis.map((plano) => (
                                    <li key={plano.id}>
                                        <button
                                            type="button"
                                            onClick={() => { setSelectedPlanId(plano.id); setIsPlanOpen(false); }}
                                            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between cursor-pointer transition-all ${selectedPlanId === plano.id
                                                ? 'bg-primary text-primary-content font-bold'
                                                : 'text-base-content hover:bg-base-200/70'
                                                }`}
                                        >
                                            {plano.nome}
                                            {selectedPlanId === plano.id && <Check size={13} />}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            </div>

            {/* DIREITA: Cronômetro + Streak */}
            <div className="flex items-center gap-3">

                {/* Cronômetro — pílula */}
                <div className="join rounded-full bg-base-100 border border-base-300 shadow-sm p-0.5 flex items-center">
                    <div className="flex items-center gap-1.5 px-3 py-1">
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${isTimerRunning ? 'bg-success animate-pulse' : 'bg-base-300'}`} />
                        <span
                            className="font-bold text-sm text-base-content tabular-nums tracking-tight"
                            style={{ fontFeatureSettings: "'tnum' on" }}
                        >
                            {tempoFormatado}
                        </span>
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsTimerRunning?.(!isTimerRunning)}
                        className={`btn btn-circle btn-xs join-item shrink-0 border-0 shadow-none ${isTimerRunning
                            ? 'bg-warning/10 text-warning hover:bg-warning/20'
                            : 'bg-primary text-primary-content hover:bg-primary/90'
                            }`}
                        title={isTimerRunning ? 'Pausar' : 'Iniciar'}
                    >
                        {isTimerRunning ? <Pause size={12} /> : <Play size={12} fill="currentColor" />}
                    </button>

                    {timerSeconds > 0 && (
                        <button
                            type="button"
                            onClick={handleStopAndRegister}
                            className="btn btn-circle btn-xs join-item shrink-0 bg-base-200 text-neutral-content hover:bg-base-300 border-0 shadow-none mr-0.5"
                            title="Parar e registrar"
                        >
                            <Square size={11} fill="currentColor" />
                        </button>
                    )}
                </div>

                {/* Badge streak */}
                <div className="flex items-center gap-1.5 bg-orange-50 border border-orange-200 text-accent font-bold text-xs rounded-full px-3.5 py-1.5 shadow-2xs">
                    <Flame size={15} className="text-accent fill-accent/80 shrink-0" />
                    <span className="hidden sm:inline">{streakDays} dias</span>
                    <span className="sm:hidden">{streakDays}d</span>
                </div>

            </div>
        </header>
    );
}