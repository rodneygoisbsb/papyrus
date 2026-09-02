import React from 'react';
import { Target, PenLine, RotateCcw, CheckCircle2, Circle, Clock, ExternalLink, Video, FileText } from 'lucide-react';
import { getSubjectAccent, toTitleCase } from '../../../utils/studyCalculations';

interface DailyGoalsListProps {
    dailyGoals?: any[];
    toggleGoalCompletion?: (id: string) => void;
    handleOpenStudy?: (goal: any) => void;
    setIsRegisterModalOpen?: (val: boolean) => void;
    setActiveTab?: (tab: string) => void;
    isCompact?: boolean;
}

export default function DailyGoalsList({
    dailyGoals = [],
    toggleGoalCompletion = () => { },
    handleOpenStudy = () => { },
    setIsRegisterModalOpen,
    setActiveTab,
    isCompact = false
}: DailyGoalsListProps) {
    const safeGoals = Array.isArray(dailyGoals) ? dailyGoals : [];
    const regularMetas = safeGoals.filter((g) => g?.type !== 'REVISION');
    const revisoesMetas = safeGoals.filter((g) => g?.type === 'REVISION');

    return (
        <div className={`bg-base-100 border border-base-300/70 ${isCompact ?'p-5 space-y-3' : 'p-6 space-y-4'} rounded-[22px] shadow-sm font-['Plus_Jakarta_Sans']`}>
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

                                            <span className="badge badge-sm bg-base-200 text-neutral-content border-none font-medium text-[11px] px-2 py-0.5 rounded-md group-hover:bg-base-300/60 transition-colors">
                                                {goal.type === 'THEORY' ? 'Teoria' : goal.type || 'Teoria'}
                                            </span>

                                            <span className="badge badge-sm bg-base-200 text-neutral-content border-none font-medium text-[11px] px-2 py-0.5 rounded-md flex items-center gap-1 group-hover:bg-base-300/60 transition-colors">
                                                <Clock size={11} />
                                                <span className="tabular-nums">{duration} min</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Utilitários + Botão Estudar com animação de deslizamento */}
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
                                                    title="Caderno TEC Concursos"
                                                >
                                                    <ExternalLink size={14} />
                                                </a>
                                            )}
                                            {goal.videoUrl && (
                                                <a
                                                    href={goal.videoUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="btn btn-ghost btn-xs btn-square text-neutral-content hover:text-secondary rounded-lg"
                                                    title="Vídeo Aulas"
                                                >
                                                    <Video size={14} />
                                                </a>
                                            )}
                                            {goal.pdfUrl && (
                                                <a
                                                    href={goal.pdfUrl}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="btn btn-ghost btn-xs btn-square text-neutral-content hover:text-accent rounded-lg"
                                                    title="Material PDF"
                                                >
                                                    <FileText size={14} />
                                                </a>
                                            )}
                                        </div>
                                    )}

                                    {/* Caixa do botão: max-w-0 invisível em repouso -> expande no hover */}
                                    <div className="max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100 transition-opacity duration-200 ease-out ease-out overflow-hidden flex items-center">
                                        <button
                                            type="button"
                                            onClick={() => handleOpenStudy(goal)}
                                            className="btn btn-xs min-h-[28px] h-7 px-3 text-xs font-semibold btn-outline border-base-300 text-base-content group-hover:bg-primary group-hover:border-primary group-hover:text-primary-content rounded-lg shadow-2xs whitespace-nowrap transition-colors"
                                        >
                                            Estudar
                                        </button>
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
