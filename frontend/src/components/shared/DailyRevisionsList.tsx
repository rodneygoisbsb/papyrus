import React from 'react';
import { RefreshCw, Play, Check, PenLine, ExternalLink } from 'lucide-react';
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
        <div className="card-papyrus !p-0 flex flex-col justify-between overflow-hidden font-['Plus_Jakarta_Sans']">
            {/* HEADER */}
            <div className="px-5 pt-5 pb-4 border-b border-base-200/60 flex items-center justify-between">
                <div className="flex items-center gap-2">

                    <span className="text-xs font-bold uppercase tracking-wider text-base-content/70">
                        Revisões do Dia
                    </span>

                    <span className="badge badge-sm bg-base-200 text-neutral-content font-semibold py-2 px-2.5 rounded-lg border-base-300">
                        {pendingRevisions.length} pendentes
                    </span>

                    {isHeavyLoad && (
                        <span className="badge badge-sm bg-warning/10 text-warning border-none font-bold flex items-center gap-1 ml-1 px-2.5 py-1.5 rounded-full">
                            <span>⚡</span> Carga Intensa
                        </span>
                    )}
                </div>

                {isCompact && (
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setActiveTab('metas')}
                            className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer focus-visible:ring-2 focus-visible:ring-primary rounded-md"
                        >
                            Ver todas as metas →
                        </button>
                    </div>
                )}
            </div>

            {/* LISTA DE MATÉRIAS */}
            <div className="px-5 pb-2">
                {revisions.length === 0 ? (
                    <div className="text-center py-6 text-sm text-neutral-content bg-base-200/50 rounded-xl mt-4">
                        Nenhuma revisão agendada para hoje.
                    </div>
                ) : (
                    revisions.map((rev) => {
                        const accent = getSubjectAccent(rev.subject);
                        const isOverdue = rev.isOverdue || rev.daysOverdue > 0 || (!rev.completed && rev.id === 'r1');

                        const getTitleStyle = () => {
                            if (isOverdue && !rev.completed) return "text-base-content";
                            return "text-base-content";
                        };

                        return (
                            <div
                                key={rev.id}
                                className="group relative py-4 border-b border-base-200/60 last:border-0 flex items-center justify-between hover:bg-base-200/30 transition-colors duration-200 -mx-5 px-5 cursor-pointer"
                                onClick={() => {
                                    if (onManualRegister) {
                                        onManualRegister({ ...rev, type: 'REVISION' });
                                    } else {
                                        toggleRevisionCompletion(rev.id);
                                    }
                                }}
                            >
                                <div className="flex items-center gap-3.5 min-w-0">
                                    {/* Barra vertical colorida (substitui checkbox) */}
                                    <div className={`w-1.5 h-8 rounded-full shrink-0 ${rev.completed ? 'bg-base-300' : accent.border.replace('border-l-', 'bg-')}`} />

                                    {/* Textos */}
                                    <div className="flex flex-col gap-0.5 min-w-0">
                                        <span className={`text-sm font-bold truncate transition-colors duration-150 ${rev.completed ? 'text-neutral-content line-through' : getTitleStyle()}`}>
                                            {toTitleCase(rev.subject || 'MATÉRIA')}
                                        </span>
                                        <span className={`text-xs font-medium truncate transition-colors duration-150 ${rev.completed ? 'text-neutral-content/70' : 'text-neutral-content'}`}>
                                            {rev.topicName || 'Tópico'}
                                        </span>
                                    </div>

                                    {/* Badges */}
                                    <div className="flex items-center gap-2 ml-2 shrink-0">
                                        {isOverdue && !rev.completed && (
                                            <span className="badge badge-xs bg-error/10 text-error font-bold px-2 py-1.5 rounded-md border-none uppercase text-[10px] tracking-wider">
                                                ATRASADA
                                            </span>
                                        )}
                                        {rev.revisionTag && rev.type !== 'QUESTIONS' && (!isOverdue || rev.completed) && (
                                            <span className={`badge badge-xs font-bold px-2 py-1.5 rounded-md border-none uppercase text-[10px] tracking-wider ${
                                                rev.completed ? 'bg-base-200 text-neutral-content/50' : 'bg-accent/10 text-accent'
                                            }`}>
                                                {rev.revisionTag}
                                            </span>
                                        )}
                                        {rev.type === 'QUESTIONS' && (
                                            <span className={`badge badge-xs font-bold px-2 py-1.5 rounded-md border-none uppercase text-[10px] tracking-wider ${
                                                rev.completed ? 'bg-base-200 text-neutral-content/50' : 'bg-success/10 text-success'
                                            }`}>
                                                {rev.questionCount ? `${rev.questionCount} QUESTÕES` : 'QUESTÕES'}
                                            </span>
                                        )}
                                        <span className={`badge badge-xs font-medium px-2 py-1.5 rounded-md border-none text-[10px] ${
                                            rev.completed ? 'bg-base-200 text-neutral-content/50' : 'bg-base-200 text-neutral-content'
                                        }`}>
                                            {rev.durationMinutes || 0} min
                                        </span>
                                    </div>
                                </div>

                                {/* Utilitários + Botões de Ação */}
                                <div className="flex items-center gap-3 shrink-0 ml-4">
                                    {/* Micro-chips de atalho em vez de icones soltos */}
                                    {rev.tecUrl && (
                                        <a
                                            href={rev.tecUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            onClick={(e) => e.stopPropagation()}
                                            className="text-neutral-content/60 hover:text-neutral-content hover:scale-110 transition-transform cursor-pointer"
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
                                                onClick={(e) => { e.stopPropagation(); onManualRegister({ ...rev, type: 'REVISION' }); }}
                                                className="text-neutral-content/60 hover:text-neutral-content hover:scale-110 transition-transform cursor-pointer"
                                                title="Registrar Manualmente"
                                            >
                                                <PenLine size={15} />
                                            </button>
                                        )}
                                        <button
                                            type="button"
                                            onClick={(e) => { e.stopPropagation(); onStartFocusSession(rev); }}
                                            className={`btn btn-sm border-none rounded-xl px-5 font-bold gap-1.5 h-8 min-h-0 text-xs shadow-none ${
                                                rev.completed 
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