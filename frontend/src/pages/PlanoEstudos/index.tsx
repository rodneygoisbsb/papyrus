import React, { useState } from 'react';
import { Plus, Clock, Target, CheckSquare, Shield, Edit3, Trash2, X } from 'lucide-react';
import PlanModal from '../../components/modals/PlanModal';
import SelectPlanModal from './components/SelectPlanModal';

interface PlanoEstudosPageProps {
    planos?: any[];
    selectedPlanId?: number;
    setActiveTab?: (tab: string) => void;
    onSelectPlan?: (id: number) => void;
    onEditPlan?: (plano: any) => void;
    onDeletePlan?: (id: number) => void;
}

export default function PlanoEstudosPage({
    planos = [],
    selectedPlanId,
    setActiveTab,
    onSelectPlan,
    onEditPlan,
    onDeletePlan
}: PlanoEstudosPageProps) {
    const [editingPlan, setEditingPlan] = useState<any>(null);
    const [planToSelect, setPlanToSelect] = useState<any>(null);

    // Ordena os planos para que o selecionado fique sempre em primeiro
    const sortedPlanos = [...planos].sort((a, b) => {
        if (a.id === selectedPlanId) return -1;
        if (b.id === selectedPlanId) return 1;
        return 0;
    });

    const handlePlanClick = (plano: any) => {
        if (plano.id === selectedPlanId) {
            if (setActiveTab) setActiveTab('disciplinas');
        } else {
            setPlanToSelect(plano);
        }
    };

    return (
        <div className="space-y-8 font-['Plus_Jakarta_Sans'] text-base-content animate-in fade-in duration-200">
            {/* CABEÇALHO E AÇÃO PRINCIPAL */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-base-300/70">
                <div>
                    <h2 className="text-2xl font-black text-base-content tracking-tight">Meu Plano</h2>
                    <p className="text-xs text-neutral-content mt-1">Gerencie seus planos de estudo e acompanhe sua evolução.</p>
                </div>

                {/* CRIAR NOVO PLANO (Botão estreito horizontal) */}
                <button
                    type="button"
                    onClick={() => setActiveTab && setActiveTab('criar-plano')}
                    className="flex items-center gap-3 bg-primary text-primary-content px-5 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md hover:bg-primary/90 font-bold group"
                >
                    <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
                    <span>Criar Novo Plano</span>
                </button>
            </div>

            {/* GRID DE PLANOS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedPlanos.map((plano) => {
                    const isSelected = plano.id === selectedPlanId;

                    return (
                        <div
                            key={plano.id}
                            onClick={() => handlePlanClick(plano)}
                            className={`card-papyrus group cursor-pointer flex flex-col justify-between min-h-[220px] 
                            ${isSelected
                                    ? 'border-l-[6px] border-l-primary relative overflow-hidden hover:-translate-y-0.5'
                                    : ''
                                }`}
                        >

                            {/* HEADER DO CARD */}
                            <div>
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center overflow-hidden ${!plano.imagemUrl ? `${plano.bgLight} ${plano.iconColor}` : ''}`}>
                                        {plano.imagemUrl ? (
                                            <img src={plano.imagemUrl} alt={plano.nome} className="w-full h-full object-cover" />
                                        ) : (
                                            <Shield size={24} />
                                        )}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setEditingPlan(plano);
                                            }}
                                            className="btn btn-ghost btn-xs btn-square text-neutral-content hover:text-primary rounded-lg"
                                            title="Editar Plano"
                                        >
                                            <Edit3 size={15} />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (onDeletePlan) onDeletePlan(plano.id);
                                            }}
                                            className="btn btn-ghost btn-xs btn-square text-neutral-content hover:text-error rounded-lg"
                                            title="Excluir Plano"
                                        >
                                            <Trash2 size={15} />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className={`font-extrabold text-lg leading-tight transition-colors ${isSelected ? 'text-primary' : 'text-base-content group-hover:text-primary'}`}>
                                        {plano.nome}
                                    </h3>
                                    {isSelected && (
                                        <span className="bg-primary text-primary-content text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">
                                            Atual
                                        </span>
                                    )}
                                </div>
                                <p className="text-xs font-semibold text-neutral-content/70">
                                    {plano.orgao}
                                </p>
                            </div>

                            {/* MÉTRICAS */}
                            <div className="grid grid-cols-3 gap-2 mt-6 pt-5 border-t border-base-200/60">
                                {/* Questões */}
                                <div className="flex flex-col gap-1">
                                    <span className="text-base font-black text-base-content">
                                        {plano.questoes === 0 ? '--' : plano.questoes}
                                    </span>
                                    <div className="flex items-center gap-1.5 text-neutral-content">
                                        <CheckSquare size={12} />
                                        <span className="text-[10px] uppercase tracking-wider font-bold">Questões</span>
                                    </div>

                                </div>

                                {/* Acerto */}
                                <div className="flex flex-col gap-1">
                                    <span className="text-base font-black text-emerald-600">
                                        {plano.acerto === 0 ? '--' : `${plano.acerto}%`}
                                    </span>
                                    <div className="flex items-center gap-1.5 text-neutral-content">
                                        <Target size={12} />
                                        <span className="text-[10px] uppercase tracking-wider font-bold">Acerto</span>
                                    </div>

                                </div>

                                {/* Tempo */}
                                <div className="flex flex-col gap-1">
                                    <span className="text-base font-black text-base-content">
                                        {plano.horas === 0 ? '--' : `${plano.horas}h`}
                                    </span>
                                    <div className="flex items-center gap-1.5 text-neutral-content">
                                        <Clock size={12} />
                                        <span className="text-[10px] uppercase tracking-wider font-bold">Tempo</span>
                                    </div>

                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <PlanModal
                isOpen={!!editingPlan}
                onClose={() => setEditingPlan(null)}
                initialData={editingPlan ? { nome: editingPlan.nome, cargo: editingPlan.orgao } : null}
                onSave={(nome, cargo, imagem) => {
                    let imagemUrl = editingPlan.imagemUrl;
                    if (imagem) {
                        imagemUrl = URL.createObjectURL(imagem);
                    }

                    if (onEditPlan) {
                        onEditPlan({ ...editingPlan, nome, orgao: cargo, imagemUrl });
                    }
                    setEditingPlan(null);
                }}
            />

            {/* MODAL DE CONFIRMAÇÃO DE SELEÇÃO */}
            <SelectPlanModal
                planToSelect={planToSelect}
                setPlanToSelect={setPlanToSelect}
                onSelectPlan={onSelectPlan}
            />
        </div>
    );
}
