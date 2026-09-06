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
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch w-full">
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
                        <span className="text-3xl font-semibold tracking-tight text-base-content leading-none">
                            <AnimatedCounter value={weeklyHoursStudied} duration={700} decimals={Number.isInteger(weeklyHoursStudied) ? 0 : 1} />
                        </span>
                        <span className="text-xl font-semibold text-base-content leading-none">h</span>

                        <span className="text-[10px] font-bold text-neutral-content leading-none ml-2">
                            / {weeklyHoursGoal}h
                        </span>
                    </div>
                    <div className="text-[11px] font-medium text-neutral-content mt-1.5">
                        {faltamHoras > 0 ? `Faltam ${faltamHoras}h para a meta` : 'Meta alcançada! 🎉'}
                    </div>

                    <div className="w-full bg-base-200 rounded-full h-1.5 mt-4 overflow-hidden border border-base-300">
                        <div
                            className="bg-primary h-full rounded-full transition-[width] duration-500 ease-out"
                            style={{ width: `${progressoSemanalCalculado}%` }}
                        />
                    </div>
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
                        <span className="text-3xl font-semibold tracking-tight text-base-content leading-none">
                            <AnimatedCounter value={totalQuestionsDone} duration={700} />
                        </span>
                        <span className="text-[10px] font-bold text-neutral-content leading-none ml-2">
                            / {weeklyQuestionsGoal}
                        </span>
                    </div>
                    <div className="text-[11px] font-medium text-neutral-content mt-1.5">
                        {faltamQuestoes > 0 ? `Faltam ${faltamQuestoes} questões` : 'Meta alcançada! 🎉'}
                    </div>

                    <div className="w-full bg-base-200 rounded-full h-1.5 mt-4 overflow-hidden border border-base-300">
                        <div
                            className="bg-emerald-500 h-full rounded-full transition-[width] duration-500 ease-out"
                            style={{ width: `${progressoQuestoesCalculado}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Card 3: Progresso no Edital */}
            <div className="card-papyrus flex flex-col justify-between">
                <div className="flex justify-between items-center h-8 mb-4">
                    <span className="text-xs uppercase tracking-wider font-bold text-neutral-content">
                        PROGRESSO NO EDITAL
                    </span>
                    <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                        <BookOpen size={16} />
                    </div>
                </div>

                <div>
                    <div className="flex items-baseline gap-0.5">
                        <span className="text-3xl font-semibold tracking-tight text-base-content leading-none">
                            <AnimatedCounter value={editalProgress} duration={750} />
                        </span>
                        <span className="text-xl font-semibold text-base-content leading-none">%</span>
                        <span className="text-[10px] font-bold text-neutral-content leading-none ml-2">
                            / {topicsStudied} tópicos
                        </span>
                    </div>
                    <div className="text-[11px] font-medium text-neutral-content mt-1.5">
                        Faltam {totalTopics - topicsStudied} tópicos para fechar
                    </div>

                    <div className="w-full bg-base-200 rounded-full h-1.5 mt-4 overflow-hidden border border-base-300">
                        <div
                            className="bg-blue-500 h-full rounded-full transition-[width] duration-500 ease-out"
                            style={{ width: `${editalProgress}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Card 4: Ofensiva */}
            <div className="card-papyrus flex flex-col justify-between">
                <div className="flex justify-between items-center h-8 mb-4">
                    <span className="text-xs uppercase tracking-wider font-bold text-neutral-content">
                        OFENSIVA (STREAK)
                    </span>
                    <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500 shrink-0">
                        <RefreshCw size={16} />
                    </div>
                </div>

                <div>
                    <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-semibold tracking-tight text-base-content leading-none">
                            12
                        </span>
                        <span className="text-sm font-bold text-neutral-content leading-none">
                            dias seguidos
                        </span>
                    </div>
                    <div className="text-[11px] font-medium text-neutral-content mt-1.5">
                        Seu recorde é de 24 dias
                    </div>

                    {/* Pontinhos simulando dias da semana */}
                    <div className="flex items-center gap-1.5 mt-4">
                        {[1, 2, 3, 4, 5, 6, 7].map(i => (
                            <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= 5 ? 'bg-orange-500' : 'bg-base-200'}`}></div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
