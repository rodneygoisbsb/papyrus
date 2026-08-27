import React, { useState, useEffect } from 'react';
import {
    Clock,
    Target,
    BookOpen,
    Radio,
    TrendingUp,
    RotateCcw,
    CheckCircle2,
    Circle,
    ExternalLink,
    Video,
    FileText,
    Calendar,
    Play,
    Pause
} from 'lucide-react';

export default function InicioTab({
    weeklyHoursStudied,
    weeklyHoursGoal,
    weeklyProgressPercentage,
    overallAccuracy,
    totalQuestionsCorrect,
    totalQuestionsDone,
    todayMinutesStudied,
    todayQuestionsDone,
    dailyGoals,
    toggleGoalCompletion,
    handleOpenStudy,
    setActiveTab
}) {
    const [pomodoroSeconds, setPomodoroSeconds] = useState(25 * 60);
    const [isPomodoroRunning, setIsPomodoroRunning] = useState(false);
    const [pomodoroMode, setPomodoroMode] = useState('focus');

    useEffect(() => {
        let interval = null;
        if (isPomodoroRunning && pomodoroSeconds > 0) {
            interval = setInterval(() => setPomodoroSeconds((prev) => prev - 1), 1000);
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

    const formatTimer = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    const constanciaDias = [
        { dia: 1, ativo: true }, { dia: 2, ativo: true }, { dia: 3, ativo: true }, { dia: 4, ativo: false },
        { dia: 5, ativo: true }, { dia: 6, ativo: true }, { dia: 7, ativo: true }, { dia: 8, ativo: true },
        { dia: 9, ativo: true }, { dia: 10, ativo: false }, { dia: 11, ativo: true }, { dia: 12, ativo: true },
        { dia: 13, ativo: true }, { dia: 14, ativo: true }, { dia: 15, ativo: true }, { dia: 16, ativo: true },
        { dia: 17, ativo: true }, { dia: 18, ativo: false }, { dia: 19, ativo: true }, { dia: 20, ativo: true },
        { dia: 21, ativo: true }, { dia: 22, ativo: true }, { dia: 23, ativo: true }, { dia: 24, ativo: true },
        { dia: 25, ativo: true }, { dia: 26, ativo: true }, { dia: 27, ativo: true }, { dia: 28, ativo: true }
    ];

    const regularMetas = dailyGoals.filter((g) => g.type !== 'REVISION');
    const revisoesMetas = dailyGoals.filter((g) => g.type === 'REVISION');

    return (
        <div className="space-y-6 animate-in fade-in duration-200">
            {/* LINHA SUPERIOR DE CARDS (BENTO TOP) */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-base-200/50 border border-base-300/70 p-6 rounded-3xl shadow-sm flex flex-col justify-between">
                    <div className="flex justify-between items-center">
                        <span className="text-xs uppercase tracking-wider font-bold text-neutral-content">Estudo Semanal</span>
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            <Clock size={16} />
                        </div>
                    </div>
                    <div className="my-4">
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-extrabold tracking-tight text-base-content">{weeklyHoursStudied}h</span>
                            <span className="text-sm font-medium text-neutral-content">/ {weeklyHoursGoal}h meta</span>
                        </div>
                        <progress className="progress progress-primary w-full mt-3 h-2" value={weeklyHoursStudied} max={weeklyHoursGoal}></progress>
                    </div>
                    <span className="text-xs text-neutral-content font-medium">{weeklyProgressPercentage}% da meta semanal cumprida</span>
                </div>

                <div className="bg-base-200/50 border border-base-300/70 p-6 rounded-3xl shadow-sm flex flex-col justify-between">
                    <div className="flex justify-between items-center">
                        <span className="text-xs uppercase tracking-wider font-bold text-neutral-content">Desempenho Questões</span>
                        <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                            <Target size={16} />
                        </div>
                    </div>
                    <div className="my-4">
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-extrabold tracking-tight text-base-content">{overallAccuracy}%</span>
                            <span className="text-sm font-medium text-neutral-content">({totalQuestionsCorrect} de {totalQuestionsDone} acertos)</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-accent font-semibold">
                        <TrendingUp size={14} />
                        <span>+4.2% em relação à semana anterior</span>
                    </div>
                </div>

                <div className="bg-base-200/50 border border-base-300/70 p-6 rounded-3xl shadow-sm flex flex-col justify-between">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <BookOpen size={16} className="text-neutral-content" />
                            <span className="text-xs uppercase tracking-wider font-bold text-neutral-content">Estudos de Hoje</span>
                        </div>
                        <div className="badge badge-error badge-sm gap-1 font-bold text-[10px] text-white">
                            <Radio size={10} className="animate-pulse" />
                            Ao vivo
                        </div>
                    </div>
                    <div className="my-4 grid grid-cols-2 gap-4">
                        <div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-extrabold tracking-tight text-base-content">{todayMinutesStudied}</span>
                                <span className="text-xs font-semibold text-neutral-content">min</span>
                            </div>
                            <span className="text-xs text-neutral-content">Tempo Líquido</span>
                        </div>
                        <div>
                            <span className="text-3xl font-extrabold tracking-tight text-base-content">{todayQuestionsDone}</span>
                            <p className="text-xs text-neutral-content">Questões Feitas</p>
                        </div>
                    </div>
                    <span className="text-xs text-neutral-content font-medium">Sessão em tempo real</span>
                </div>
            </section>

            {/* CORPO ASSIMÉTRICO (8 COLS ESQUERDA / 4 COLS DIREITA) */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-8 space-y-6">
                    {/* Metas de Hoje */}
                    <div className="bg-base-200/50 border border-base-300/70 p-6 rounded-3xl shadow-sm space-y-4">
                        <div className="flex justify-between items-center pb-2 border-b border-base-300/60">
                            <div className="flex items-center gap-2">
                                <Target size={18} className="text-primary" />
                                <h2 className="text-base font-bold tracking-tight text-base-content">Metas de Hoje</h2>
                            </div>
                            <button
                                type="button"
                                onClick={() => setActiveTab('metas')}
                                className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer"
                            >
                                Ver todas as metas →
                            </button>
                        </div>

                        <div className="space-y-3">
                            {regularMetas.slice(0, 3).map((goal) => (
                                <div
                                    key={goal.id}
                                    className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-base-100 border border-base-300/60 border-l-4 ${goal.borderClass || 'border-l-primary'
                                        } transition-all hover:shadow-xs gap-4`}
                                >
                                    <div className="flex items-start gap-3.5">
                                        <button
                                            type="button"
                                            onClick={() => toggleGoalCompletion(goal.id)}
                                            className="mt-0.5 text-neutral-content hover:text-primary transition-colors cursor-pointer"
                                        >
                                            {goal.completed ? (
                                                <CheckCircle2 size={20} className="text-primary fill-primary/20" />
                                            ) : (
                                                <Circle size={20} />
                                            )}
                                        </button>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-[11px] font-bold tracking-wider text-neutral-content uppercase">
                                                    {goal.subject}
                                                </span>
                                                <span className="badge badge-xs badge-outline text-[10px] font-bold px-2 py-0.5">
                                                    {goal.type === 'THEORY' ? 'TEORIA' : goal.type}
                                                </span>
                                            </div>
                                            <p className={`text-sm font-bold ${goal.completed ? 'line-through text-neutral-content/60' : 'text-base-content'}`}>
                                                {goal.topicName}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-1.5 self-end sm:self-center">
                                        {goal.tecUrl && (
                                            <a
                                                href={goal.tecUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="group flex items-center gap-1.5 bg-base-200 hover:bg-primary hover:text-primary-content text-base-content px-2.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border border-base-300"
                                                title="Caderno TEC Concursos"
                                            >
                                                <ExternalLink size={13} />
                                                <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap">
                                                    TEC
                                                </span>
                                            </a>
                                        )}
                                        {goal.videoUrl && (
                                            <a
                                                href={goal.videoUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="group flex items-center gap-1.5 bg-base-200 hover:bg-secondary hover:text-secondary-content text-base-content px-2.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border border-base-300"
                                                title="Vídeo Aulas"
                                            >
                                                <Video size={13} />
                                                <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap">
                                                    Vídeo
                                                </span>
                                            </a>
                                        )}
                                        {goal.pdfUrl && (
                                            <a
                                                href={goal.pdfUrl}
                                                className="group flex items-center gap-1.5 bg-base-200 hover:bg-accent hover:text-accent-content text-base-content px-2.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border border-base-300"
                                                title="Material PDF"
                                            >
                                                <FileText size={13} />
                                                <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap">
                                                    PDF
                                                </span>
                                            </a>
                                        )}
                                        <button
                                            type="button"
                                            onClick={() => handleOpenStudy(goal)}
                                            className="btn btn-xs btn-primary text-white font-bold ml-1 rounded-xl"
                                        >
                                            Estudar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Revisões do Dia */}
                    <div className="bg-base-200/50 border border-base-300/70 p-6 rounded-3xl shadow-sm space-y-4">
                        <div className="flex justify-between items-center pb-2 border-b border-base-300/60">
                            <div className="flex items-center gap-2">
                                <RotateCcw size={18} className="text-secondary" />
                                <h2 className="text-base font-bold tracking-tight text-base-content">Revisões do Dia</h2>
                            </div>
                            <span className="badge badge-sm badge-ghost font-bold text-xs">{revisoesMetas.length} pendentes</span>
                        </div>

                        <div className="space-y-3">
                            {revisoesMetas.map((rev) => (
                                <div
                                    key={rev.id}
                                    className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-base-100 border border-base-300/60 border-l-4 ${rev.borderClass || 'border-l-secondary'
                                        } transition-all hover:shadow-xs gap-4`}
                                >
                                    <div className="flex items-start gap-3.5">
                                        <button
                                            type="button"
                                            onClick={() => toggleGoalCompletion(rev.id)}
                                            className="mt-0.5 text-neutral-content hover:text-secondary transition-colors cursor-pointer"
                                        >
                                            {rev.completed ? (
                                                <CheckCircle2 size={20} className="text-secondary fill-secondary/20" />
                                            ) : (
                                                <Circle size={20} />
                                            )}
                                        </button>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-[11px] font-bold tracking-wider text-neutral-content uppercase">
                                                    {rev.subject}
                                                </span>
                                                <span className="badge badge-xs badge-secondary font-bold text-[10px] px-2 py-0.5 text-secondary-content">
                                                    {rev.revisionTag || 'REVISÃO'}
                                                </span>
                                            </div>
                                            <p className={`text-sm font-bold ${rev.completed ? 'line-through text-neutral-content/60' : 'text-base-content'}`}>
                                                {rev.topicName}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-1.5 self-end sm:self-center">
                                        {rev.tecUrl && (
                                            <a
                                                href={rev.tecUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="group flex items-center gap-1.5 bg-base-200 hover:bg-primary hover:text-primary-content text-base-content px-2.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border border-base-300"
                                            >
                                                <ExternalLink size={13} />
                                                <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap">
                                                    Questões
                                                </span>
                                            </a>
                                        )}
                                        {rev.pdfUrl && (
                                            <a
                                                href={rev.pdfUrl}
                                                className="group flex items-center gap-1.5 bg-base-200 hover:bg-accent hover:text-accent-content text-base-content px-2.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border border-base-300"
                                            >
                                                <FileText size={13} />
                                                <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap">
                                                    Resumo
                                                </span>
                                            </a>
                                        )}
                                        <button
                                            type="button"
                                            onClick={() => handleOpenStudy(rev)}
                                            className="btn btn-xs btn-secondary text-white font-bold ml-1 rounded-xl"
                                        >
                                            Revisar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* COLUNA DIREITA: CONSTÂNCIA & POMODORO */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-base-200/50 border border-base-300/70 p-6 rounded-3xl shadow-sm">
                        <div className="flex items-center justify-between mb-4 pb-2 border-b border-base-300/60">
                            <div className="flex items-center gap-2">
                                <Calendar size={18} className="text-primary" />
                                <h3 className="font-bold text-sm tracking-tight text-base-content">Constância de Estudos</h3>
                            </div>
                            <span className="text-xs font-semibold text-neutral-content">Últimos 28 dias</span>
                        </div>

                        <div className="grid grid-cols-7 gap-2 my-4">
                            {constanciaDias.map((item, idx) => (
                                <div
                                    key={idx}
                                    title={`Dia ${item.dia}: ${item.ativo ? 'Estudado' : 'Sem registro'}`}
                                    className={`aspect-square rounded-lg border transition-all ${item.ativo ? 'bg-primary/90 border-primary shadow-xs' : 'bg-base-100 border-base-300 opacity-40'
                                        }`}
                                />
                            ))}
                        </div>

                        <div className="flex justify-between items-center text-[11px] text-neutral-content pt-2 border-t border-base-300/60 font-medium">
                            <span>Menos ativo</span>
                            <div className="flex gap-1 items-center">
                                <div className="w-2.5 h-2.5 rounded-sm bg-base-100 border border-base-300" />
                                <div className="w-2.5 h-2.5 rounded-sm bg-primary/40" />
                                <div className="w-2.5 h-2.5 rounded-sm bg-primary" />
                            </div>
                            <span>Mais ativo</span>
                        </div>
                    </div>

                    <div className="bg-base-200/50 border border-base-300/70 p-6 rounded-3xl shadow-sm flex flex-col items-center text-center">
                        <div className="flex items-center justify-between w-full mb-4 pb-2 border-b border-base-300/60">
                            <div className="flex items-center gap-2">
                                <Clock size={18} className="text-accent" />
                                <h3 className="font-bold text-sm tracking-tight text-base-content">Timer de Ciclos</h3>
                            </div>
                            <div className="join">
                                <button
                                    type="button"
                                    onClick={() => resetPomodoro('focus')}
                                    className={`join-item btn btn-xs ${pomodoroMode === 'focus' ? 'btn-primary text-white font-bold' : 'btn-ghost'}`}
                                >
                                    Foco
                                </button>
                                <button
                                    type="button"
                                    onClick={() => resetPomodoro('break')}
                                    className={`join-item btn btn-xs ${pomodoroMode === 'break' ? 'btn-primary text-white font-bold' : 'btn-ghost'}`}
                                >
                                    Pausa
                                </button>
                            </div>
                        </div>

                        <div className="my-3 py-4 px-8 bg-base-100 border border-base-300 rounded-2xl w-full shadow-inner">
                            <span className="text-4xl font-black font-mono tracking-wider text-base-content">
                                {formatTimer(pomodoroSeconds)}
                            </span>
                        </div>

                        <div className="flex items-center gap-3 mt-3 w-full">
                            <button
                                type="button"
                                onClick={togglePomodoro}
                                className={`btn btn-sm flex-1 font-bold ${isPomodoroRunning ? 'btn-warning' : 'btn-primary text-white'}`}
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
                                className="btn btn-sm btn-square btn-ghost border border-base-300 text-neutral-content hover:text-base-content"
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