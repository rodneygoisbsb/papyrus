import React from 'react';
import { Minimize2, Pause, Play, RotateCcw, Trophy } from 'lucide-react';

export default function FocusModeModal({
    activeStudyModal,
    isFocusMode,
    setIsFocusMode,
    timerSeconds,
    setTimerSeconds,
    isTimerRunning,
    setIsTimerRunning,
    formatTimer,
    handleFinishStudy
}) {
    if (!activeStudyModal || !isFocusMode) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-8 text-white animate-in fade-in">
            <div className="flex justify-between items-center max-w-5xl w-full mx-auto">
                <div>
                    <h1 className="text-xl md:text-2xl font-black text-neutral-content mt-1">{activeStudyModal.topicName}</h1>
                    <p className="text-xs font-semibold text-neutral-content uppercase tracking-wider">{activeStudyModal.subject}</p>
                </div>
                <button
                    type="button"
                    onClick={() => setIsFocusMode(false)}
                    className="flex items-center gap-2 bg-base-100 hover:bg-base-300 text-base-content px-4 py-2.5 rounded-2xl text-xs font-bold shadow-sm transition-colors cursor-pointer"
                >
                    <Minimize2 size={16} /> Voltar ao Painel
                </button>
            </div>

            <div className="flex flex-col items-center justify-center my-auto">
                <span className="font-mono text-7xl md:text-9xl font-black text-primary tracking-wider drop-shadow-[0_0_40px_rgba(30,96,246,0.15)]">
                    {formatTimer(timerSeconds)}
                </span>
                <p className="text-xs uppercase tracking-widest text-neutral-content font-bold mt-4">Tempo Líquido em Foco</p>

                <div className="flex items-center gap-4 mt-8">
                    <button
                        type="button"
                        onClick={() => setIsTimerRunning(!isTimerRunning)}
                        className={`w-16 h-16 rounded-3xl flex items-center justify-center shadow-xl transition-all cursor-pointer ${isTimerRunning ? 'bg-accent text-white shadow-accent/25' : 'bg-primary text-white shadow-primary/25'
                            }`}
                    >
                        {isTimerRunning ? <Pause size={28} /> : <Play size={28} fill="currentColor" />}
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setTimerSeconds(0);
                            setIsTimerRunning(false);
                        }}
                        className="w-16 h-16 rounded-3xl bg-base-100 hover:bg-base-300 text-neutral-content flex items-center justify-center cursor-pointer shadow-sm"
                    >
                        <RotateCcw size={22} />
                    </button>
                </div>
            </div>

            <div className="max-w-5xl w-full mx-auto flex justify-between items-center pt-6 border-t border-base-300">
                <span className="text-xs text-neutral-content font-medium">Foco total no papiro. Sem distrações.</span>
                <button
                    type="button"
                    onClick={handleFinishStudy}
                    className="bg-primary hover:bg-primary/90 text-white font-black px-8 py-3.5 rounded-2xl flex items-center gap-2 transition-all shadow-lg shadow-primary/25 active:scale-95 cursor-pointer"
                >
                    <Trophy size={18} /> Finalizar missão
                </button>
            </div>
        </div>
    );
}