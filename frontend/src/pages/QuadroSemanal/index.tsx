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
                bg: 'bg-orange-500',
                text: 'text-white',
            };
        case 'QUESTIONS':
            return {
                bg: 'bg-emerald-500',
                text: 'text-white',
            };
        case 'THEORY':
        default:
            return {
                bg: 'bg-[#409cf0]',
                text: 'text-white',
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

export default function QuadroSemanalPage() {
    const [weekData, setWeekData] = useState(MOCK_WEEK);
    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedGoalToRegister, setSelectedGoalToRegister] = useState<any>(null);

    const handleAddGoalClick = (date: string) => {
        setSelectedDate(date);
        setIsScheduleModalOpen(true);
    };

    const toggleGoalCompletion = (dayIndex: number, goalId: string) => {
        const newData = [...weekData];
        const goalIndex = newData[dayIndex].goals.findIndex(g => g.id === goalId);
        if (goalIndex > -1) {
            const goal = newData[dayIndex].goals[goalIndex];
            
            // If the goal is being marked as completed (was false), open the register modal
            if (!goal.completed) {
                setSelectedGoalToRegister(goal);
                setIsRegisterModalOpen(true);
            }
            
            goal.completed = !goal.completed;
            setWeekData(newData);
        }
    };

    // Cálculos de progresso
    const totalGoals = weekData.reduce((acc, day) => acc + day.goals.length, 0);
    const completedGoals = weekData.reduce((acc, day) => acc + day.goals.filter(g => g.completed).length, 0);
    const progressPercent = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;

    return (
        <div className="space-y-6 animate-in fade-in duration-200 min-h-full flex flex-col font-['Plus_Jakarta_Sans']">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-black text-base-content tracking-tight">Cronograma Semanal</h2>
                    <p className="text-sm font-medium text-neutral-content mt-1">Planeje e acompanhe suas tarefas de estudo</p>
                </div>
                
                {/* Legenda e Navegação de Data */}
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                    <div className="flex items-center gap-3 bg-base-100 border border-base-200 px-3 py-1.5 rounded-xl shadow-sm">
                        <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#409cf0]"></div><span className="text-[11px] font-bold text-base-content">Estudo</span></div>
                        <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-orange-500"></div><span className="text-[11px] font-bold text-base-content">Revisão</span></div>
                        <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div><span className="text-[11px] font-bold text-base-content">Questões</span></div>
                    </div>

                    <div className="flex items-center gap-1">
                        <button className="btn btn-sm btn-square btn-ghost text-slate-500 hover:bg-base-200">
                            <ChevronLeft size={18} />
                        </button>
                        <div className="px-3 py-1.5 rounded-xl bg-base-100 border border-base-200 shadow-sm text-sm font-bold text-base-content">
                            31 de ago. - 6 de set. <span className="text-primary ml-1">(atual)</span>
                        </div>
                        <button className="btn btn-sm btn-square btn-ghost text-slate-500 hover:bg-base-200">
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Barra de Progresso */}
            <div className="bg-base-100 border border-base-200 rounded-2xl p-4 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-base-content uppercase tracking-wider">Progresso da Semana</span>
                    <span className="text-xs font-bold text-success">{completedGoals}/{totalGoals} ({progressPercent}%)</span>
                </div>
                <div className="w-full h-2.5 bg-base-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-success transition-all duration-500 rounded-full"
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>
            </div>

            {/* Grid da Semana - Formato Tabela Compacta (L'estudei style) */}
            <div className="grid grid-cols-7 bg-base-100 border border-base-300 rounded-3xl shadow-sm overflow-hidden flex-1">
                {weekData.map((day, dayIndex) => {
                    const isLast = dayIndex === weekData.length - 1;
                    const dayCompleted = day.goals.filter(g => g.completed).length;
                    const dayTotal = day.goals.length;

                    return (
                        <div key={day.date} className={`flex flex-col min-h-[400px] ${!isLast ? 'border-r border-base-200' : ''}`}>
                            {/* Cabecalho do Dia */}
                            <div className="p-3 text-center border-b border-base-200 bg-base-50">
                                <h3 className={`text-xs font-black uppercase ${day.isToday ? 'text-primary' : 'text-base-content'}`}>{day.dayName}</h3>
                                <p className={`text-[10px] font-bold mt-0.5 ${day.isToday ? 'text-primary' : 'text-neutral-content'}`}>{day.date}</p>
                            </div>

                            {/* Lista de Metas */}
                            <div className="flex-1 p-1.5 space-y-1.5 overflow-y-auto">
                                {day.goals.map(goal => {
                                    const colors = getColorByType(goal.type);
                                    return (
                                        <div
                                            key={goal.id}
                                            className={`p-2 rounded-lg transition-all relative group ${colors.bg} ${colors.text} ${goal.completed ? 'opacity-60 grayscale-[30%]' : ''}`}
                                        >
                                            {/* Check button invisível até o hover em telas normais */}
                                            <button
                                                onClick={() => toggleGoalCompletion(dayIndex, goal.id)}
                                                className="absolute top-1.5 right-1.5 shrink-0 transition-colors opacity-0 group-hover:opacity-100 z-10 bg-black/10 rounded-full p-0.5"
                                            >
                                                {goal.completed ? <CheckCircle2 size={12} /> : <Circle size={12} />}
                                            </button>

                                            <div className="flex flex-col gap-1">
                                                <span className={`text-[10px] font-bold leading-tight pr-4 ${goal.completed ? 'line-through opacity-80' : ''} line-clamp-2`}>
                                                    {goal.subject}
                                                </span>
                                                {goal.topicName && (
                                                    <span className={`text-[9px] font-medium leading-tight opacity-90 line-clamp-1 ${goal.completed ? 'line-through' : ''}`}>
                                                        {goal.topicName}
                                                    </span>
                                                )}
                                                <div className="mt-1">
                                                    <span className="text-[9px] font-bold bg-white/20 px-1.5 py-0.5 rounded text-white inline-block">
                                                        {Math.floor(goal.durationMinutes / 60)}h{(goal.durationMinutes % 60).toString().padStart(2, '0')}min
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Botao Adicionar */}
                            <div className="p-1.5 mt-auto border-t border-base-200">
                                <button
                                    onClick={() => handleAddGoalClick(day.date)}
                                    className="w-full py-2 rounded-lg text-[10px] font-bold transition-colors text-slate-400 hover:bg-base-200 hover:text-slate-600"
                                >
                                    <Plus size={14} className="mx-auto" />
                                </button>
                            </div>
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