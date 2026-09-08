import React from 'react';
import { Target, Check, PenLine, Play, ExternalLink } from 'lucide-react';
import { getSubjectAccent, toTitleCase } from '../../utils/studyCalculations';

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
    const pendingMetas = regularMetas.filter((g) => !g.completed);

    return (
        <div className="card-papyrus !p-0 flex flex-col justify-between overflow-hidden font-['Plus_Jakarta_Sans'] w-full">
            {/* HEADER */}
            <div className={`px-5 pt-5 pb-4 border-b border-base-200/60 flex items-center justify-between`}>
                <div className="flex items-center gap-2">

                    <span className="text-xs font-bold uppercase tracking-wider text-base-content/70">
                        Metas de Hoje
                    </span>
                    <span className="badge badge-sm bg-base-200 text-neutral-content font-semibold py-2 px-2.5 rounded-lg border-base-300">
                        {pendingMetas.length} pendentes
                    </span>
                </div>
                {isCompact && (
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setActiveTab && setActiveTab('metas')}
                            className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer focus-visible:ring-2 focus-visible:ring-primary rounded-md"
                        >
                            Ver todas →
                        </button>
                    </div>
                )}
            </div>

            {/* LISTA DE MATÉRIAS */}
            <div className="px-5 pb-2">
                {regularMetas.length === 0 ? (
                    <div className="text-center py-6 text-sm text-neutral-content bg-base-200/50 rounded-xl mt-4 mb-4">
                        Nenhuma meta teórica cadastrada para hoje.
                    </div>
                ) : (
                    regularMetas.map((goal, index) => {
                        const duration = goal.durationMinutes || goal.actualDurationMinutes || goal.targetDurationMinutes || 60;
                        const isOverdue = goal.isOverdue || goal.daysOverdue > 0 || (!goal.completed && index === 0);

                        const getTitleStyle = () => {
                            if (isOverdue && !goal.completed) return "text-base-content";
                            return "text-base-content";
                        };

                        const typeLabel = goal.type === 'THEORY' ? 'Teoria' : (goal.type === 'QUESTIONS' ? 'Questões' : (goal.type || 'Teoria'));

                        return (
                            <div
                                key={goal.id}
                                className="group relative py-4 border-b border-base-200/60 last:border-0 flex items-center justify-between hover:bg-base-200/30 transition-colors duration-200 -mx-5 px-5 cursor-pointer"
                                onClick={() => {
                                    if (onManualRegister) {
                                        onManualRegister(goal);
                                    } else {
                                        toggleGoalCompletion(goal.id);
                                    }
                                }}
                            >
                                <div className="flex items-center gap-3.5 min-w-0 pr-2">
                                    {/* Barra vertical colorida (substitui checkbox) */}
                                    <div className={`w-1.5 h-8 rounded-full shrink-0 ${goal.completed ? 'bg-base-300' : getSubjectAccent(goal.subject || '').border.replace('border-l-', 'bg-')}`} />

                                    {/* Textos */}
                                    <div className="flex flex-col gap-0.5 min-w-0">
                                        <span className={`text-sm font-bold truncate transition-colors duration-150 ${goal.completed ? 'text-neutral-content line-through' : getTitleStyle()}`}>
                                            {toTitleCase(goal.subject || 'CONCURSO')}
                                        </span>
                                        <span className={`text-xs font-medium truncate transition-colors duration-150 ${goal.completed ? 'text-neutral-content/70' : 'text-neutral-content'}`}>
                                            {goal.topicName || goal.topicoNome || 'Sem título'}
                                        </span>
                                    </div>

                                    {/* Badges */}
                                    <div className="flex items-center gap-2 ml-2 shrink-0 hidden sm:flex">
                                        {isOverdue && !goal.completed && (
                                            <span className="badge badge-xs bg-error/10 text-error font-bold px-2 py-1.5 rounded-md border-none uppercase text-[10px] tracking-wider">
                                                ATRASADA
                                            </span>
                                        )}
                                        <span className={`badge badge-xs font-bold px-2 py-1.5 rounded-md border-none uppercase text-[10px] tracking-wider ${
                                            goal.completed ? 'bg-base-200 text-neutral-content/50' :
                                            (goal.type === 'THEORY' || goal.type === 'Teoria') ? 'bg-blue-500/10 text-blue-600' :
                                                (goal.type === 'QUESTIONS' || goal.type === 'Questões') ? 'bg-emerald-500/10 text-emerald-600' :
                                                    'bg-base-200 text-neutral-content'
                                            }`}>
                                            {typeLabel}
                                        </span>
                                        <span className={`badge badge-xs font-medium px-2 py-1.5 rounded-md border-none text-[10px] ${goal.completed ? 'bg-base-200 text-neutral-content/50' : 'bg-base-200 text-neutral-content'}`}>
                                            {duration} min
                                        </span>
                                    </div>
                                </div>

                                {/* Utilitários + Botões de Ação */}
                                <div className="flex items-center gap-3 shrink-0 ml-auto">
                                    {/* Micro-chips de atalho em vez de icones soltos */}
                                    {goal.tecUrl && (
                                        <a
                                            href={goal.tecUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="text-neutral-content/60 hover:text-neutral-content hover:scale-110 transition-transform cursor-pointer hidden sm:inline-flex"
                                            title="Caderno de Questões Externo"
                                        >
                                            <ExternalLink size={16} />
                                        </a>
                                    )}

                                    {/* Botões de Ação Sempre Visíveis (mas menores/mais integrados) */}
                                    <div className="flex items-center gap-3">
                                        {onManualRegister && (
                                            <button
                                                type="button"
                                                onClick={(e) => { e.stopPropagation(); onManualRegister(goal); }}
                                                className="text-neutral-content/60 hover:text-neutral-content hover:scale-110 transition-transform cursor-pointer"
                                                title="Registrar Manualmente"
                                            >
                                                <PenLine size={15} />
                                            </button>
                                        )}
                                        <button
                                            type="button"
                                            onClick={(e) => { e.stopPropagation(); handleOpenStudy(goal); }}
                                            className={`btn btn-sm border-none rounded-xl px-5 font-bold gap-1.5 h-8 min-h-0 text-xs shadow-none ${
                                                goal.completed 
                                                ? 'bg-base-200 text-neutral-content/50 hover:bg-base-300' 
                                                : isOverdue 
                                                    ? 'bg-error/10 text-error hover:bg-error/20'
                                                    : 'bg-primary/10 text-primary hover:bg-primary/20'
                                                }`}
                                        >
                                            <Play size={12} className="fill-current" /> Iniciar
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