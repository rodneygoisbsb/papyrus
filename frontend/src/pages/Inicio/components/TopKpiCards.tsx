import React from 'react';
import AnimatedCounter from '../../../components/ui/AnimatedCounter';
import { calculateWeeklyProgress } from '../../../utils/studyCalculations';

interface TopKpiCardsProps {
    weeklyHoursStudied?: number;
    weeklyHoursGoal?: number;
    totalQuestionsDone?: number;
    weeklyQuestionsGoal?: number;
    weeklyTopicsStudied?: number;
    weeklyTopicsGoal?: number;
    streakDays?: number;
    streakRecord?: number;
    weekDayCompletion?: boolean[];
}

export default function TopKpiCards({
    weeklyHoursStudied = 14,
    weeklyHoursGoal = 25,
    totalQuestionsDone = 120,
    weeklyQuestionsGoal = 300,
    weeklyTopicsStudied = 5,
    weeklyTopicsGoal = 8,
    streakDays = 12,
    streakRecord = 24,
    weekDayCompletion = [true, true, true, true, true, false, false],
}: TopKpiCardsProps) {
    // 1. Cálculos de Estudo Semanal
    const progressoSemanalCalculado = calculateWeeklyProgress(weeklyHoursStudied, weeklyHoursGoal);
    const faltamHoras = Math.max(0, Number((weeklyHoursGoal - weeklyHoursStudied).toFixed(1)));

    // 2. Cálculos de Questões Semanais
    const progressoQuestoesCalculado = weeklyQuestionsGoal > 0
        ? Math.min(100, Math.round((totalQuestionsDone / weeklyQuestionsGoal) * 100))
        : 0;
    const faltamQuestoes = Math.max(0, weeklyQuestionsGoal - totalQuestionsDone);

    // 3. Cálculos de Tópicos Semanais
    const progressoTopicosCalculado = weeklyTopicsGoal > 0
        ? Math.min(100, Math.round((weeklyTopicsStudied / weeklyTopicsGoal) * 100))
        : 0;
    const faltamTopicos = Math.max(0, weeklyTopicsGoal - weeklyTopicsStudied);

    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch w-full">
            {/* Card 1: Estudo Semanal */}
            <div className="card-papyrus flex flex-col justify-between hover:-translate-y-0.5 hover:shadow-sm transition-all duration-150">
                <div className="flex justify-between items-center pb-2.5 mb-3 border-b border-base-200/60">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                        Estudo Semanal
                    </span>
                    <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full tabular-nums bg-opacity-10">
                        {progressoSemanalCalculado}%
                    </span>
                </div>

                <div>
                    <div className="flex items-baseline gap-0.5 tabular-nums">
                        <span className="text-3xl font-bold tracking-tight text-slate-900 leading-none tabular-nums">
                            <AnimatedCounter
                                value={weeklyHoursStudied}
                                duration={700}
                                decimals={Number.isInteger(weeklyHoursStudied) ? 0 : 1}
                            />
                        </span>
                        <span className="text-base font-semibold text-slate-700 ml-0.5">h</span>
                        <span className="text-xs font-medium text-slate-400 ml-1.5">
                            / {weeklyHoursGoal}h
                        </span>
                    </div>

                    <p className="text-xs font-medium text-slate-500 mt-1.5 truncate">
                        {faltamHoras > 0 ? `Faltam ${faltamHoras}h para a meta` : 'Meta alcançada! 🎉'}
                    </p>

                    <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden mt-3.5 w-full">
                        <div
                            className="bg-primary h-full rounded-full transition-[width] duration-700 ease-out"
                            style={{ width: `${progressoSemanalCalculado}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Card 2: Questões Semanais */}
            <div className="card-papyrus flex flex-col justify-between hover:-translate-y-0.5 hover:shadow-sm transition-all duration-150">
                <div className="flex justify-between items-center pb-2.5 mb-3 border-b border-base-200/60">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                        Questões Semanais
                    </span>
                    <span className="text-xs font-semibold text-secondary bg-secondary/10 px-2 py-0.5 rounded-full tabular-nums bg-opacity-10">
                        {progressoQuestoesCalculado}%
                    </span>
                </div>

                <div>
                    <div className="flex items-baseline gap-0.5 tabular-nums">
                        <span className="text-3xl font-bold tracking-tight text-slate-900 leading-none tabular-nums">
                            <AnimatedCounter value={totalQuestionsDone} duration={700} />
                        </span>
                        <span className="text-xs font-medium text-slate-400 ml-1.5">
                            / {weeklyQuestionsGoal}
                        </span>
                    </div>

                    <p className="text-xs font-medium text-slate-500 mt-1.5 truncate">
                        {faltamQuestoes > 0 ? `Faltam ${faltamQuestoes} questões` : 'Meta alcançada! 🎉'}
                    </p>

                    <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden mt-3.5 w-full">
                        <div
                            className="bg-secondary h-full rounded-full transition-[width] duration-700 ease-out"
                            style={{ width: `${progressoQuestoesCalculado}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Card 3: Tópicos na Semana */}
            <div className="card-papyrus flex flex-col justify-between hover:-translate-y-0.5 hover:shadow-sm transition-all duration-150">
                <div className="flex justify-between items-center pb-2.5 mb-3 border-b border-base-200/60">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                        Tópicos na Semana
                    </span>
                    <span className="text-xs font-semibold text-info bg-info/10 px-2 py-0.5 rounded-full tabular-nums bg-opacity-10">
                        {progressoTopicosCalculado}%
                    </span>
                </div>

                <div>
                    <div className="flex items-baseline gap-0.5 tabular-nums">
                        <span className="text-3xl font-bold tracking-tight text-slate-900 leading-none tabular-nums">
                            <AnimatedCounter value={weeklyTopicsStudied} duration={750} />
                        </span>
                        <span className="text-xs font-medium text-slate-400 ml-1.5">
                            / {weeklyTopicsGoal} tópicos
                        </span>
                    </div>

                    <p className="text-xs font-medium text-slate-500 mt-1.5 truncate">
                        {faltamTopicos > 0 ? `Faltam ${faltamTopicos} tópicos na semana` : 'Meta alcançada! 🎉'}
                    </p>

                    <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden mt-3.5 w-full">
                        <div
                            className="bg-info h-full rounded-full transition-[width] duration-700 ease-out"
                            style={{ width: `${progressoTopicosCalculado}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Card 4: Ofensiva */}
            <div className="card-papyrus flex flex-col justify-between hover:-translate-y-0.5 hover:shadow-sm transition-all duration-150">
                <div className="flex justify-between items-center pb-2.5 mb-3 border-b border-base-200/60">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                        Ofensiva (Streak)
                    </span>
                    <span className="text-xs font-semibold text-accent bg-accent/10 px-2 py-0.5 rounded-full tabular-nums bg-opacity-10">
                        Meta 7d
                    </span>
                </div>

                <div>
                    <div className="flex items-baseline gap-0.5 tabular-nums">
                        <span className="text-3xl font-bold tracking-tight text-slate-900 leading-none tabular-nums">
                            {streakDays}
                        </span>
                        <span className="text-xs font-medium text-slate-500 ml-1.5">
                            dias seguidos
                        </span>
                    </div>

                    <p className="text-xs font-medium text-slate-500 mt-1.5 truncate">
                        Seu recorde é de {streakRecord} dias
                    </p>

                    {/* Grade de 7 dias da semana */}
                    <div className="flex items-center gap-1.5 mt-4">
                        {weekDayCompletion.map((completed, index) => (
                            <div
                                key={index}
                                className={`h-2 flex-1 rounded-full transition-colors duration-300 ${completed ? 'bg-accent' : 'bg-base-200'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
