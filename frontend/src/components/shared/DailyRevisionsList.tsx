import React from 'react';
import { RefreshCw, ExternalLink, Video, FileText, Play, Check, BookOpen, FileWarning, PenLine } from 'lucide-react';
import { getSubjectAccent, toTitleCase } from '../../utils/studyCalculations';

interface DailyRevisionsListProps {
    revisions?: any[];
    toggleRevisionCompletion?: (id: string) => void;
    onStartFocusSession?: (goal: any) => void;
    onOpenRegisterModal?: () => void;
    onManualRegister?: (goal: any) => void;
    setActiveTab?: (tab: string) => void;
    isCompact?: boolean;
}

export default function DailyRevisionsList({
    revisions = [],
    toggleRevisionCompletion = () => { },
    onStartFocusSession = () => { },
    onOpenRegisterModal = () => { },
    onManualRegister,
    setActiveTab = () => { },
    isCompact = false,
}: DailyRevisionsListProps) {
    const totalMinutes = revisions.reduce((acc, rev) => acc + (rev.durationMinutes || 0), 0);
    const isHeavyLoad = totalMinutes > 180;
    const pendingRevisions = revisions.filter(r => !r.completed);

    return (
        <div className="rounded-[22px] border border-base-300/80 bg-base-100 p-5 shadow-sm space-y-4 font-['Plus_Jakarta_Sans']">
            {/* HEADER */}
            <div className="flex items-center justify-between pb-2 border-b border-base-200">
                <div className="flex items-center gap-2">
                    <RefreshCw size={18} className="text-secondary" />
                    <h2 className="text-sm font-bold text-base-content">Revisões do Dia</h2>

                    <span className="badge badge-sm bg-blue-50 text-primary border-primary/20 font-bold ml-1">
                        {pendingRevisions.length} pendentes
                    </span>

                    {isHeavyLoad && (
                        <span className="badge badge-sm bg-amber-50 text-amber-600 border-amber-200 font-bold flex items-center gap-1 ml-1">
                            <span>⚡</span> Carga Intensa
                        </span>
                    )}
                </div>

                {isCompact && (
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setActiveTab('metas')}
                            className="text-sm font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer focus-visible:ring-2 focus-visible:ring-primary rounded-md"
                        >
                            Ver metas →
                        </button>
                    </div>
                )}
            </div>

            {/* LISTA DE MATÉRIAS */}
            <div className="space-y-3 mt-4">
                {revisions.length === 0 ? (
                    <div className="text-center py-6 text-sm text-neutral-content bg-base-200/50 rounded-xl">
                        Nenhuma revisão agendada para hoje.
                    </div>
                ) : (
                    revisions.map((rev) => {
                        const accent = getSubjectAccent(rev.subject);
                        const isOverdue = rev.isOverdue || rev.daysOverdue > 0 || (!rev.completed && rev.id === 'r1');

                        const getCardStyle = (type: string) => {
                            if (isOverdue && !rev.completed) return 'border-error/40 bg-error/5 hover:border-error/60';
                            if (type === 'QUESTIONS' || type === 'QUESTÕES') return 'bg-emerald-500/5 border-emerald-500/20 hover:bg-emerald-500/10';
                            return 'border-base-300 bg-base-100 hover:border-slate-300';
                        };

                        const getTitleStyle = (type: string) => {
                            if (isOverdue && !rev.completed) return "text-error";
                            if (type === 'QUESTIONS' || type === 'QUESTÕES') return 'text-emerald-600 dark:text-emerald-400';
                            return "text-base-content";
                        };

                        return (
                            <div
                                key={rev.id}
                                className={`group relative p-4 rounded-2xl border ${getCardStyle(rev.type)} transition-colors duration-150 flex items-center justify-between overflow-hidden transform-gpu`}
                            >
                                {/* Listra lateral */}
                                {!isOverdue && <div className={`absolute left-0 top-0 bottom-0 w-1 ${accent.bg}`} />}

                                <div className="flex items-center gap-3.5 pl-2 min-w-0">
                                    {/* Checkbox circular */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleRevisionCompletion(rev.id);
                                        }}
                                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-transform duration-100 cursor-pointer active:scale-90 shrink-0 ${rev.completed
                                            ? 'bg-secondary border-secondary text-white'
                                            : isOverdue ? 'border-error/40 hover:border-error text-transparent' : 'border-slate-300 hover:border-primary text-transparent'
                                            }`}
                                    >
                                        <Check size={12} className={rev.completed ? 'opacity-100' : 'opacity-0'} strokeWidth={3} />
                                    </button>

                                    {/* Textos */}
                                    <div className="flex flex-col gap-1 min-w-0">
                                        <span className={`text-sm font-bold truncate transition-colors duration-150 ${rev.completed ? 'text-slate-400 line-through' : getTitleStyle(rev.type)}`}>
                                            {toTitleCase(rev.subject || 'MATÉRIA')}
                                        </span>
                                        <span className={`text-xs font-normal truncate transition-colors duration-150 ${rev.completed ? 'text-slate-400/70' : 'text-slate-500'}`}>
                                            {rev.topicName || 'Tópico'}
                                        </span>
                                    </div>

                                    {/* Badges */}
                                    <div className="flex items-center gap-1.5 ml-2 shrink-0">
                                        {isOverdue && !rev.completed && (
                                            <span className="badge badge-sm bg-red-500 text-white font-bold px-2 py-0.5 rounded-md border-none uppercase text-[10px] tracking-wider">
                                                ATRASADA
                                            </span>
                                        )}
                                        {rev.revisionTag && rev.type !== 'QUESTIONS' && (
                                            <span className="badge badge-xs bg-amber-50 text-accent font-bold px-1.5 py-2.5 rounded-md border-none uppercase">
                                                {rev.revisionTag.toUpperCase()}
                                            </span>
                                        )}
                                        {rev.type === 'QUESTIONS' && (
                                            <span className="badge badge-sm bg-emerald-500 text-white font-bold px-2 py-0.5 rounded-md border-none uppercase text-[10px] tracking-wider">
                                                {rev.questionCount ? `${rev.questionCount} QUESTÕES` : 'QUESTÕES'}
                                            </span>
                                        )}
                                        <span className="badge badge-xs bg-slate-100 text-slate-600 font-medium px-1.5 py-2.5 rounded-md">
                                            {rev.durationMinutes || 0} min
                                        </span>
                                    </div>
                                </div>

                                {/* Utilitários + Botões de Ação */}
                                <div className="flex items-center gap-2 shrink-0 ml-2">
                                    <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity duration-150 ease-out">
                                        {rev.tecUrl && (
                                            <a
                                                href={rev.tecUrl}
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

                                    {/* Botões de Ação: Otimizados para resposta instantânea */}
                                    <div className="flex items-center gap-1.5 overflow-hidden transition-[max-width,opacity] duration-150 ease-out max-w-0 opacity-0 group-hover:max-w-[160px] group-hover:opacity-100 transform-gpu will-change-[max-width,opacity]">
                                        <button
                                            type="button"
                                            onClick={(e) => { e.stopPropagation(); onStartFocusSession(rev); }}
                                            className="btn btn-sm px-3.5 font-bold bg-primary text-primary-content hover:bg-primary/90 border-none rounded-xl shadow-sm whitespace-nowrap transition-transform active:scale-95 flex items-center gap-1.5"
                                        >
                                            <Play size={13} className="fill-current" /> REVISAR
                                        </button>

                                        {onManualRegister && (
                                            <button
                                                type="button"
                                                onClick={(e) => { e.stopPropagation(); onManualRegister({ ...rev, type: 'REVISION' }); }}
                                                className="btn btn-sm btn-square bg-base-200 text-neutral-content hover:bg-primary hover:text-primary-content border-none rounded-xl transition-colors"
                                                title="Registrar Estudo Manualmente"
                                            >
                                                <PenLine size={14} />
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