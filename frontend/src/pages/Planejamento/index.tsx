import React from 'react';
import { Calendar, RotateCcw } from 'lucide-react';

export default function PlanejamentoTab() {
    return (
        <div className="card-papyrus !p-8 max-w-2xl mx-auto space-y-6 animate-in fade-in duration-200">
            <h2 className="text-2xl font-black text-base-content text-center">Planejamento de Estudos</h2>
            <div className="grid grid-cols-2 gap-4">
                <button
                    type="button"
                    className="p-6 rounded-3xl bg-primary/10 text-left space-y-2 cursor-pointer hover:bg-primary/15 transition-all border border-primary/20"
                >
                    <Calendar size={24} className="text-primary" />
                    <h4 className="font-extrabold text-base-content text-sm">Cronograma Semanal</h4>
                    <p className="text-[11px] text-neutral-content">Metas fixas distribuídas por dias da semana.</p>
                </button>
                <button
                    type="button"
                    className="p-6 rounded-3xl bg-base-200 text-left space-y-2 hover:bg-base-300 transition-all cursor-pointer border border-base-300"
                >
                    <RotateCcw size={24} className="text-accent" />
                    <h4 className="font-extrabold text-base-content text-sm">Ciclo de Estudos</h4>
                    <p className="text-[11px] text-neutral-content">Sequência fluida de matérias por horas estudadas.</p>
                </button>
            </div>
        </div>
    );
}