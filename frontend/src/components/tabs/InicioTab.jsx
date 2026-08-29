import React, { useState, useEffect, useRef } from 'react';
import {
    Clock,
    Target,
    BookOpen,
    TrendingUp,
    TrendingDown,
    RotateCcw,
    CheckCircle2,
    Circle,
    ExternalLink,
    Video,
    FileText,
    Calendar,
    Play,
    Pause,
    RefreshCw
} from 'lucide-react';

/**
 * Componente de Contador Numérico Suavizado (Soft KPI)
 */
function AnimatedCounter({ value, duration = 700, decimals = 0, padZeros = 0 }) {
    const [displayValue, setDisplayValue] = useState(Number(value) || 0);
    const prevValueRef = useRef(Number(value) || 0);

    useEffect(() => {
        const startVal = prevValueRef.current;
        const endVal = Number(value) || 0;
        prevValueRef.current = endVal;

        if (startVal === endVal) return;

        let startTime = null;
        let animationFrameId;

        const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);

            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentNumber = startVal + (endVal - startVal) * easeProgress;

            setDisplayValue(currentNumber);

            if (progress < 1) {
                animationFrameId = requestAnimationFrame(animate);
            } else {
                setDisplayValue(endVal);
            }
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, [value, duration]);

    const rawRounded = Math.round(displayValue);
    const formatted = decimals > 0
        ? displayValue.toFixed(decimals)
        : (padZeros > 0 ? String(rawRounded).padStart(padZeros, '0') : rawRounded);

    return (
        <span className="tabular-nums font-['Plus_Jakarta_Sans']">
            {formatted}
        </span>
    );
}

export default function InicioTab({
    weeklyHoursStudied = 14,
    weeklyHoursGoal = 25,
    overallAccuracy = '81.7',
    totalQuestionsCorrect = 98,
    totalQuestionsDone = 120,
    weeklyAccuracyVariation = 4.2,
    todayMinutesStudied = 90,
    todayQuestionsDone = 35,
    dailyGoals = [],
    toggleGoalCompletion = () => { },
    handleOpenStudy = () => { },
    setActiveTab = () => { }
}) {
    // 1. ESTADO DO TIMER DE CICLOS (POMODORO)
    const [pomodoroSeconds, setPomodoroSeconds] = useState(25 * 60);
    const [isPomodoroRunning, setIsPomodoroRunning] = useState(false);
    const [pomodoroMode, setPomodoroMode] = useState('focus');

    useEffect(() => {
        let interval = null;
        if (isPomodoroRunning && pomodoroSeconds > 0) {
            interval = setInterval(() => {
                setPomodoroSeconds((prev) => prev - 1);
            }, 1000);
        } else if (pomodoroSeconds === 0) {
            setIsPomodoroRunning(false);
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isPomodoroRunning, pomodoroSeconds]);

    const togglePomodoro = () => setIsPomodoroRunning(!isPomodoroRunning);

    const resetPomodoro = (mode = pomodoroMode) => {
        setIsPomodoroRunning(false);
        setPomodoroMode(mode);
        setPomodoroSeconds(mode === 'focus' ? 25 * 60 : 5 * 60);
    };

    const formatTimer = (seconds = 0) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    // 2. REGRAS DE FORMATAÇÃO DE TEMPO
    const isCompoundHoje = todayMinutesStudied > 60;
    const isCompoundSemanal = (weeklyHoursStudied * 60) > 60;
    const progressoSemanalCalculado = weeklyHoursGoal > 0
        ? Math.min(100, Math.max(0, Math.round((weeklyHoursStudied / weeklyHoursGoal) * 100)))
        : 0;

    // 3. FILTRAGEM DE METAS
    const safeGoals = Array.isArray(dailyGoals) ? dailyGoals : [];
    const regularMetas = safeGoals.filter((g) => g?.type !== 'REVISION');
    const revisoesMetas = safeGoals.filter((g) => g?.type === 'REVISION');

    // 4. CORES DAS FITAS LATERAIS
    const getSubjectAccent = (subjectName = '') => {
        const upper = (subjectName || '').toUpperCase();
        if (upper.includes('CONSTITUCIONAL')) return { border: 'border-l-primary' };
        if (upper.includes('ADMINISTRATIVO')) return { border: 'border-l-accent' };
        if (upper.includes('PORTUGUESA') || upper.includes('PORTUGUÊS')) return { border: 'border-l-success' };
        if (upper.includes('PENAL')) return { border: 'border-l-primary' };
        if (upper.includes('RACIOCÍNIO') || upper.includes('LÓGICA')) return { border: 'border-l-error' };
        return { border: 'border-l-primary' };
    };

    // 5. HEATMAP DE CONSTÂNCIA (28 DIAS)
    const diasSemanaLabels = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
    const heatmapData = [
        [{ date: '01 Out', level: 1, hours: '1.2h' }, { date: '08 Out', level: 2, hours: '2.5h' }, { date: '15 Out', level: 4, hours: '4.8h' }, { date: '22 Out', level: 4, hours: '5.1h' }],
        [{ date: '02 Out', level: 2, hours: '2.0h' }, { date: '09 Out', level: 3, hours: '3.4h' }, { date: '16 Out', level: 4, hours: '4.5h' }, { date: '23 Out', level: 3, hours: '3.8h' }],
        [{ date: '03 Out', level: 2, hours: '2.1h' }, { date: '10 Out', level: 1, hours: '1.0h' }, { date: '17 Out', level: 3, hours: '3.2h' }, { date: '24 Out', level: 4, hours: '4.6h' }],
        [{ date: '04 Out', level: 3, hours: '3.0h' }, { date: '11 Out', level: 2, hours: '2.4h' }, { date: '18 Out', level: 4, hours: '4.2h' }, { date: '25 Out', level: 4, hours: '4.9h' }],
        [{ date: '05 Out', level: 1, hours: '1.5h' }, { date: '12 Out', level: 4, hours: '4.0h' }, { date: '19 Out', level: 3, hours: '3.5h' }, { date: '26 Out', level: 4, hours: '4.5h' }],
        [{ date: '06 Out', level: 2, hours: '2.2h' }, { date: '13 Out', level: 3, hours: '3.1h' }, { date: '20 Out', level: 4, hours: '4.3h' }, { date: '27 Out', level: 4, hours: '5.0h' }],
        [{ date: '07 Out', level: 0, hours: '0.0h' }, { date: '14 Out', level: 2, hours: '2.0h' }, { date: '21 Out', level: 4, hours: '4.0h' }, { date: '28 Out', level: 3, hours: '3.6h' }]
    ];

    const getHeatmapColor = (level) => {
        switch (level) {
            case 1: return 'bg-primary/15 border border-primary/25';
            case 2: return 'bg-primary/40';
            case 3: return 'bg-primary/80';
            case 4: return 'bg-primary';
            default: return 'bg-base-200/90 border border-base-300/40';
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-200 font-['Plus_Jakarta_Sans'] text-base-content w-full">

            {/* 1. LINHA SUPERIOR: 3 CARDS TOP */}
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

            {/* 2. CORPO PRINCIPAL: GRID 12 COLUNAS */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full">

                {/* COLUNA ESQUERDA (8 COLS): METAS & REVISÕES */}
                <div className="lg:col-span-8 space-y-6 w-full min-w-0">

                    {/* Card 1: Metas de Hoje com Efeito Hover */}
                    <div className="bg-base-100 border border-base-300/70 p-6 rounded-3xl shadow-xs space-y-4">
                        <div className="flex justify-between items-center pb-2 border-b border-base-300/60">
                            <div className="flex items-center gap-2">
                                <Target size={18} className="text-primary" />
                                <h2 className="text-base font-bold tracking-tight text-base-content">Metas de Hoje</h2>
                            </div>
                            <button
                                type="button"
                                onClick={() => setActiveTab('metas')}
                                className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer focus-visible:ring-2 focus-visible:ring-primary rounded-md"
                            >
                                Ver todas as metas →
                            </button>
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

                {/* COLUNA DIREITA (4 COLS): CONSTÂNCIA & TIMER POMODORO */}
                <div className="lg:col-span-4 space-y-6 w-full min-w-0">

                    {/* Card: Constância de Estudos (Matriz 7x14 com Legenda Gradiente) */}
                    <div className="bg-base-100 border border-base-300/70 p-6 rounded-3xl shadow-xs space-y-4">

                        {/* Cabeçalho */}
                        <div className="flex items-center justify-between pb-2 border-b border-base-300/60">
                            <div className="flex items-center gap-2">
                                <Calendar size={18} className="text-primary" />
                                <h3 className="font-bold text-sm tracking-tight text-base-content">
                                    Constância de Estudos
                                </h3>
                            </div>
                            <span className="text-xs font-semibold text-neutral-content">
                                Últimos 28 dias
                            </span>
                        </div>

                        {/* Matriz 7 Dias x 14 Semanas (Quadrados com cantos arredondados) */}
                        <div className="space-y-1.5 my-3">
                            {diasSemanaLabels.map((dia, rowIdx) => (
                                <div key={dia} className="flex items-center gap-2">
                                    <span className="text-[11px] font-semibold text-neutral-content w-6 shrink-0">
                                        {dia}
                                    </span>

                                    <div className="grid grid-cols-[repeat(14,minmax(0,1fr))] gap-1 flex-1">
                                        {heatmapData[rowIdx].map((item, colIdx) => (
                                            <div
                                                key={colIdx}
                                                className="tooltip tooltip-top"
                                                data-tip={`Semana ${item.semana} (${dia}): ${item.hours} líquidas`}
                                            >
                                                <div
                                                    className={`w-full aspect-square rounded-[4px] transition-all duration-150 hover:scale-125 cursor-pointer shadow-2xs ${getHeatmapColor(item.level)}`}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Barra Inferior de Legenda Contínua (Full-Width Gradient) */}
                        <div className="pt-3 border-t border-base-300/60 space-y-1.5">
                            {/* Rótulos de Horas Distribuídos em Cima */}
                            <div className="flex justify-between items-center text-[10px] font-semibold text-neutral-content px-0.5">
                                <span>0h</span>
                                <span>2h</span>
                                <span>4h</span>
                                <span>4h+</span>
                            </div>

                            {/* Barra Gradiente Contínua de Ponta a Ponta */}
                            <div className="w-full h-2 rounded-full bg-gradient-to-r from-base-200 via-primary/50 to-primary border border-base-300/60" />

                            {/* Rótulo Semântico Centralizado */}
                            <span className="text-[10px] font-medium text-neutral-content/80 text-center block pt-0.5">
                                Horas líquidas (Horas de Estudo Efetivo)
                            </span>
                        </div>

                    </div>

                    {/* Card: Timer de Ciclos */}
                    <div className="bg-base-100 border border-base-300/70 p-6 rounded-3xl shadow-xs flex flex-col items-center text-center">
                        <div className="flex items-center justify-between w-full mb-4 pb-2 border-b border-base-300/60">
                            <div className="flex items-center gap-2">
                                <Clock size={18} className="text-accent" />
                                <h3 className="font-bold text-sm tracking-tight text-base-content">Timer de Ciclos</h3>
                            </div>
                            <div className="join">
                                <button
                                    type="button"
                                    onClick={() => resetPomodoro('focus')}
                                    className={`join-item btn btn-xs ${pomodoroMode === 'focus'
                                        ? 'btn-primary text-primary-content font-bold'
                                        : 'btn-ghost text-neutral-content'
                                        } focus-visible:ring-2 focus-visible:ring-primary`}
                                >
                                    Foco
                                </button>
                                <button
                                    type="button"
                                    onClick={() => resetPomodoro('break')}
                                    className={`join-item btn btn-xs ${pomodoroMode === 'break'
                                        ? 'btn-primary text-primary-content font-bold'
                                        : 'btn-ghost text-neutral-content'
                                        } focus-visible:ring-2 focus-visible:ring-primary`}
                                >
                                    Pausa
                                </button>
                            </div>
                        </div>

                        <div className="my-2 py-3 px-6 bg-base-200/40 border border-base-300/60 rounded-2xl w-full">
                            <span className="text-4xl font-semibold tracking-tight text-base-content tabular-nums">
                                {formatTimer(pomodoroSeconds)}
                            </span>
                        </div>

                        <div className="flex items-center gap-3 mt-2 w-full">
                            <button
                                type="button"
                                onClick={togglePomodoro}
                                className={`btn btn-sm flex-1 font-semibold rounded-xl ${isPomodoroRunning ? 'btn-warning' : 'btn-primary text-primary-content'
                                    } shadow-2xs`}
                            >
                                {isPomodoroRunning ? (
                                    <>
                                        <Pause size={15} /> Pausar
                                    </>
                                ) : (
                                    <>
                                        <Play size={15} fill="currentColor" /> Iniciar
                                    </>
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={() => resetPomodoro(pomodoroMode)}
                                className="btn btn-sm btn-square btn-ghost border border-base-300/70 text-neutral-content hover:text-base-content rounded-xl"
                                title="Reiniciar Timer"
                            >
                                <RotateCcw size={15} />
                            </button>
                        </div>
                    </div>

                </div>

            </section>

        </div>
    );
}