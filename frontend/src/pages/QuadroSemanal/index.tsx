import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, CheckCircle2, Circle } from 'lucide-react';
import ScheduleGoalModal from '../../components/modals/ScheduleGoalModal';
import RegisterStudyModal from '../../components/modals/RegisterStudyModal';

const MOCK_WEEK = [
    {
        dayName: 'SEG', date: '31/08', isToday: false, goals: [
            { id: 'g1', subject: 'Direito Administrativo', topicName: 'Atos Administrativos - Requisitos e Atributos', durationMinutes: 60, type: 'THEORY', completed: true },
            { id: 'g2', subject: 'Direito Constitucional', topicName: 'Direitos Sociais (Art. 6º ao 11)', durationMinutes: 90, type: 'THEORY', completed: true },
            { id: 'g3', subject: 'Português', topicName: 'Crase e Regência', durationMinutes: 45, type: 'REVISION', completed: true },
            { id: 'g4', subject: 'Informática', topicName: 'Redes de Computadores', durationMinutes: 30, type: 'QUESTIONS', completed: true },
        ]
    },
    {
        dayName: 'TER', date: '01/09', isToday: true, goals: [
            { id: 'g5', subject: 'Direito Penal', topicName: 'Crimes Contra a Pessoa - Homicídio', durationMinutes: 120, type: 'THEORY', completed: true },
            { id: 'g6', subject: 'Raciocínio Lógico', topicName: 'Tabela Verdade', durationMinutes: 45, type: 'THEORY', completed: false },
            { id: 'g7', subject: 'Direito Administrativo', topicName: 'Licitações e Contratos (Lei 14.133)', durationMinutes: 60, type: 'REVISION', completed: false },
        ]
    },
    {
        dayName: 'QUA', date: '02/09', isToday: false, goals: [
            { id: 'g8', subject: 'Estatística', topicName: 'Probabilidade', durationMinutes: 90, type: 'THEORY', completed: false },
            { id: 'g9', subject: 'Direito Constitucional', topicName: 'Poder Legislativo', durationMinutes: 60, type: 'THEORY', completed: false },
            { id: 'g10', subject: 'Legislação Extravagante', topicName: 'Lei Maria da Penha (Lei 11.340)', durationMinutes: 45, type: 'REVISION', completed: false },
            { id: 'g11', subject: 'Estatística', topicName: 'Exercícios de Fixação', durationMinutes: 30, type: 'QUESTIONS', completed: false }
        ]
    },
    {
        dayName: 'QUI', date: '03/09', isToday: false, goals: [
            { id: 'g12', subject: 'Direito Processual Penal', topicName: 'Inquérito Policial', durationMinutes: 120, type: 'THEORY', completed: false },
            { id: 'g13', subject: 'Informática', topicName: 'Segurança da Informação', durationMinutes: 45, type: 'THEORY', completed: false },
            { id: 'g14', subject: 'Português', topicName: 'Interpretação de Textos', durationMinutes: 60, type: 'THEORY', completed: false },
            { id: 'g15', subject: 'Direito Constitucional', topicName: 'Controle de Constitucionalidade', durationMinutes: 60, type: 'REVISION', completed: false },
        ]
    },
    {
        dayName: 'SEX', date: '04/09', isToday: false, goals: [
            { id: 'g16', subject: 'Legislação Extravagante', topicName: 'Estatuto do Desarmamento', durationMinutes: 90, type: 'THEORY', completed: false },
            { id: 'g17', subject: 'Raciocínio Lógico', topicName: 'Diagramas Lógicos', durationMinutes: 45, type: 'THEORY', completed: false },
            { id: 'g18', subject: 'Português', topicName: 'Revisão de Sintaxe', durationMinutes: 60, type: 'REVISION', completed: false },
            { id: 'g19', subject: 'Direito Processual Penal', topicName: 'Ação Penal', durationMinutes: 60, type: 'QUESTIONS', completed: false },
        ]
    },
    {
        dayName: 'SÁB', date: '05/09', isToday: false, goals: [
            { id: 'g20', subject: 'Redação', topicName: 'Produção Textual - Tema 01', durationMinutes: 90, type: 'THEORY', completed: false },
            { id: 'g21', subject: 'Direito Administrativo', topicName: 'Organização Administrativa', durationMinutes: 60, type: 'THEORY', completed: false },
            { id: 'g22', subject: 'Revisão Geral', topicName: 'Leitura de Caderno de Erros', durationMinutes: 120, type: 'REVISION', completed: false }
        ]
    },
    {
        dayName: 'DOM', date: '06/09', isToday: false, goals: [
            { id: 'g23', subject: 'Simulado', topicName: 'Simulado Completo Polícia Civil', durationMinutes: 240, type: 'THEORY', completed: false },
            { id: 'g24', subject: 'Revisão Simulados', topicName: 'Correção de Erros', durationMinutes: 60, type: 'REVISION', completed: false }
        ]
    },
];

const getColorByType = (type: string) => {
    switch (type) {
        case 'REVISION':
            return {
                bg: 'bg-orange-100 border border-orange-200 hover:border-orange-300 hover:bg-orange-200/60',
                text: 'text-slate-800',
            };
        case 'QUESTIONS':
            return {
                bg: 'bg-emerald-100 border border-emerald-200 hover:border-emerald-300 hover:bg-emerald-200/60',
                text: 'text-slate-800',
            };
        case 'THEORY':
        default:
            return {
                bg: 'bg-blue-100 border border-blue-200 hover:border-blue-300 hover:bg-blue-200/60',
                text: 'text-slate-800',
            };
    }
};

const getTypeLabel = (type: string) => {
    switch (type) {
        case 'REVISION': return 'Revisão';
        case 'QUESTIONS': return 'Questões';
        case 'THEORY':
        default: return 'Teoria';
    }
};

export default function QuadroSemanalPage({ 
    hideHeader = false,
    title = "Cronograma Semanal",
    subtitle = "Planeje e acompanhe suas tarefas de estudo",
    headerAction = null
}: { 
    hideHeader?: boolean, 
    title?: string, 
    subtitle?: string, 
    headerAction?: React.ReactNode 
}) {
    const [weekData, setWeekData] = useState(MOCK_WEEK);
    const [weekOffset, setWeekOffset] = useState(0);
    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedGoalToRegister, setSelectedGoalToRegister] = useState<any>(null);

    const handleAddGoalClick = (date: string) => {
        setSelectedDate(date);
        setIsScheduleModalOpen(true);
    };

    const toggleGoalCompletion = (dayIndex: number, goalId: string) => {
        if (weekOffset !== 0) return;
        
        const newData = [...weekData];
        const goalIndex = newData[dayIndex].goals.findIndex(g => g.id === goalId);
        if (goalIndex > -1) {
            const goal = newData[dayIndex].goals[goalIndex];
            
            if (!goal.completed) {
                setSelectedGoalToRegister(goal);
                setIsRegisterModalOpen(true);
            }
            
            goal.completed = !goal.completed;
            setWeekData(newData);
        }
    };

    const getDatesForWeekOffset = (offset: number) => {
        const today = new Date();
        const currentDay = today.getDay();
        const daysToMonday = currentDay === 0 ? -6 : 1 - currentDay;
        
        const monday = new Date(today);
        monday.setDate(today.getDate() + daysToMonday + (offset * 7));
        monday.setHours(0, 0, 0, 0);
        
        const weekDates = [];
        for (let i = 0; i < 7; i++) {
            const d = new Date(monday);
            d.setDate(monday.getDate() + i);
            weekDates.push(d);
        }
        return weekDates;
    };

    const currentWeekDates = getDatesForWeekOffset(weekOffset);
    const startDateStr = currentWeekDates[0].toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' }).replace('.', '');
    const endDateStr = currentWeekDates[6].toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' }).replace('.', '');

    const displayWeekData = currentWeekDates.map((date, index) => {
        const dateStr = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
        const dayNames = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];
        const dayName = dayNames[date.getDay()];
        
        const today = new Date();
        const isToday = date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
        
        const goals = weekOffset === 0 ? weekData[index].goals : [];
        
        return {
            date: dateStr,
            dayName,
            isToday,
            goals
        };
    });

    const totalGoals = displayWeekData.reduce((acc, day) => acc + day.goals.length, 0);
    const completedGoals = displayWeekData.reduce((acc, day) => acc + day.goals.filter(g => g.completed).length, 0);
    const progressPercent = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;

    return (
        <div className="space-y-4 animate-in fade-in duration-200 min-h-full flex flex-col font-['Plus_Jakarta_Sans']">
            {/* Header Unificado com Progresso e Controles */}
            <div className="bg-base-100 border border-base-200 rounded-2xl p-4 shadow-sm flex flex-col xl:flex-row gap-5 xl:items-center justify-between">
                
                {/* Título e Subtítulo (se não estiver escondido) */}
                {!hideHeader && (
                    <div className="shrink-0 xl:mr-4">
                        <h2 className="text-xl font-black text-base-content tracking-tight">{title}</h2>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-content mt-0.5">{subtitle}</p>
                    </div>
                )}

                {/* Progresso */}
                <div className="flex-1 w-full min-w-[200px] xl:max-w-[400px]">
                    <div className="flex justify-between items-center mb-1.5">
                        <span className="text-[10px] font-bold text-base-content uppercase tracking-wider">Progresso da Semana</span>
                        <span className="text-[10px] font-bold text-success">{completedGoals}/{totalGoals} ({progressPercent}%)</span>
                    </div>
                    <div className="w-full h-2 bg-base-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-success transition-all duration-500 rounded-full"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                </div>

                {/* Navegação de Data e Ações extras */}
                <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
                    <div className="flex items-center gap-1">
                        <button onClick={() => setWeekOffset(prev => prev - 1)} className="btn btn-sm btn-square btn-ghost text-slate-500 hover:bg-base-200 cursor-pointer">
                            <ChevronLeft size={18} />
                        </button>
                        <div className="px-3 py-1.5 rounded-xl bg-base-50/50 border border-base-200 shadow-xs text-sm font-bold text-base-content">
                            {startDateStr} - {endDateStr} {weekOffset === 0 && <span className="text-primary ml-1">(atual)</span>}
                        </div>
                        <button onClick={() => setWeekOffset(prev => prev + 1)} className="btn btn-sm btn-square btn-ghost text-slate-500 hover:bg-base-200 cursor-pointer">
                            <ChevronRight size={18} />
                        </button>
                    </div>

                    {headerAction && (
                        <div className="flex items-center">
                            {headerAction}
                        </div>
                    )}
                </div>
            </div>

            {/* Grid da Semana - Tabela Sincronizada por Linhas */}
            <div className="grid grid-cols-7 bg-base-100 border border-base-300 rounded-3xl shadow-sm overflow-hidden flex-1 min-w-[700px] auto-rows-max">
                {/* Cabecalhos */}
                {displayWeekData.map((day, dayIndex) => {
                    const isLast = dayIndex === displayWeekData.length - 1;
                    return (
                        <div key={`header-${day.date}`} className={`p-3 text-center border-b border-base-200 bg-base-50 ${!isLast ? 'border-r border-base-200' : ''}`}>
                            <h3 className={`text-xs font-black uppercase ${day.isToday ? 'text-primary' : 'text-base-content'}`}>{day.dayName}</h3>
                            <p className={`text-[10px] font-bold mt-0.5 ${day.isToday ? 'text-primary' : 'text-neutral-content'}`}>{day.date}</p>
                        </div>
                    );
                })}

                {/* Linhas de Metas */}
                {Array.from({ length: Math.max(1, ...displayWeekData.map(d => d.goals.length)) }).map((_, rowIndex) => (
                    <React.Fragment key={`row-${rowIndex}`}>
                        {displayWeekData.map((day, dayIndex) => {
                            const isLast = dayIndex === displayWeekData.length - 1;
                            const goal = day.goals[rowIndex];
                            
                            return (
                                <div key={`cell-${day.date}-${rowIndex}`} className={`p-1.5 ${!isLast ? 'border-r border-base-200' : ''}`}>
                                    {goal ? (
                                        <div
                                            className={`h-full p-2 rounded-lg transition-all relative group flex flex-col ${getColorByType(goal.type).bg} ${getColorByType(goal.type).text} ${goal.completed ? 'opacity-60 grayscale-[30%]' : ''}`}
                                        >
                                            <button
                                                onClick={() => toggleGoalCompletion(dayIndex, goal.id)}
                                                className="absolute top-1.5 right-1.5 shrink-0 transition-colors opacity-0 group-hover:opacity-100 z-10 bg-black/10 rounded-full p-0.5"
                                            >
                                                {goal.completed ? <CheckCircle2 size={12} /> : <Circle size={12} />}
                                            </button>

                                            <div className="flex flex-col gap-1 flex-1">
                                                <span className={`text-[10px] font-bold leading-tight pr-4 ${goal.completed ? 'line-through opacity-80' : ''}`}>
                                                    {goal.subject}
                                                </span>
                                                {goal.topicName && (
                                                    <span className={`text-[9px] font-medium leading-tight opacity-90 ${goal.completed ? 'line-through' : ''}`}>
                                                        {goal.topicName}
                                                    </span>
                                                )}
                                                <div className="mt-auto pt-2 flex flex-col items-start gap-1">
                                                    <span className="text-[9px] font-extrabold tracking-wide text-black/40 mix-blend-multiply leading-none">
                                                        {getTypeLabel(goal.type)}
                                                    </span>
                                                    <span className="text-[9px] font-bold bg-black/5 border border-black/5 px-1.5 py-0.5 rounded text-slate-600 inline-block">
                                                        {Math.floor(goal.durationMinutes / 60)}h{(goal.durationMinutes % 60).toString().padStart(2, '0')}min
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="h-full min-h-[60px]"></div>
                                    )}
                                </div>
                            );
                        })}
                    </React.Fragment>
                ))}

                {/* Linha de Botões de Adicionar */}
                {displayWeekData.map((day, dayIndex) => {
                    const isLast = dayIndex === displayWeekData.length - 1;
                    return (
                        <div key={`footer-${day.date}`} className={`p-1.5 border-t border-base-200 mt-auto bg-base-50/40 ${!isLast ? 'border-r border-base-200' : ''}`}>
                            <button
                                onClick={() => handleAddGoalClick(day.date)}
                                className="w-full py-2 rounded-lg text-[10px] font-bold transition-colors text-slate-400 hover:bg-base-200 hover:text-slate-600"
                            >
                                <Plus size={14} className="mx-auto" />
                            </button>
                        </div>
                    );
                })}
            </div>

            {isScheduleModalOpen && (
                <ScheduleGoalModal
                    onClose={() => setIsScheduleModalOpen(false)}
                    targetDate={selectedDate}
                />
            )}

            {isRegisterModalOpen && (
                <RegisterStudyModal
                    isOpen={isRegisterModalOpen}
                    onClose={() => {
                        setIsRegisterModalOpen(false);
                        setSelectedGoalToRegister(null);
                    }}
                    initialData={selectedGoalToRegister ? {
                        subject: selectedGoalToRegister.subject,
                        topicName: selectedGoalToRegister.topicName,
                        type: selectedGoalToRegister.type
                    } : undefined}
                />
            )}
        </div>
    );
}