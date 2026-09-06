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
        <div className="w-full text-center space-y-6 pb-8 relative z-10">
            <p className="text-sm font-medium text-slate-600">
                Defina o <span className="font-bold text-slate-800">peso estratégico</span> e o seu nível atual de <span className="font-bold text-slate-800">domínio</span> para cada matéria escolhida
            </p>

            <div className="w-full flex flex-col gap-8 text-left mt-4">

                {/* Sliders Area */}
                <div className="w-full">
                    {state.disciplines.length === 0 && (
                        <div className="text-center text-slate-400 py-10 text-sm">Nenhuma disciplina selecionada.</div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {state.disciplines.map(disc => {
                            const rel = state.relevance[disc] || { importance: 3, knowledge: 3 };
                            return (
                                <div key={disc} className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col gap-4 shadow-sm hover:border-primary/30 transition-colors">
                                    <h4 className="font-bold text-sm text-slate-800 text-center leading-tight">{disc}</h4>

                                    <div className="space-y-2 mt-2">
                                        <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider">
                                            <span className="text-slate-400">Importância</span>
                                            <span className="text-primary bg-primary/10 px-2 py-0.5 rounded-full">{rel.importance}</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="1" max="5"
                                            value={rel.importance}
                                            onChange={(e) => handleSliderChange(disc, 'importance', parseInt(e.target.value))}
                                            className="range range-xs range-primary"
                                        />
                                    </div>

                                    <div className="space-y-2 mt-1">
                                        <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider">
                                            <span className="text-slate-400">Conhecimento</span>
                                            <span className="text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">{rel.knowledge}</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="1" max="5"
                                            value={rel.knowledge}
                                            onChange={(e) => handleSliderChange(disc, 'knowledge', parseInt(e.target.value))}
                                            className="range range-xs range-success"
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Percentages Chart Area */}
                <div className="w-full shrink-0 flex flex-col gap-3 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                    <h4 className="text-xs font-black uppercase text-slate-500 text-center">Distribuição de Tempo Sugerida</h4>
                    <div className="flex flex-wrap justify-center gap-2 mt-2">
                        {percentages.map((p, index) => {
                            const colorClass = COLORS[index % COLORS.length];
                            return (
                                <div key={p.disc} className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-bold ${colorClass} shadow-xs border border-current/10`}>
                                    <span className="opacity-70 border-r border-current/20 pr-2">{p.pct}%</span>
                                    <span>{p.disc}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
}
