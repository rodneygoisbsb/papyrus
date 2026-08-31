import React from 'react';
import { Play, ExternalLink, Video, FileText } from 'lucide-react';

export default function MetasTab({ dailyGoals, handleOpenStudy }) {
    return (
        <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-base-content">Metas Diárias</h2>
                <span className="text-xs font-semibold text-neutral-content">{dailyGoals.length} cadastradas</span>
            </div>

            <div className="space-y-4">
                {dailyGoals.map((goal) => (
                    <div
                        key={goal.id}
                        className="bg-base-100 border border-base-300/80 rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden"
                    >
                        <div
                            className="absolute left-0 top-0 bottom-0 w-1.5"
                            style={{ backgroundColor: goal.subjectColor || '#1E60F6' }}
                        />

                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="space-y-2">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-sm font-bold uppercase tracking-wider text-neutral-content">
                                        {goal.subject}
                                    </span>

                                    {goal.type === 'REVISION' ? (
                                        <span className="bg-accent/15 text-accent text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md">
                                            {goal.revisionTag || 'Revisão'}
                                        </span>
                                    ) : goal.type === 'QUESTIONS' ? (
                                        <span className="bg-secondary/15 text-secondary text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md">
                                            Questões
                                        </span>
                                    ) : (
                                        <span className="bg-primary/15 text-primary text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md">
                                            Teoria
                                        </span>
                                    )}

                                    {goal.importance && (
                                        <span className="bg-error/10 text-error border border-error/20 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md">
                                            ! {goal.importance}
                                        </span>
                                    )}
                                </div>

                                <h3 className="text-base md:text-xl font-bold text-base-content tracking-tight">
                                    {goal.topicName}
                                </h3>
                            </div>

                            <div className="flex items-center gap-4 shrink-0 self-end md:self-center">
                                <span className="text-xs font-bold text-neutral-content">
                                    {goal.durationMinutes} min
                                </span>

                                <button
                                    type="button"
                                    onClick={() => handleOpenStudy(goal)}
                                    className="bg-primary hover:bg-primary/90 text-primary-content font-bold text-xs px-5 py-2.5 rounded-xl shadow-sm shadow-primary/20 flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
                                >
                                    <Play size={14} fill="currentColor" />
                                    Iniciar Sessão de Estudo
                                </button>
                            </div>
                        </div>

                        <div className="mt-5 pt-4 border-t border-base-300/60 flex items-center gap-2">
                            <span className="text-xs font-bold text-neutral-content mr-1">
                                Material de Apoio:
                            </span>

                            <a
                                href={goal.tecUrl || '#'}
                                target="_blank"
                                rel="noreferrer"
                                className="group flex items-center gap-2 h-9 px-2.5 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold transition-all duration-300 ease-out cursor-pointer overflow-hidden max-w-[36px] hover:max-w-[200px]"
                            >
                                <ExternalLink size={16} className="shrink-0 text-primary" />
                                <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    Caderno TEC Concursos
                                </span>
                            </a>

                            <a
                                href={goal.videoUrl || '#'}
                                target="_blank"
                                rel="noreferrer"
                                className="group flex items-center gap-2 h-9 px-2.5 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold transition-all duration-300 ease-out cursor-pointer overflow-hidden max-w-[36px] hover:max-w-[140px]"
                            >
                                <Video size={16} className="shrink-0 text-primary" />
                                <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    Vídeo Aulas
                                </span>
                            </a>

                            <a
                                href={goal.pdfUrl || '#'}
                                target="_blank"
                                rel="noreferrer"
                                className="group flex items-center gap-2 h-9 px-2.5 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold transition-all duration-300 ease-out cursor-pointer overflow-hidden max-w-[36px] hover:max-w-[140px]"
                            >
                                <FileText size={16} className="shrink-0 text-primary" />
                                <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    Material PDF
                                </span>
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}