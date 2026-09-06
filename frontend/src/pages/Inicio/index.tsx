import React, { useState } from 'react';
import RegisterStudyModal from '../../components/modals/RegisterStudyModal';
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
    setActiveTab = () => { }
}) {
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

    return (
        <div className="space-y-6 animate-in fade-in duration-200 font-['Plus_Jakarta_Sans'] text-base-content w-full">

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
                        setActiveTab={setActiveTab}
                        isCompact={true}
                    />

                    <AiDailySuggestionsCard
                        onRegisterStudy={() => setIsRegisterModalOpen(true)}
                        onStartFocusSession={handleOpenStudy}
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
                onClose={() => setIsRegisterModalOpen(false)}
                initialTime={{ hours: 0, minutes: 0 }}
                onSave={(dados) => {
                    console.log('Estudo registrado:', dados);
                    setIsRegisterModalOpen(false);
                }}
            />

        </div>
    );
}
