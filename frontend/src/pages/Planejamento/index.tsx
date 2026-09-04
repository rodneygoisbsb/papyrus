import React, { useState } from 'react';
import { Calendar, RotateCcw } from 'lucide-react';
import CreateScheduleWizard from './components/CreateScheduleWizard';

export default function PlanejamentoTab() {
    const [isWizardOpen, setIsWizardOpen] = useState(false);

    return (
        <div className="card-papyrus !p-8 max-w-2xl mx-auto space-y-6 animate-in fade-in duration-200">
            <h2 className="text-2xl font-black text-base-content text-center">Planejamento de Estudos</h2>
            <div className="grid grid-cols-2 gap-4">
                <button
                    type="button"
                    onClick={() => setIsWizardOpen(true)}
                    className="p-6 rounded-3xl bg-primary/10 text-left space-y-2 cursor-pointer hover:bg-primary/15 transition-all border border-primary/20 group"
                >
                    <Calendar size={24} className="text-primary group-hover:scale-110 transition-transform" />
                    <h4 className="font-extrabold text-base-content text-sm">Cronograma Semanal</h4>
                    <p className="text-[11px] text-neutral-content">Metas fixas distribuídas por dias da semana.</p>
                </button>
                <button
                    type="button"
                    disabled
                    className="p-6 rounded-3xl bg-base-200/50 text-left space-y-2 border border-base-200 opacity-60 cursor-not-allowed"
                    title="Em breve"
                >
                    <RotateCcw size={24} className="text-base-content/50" />
                    <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-base-content/70 text-sm">Ciclo de Estudos</h4>
                        <span className="text-[8px] font-bold bg-base-300 text-base-content px-1.5 py-0.5 rounded-full uppercase tracking-wider">Breve</span>
                    </div>
                    <p className="text-[11px] text-base-content/50">Sequência fluida de matérias por horas estudadas.</p>
                </button>
            </div>

            {isWizardOpen && (
                <CreateScheduleWizard onClose={() => setIsWizardOpen(false)} />
            )}
        </div>
    );
}