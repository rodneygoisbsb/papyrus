import React from 'react';
import { Clock, Play, Pause, RotateCcw } from 'lucide-react';
import { usePomodoro } from '../../../hooks/usePomodoro';
import { formatPomodoroTimer } from '../../../utils/timeFormatters';

export default function PomodoroCard() {
    const {
        pomodoroSeconds,
        isPomodoroRunning,
        pomodoroMode,
        togglePomodoro,
        resetPomodoro,
    } = usePomodoro();

    return (
        <div className="card-papyrus flex flex-col items-center text-center">
            <div className="flex items-center justify-between w-full mb-4 pb-2 border-b border-base-300/60">
                <div className="flex items-center gap-2">
                    <Clock size={18} className="text-accent" />
                    <h3 className="font-bold text-sm tracking-tight text-base-content">Timer de Ciclos</h3>
                </div>
                <div className="join">
                    <button
                        type="button"
                        onClick={() => resetPomodoro('focus')}
                        className={`join-item btn btn-xs ${pomodoroMode ==='focus'
                            ? 'btn-primary text-primary-content font-bold'
                            : 'btn-ghost text-neutral-content'
                            } focus-visible:ring-2 focus-visible:ring-primary`}
                    >
                        Foco
                    </button>
                    <button
                        type="button"
                        onClick={() => resetPomodoro('break')}
                        className={`join-item btn btn-xs ${pomodoroMode ==='break'
                            ? 'btn-primary text-primary-content font-bold'
                            : 'btn-ghost text-neutral-content'
                            } focus-visible:ring-2 focus-visible:ring-primary`}
                    >
                        Pausa
                    </button>
                </div>
            </div>

            <div className="my-2 py-3 px-6 bg-base-200/40 border border-base-300/60 rounded-2xl w-full">
                <span className="text-4xl font-semibold tracking-tight text-base-content tabular-nums">
                    {formatPomodoroTimer(pomodoroSeconds)}
                </span>
            </div>

            <div className="flex items-center gap-3 mt-2 w-full">
                <button
                    type="button"
                    onClick={togglePomodoro}
                    className={ transform-gpu`transform-gpu btn btn-sm flex-1 font-semibold rounded-xl ${isPomodoroRunning ? 'btn-warning' : 'btn-primary text-primary-content'
                        } shadow-2xs`}
                >
                    {isPomodoroRunning ? (
                        <>
                            <Pause size={15} /> Pausar
                        </>
                    ) : (
                        <>
                            <Play size={15} fill="currentColor" /> Iniciar
                        </>
                    )}
                </button>
                <button
                    type="button"
                    onClick={() => resetPomodoro(pomodoroMode)}
                    className="btn btn-sm btn-square btn-ghost border border-base-300/70 text-neutral-content hover:text-base-content rounded-xl"
                    title="Reiniciar Timer"
                >
                    <RotateCcw size={15} />
                </button>
            </div>
        </div>
    );
}
