import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import RegisterStudyModal from '../../components/modals/RegisterStudyModal';
import ReplanModal from '../../components/modals/ReplanModal';
import TopKpiCards from './components/TopKpiCards';
import DailyGoalsList from '../../components/shared/DailyGoalsList';
import DailyRevisionsList from '../../components/shared/DailyRevisionsList';
import TodaySessionsCard from './components/TodaySessionsCard';
import AiDailySuggestionsCard from './components/AiDailySuggestionsCard';
import ResumoDeHojeCard from './components/ResumoDeHojeCard';

export default function InicioPage({
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
    setActiveTab = () => { },
    handleReplanGoals = () => { }
}) {
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [initialRegisterData, setInitialRegisterData] = useState<any>(null);
    const [registeredGoalIds, setRegisteredGoalIds] = useState<Set<string>>(new Set());
    const [completedSuggestionIds, setCompletedSuggestionIds] = useState<Set<string>>(new Set());
    const [isReplanModalOpen, setIsReplanModalOpen] = useState(false);

    // Mock verification for overdue items (considering our mock logic that goal index 0 is overdue if not completed)
    const hasOverdueGoals = dailyGoals.some((g, i) => {
        const isTheoryGoal = g.type !== 'REVISION';
        const regularGoals = dailyGoals.filter(goal => goal.type !== 'REVISION');
        const indexInRegular = regularGoals.findIndex(rg => rg.id === g.id);
        
        return g.isOverdue || g.daysOverdue > 0 || (!g.completed && isTheoryGoal && indexInRegular === 0);
    });

    return (
        <div className="space-y-6 animate-in fade-in duration-200 font-['Plus_Jakarta_Sans'] text-base-content w-full">
            
            {/* BANNER DE REPLANEJAMENTO (Oculto Temporariamente) */}
            {/*
            {hasOverdueGoals && (
                <div className="bg-amber-50 border border-amber-200/60 rounded-[24px] p-4 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="flex items-center gap-3">
                        <div className="bg-amber-100 p-2.5 rounded-full shrink-0">
                            <AlertTriangle size={24} className="text-amber-600" />
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-amber-900">As coisas acumularam?</h3>
                            <p className="text-sm text-amber-800/80 mt-0.5">
                                Você tem metas em atraso. Que tal recalcular a rota para voltar ao foco hoje?
                            </p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setIsReplanModalOpen(true)}
                        className="btn bg-amber-500 text-white border-none hover:bg-amber-600 rounded-xl font-bold px-6 shrink-0"
                    >
                        Recalcular Rota
                    </button>
                </div>
            )}
            */}

            {/* 1. LINHA SUPERIOR: 3 CARDS TOP */}
            <TopKpiCards
                weeklyHoursStudied={weeklyHoursStudied}
                weeklyHoursGoal={weeklyHoursGoal}
                overallAccuracy={overallAccuracy}
                totalQuestionsCorrect={totalQuestionsCorrect}
                totalQuestionsDone={totalQuestionsDone}
                weeklyAccuracyVariation={weeklyAccuracyVariation}
                todayMinutesStudied={todayMinutesStudied}
                todayQuestionsDone={todayQuestionsDone}
            />

            {/* 2. CORPO PRINCIPAL: GRID 12 COLUNAS */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full">

                {/* COLUNA ESQUERDA (8 COLS): REVISÕES & GRÁFICOS */}
                <div className="lg:col-span-8 space-y-6 w-full min-w-0">

                    <DailyRevisionsList
                        revisions={dailyGoals.filter(g => g.type === 'REVISION' || g.type === 'QUESTIONS')}
                        toggleRevisionCompletion={toggleGoalCompletion}
                        onStartFocusSession={handleOpenStudy}
                        onOpenRegisterModal={() => setIsRegisterModalOpen(true)}
                        onManualRegister={(goal) => {
                            setInitialRegisterData({ id: goal.id, subject: goal.subject, topicName: goal.topicName, type: 'REVISION' });
                            setIsRegisterModalOpen(true);
                        }}
                        setActiveTab={setActiveTab}
                        isCompact={true}
                        registeredGoalIds={registeredGoalIds}
                    />

                    <AiDailySuggestionsCard
                        onRegisterStudy={(topic) => {
                            setInitialRegisterData({ id: topic.id, subject: topic.subjectName, topicName: topic.name, isSuggestion: true });
                            setIsRegisterModalOpen(true);
                        }}
                        onStartFocusSession={handleOpenStudy}
                        registeredGoalIds={registeredGoalIds}
                        completedSuggestionIds={completedSuggestionIds}
                        toggleSuggestionCompletion={(id) => {
                            setCompletedSuggestionIds(prev => {
                                const next = new Set(prev);
                                if (next.has(id)) next.delete(id);
                                else next.add(id);
                                return next;
                            });
                        }}
                    />
                </div>

                {/* COLUNA DIREITA (4 COLS): CONSTÂNCIA & GRÁFICO SEMANAL */}
                <div className="lg:col-span-4 space-y-6 w-full min-w-0">
                    <ResumoDeHojeCard
                        todayMinutesStudied={todayMinutesStudied}
                        todayQuestionsDone={todayQuestionsDone}
                    />
                    <TodaySessionsCard />
                </div>

            </section>

            {/* Modal de Registro de Estudo */}
            <RegisterStudyModal
                isOpen={isRegisterModalOpen}
                onClose={() => {
                    setIsRegisterModalOpen(false);
                    setInitialRegisterData(null);
                }}
                initialTime={{ hours: 0, minutes: 0 }}
                initialData={initialRegisterData}
                onSave={(dados) => {
                    console.log('Estudo registrado:', dados);
                    if (initialRegisterData?.id) {
                        setRegisteredGoalIds(prev => new Set(prev).add(initialRegisterData.id));
                        if (initialRegisterData.isSuggestion) {
                            setCompletedSuggestionIds(prev => new Set(prev).add(initialRegisterData.id));
                        } else {
                            toggleGoalCompletion(initialRegisterData.id);
                        }
                    }
                    setIsRegisterModalOpen(false);
                    setInitialRegisterData(null);
                }}
            />

            {/* Modal de Replanejamento */}
            <ReplanModal 
                isOpen={isReplanModalOpen}
                onClose={() => setIsReplanModalOpen(false)}
                onSuccess={() => {
                    handleReplanGoals();
                    setIsReplanModalOpen(false);
                }}
            />

        </div>
    );
}
