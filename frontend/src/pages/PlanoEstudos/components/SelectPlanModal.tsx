import React from 'react';
import { X } from 'lucide-react';

interface SelectPlanModalProps {
    planToSelect: any;
    setPlanToSelect: (plan: any) => void;
    onSelectPlan?: (id: number) => void;
}

export default function SelectPlanModal({
    planToSelect,
    setPlanToSelect,
    onSelectPlan
}: SelectPlanModalProps) {
    if (!planToSelect) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-base-content/20 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-base-100 w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between p-6 pb-2">
                    <h3 className="font-extrabold text-xl text-base-content">Alterar Plano Atual</h3>
                    <button
                        onClick={() => setPlanToSelect(null)}
                        className="text-neutral-content hover:text-base-content transition-colors rounded-full p-1 hover:bg-base-200"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Corpo */}
                <div className="p-6 pt-2">
                    <p className="text-neutral-content font-medium">
                        Deseja escolher o plano <strong className="text-base-content">"{planToSelect.nome}"</strong> como seu Plano de Estudos atual?
                    </p>
                </div>

                {/* Footer */}
                <div className="p-6 pt-4 border-t border-base-200 bg-base-50 flex gap-3 justify-end">
                    <button
                        onClick={() => setPlanToSelect(null)}
                        className="btn btn-ghost font-bold text-neutral-content hover:bg-base-200/50 rounded-xl"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={() => {
                            if (onSelectPlan) onSelectPlan(planToSelect.id);
                            setPlanToSelect(null);
                        }}
                        className="btn btn-primary font-bold text-primary-content rounded-xl shadow-md hover:shadow-lg"
                    >
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
}
