import React from 'react';
import { RefreshCw, ExternalLink, Video, FileText, Play, Check } from 'lucide-react';
import { getSubjectAccent } from '../../../utils/studyCalculations';

export default function DailyRevisionsList({
    revisions = [],
    toggleRevisionCompletion = () => { },
    onStartFocusSession = () => { },
    onOpenRegisterModal = () => { },
}) {
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

                <button
                    onClick={onOpenRegisterModal}
                    className="btn btn-sm btn-primary rounded-xl px-3.5 gap-1 font-bold text-xs"
                >
                    + Registrar Estudo
                </button>
            </div>

            {/* LISTA DE MATÉRIAS */}
            <div className="space-y-3 mt-4">
                {revisions.length === 0 ? (
                    <div className="text-center py-6 text-xs text-neutral-content bg-base-200/50 rounded-xl">
                        Nenhuma revisão agendada para hoje.
                    </div>
                ) : (
                    revisions.map((rev) => {
                        const accent = getSubjectAccent(rev.subject);
                        return (
                            <div
                                key={rev.id}
                                className="group relative p-4 rounded-2xl border border-base-300 bg-base-100 hover:border-slate-300 hover:shadow-sm transition-all duration-200 flex items-center justify-between overflow-hidden"
                            >
                                {/* Listra lateral */}
                                <div className={`absolute left-0 top-0 bottom-0 w-1 ${accent.bg}`} />

                                <div className="flex items-center gap-3.5 pl-2">
                                    {/* Checkbox circular */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleRevisionCompletion(rev.id);
                                        }}
                                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer active:scale-90 shrink-0 ${rev.completed
                                            ? 'bg-secondary border-secondary text-white'
                                            : 'border-slate-300 hover:border-primary text-transparent'
                                            }`}
                                    >
                                        <Check size={12} className={rev.completed ? 'opacity-100' : 'opacity-0'} strokeWidth={3} />
                                    </button>

                                    {/* Textos */}
                                    <div className="flex flex-col">
                                        <span className={`text-xs font-bold transition-colors ${rev.completed ? 'text-slate-400 line-through' : 'text-base-content'}`}>
                                            {rev.subject || 'MATÉRIA'}
                                        </span>
                                        <span className={`text-xs font-normal transition-colors ${rev.completed ? 'text-slate-400/70' : 'text-slate-500'}`}>
                                            {rev.topicName || 'Tópico'}
                                        </span>
                                    </div>

                                    {/* Badges */}
                                    <div className="flex items-center gap-1.5 ml-2">
                                        {rev.revisionTag && (
                                            <span className="badge badge-xs bg-amber-50 text-accent font-bold px-1.5 py-2.5 rounded-md">
                                                {rev.revisionTag}
                                            </span>
                                        )}
                                        {rev.type === 'QUESTIONS' && (
                                            <span className="badge badge-xs bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                                                {rev.questionCount || rev.questionCount} Questões
                                            </span>
                                        )}
                                        <span className="badge badge-xs bg-slate-100 text-slate-600 font-medium px-1.5 py-2.5 rounded-md">
                                            {rev.durationMinutes || 0} min
                                        </span>
                                    </div>
                                </div>

                                {/* Hover Disclosure (Utilitários vs Botão Iniciar) */}
                                <div className="relative flex items-center h-8 pr-1">
                                    {/* Estado Normal: Ícones */}
                                    <div className={`flex items-center gap-2 transition-opacity duration-200 ${rev.completed ? 'opacity-50' : 'opacity-100 group-hover:opacity-0'}`}>
                                        {rev.tecUrl && (
                                            <a href={rev.tecUrl} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} className="text-slate-400 hover:text-primary transition-colors">
                                                <ExternalLink size={15} />
                                            </a>
                                        )}
                                        {rev.videoUrl && (
                                            <a href={rev.videoUrl} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} className="text-slate-400 hover:text-secondary transition-colors">
                                                <Video size={15} />
                                            </a>
                                        )}
                                        {rev.pdfUrl && (
                                            <a href={rev.pdfUrl} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} className="text-slate-400 hover:text-accent transition-colors">
                                                <FileText size={15} />
                                            </a>
                                        )}
                                    </div>

                                    {/* Estado Hover: Botão desliza para dentro */}
                                    {!rev.completed && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onStartFocusSession(rev);
                                            }}
                                            className="absolute right-0 opacity-0 group-hover:opacity-100 translate-x-3 group-hover:translate-x-0 transition-all duration-200 btn btn-sm btn-primary rounded-xl px-4 text-xs font-bold shadow-sm cursor-pointer whitespace-nowrap flex items-center gap-1 min-h-0 h-8"
                                        >
                                            Iniciar <Play size={12} className="fill-current" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
