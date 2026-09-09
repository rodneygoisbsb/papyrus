import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function MainLayout({
    activeTab,
    setActiveTab,
    planosDisponiveis,
    selectedPlanId,
    setSelectedPlanId,
    streakDays,
    children
}) {
    return (
        <div className="min-h-screen bg-base-200 flex font-sans text-base-content antialiased">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="flex-1 flex flex-col min-w-0">
                <Header
                    planosDisponiveis={planosDisponiveis}
                    selectedPlanId={selectedPlanId}
                    setSelectedPlanId={setSelectedPlanId}
                    streakDays={streakDays}
                />
                <main className={`p-6 w-full mx-auto flex-1 ${activeTab === 'planejamento' ? 'max-w-[1600px]' : 'max-w-7xl'}`}>
                    {children}
                </main>
            </div>
        </div>
    );
}
