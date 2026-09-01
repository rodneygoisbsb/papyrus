import React from 'react';
import DailyGoalsList from './Inicio/components/DailyGoalsList';

export default function MetasPage({ 
    dailyGoals, 
    toggleGoalCompletion, 
    handleOpenStudy,
    setIsRegisterModalOpen,
    setActiveTab
}) {
    return (
        <div className="space-y-6 animate-in fade-in duration-200 w-full min-w-0">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-base-content">Metas de Hoje</h2>
                    <p className="text-sm text-neutral-content mt-1">Gerencie suas metas de teoria e questões diárias.</p>
                </div>
                <span className="badge badge-sm bg-base-200 border-none font-bold text-xs text-neutral-content py-2 px-3">
                    {dailyGoals.filter(g => g.type !== 'REVISION').length} cadastradas
                </span>
            </div>

            <DailyGoalsList 
                dailyGoals={dailyGoals}
                toggleGoalCompletion={toggleGoalCompletion}
                handleOpenStudy={handleOpenStudy}
                setIsRegisterModalOpen={setIsRegisterModalOpen}
                setActiveTab={setActiveTab}
            />
        </div>
    );
}