import React from 'react';
import { Clock, Target, BookOpen, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
import AnimatedCounter from '../../../components/ui/AnimatedCounter';
import { calculateWeeklyProgress } from '../../../utils/studyCalculations';

export default function TopKpiCards({
    weeklyHoursStudied = 14,
    weeklyHoursGoal = 25,
    overallAccuracy = '81.7',
    totalQuestionsCorrect = 98,
    totalQuestionsDone = 120,
    weeklyAccuracyVariation = 4.2,
    todayMinutesStudied = 90,
    todayQuestionsDone = 35,
}) {
    const isCompoundHoje = todayMinutesStudied > 60;
    const isCompoundSemanal = (weeklyHoursStudied * 60) > 60;
    const progressoSemanalCalculado = calculateWeeklyProgress(weeklyHoursStudied, weeklyHoursGoal);

    return (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch w-full">
            {/* Card 1: Estudo Semanal */}
            <div className="bg-base-100 border border-base-300/70 p-6 rounded-3xl shadow-xs flex flex-col justify-between hover:shadow-sm transition-shadow">
                <div className="flex justify-between items-center h-8 mb-4">
                    <span className="text-xs uppercase tracking-wider font-bold text-neutral-content">
                        Estudo Semanal
                    </span>
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <Clock size={16} />
                    </div>
                </div>

                <div>
                    <div className="flex items-baseline gap-0.5">
                        {!isCompoundSemanal ? (
                            <>
                                <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-base-content leading-none">
                                    <AnimatedCounter value={weeklyHoursStudied * 60} duration={700} />
                                </span>
                                <span className="text-xl sm:text-2xl font-semibold text-base-content leading-none">min</span>
                            </>
                        ) : (
                            <>
                                <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-base-content leading-none tabular-nums">
                                    <AnimatedCounter
                                        value={Math.floor(weeklyHoursStudied)}
                                        duration={700}
                                        padZeros={2}
                                    />
                                </span>
                                <span className="text-xl sm:text-2xl font-semibold text-base-content leading-none">h</span>
                                <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-base-content leading-none tabular-nums ml-0.5">
                                    <AnimatedCounter
                                        value={Math.round((weeklyHoursStudied % 1) * 60)}
                                        duration={700}
                                        padZeros={2}
                                    />
                                </span>
                                <span className="text-xl sm:text-2xl font-semibold text-base-content leading-none">min</span>
                            </>
                        )}

                        <span className="text-xs font-medium text-neutral-content leading-none ml-2">
                            / {weeklyHoursGoal}h meta
                        </span>
                    </div>

                    <div className="w-full bg-base-200 rounded-full h-2 mt-4 overflow-hidden border border-base-300">
                        <div
                            className="bg-primary h-full rounded-full transition-all duration-700 ease-out"
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

            {/* Card 2: Desempenho Questões */}
            <div className="bg-base-100 border border-base-300/70 p-6 rounded-3xl shadow-xs flex flex-col justify-between hover:shadow-sm transition-shadow">
                <div className="flex justify-between items-center h-8 mb-4">
                    <span className="text-xs uppercase tracking-wider font-bold text-neutral-content">
                        Desempenho Questões
                    </span>
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                        <Target size={16} />
                    </div>
                </div>

                <div>
                    <div className="flex items-baseline gap-0.5">
                        <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-base-content leading-none">
                            <AnimatedCounter value={Number(overallAccuracy) || 81.7} duration={700} decimals={1} />
                        </span>
                        <span className="text-2xl sm:text-3xl font-semibold text-base-content leading-none">%</span>

                        <span className="text-xs font-medium text-neutral-content leading-none ml-2">
                            (<AnimatedCounter value={totalQuestionsCorrect} duration={700} /> de <AnimatedCounter value={totalQuestionsDone} duration={700} /> acertos)
                        </span>
                    </div>
                </div>

                <div className="mt-auto pt-4">
                    <div className={`flex items-center gap-1.5 text-xs font-semibold ${weeklyAccuracyVariation >= 0 ? 'text-accent' : 'text-error'
                        }`}>
                        {weeklyAccuracyVariation >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                        <span>
                            {weeklyAccuracyVariation >= 0 ? `+${weeklyAccuracyVariation}` : weeklyAccuracyVariation}% em relação à semana anterior
                        </span>
                    </div>
                </div>
            </div>

            {/* Card 3: Estudos de Hoje */}
            <div className="bg-base-100 border border-base-300/70 p-6 rounded-3xl shadow-xs flex flex-col justify-between hover:shadow-sm transition-shadow relative overflow-hidden">
                <div className="flex justify-between items-center h-8 mb-4">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                            <BookOpen size={16} />
                        </div>
                        <span className="text-xs uppercase tracking-wider font-bold text-neutral-content">
                            Estudos de Hoje
                        </span>
                    </div>

                    <div className="badge badge-sm bg-error/10 text-error border border-error/30 font-bold text-[10px] gap-1.5 py-2 px-2.5 rounded-full shadow-2xs shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-error/100 animate-pulse"></span>
                        Ao Vivo
                    </div>
                </div>

                <div className="flex justify-between items-start my-auto">
                    <div>
                        <div className="flex items-baseline gap-0.5">
                            {!isCompoundHoje ? (
                                <>
                                    <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-base-content leading-none">
                                        <AnimatedCounter value={todayMinutesStudied} duration={750} />
                                    </span>
                                    <span className="text-xl sm:text-2xl font-semibold text-base-content leading-none">min</span>
                                </>
                            ) : (
                                <>
                                    <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-base-content leading-none tabular-nums">
                                        <AnimatedCounter
                                            value={Math.floor(todayMinutesStudied / 60)}
                                            duration={750}
                                            padZeros={2}
                                        />
                                    </span>
                                    <span className="text-xl sm:text-2xl font-semibold text-base-content leading-none">h</span>
                                    <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-base-content leading-none tabular-nums ml-0.5">
                                        <AnimatedCounter
                                            value={todayMinutesStudied % 60}
                                            duration={750}
                                            padZeros={2}
                                        />
                                    </span>
                                    <span className="text-xl sm:text-2xl font-semibold text-base-content leading-none">min</span>
                                </>
                            )}
                        </div>
                        <span className="text-xs text-neutral-content font-medium block mt-1.5">
                            Tempo Líquido
                        </span>
                    </div>

                    <div className="text-right">
                        <div className="flex items-baseline justify-end">
                            <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-primary leading-none">
                                <AnimatedCounter value={todayQuestionsDone} duration={750} />
                            </span>
                        </div>
                        <span className="text-xs text-neutral-content font-medium block mt-1.5">
                            Questões
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
