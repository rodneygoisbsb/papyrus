import React, { useState, useEffect } from 'react';
import { Calendar, RotateCcw, Trash2 } from 'lucide-react';
import CreateScheduleWizard from './components/CreateScheduleWizard';

function useScheduleConfig() {
    const [hasActiveSchedule, setHasActiveSchedule] = useState(() => {
        return localStorage.getItem('papyrus_active_schedule') === 'true';
    });

    const createSchedule = () => {
        localStorage.setItem('papyrus_active_schedule', 'true');
        setHasActiveSchedule(true);
    };

    const resetSchedule = () => {
        localStorage.removeItem('papyrus_active_schedule');
        setHasActiveSchedule(false);
    };

    return { hasActiveSchedule, createSchedule, resetSchedule };
}

import ScheduleView from './components/ScheduleView';

function WeeklyScheduleView({ onReset }: { onReset: () => void }) {
    return (
        <div className="w-full max-w-full mx-auto animate-in fade-in zoom-in-95 duration-300">
            <ScheduleView
                hideHeader={false}
                title="Planejamento Ativo"
                subtitle="Visão geral da sua grade de estudos"
                headerAction={
                    <button
                        onClick={() => {
                            if (window.confirm("Tem certeza que deseja apagar o planejamento atual e criar um novo?")) {
                                onReset();
                            }
                        }}
                        className="btn btn-outline border-slate-200 text-slate-600 hover:bg-error/10 hover:text-error hover:border-error/30 btn-sm rounded-xl font-bold shadow-sm"
                    >
                        <Trash2 size={16} /> Refazer
                    </button>
                }
            />
        </div>
    );
}

export default function PlanejamentoTab() {
    const { hasActiveSchedule, createSchedule, resetSchedule } = useScheduleConfig();
    const [isWizardOpen, setIsWizardOpen] = useState(false);

    if (hasActiveSchedule) {
        return (
            <div className="flex flex-col items-center w-full pt-0 pb-8">
                <WeeklyScheduleView onReset={resetSchedule} />
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-center w-full min-h-[60vh] py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mx-auto animate-in fade-in duration-200">
                {/* CARD CRONOGRAMA SEMANAL */}
                <button
                    type="button"
                    onClick={() => setIsWizardOpen(true)}
                    className="relative overflow-hidden bg-base-100 p-8 rounded-3xl border border-base-200 shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-all duration-300 cursor-pointer group flex flex-col gap-5 text-left hover:-translate-y-1 hover:shadow-xl hover:border-primary/40"
                >
                    {/* Fundo sutil com gradiente suave */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                    <div className="relative z-10 w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-content transition-all duration-300">
                        <Calendar size={28} />
                    </div>

                    <div className="relative z-10">
                        <h3 className="font-extrabold text-base-content text-xl mb-2 group-hover:text-primary transition-colors">
                            Cronograma Semanal
                        </h3>
                        <p className="text-sm text-neutral-content/80 leading-relaxed font-medium">
                            Metas fixas distribuídas por dias da semana.
                        </p>
                    </div>
                </button>

                {/* CARD CICLO DE ESTUDOS */}
                <button
                    type="button"
                    disabled
                    className="bg-base-100/50 p-8 rounded-3xl border border-base-200 shadow-sm transition-all duration-300 cursor-not-allowed group flex flex-col gap-5 text-left opacity-70"
                    title="Em breve"
                >
                    <div className="w-14 h-14 rounded-2xl bg-base-200 text-base-content/50 flex items-center justify-center">
                        <RotateCcw size={28} />
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-extrabold text-base-content/70 text-xl">
                                Ciclo de Estudos
                            </h3>
                            <span className="text-[10px] font-bold bg-base-300 text-base-content px-2 py-0.5 rounded-full uppercase tracking-wider">
                                Breve
                            </span>
                        </div>
                        <p className="text-sm text-base-content/50 leading-relaxed font-medium">
                            Sequência fluida de matérias por horas estudadas.
                        </p>
                    </div>
                </button>
            </div>

            {isWizardOpen && (
                <CreateScheduleWizard
                    onClose={() => setIsWizardOpen(false)}
                    onComplete={() => {
                        setIsWizardOpen(false);
                        createSchedule();
                    }}
                />
            )}
        </div>
    );
}