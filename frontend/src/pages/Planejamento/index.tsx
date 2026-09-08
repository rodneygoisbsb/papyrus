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
        <div className="flex flex-col items-center justify-center w-full min-h-[60vh] py-8">
            <div className="card-papyrus-static !p-10 w-full max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200">
                <h2 className="text-3xl font-black text-base-content text-center mb-6">Planejamento de Estudos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <button
                        type="button"
                        onClick={() => setIsWizardOpen(true)}
                        className="relative overflow-hidden p-8 rounded-3xl bg-base-100 text-left cursor-pointer group hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 transform-gpu border border-base-300/80 hover:border-primary/40"
                    >
                        {/* Fundo sutil com gradiente suave */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        {/* Brilho no canto */}
                        <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors duration-500"></div>
                        
                        <div className="relative z-10 flex flex-col space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-content transition-all duration-300 shadow-sm">
                                <Calendar size={24} />
                            </div>
                            
                            <div>
                                <h4 className="font-extrabold text-base-content text-lg">Cronograma Semanal</h4>
                                <p className="text-sm text-neutral-content mt-1">Metas fixas distribuídas por dias da semana.</p>
                            </div>
                        </div>
                    </button>
                    <button
                        type="button"
                        disabled
                        className="p-8 rounded-3xl bg-base-200/50 text-left space-y-3 border border-base-200 opacity-60 cursor-not-allowed group"
                        title="Em breve"
                    >
                        <RotateCcw size={28} className="text-base-content/50" />
                        <div className="flex items-center gap-2">
                            <h4 className="font-extrabold text-base-content/70 text-lg">Ciclo de Estudos</h4>
                            <span className="text-xs font-bold bg-base-300 text-base-content px-2 py-0.5 rounded-full uppercase tracking-wider">Breve</span>
                        </div>
                        <p className="text-sm text-base-content/50">Sequência fluida de matérias por horas estudadas.</p>
                    </button>
                </div>
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