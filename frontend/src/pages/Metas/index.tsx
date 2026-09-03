import React, { useState } from 'react';
import DailyGoalsList from '../Inicio/components/DailyGoalsList';
import { Target, TrendingUp, Clock, BookOpen } from 'lucide-react';
import RegisterStudyModal from '../../components/modals/RegisterStudyModal';

export default function MetasPage({ 
    dailyGoals, 
    toggleGoalCompletion, 
    handleOpenStudy,
    setActiveTab
}) {
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [initialRegisterData, setInitialRegisterData] = useState<any>(null);

    const metasCadastradas = dailyGoals.filter(g => g.type !== 'REVISION').length;

    return (
        <div className="space-y-8 animate-in fade-in duration-200 w-full min-w-0">
            {/* Seção de Métricas de Estudo Diário */}
            <section className="space-y-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-base-content tracking-tight">Métricas de Hoje</h2>
                        <p className="text-sm text-neutral-content mt-1">Acompanhamento do seu progresso diário.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Placeholders para métricas */}
                    {[
                        { title: 'Tempo Líquido', icon: Clock, color: 'text-primary' },
                        { title: 'Questões Resolvidas', icon: Target, color: 'text-success' },
                        { title: 'Tópicos Vistos', icon: BookOpen, color: 'text-secondary' },
                        { title: 'Aproveitamento', icon: TrendingUp, color: 'text-accent' }
                    ].map((metric, i) => (
                        <div key={i} className="card-papyrus p-5 flex flex-col justify-center items-center text-center opacity-70 border-dashed border-2 border-base-300">
                            <metric.icon className={`mb-2 opacity-50 ${metric.color}`} size={24} />
                            <span className="text-sm font-bold text-base-content/70">{metric.title}</span>
                            <span className="text-xs text-neutral-content mt-1">Em breve</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Lista de Metas */}
            <section className="space-y-4">
                <div className="flex justify-between items-center mb-2">
                    <div>
                        <h2 className="text-2xl font-bold text-base-content tracking-tight">Metas de Hoje</h2>
                        <p className="text-sm text-neutral-content mt-1">Gerencie suas metas de teoria e questões diárias.</p>
                    </div>
                    <span className="badge badge-sm bg-base-200 border-none font-bold text-xs text-neutral-content py-2 px-3 shadow-sm">
                        {metasCadastradas} cadastradas
                    </span>
                </div>

                <DailyGoalsList 
                    dailyGoals={dailyGoals}
                    toggleGoalCompletion={toggleGoalCompletion}
                    handleOpenStudy={handleOpenStudy}
                    setIsRegisterModalOpen={setIsRegisterModalOpen}
                    onManualRegister={(goal) => {
                        setInitialRegisterData({ subject: goal.subject, topicName: goal.topicName });
                        setIsRegisterModalOpen(true);
                    }}
                    setActiveTab={setActiveTab}
                    isCompact={false}
                />
            </section>

            {/* Modal de Registro de Estudo */}
            <RegisterStudyModal
                isOpen={isRegisterModalOpen}
                onClose={() => {
                    setIsRegisterModalOpen(false);
                    setInitialRegisterData(null);
                }}
                initialData={initialRegisterData}
                onSave={(dados) => {
                    console.log('Estudo registrado a partir de metas:', dados);
                    setIsRegisterModalOpen(false);
                    setInitialRegisterData(null);
                }}
            />
        </div>
    );
}