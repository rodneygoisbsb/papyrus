import React from 'react';
import { RefreshCw, ExternalLink, Video, FileText, Play, Check } from 'lucide-react';
import { getSubjectAccent, toTitleCase } from '../../../utils/studyCalculations';

interface DailyRevisionsListProps {
    revisions?: any[];
    toggleRevisionCompletion?: (id: string) => void;
    onStartFocusSession?: (goal: any) => void;
    onOpenRegisterModal?: () => void;
    setActiveTab?: (tab: string) => void;
}

export default function DailyRevisionsList({
    revisions = [],
    toggleRevisionCompletion = () => { },
    onStartFocusSession = () => { },
    onOpenRegisterModal = () => { },
    setActiveTab = () => { },
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

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => setActiveTab('metas')}
                        className="text-sm font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer focus-visible:ring-2 focus-visible:ring-primary rounded-md"
                    >
                        Ver metas →
                    </button>
                </div>
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
                        // DEMO: Forçando a primeira revisão (r1) a ser atrasada para demonstração visual
                        const isOverdue = rev.isOverdue || rev.daysOverdue > 0 || (!rev.completed && rev.id === 'r1');

                        return (
                            <div
                                key={rev.id}
                                className={`group relative p-4 rounded-2xl border ${isOverdue ?'border-error/40 bg-error/5 hover:border-error/60' : 'border-base-300 bg-base-100 hover:border-slate-300'} hover:shadow-sm transition-all duration-200 flex items-center justify-between overflow-hidden`}
                            >
                                {/* Listra lateral */}
                                {!isOverdue && <div className={`absolute left-0 top-0 bottom-0 w-1 ${accent.bg}`} />}

                                <div className="flex items-center gap-3.5 pl-2">
                                    {/* Checkbox circular */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleRevisionCompletion(rev.id);
                                        }}
                                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer active:scale-90 shrink-0 ${rev.completed
                                            ? 'bg-secondary border-secondary text-white'
                                            : isOverdue ? 'border-error/40 hover:border-error text-transparent' : 'border-slate-300 hover:border-primary text-transparent'
                                            }`}
                                    >
                                        <Check size={12} className={rev.completed ? 'opacity-100' : 'opacity-0'} strokeWidth={3} />
                                    </button>

                                    {/* Textos */}
                                    <div className="flex flex-col gap-1">
                                        <span className={`text-sm font-bold transition-colors ${rev.completed ?'text-slate-400 line-through' : (isOverdue ? 'text-error' : 'text-base-content')}`}>
                                            {toTitleCase(rev.subject || 'MATÉRIA')}
                                        </span>
                                        <span className={`text-xs font-normal transition-colors ${rev.completed ?'text-slate-400/70' : 'text-slate-500'}`}>
                                            {rev.topicName || 'Tópico'}
                                        </span>
                                    </div>

                                    {/* Badges */}
                                    <div className="flex items-center gap-1.5 ml-2">
                                        {isOverdue && !rev.completed && (
                                            <span className="badge badge-xs bg-error/10 text-error font-bold px-1.5 py-2.5 rounded-md border-none flex items-center gap-1">
                                                <span className="w-1.5 h-1.5 rounded-full bg-error animate-pulse" /> Atrasada
                                            </span>
                                        )}
                                        {rev.revisionTag && rev.type !== 'QUESTIONS' && (
                                            <span className="badge badge-xs bg-amber-50 text-accent font-bold px-1.5 py-2.5 rounded-md border-none">
                                                {rev.revisionTag}
                                            </span>
                                        )}
                                        {rev.type === 'QUESTIONS' && (
                                            <span className="badge badge-xs bg-emerald-50 text-emerald-700 font-bold px-1.5 py-2.5 rounded-md border-none">
                                                {rev.questionCount ? `${rev.questionCount} Questões` : 'Questões'}
                                            </span>
                                        )}
                                        <span className="badge badge-xs bg-slate-100 text-slate-600 font-medium px-1.5 py-2.5 rounded-md">
                                            {rev.durationMinutes || 0} min
                                        </span>
                                    </div>
                                </div>

                                {/* Hover Disclosure (Utilitários vs Botão Iniciar) */}
                                <div className="flex items-center gap-2 shrink-0 self-center">
                                    <div className="max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100 transition-opacity duration-200 ease-out ease-out overflow-hidden flex items-center pr-1">
                                        {!rev.completed && (
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onStartFocusSession(rev);
                                                }}
                                                className={`btn btn-xs min-h-[28px] h-7 px-3 text-xs font-semibold btn-outline ${isOverdue ?'border-error text-error group-hover:bg-error group-hover:border-error' : 'border-base-300 text-base-content group-hover:bg-primary group-hover:border-primary'} group-hover:text-primary-content rounded-lg shadow-2xs whitespace-nowrap transition-colors flex items-center gap-1.5`}
                                            >
                                                <Play size={11} className="fill-current" /> Estudar
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
