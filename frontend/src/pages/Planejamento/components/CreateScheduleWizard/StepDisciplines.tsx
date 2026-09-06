import React from 'react';
import { Info } from 'lucide-react';
import { WizardState } from './index';

interface StepDisciplinesProps {
    state: WizardState;
    updateState: (updates: Partial<WizardState>) => void;
}

const MOCK_DISCIPLINES = [
    'Contabilidade Geral',
    'Direitos Humanos',
    'Estatística',
    'Informática',
    'Legislação Especial',
    'Língua Portuguesa',
    'Noções de Direito Administrativo',
    'Noções de Direito Constitucional',
    'Noções de Direito Penal e de Direito Processual Penal',
    'Raciocínio Lógico'
];

export default function StepDisciplines({ state, updateState }: StepDisciplinesProps) {

    const toggleDiscipline = (disc: string) => {
        const isSelected = state.disciplines.includes(disc);
        let newDisciplines = [];

        if (isSelected) {
            newDisciplines = state.disciplines.filter(d => d !== disc);
        } else {
            newDisciplines = [...state.disciplines, disc];
        }

        updateState({ disciplines: newDisciplines });
    };

    return (
        <div className="flex flex-col items-start justify-center text-start space-y-6 animate-in fade-in slide-in-from-right-4 duration-300 h-full">
            <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-slate-600">
                    Selecione as <span className="font-bold text-slate-800">disciplinas</span> para o seu ciclo
                </p>
                <div className="tooltip tooltip-bottom before:max-w-xs before:whitespace-normal" data-tip="Você não precisa escolher tudo agora. É possível adicionar ou remover matérias a qualquer momento">
                    <Info className="w-4 h-4 text-slate-400 hover:text-primary transition-colors cursor-help" />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 w-full max-w-3xl pt-4">
                {MOCK_DISCIPLINES.map(disc => {
                    const isSelected = state.disciplines.includes(disc);
                    return (
                        <button
                            key={disc}
                            onClick={() => toggleDiscipline(disc)}
                            className={`p-4 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 border ${isSelected
                                ? 'bg-primary/10 border-primary text-primary shadow-sm shadow-primary/10'
                                : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50'
                                }`}
                        >
                            {disc}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
