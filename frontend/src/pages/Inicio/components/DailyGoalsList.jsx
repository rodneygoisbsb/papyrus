import React from 'react';
import { Target, PenLine, RotateCcw, CheckCircle2, Circle, Clock, ExternalLink, Video, FileText } from 'lucide-react';
import { getSubjectAccent } from '../../../utils/studyCalculations';

export default function DailyGoalsList({
    dailyGoals = [],
    toggleGoalCompletion = () => { },
    handleOpenStudy = () => { },
    setIsRegisterModalOpen,
    setActiveTab
}) {
    const safeGoals = Array.isArray(dailyGoals) ? dailyGoals : [];
    const regularMetas = safeGoals.filter((g) => g?.type !== 'REVISION');
    const revisoesMetas = safeGoals.filter((g) => g?.type === 'REVISION');

    return (
        <div className="lg:col-span-8 space-y-6 w-full min-w-0">
            {/* Card 1: Metas de Hoje com Efeito Hover */}
            <div className="bg-base-100 border border-base-300/70 p-6 rounded-3xl shadow-xs space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-base-300/60">
                    <div className="flex items-center gap-2">
                        <Target size={18} className="text-primary" />
                        <h2 className="text-base font-bold tracking-tight text-base-content">Metas de Hoje</h2>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setIsRegisterModalOpen(true)}
                            className="flex items-center gap-1.5 text-xs font-bold text-primary-content bg-primary hover:bg-primary/90 active:scale-95 px-3 py-1.5 rounded-xl shadow-xs transition-all cursor-pointer"
                        >
                            <PenLine size={13} />
                            Registrar Estudo
                        </button>
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
                                    className={`group relative flex flex-col sm:flex-row sm:items-center justify-between py-4 px-4 sm:px-5 rounded-2xl bg-base-100 border border-base-300/70 border-l-[5px] ${accent.border} hover:-translate-y-0.5 hover:shadow-md hover:bg-base-200/40 transition-all duration-200 ease-out gap-4 cursor-pointer`}
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
                                            <h3 className="text-sm font-bold tracking-tight uppercase text-base-content group-hover:text-primary transition-colors">
                                                {goal.subject || 'CONCURSO'}
                                            </h3>

                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className={`text-[13px] font-medium transition-colors ${goal.completed ? 'line-through text-neutral-content/60' : 'text-base-content/80 group-hover:text-base-content'
                                                    }`}>
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
                                        <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-all duration-300 ease-out">
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

                                        {/* Caixa do botão: max-w-0 invisível em repouso -> expande no hover */}
                                        <div className="max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100 transition-all duration-300 ease-out overflow-hidden flex items-center">
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

            {/* Card 2: Revisões do Dia com Efeito Hover */}
            <div className="bg-base-100 border border-base-300/70 p-6 rounded-3xl shadow-xs space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-base-300/60">
                    <div className="flex items-center gap-2">
                        <RotateCcw size={18} className="text-secondary" />
                        <h2 className="text-base font-bold tracking-tight text-base-content">Revisões do Dia</h2>
                    </div>
                    <span className="badge badge-sm bg-base-200 border-none font-bold text-xs text-neutral-content">
                        {revisoesMetas.length} pendentes
                    </span>
                </div>

                <div className="space-y-3">
                    {revisoesMetas.length === 0 ? (
                        <div className="p-6 text-center text-xs text-neutral-content bg-base-200/40 rounded-2xl border border-base-300/50">
                            Nenhuma revisão pendente para hoje. Parabéns! 🎉
                        </div>
                    ) : (
                        revisoesMetas.map((rev) => {
                            const revDuration = rev.durationMinutes || rev.actualDurationMinutes || rev.targetDurationMinutes || 45;
                            const accent = getSubjectAccent(rev.subject);

                            return (
                                <div
                                    key={rev.id}
                                    className={`group relative flex flex-col sm:flex-row sm:items-center justify-between py-4 px-4 sm:px-5 rounded-2xl bg-base-100 border border-base-300/70 border-l-[5px] ${accent.border} hover:-translate-y-0.5 hover:shadow-md hover:bg-base-200/40 transition-all duration-200 ease-out gap-4 cursor-pointer`}
                                >
                                    <div className="flex items-start gap-3.5">
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleGoalCompletion(rev.id);
                                            }}
                                            className="mt-0.5 text-neutral-content hover:text-secondary transition-transform active:scale-90 focus-visible:ring-2 focus-visible:ring-secondary rounded-full cursor-pointer shrink-0"
                                            title={rev.completed ? "Desmarcar revisão" : "Concluir revisão"}
                                        >
                                            {rev.completed ? (
                                                <CheckCircle2 size={20} className="text-secondary fill-secondary/15" />
                                            ) : (
                                                <Circle size={20} className="text-base-300 group-hover:text-secondary transition-colors" />
                                            )}
                                        </button>

                                        <div className="space-y-1">
                                            <h3 className="text-sm font-bold tracking-tight uppercase text-base-content group-hover:text-secondary transition-colors">
                                                {rev.subject || 'CONCURSO'}
                                            </h3>

                                            <div className="flex items-center gap-2 flex-wrap">
                                                <span className={`text-[13px] font-medium transition-colors ${rev.completed ? 'line-through text-neutral-content/60' : 'text-base-content/80 group-hover:text-base-content'
                                                    }`}>
                                                    {rev.topicName || rev.topicoNome || 'Sem título'}
                                                </span>

                                                <span className="badge badge-sm bg-base-200 text-neutral-content border-none font-medium text-[11px] px-2 py-0.5 rounded-md group-hover:bg-base-300/60 transition-colors">
                                                    {rev.revisionTag || 'Revisão'}
                                                </span>

                                                <span className="badge badge-sm bg-base-200 text-neutral-content border-none font-medium text-[11px] px-2 py-0.5 rounded-md flex items-center gap-1 group-hover:bg-base-300/60 transition-colors">
                                                    <Clock size={11} />
                                                    <span className="tabular-nums">{revDuration} min</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Botão Revisar que expande no Hover */}
                                    <div className="flex items-center gap-2 shrink-0 self-center">
                                        <div className="max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100 transition-all duration-300 ease-out overflow-hidden flex items-center">
                                            <button
                                                type="button"
                                                onClick={() => handleOpenStudy(rev)}
                                                className="btn btn-xs min-h-[28px] h-7 px-3 text-xs font-semibold btn-outline border-base-300 text-base-content group-hover:bg-secondary group-hover:border-secondary group-hover:text-secondary-content rounded-lg shadow-2xs whitespace-nowrap transition-colors"
                                            >
                                                Revisar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}
