import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Check } from 'lucide-react';
import StepOrganization from './StepOrganization';
import StepDisciplines from './StepDisciplines';
import StepRelevance from './StepRelevance';
import StepSchedules from './StepSchedules';
import { useModalLenis } from '../../../../hooks/useModalLenis';

export interface WizardState {
    disciplines: string[];
    relevance: Record<string, { importance: number; knowledge: number }>;
    schedules: Record<string, { active: boolean; hours: string }>;
    timeBlock: { min: string; max: string };
}

const STEPS = [
    { id: 1, title: 'Modo de Criação' },
    { id: 2, title: 'Disciplinas' },
    { id: 3, title: 'Relevância e Peso' },
    { id: 4, title: 'Disponibilidade' },
];

export default function CreateScheduleWizard({ onClose, onComplete }: { onClose: () => void, onComplete?: () => void }) {
    const { wrapperRef, contentRef } = useModalLenis();
    const [currentStep, setCurrentStep] = useState(1);
    const [wizardState, setWizardState] = useState<WizardState>({
        disciplines: [],
        relevance: {},
        schedules: {
            DOM: { active: false, hours: '00:00' },
            SEG: { active: true, hours: '04:00' },
            TER: { active: true, hours: '04:00' },
            QUA: { active: true, hours: '05:00' },
            QUI: { active: true, hours: '05:00' },
            SEX: { active: true, hours: '04:00' },
            SÁB: { active: true, hours: '02:00' },
        },
        timeBlock: { min: '45min', max: '1h30min' },
    });

    const updateState = (updates: Partial<WizardState>) => {
        setWizardState(prev => ({ ...prev, ...updates }));
    };

    const handleNext = () => {
        if (currentStep < 4) setCurrentStep(prev => prev + 1);
        else {
            // Handle conclusion
            console.log('Wizard Finished:', wizardState);
            if (onComplete) onComplete();
            else onClose();
        }
    };

    const handlePrev = () => {
        if (currentStep > 1) setCurrentStep(prev => prev - 1);
    };

    const modalContent = (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 font-['Plus_Jakarta_Sans']">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>

            <div className="relative w-full max-w-4xl h-[650px] max-h-[90vh] bg-base-100 rounded-[32px] shadow-2xl flex overflow-hidden animate-in zoom-in-95 duration-200">

                {/* Left Sidebar - Vertical Steps */}
                <div className="hidden md:flex w-1/3 bg-slate-50 border-r border-slate-100 flex-col p-8 shrink-0">
                    <h2 className="text-xl font-black text-slate-800 mb-10">Criar Planejamento</h2>

                    <div className="flex flex-col gap-6 relative">
                        {/* Connecting Line Vertical */}
                        <div className="absolute top-4 bottom-4 left-[15px] w-[2px] bg-slate-200 -z-10"></div>

                        {STEPS.map((step) => {
                            const isPast = step.id < currentStep;
                            const isActive = step.id === currentStep;

                            return (
                                <div key={step.id} className="flex items-center gap-4 relative bg-slate-50">
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors shadow-sm ring-4 ring-slate-50 ${isActive
                                                ? 'bg-primary text-white scale-110'
                                                : isPast
                                                    ? 'bg-emerald-500 text-white'
                                                    : 'bg-white border border-slate-200 text-slate-400'
                                            }`}
                                    >
                                        {isPast ? <Check size={14} strokeWidth={3} /> : step.id}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className={`text-[10px] uppercase tracking-wider font-bold ${isActive ? 'text-primary' : isPast ? 'text-emerald-500' : 'text-slate-400'
                                            }`}>
                                            Passo {step.id}
                                        </span>
                                        <span className={`text-sm font-bold ${isActive ? 'text-slate-800' : 'text-slate-500'
                                            }`}>
                                            {step.title}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Right Content Area */}
                <div className="flex-1 flex flex-col h-full bg-white relative z-20">
                    {/* Header for mobile or just close button */}
                    <div className="flex items-center justify-end p-4 shrink-0">
                        <button
                            onClick={onClose}
                            className="btn btn-sm btn-circle btn-ghost text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 md:p-8" data-lenis-prevent="true" ref={wrapperRef}>
                        <div ref={contentRef} className="w-full h-full">
                            {currentStep === 1 && <StepOrganization />}
                            {currentStep === 2 && <StepDisciplines state={wizardState} updateState={updateState} />}
                            {currentStep === 3 && <StepRelevance state={wizardState} updateState={updateState} />}
                            {currentStep === 4 && <StepSchedules state={wizardState} updateState={updateState} />}
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-slate-50/50 shrink-0">
                        {currentStep > 1 && (
                            <button
                                onClick={handlePrev}
                                className="btn btn-outline border-slate-200 text-slate-600 hover:bg-slate-100 hover:border-slate-300 hover:text-slate-800 px-6 rounded-xl"
                            >
                                Voltar
                            </button>
                        )}
                        <button
                            onClick={handleNext}
                            className="btn btn-primary px-8 rounded-xl font-bold shadow-md shadow-primary/20"
                            disabled={currentStep === 2 && wizardState.disciplines.length === 0}
                        >
                            {currentStep === 4 ? 'Gerar Planejamento' : 'Próximo'}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}
