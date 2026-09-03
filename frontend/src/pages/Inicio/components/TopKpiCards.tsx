import React from 'react';
import { Clock, Target, BookOpen, RefreshCw } from 'lucide-react';
import AnimatedCounter from '../../../components/ui/AnimatedCounter';
import { calculateWeeklyProgress } from '../../../utils/studyCalculations';

export default function TopKpiCards({
    weeklyHoursStudied = 14,
    weeklyHoursGoal = 25,
    overallAccuracy = '81.7',
    totalQuestionsCorrect = 98,
    totalQuestionsDone = 120,
    weeklyQuestionsGoal = 300,
    weeklyAccuracyVariation = 4.2,
    todayMinutesStudied = 90,
    todayQuestionsDone = 35,
    editalProgress = 42,
    topicsStudied = 18,
    totalTopics = 45,
}) {
    // 1. Cálculos de Estudo Semanal
    const progressoSemanalCalculado = calculateWeeklyProgress(weeklyHoursStudied, weeklyHoursGoal);
    const faltamHoras = Math.max(0, Number((weeklyHoursGoal - weeklyHoursStudied).toFixed(1)));

    // 2. Cálculos de Questões Semanais
    const progressoQuestoesCalculado = weeklyQuestionsGoal > 0
        ? Math.min(100, Math.round((totalQuestionsDone / weeklyQuestionsGoal) * 100))
        : 0;
    const faltamQuestoes = Math.max(0, weeklyQuestionsGoal - totalQuestionsDone);

    return (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch w-full">
            {/* Card 1: Estudo Semanal */}
            <div className="card-papyrus flex flex-col justify-between">
                <div className="flex justify-between items-center h-8 mb-4">
                    <span className="text-xs uppercase tracking-wider font-bold text-neutral-content">
                        ESTUDO SEMANAL
                    </span>
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <Clock size={16} />
                    </div>
                </div>

                <div>
                    <div className="flex items-baseline gap-0.5">
                        <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-base-content leading-none">
                            <AnimatedCounter value={weeklyHoursStudied} duration={700} decimals={Number.isInteger(weeklyHoursStudied) ? 0 : 1} />
                        </span>
                        <span className="text-xl sm:text-2xl font-semibold text-base-content leading-none">h</span>

                        <span className="text-xs font-medium text-neutral-content leading-none ml-2">
                            / {weeklyHoursGoal}h
                        </span>
                    </div>
                    <div className="text-xs font-medium text-neutral-content mt-1.5">
                        {faltamHoras > 0 ? `Faltam ${faltamHoras}h para a meta` : 'Meta semanal atingida! 🎉'}
                    </div>

                    <div className="w-full bg-base-200 rounded-full h-2 mt-4 overflow-hidden border border-base-300">
                        <div
                            className="bg-primary h-full rounded-full transition-[width] duration-500 ease-out ease-out"
                            style={{ width: `${progressoSemanalCalculado}%` }}
                        />
                    </div>
                </div>

                <div className="mt-auto pt-4">
                    <span className="text-xs text-neutral-content font-medium">
                        <AnimatedCounter value={progressoSemanalCalculado} duration={700} />% da meta cumprida
                    </span>
                </div>
            </div>

            {/* Card 2: Questões Semanais */}
            <div className="card-papyrus flex flex-col justify-between">
                <div className="flex justify-between items-center h-8 mb-4">
                    <span className="text-xs uppercase tracking-wider font-bold text-neutral-content">
                        QUESTÕES SEMANAIS
                    </span>
                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                        <Target size={16} />
                    </div>
                </div>

                <div>
                    <div className="flex items-baseline gap-0.5">
                        <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-base-content leading-none">
                            <AnimatedCounter value={totalQuestionsDone} duration={700} />
                        </span>
                        <span className="text-xs font-medium text-neutral-content leading-none ml-2">
                            / {weeklyQuestionsGoal}
                        </span>
                    </div>
                    <div className="text-xs font-medium text-neutral-content mt-1.5">
                        {faltamQuestoes > 0 ? `Faltam ${faltamQuestoes} questões para a meta` : 'Meta de questões atingida! 🎉'}
                    </div>

                    <div className="w-full bg-base-200 rounded-full h-2 mt-4 overflow-hidden border border-base-300">
                        <div
                            className="bg-emerald-500 h-full rounded-full transition-[width] duration-500 ease-out ease-out"
                            style={{ width: `${progressoQuestoesCalculado}%` }}
                        />
                    </div>
                </div>

                <div className="mt-auto pt-4">
                    <span className="text-xs text-neutral-content font-medium">
                        <AnimatedCounter value={progressoQuestoesCalculado} duration={700} />% da meta cumprida
                    </span>
                </div>
            </div>

            {/* Card 3: Progresso no Edital */}
            <div className="relative overflow-hidden rounded-[22px] border border-blue-500/30 bg-gradient-to-br from-white via-white to-blue-50/40 p-6 shadow-[0_10px_30px_-6px_rgba(37,99,235,0.09)] transition-all duration-200 ease-out hover:-translate-y-1 hover:border-blue-500/45 hover:shadow-[0_16px_35px_-6px_rgba(37,99,235,0.14)] active:scale-[0.99] flex flex-col justify-between h-full">
                {/* Linha de acento luminoso superior */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-200 via-blue-600 to-blue-200" />

                {/* Cabeçalho */}
                <div className="flex justify-between items-center h-8 mb-4">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                            <BookOpen size={16} />
                        </div>
                        <span className="text-xs uppercase tracking-wider font-bold text-neutral-content">
                            PROGRESSO NO EDITAL
                        </span>
                    </div>

                    <div className="badge badge-sm bg-error/10 text-error border border-error/30 font-bold text-[10px] gap-1.5 py-2 px-2.5 rounded-full shadow-2xs shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-error/100 animate-pulse"></span>
                        Ao Vivo
                    </div>
                </div>

                <div className="flex justify-center items-center gap-5 sm:gap-8 my-auto w-full">
                    <div className="text-center">
                        <div className="flex items-baseline justify-center gap-0.5">
                            <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-base-content leading-none">
                                <AnimatedCounter value={editalProgress} duration={750} />
                            </span>
                            <span className="text-xl sm:text-2xl font-semibold text-base-content leading-none">%</span>
                        </div>
                        <span className="text-xs text-neutral-content font-medium block mt-1.5">
                            Edital cumprido
                        </span>
                    </div>

                    {/* Divisória elegante */}
                    <div className="h-12 w-px bg-base-300/80 rounded-full"></div>

                    <div className="text-center">
                        <div className="flex items-baseline justify-center gap-0.5">
                            <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-primary leading-none">
                                <AnimatedCounter value={topicsStudied} duration={750} />
                            </span>
                            <span className="text-xs font-medium text-neutral-content leading-none ml-1 text-neutral-content/70">
                                / {totalTopics}
                            </span>
                        </div>
                        <span className="text-xs text-neutral-content font-medium block mt-1.5">
                            Tópicos estudados
                        </span>
                    </div>
                </div>

                <div className="mt-auto pt-4 flex items-center gap-1.5 text-xs font-semibold text-success">
                    <RefreshCw size={13} className="shrink-0" />
                    <span>Sessão sincronizada diariamente</span>
                </div>
            </div>
        </section>
    );
}
