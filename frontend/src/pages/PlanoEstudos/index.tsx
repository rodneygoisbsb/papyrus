import React from 'react';
import { Plus, Clock, Target, CheckSquare, Shield, Edit3, Trash2 } from 'lucide-react';

interface PlanoEstudosPageProps {
    planos?: any[];
    setActiveTab?: (tab: string) => void;
    onEditPlan?: (plano: any) => void;
    onDeletePlan?: (id: number) => void;
}

export default function PlanoEstudosPage({ planos = [], setActiveTab, onEditPlan, onDeletePlan }: PlanoEstudosPageProps) {
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
                {planos.map((plano) => (
                    <div
                        key={plano.id}
                        className="bg-base-100 p-6 rounded-[24px] border border-base-200 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-base-300 transition-all group cursor-pointer flex flex-col justify-between min-h-[220px]"
                    >
                        {/* HEADER DO CARD */}
                        <div>
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${plano.bgLight} ${plano.iconColor}`}>
                                    <Shield size={24} />
                                </div>
                                <div className="flex items-center gap-1">
                                    <button
                                        type="button"
                                        onClick={(e) => { 
                                            e.stopPropagation(); 
                                            if(onEditPlan) onEditPlan(plano); 
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
                                            if(onDeletePlan) onDeletePlan(plano.id); 
                                        }}
                                        className="btn btn-ghost btn-xs btn-square text-neutral-content hover:text-error rounded-lg"
                                        title="Excluir Plano"
                                    >
                                        <Trash2 size={15} />
                                    </button>
                                </div>
                            </div>
                            <h3 className="font-extrabold text-base-content text-lg leading-tight mb-1 group-hover:text-primary transition-colors">
                                {plano.nome}
                            </h3>
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
                ))}
            </div>
        </div>
    );
}
