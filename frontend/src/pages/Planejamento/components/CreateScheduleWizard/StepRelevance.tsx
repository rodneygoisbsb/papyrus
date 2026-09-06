import React, { useEffect } from 'react';
import { WizardState } from './index';
import { calculateDisciplinePercentages } from '../../../../utils/scheduleCalculator';

interface StepRelevanceProps {
    state: WizardState;
    updateState: (updates: Partial<WizardState>) => void;
}

const COLORS = [
    'bg-blue-100 text-blue-800',
    'bg-orange-100 text-orange-800',
    'bg-emerald-100 text-emerald-800',
    'bg-amber-100 text-amber-800',
    'bg-purple-100 text-purple-800',
    'bg-rose-100 text-rose-800',
    'bg-cyan-100 text-cyan-800',
];

export default function StepRelevance({ state, updateState }: StepRelevanceProps) {

    // Initialize relevance for newly selected disciplines
    useEffect(() => {
        const newRelevance = { ...state.relevance };
        let changed = false;
        state.disciplines.forEach(disc => {
            if (!newRelevance[disc]) {
                newRelevance[disc] = { importance: 3, knowledge: 3 };
                changed = true;
            }
        });
        if (changed) {
            updateState({ relevance: newRelevance });
        }
    }, [state.disciplines, state.relevance, updateState]);

    const handleSliderChange = (disc: string, field: 'importance' | 'knowledge', value: number) => {
        updateState({
            relevance: {
                ...state.relevance,
                [disc]: {
                    ...state.relevance[disc],
                    [field]: value
                }
            }
        });
    };

    // Calculate percentages
    const percentages = calculateDisciplinePercentages(state.disciplines, state.relevance);

    return (
        <div className="flex flex-col text-center space-y-6 animate-in fade-in slide-in-from-right-4 duration-300 h-full">
            <p className="text-sm font-medium text-slate-600">
                Para cada disciplina, selecione a <span className="font-bold text-slate-800">importância</span> (ou peso) para sua prova e seu <span className="font-bold text-slate-800">grau de conhecimento</span>:
            </p>

            <div className="flex flex-col md:flex-row gap-8 text-left mt-4 h-full min-h-[300px]">

                {/* Sliders Area */}
                <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-2">
                    {state.disciplines.length === 0 && (
                        <div className="text-center text-slate-400 py-10 text-sm">Nenhuma disciplina selecionada.</div>
                    )}

                    {state.disciplines.map(disc => {
                        const rel = state.relevance[disc] || { importance: 3, knowledge: 3 };
                        return (
                            <div key={disc} className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col gap-5 shadow-sm">
                                <h4 className="font-bold text-sm text-slate-800 text-center leading-tight text-balance">{disc}</h4>

                                <div className="space-y-2">
                                    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider">
                                        <span className="text-slate-400">Importância</span>
                                        <span className="text-primary bg-primary/10 px-2 py-0.5 rounded-full">{rel.importance}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="1" max="5"
                                        value={rel.importance}
                                        onChange={(e) => handleSliderChange(disc, 'importance', parseInt(e.target.value))}
                                        className="range range-sm range-primary"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider">
                                        <span className="text-slate-400">Conhecimento</span>
                                        <span className="text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">{rel.knowledge}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="1" max="5"
                                        value={rel.knowledge}
                                        onChange={(e) => handleSliderChange(disc, 'knowledge', parseInt(e.target.value))}
                                        className="range range-sm range-success"
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Percentages Chart Area */}
                <div className="w-full md:w-64 shrink-0 flex flex-col gap-2">
                    <h4 className="text-xs font-black uppercase text-slate-400 mb-2">Distribuição de Tempo</h4>
                    {percentages.map((p, index) => {
                        const colorClass = COLORS[index % COLORS.length];
                        return (
                            <div key={p.disc} className={`flex items-center rounded-lg p-3 text-xs font-bold transition-all ${colorClass}`}>
                                <div className="w-12 border-r border-current/20 pr-3 mr-3 text-right shrink-0">
                                    {p.pct}%
                                </div>
                                <div className="truncate">
                                    {p.disc}
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
}
