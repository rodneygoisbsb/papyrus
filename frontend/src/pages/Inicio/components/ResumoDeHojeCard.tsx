import React from 'react';

export default function ResumoDeHojeCard({
    todayMinutesStudied = 90,
    todayQuestionsDone = 35,
    dailyMinutesGoal = 240,
    disciplinesStudied = 3,
    todayAccuracy = 82
}) {
    return (
        <div className="card-papyrus flex flex-col justify-between h-full min-h-[220px]">
            {/* Cabeçalho */}
            <div className="flex justify-between items-center pb-4 border-b border-base-200/60 mb-5">
                <span className="text-xs font-bold uppercase tracking-wider text-base-content/70">
                    Resumo de Hoje
                </span>

                <span className="badge badge-sm bg-base-200 text-neutral-content font-semibold py-2 px-2.5 rounded-lg border-base-300">
                    Meta diária: <strong className="font-bold text-neutarl-content ml-1">{Math.floor(dailyMinutesGoal / 60)}h</strong>
                </span>
            </div>

            <div className="flex flex-col items-center gap-8 mt-2 w-full px-2">

                {/* Área Central com Gráfico e Métricas */}
                <div className="flex w-full items-center justify-center gap-8">

                    {/* Gráfico Circular Central */}
                    <div className="relative flex flex-col items-center justify-center shrink-0">
                        <div
                            className="radial-progress text-primary transition-all duration-1000 ease-out drop-shadow-sm"
                            style={{
                                "--value": Math.min(100, Math.round((todayMinutesStudied / dailyMinutesGoal) * 100)),
                                "--size": "9.5rem",
                                "--thickness": "14px"
                            } as any}
                            role="progressbar"
                        >
                            {/* Círculo de fundo cinza */}
                            <div className="absolute inset-0 rounded-full border-[14px] border-base-200 -z-10" />

                            <div className="flex flex-col items-center justify-center mt-2">
                                <div className="flex items-baseline gap-0.5">
                                    <span className="text-3xl font-black tracking-tight text-base-content leading-none">
                                        {Math.floor(todayMinutesStudied / 60)}
                                    </span>
                                    <span className="text-lg font-bold text-base-content leading-none">h</span>
                                    <span className="text-3xl font-black tracking-tight text-base-content leading-none ml-1">
                                        {todayMinutesStudied % 60}
                                    </span>
                                    <span className="text-lg font-bold text-base-content leading-none">m</span>
                                </div>
                                <span className="text-[10px] font-bold text-neutral-content uppercase tracking-widest mt-2">
                                    Estudados
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Container de Métricas na Direita */}
                    <div className="flex flex-col gap-4 justify-center w-full max-w-[140px]">

                        {/* Métrica 1: Questões */}
                        <div className="flex items-center gap-3 border-b border-base-200/60 pb-3">
                            <div className="w-9 h-9 rounded-full bg-info/15 text-info flex items-center justify-center shrink-0">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                </svg>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[17px] font-black text-base-content leading-none tabular-nums">
                                    {todayQuestionsDone}
                                </span>
                                <span className="text-[10px] font-bold text-neutral-content uppercase tracking-widest mt-0.5">
                                    Questões
                                </span>
                            </div>
                        </div>

                        {/* Métrica 2: Acertos */}
                        <div className="flex items-center gap-3 border-b border-base-200/60 pb-3">
                            <div className="w-9 h-9 rounded-full bg-success/15 text-success flex items-center justify-center shrink-0">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[17px] font-black text-success leading-none tabular-nums">
                                    {todayAccuracy}%
                                </span>
                                <span className="text-[10px] font-bold text-neutral-content uppercase tracking-widest mt-0.5">
                                    Acertos
                                </span>
                            </div>
                        </div>

                        {/* Métrica 3: Tópicos */}
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-[var(--theme-tertiary)]/15 text-[var(--theme-tertiary)] flex items-center justify-center shrink-0">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[17px] font-black text-base-content leading-none tabular-nums">
                                    {disciplinesStudied}
                                </span>
                                <span className="text-[10px] font-bold text-neutral-content uppercase tracking-widest mt-0.5">
                                    Tópicos
                                </span>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
