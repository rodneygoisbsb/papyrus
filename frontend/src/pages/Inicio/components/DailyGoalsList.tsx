import React from 'react';
import { Target, PenLine, RotateCcw, CheckCircle2, Circle, Clock, ExternalLink, Video, FileText, Play, FileWarning, BookOpen } from 'lucide-react';
import { getSubjectAccent, toTitleCase } from '../../../utils/studyCalculations';

interface DailyGoalsListProps {
    dailyGoals?: any[];
    toggleGoalCompletion?: (id: string) => void;
    handleOpenStudy?: (goal: any) => void;
    setIsRegisterModalOpen?: (val: boolean) => void;
    onManualRegister?: (goal: any) => void;
    setActiveTab?: (tab: string) => void;
    isCompact?: boolean;
}

export default function DailyGoalsList({
    dailyGoals = [],
    toggleGoalCompletion = () => { },
    handleOpenStudy = () => { },
    setIsRegisterModalOpen,
    onManualRegister,
    setActiveTab,
    isCompact = false
}: DailyGoalsListProps) {
    const safeGoals = Array.isArray(dailyGoals) ? dailyGoals : [];
    const regularMetas = safeGoals.filter((g) => g?.type !== 'REVISION');
    const revisoesMetas = safeGoals.filter((g) => g?.type === 'REVISION');

    return (
        <div className={`card-papyrus ${isCompact ? '!p-5 space-y-3' : 'space-y-4'} font-['Plus_Jakarta_Sans']`}>
            <div className="flex justify-between items-center pb-2 border-b border-base-300/60">
                <div className="flex items-center gap-2">
                    <Target size={18} className="text-primary" />
                    <h2 className={`${isCompact ?'text-sm' : 'text-base'} font-bold tracking-tight text-base-content`}>Metas de Hoje</h2>
                </div>
                <div className="flex items-center gap-3">
                    {!isCompact && (
                        <button
                            type="button"
                            onClick={() => setIsRegisterModalOpen(true)}
                            className="flex items-center gap-1.5 text-xs font-bold text-primary-content bg-primary hover:bg-primary/90 active:scale-95 px-3 py-1.5 rounded-xl shadow-xs transition-transform duration-200 ease-out cursor-pointer"
                        >
                            <PenLine size={13} />
                            Registrar Estudo
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={() => setActiveTab('metas')}
                        className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer focus-visible:ring-2 focus-visible:ring-primary rounded-md"
                    >
                        Ver todas →
                    </button>
                </div>
            </div>

            <div className="space-y-3">
                {regularMetas.length === 0 ? (
                    <div className="p-6 text-center text-xs text-neutral-content bg-base-200/40 rounded-2xl border border-base-300/50">
                        Nenhuma meta teórica cadastrada para hoje.
                    </div>
                ) : (
                    regularMetas.map((goal) => {
                        const duration = goal.durationMinutes || goal.actualDurationMinutes || goal.targetDurationMinutes || 60;
                        const accent = getSubjectAccent(goal.subject);
                        
                        const getTagStyle = (type: string) => {
                            if (isCompact) return "bg-base-200 text-neutral-content group-hover:bg-base-300/60";
                            const t = (type || '').toUpperCase();
                            if (t === 'THEORY' || t === 'TEORIA') return 'bg-purple-600 text-white font-bold';
                            if (t === 'REVISION' || t === 'REVISÃO') return 'bg-rose-500 text-white font-bold';
                            if (t === 'QUESTIONS' || t === 'QUESTÕES') return 'bg-emerald-500 text-white font-bold';
                            if (t === 'SIMULADOS') return 'bg-blue-500 text-white font-bold';
                            return "bg-base-200 text-neutral-content font-bold";
                        };

                        const typeLabel = goal.type === 'THEORY' ? 'Teoria' : (goal.type === 'QUESTIONS' ? 'Questões' : (goal.type || 'Teoria'));

                        return (
                            <div
                                key={goal.id}
                                className={`group relative flex flex-col sm:flex-row sm:items-center justify-between py-4 px-4 sm:px-5 rounded-2xl bg-base-100 border border-base-300/70 border-l-[5px] ${accent.border} hover:-translate-y-0.5 hover:shadow-md hover:bg-base-200/40 transition-transform duration-200 ease-out duration-200 ease-out gap-4 cursor-pointer transform-gpu`}
                            >
                                <div className="flex items-start gap-3.5">
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleGoalCompletion(goal.id);
                                        }}
                                        className="mt-0.5 text-neutral-content hover:text-primary transition-transform active:scale-90 focus-visible:ring-2 focus-visible:ring-primary rounded-full cursor-pointer shrink-0"
                                        title={goal.completed ? "Desmarcar meta" : "Concluir meta"}
                                    >
                                        {goal.completed ? (
                                            <CheckCircle2 size={20} className="text-primary fill-primary/15" />
                                        ) : (
                                            <Circle size={20} className="text-base-300 group-hover:text-primary transition-colors" />
                                        )}
                                    </button>

                                    <div className="space-y-1">
                                        <h3 className={`${isCompact ?'text-lx' : 'text-sm'} font-bold tracking-tight text-base-content group-hover:text-primary transition-colors`}>
                                            {toTitleCase(goal.subject || 'CONCURSO')}
                                        </h3>

                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className={`${isCompact ?'text-xs text-slate-500 font-normal' : 'text-[13px] font-medium text-base-content/80'} transition-colors ${goal.completed ? 'line-through opacity-60' : 'group-hover:text-base-content'}`}>
                                                {goal.topicName || goal.topicoNome || 'Sem título'}
                                            </span>

                                            <span className={`badge badge-sm border-none text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-md transition-colors ${getTagStyle(goal.type)}`}>
                                                {typeLabel}
                                            </span>

                                            <span className="badge badge-sm bg-base-200 text-neutral-content border-none font-medium text-[11px] px-2 py-0.5 rounded-md flex items-center gap-1 group-hover:bg-base-300/60 transition-colors">
                                                <Clock size={11} />
                                                <span className="tabular-nums">{duration} min</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Utilitários + Botões de Ação */}
                                <div className="flex items-center gap-2 shrink-0 self-center">
                                    {!isCompact && (
                                        <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-colors duration-150 ease-out">
                                            {goal.tecUrl && (
                                                <a
                                                    href={goal.tecUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="btn btn-ghost btn-xs btn-square text-neutral-content hover:text-primary rounded-lg"
                                                    title="Caderno de Questões"
                                                >
                                                    <ExternalLink size={14} />
                                                </a>
                                            )}
                                            <button
                                                type="button"
                                                onClick={(e) => e.stopPropagation()}
                                                className="btn btn-ghost btn-xs btn-square text-neutral-content hover:text-secondary rounded-lg"
                                                title="Resumo"
                                            >
                                                <BookOpen size={14} />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={(e) => e.stopPropagation()}
                                                className="btn btn-ghost btn-xs btn-square text-neutral-content hover:text-error rounded-lg"
                                                title="Caderno de Erros"
                                            >
                                                <FileWarning size={14} />
                                            </button>
                                        </div>
                                    )}

                                    {/* Botões de Ação (Iniciar / Adicionar) */}
                                    <div className={`flex items-center gap-1.5 overflow-hidden transition-all duration-200 ease-out ${isCompact ? 'max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100' : ''}`}>
                                        <button
                                            type="button"
                                            onClick={(e) => { e.stopPropagation(); handleOpenStudy(goal); }}
                                            className="btn btn-xs min-h-[28px] h-7 px-3 text-xs font-bold bg-primary text-primary-content hover:bg-primary/90 border-none rounded-lg shadow-2xs whitespace-nowrap transition-transform active:scale-95 flex items-center gap-1.5"
                                        >
                                            <Play size={12} className="fill-current" /> INICIAR
                                        </button>
                                        
                                        {!isCompact && onManualRegister && (
                                            <button
                                                type="button"
                                                onClick={(e) => { e.stopPropagation(); onManualRegister(goal); }}
                                                className="btn btn-xs btn-square min-h-[28px] h-7 w-7 bg-base-200 text-neutral-content hover:bg-primary hover:text-primary-content border-none rounded-lg transition-colors"
                                                title="Registrar Estudo Manualmente"
                                            >
                                                <PenLine size={13} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
