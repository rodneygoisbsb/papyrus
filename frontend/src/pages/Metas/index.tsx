import React, { useState } from 'react';
import DailyGoalsList from '../../components/shared/DailyGoalsList';
import DailyRevisionsList from '../../components/shared/DailyRevisionsList';
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
    const [registeredGoalIds, setRegisteredGoalIds] = useState<Set<string>>(new Set());

    const metasCadastradas = dailyGoals.filter(g => g.type !== 'REVISION').length;

    return (
        <div className="space-y-8 animate-in fade-in duration-200 w-full min-w-0">
            {/* Seção de Métricas de Estudo Diário */}
            <section className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Métricas de Estudo Diário (Mock) */}
                    {[
                        { title: 'Tempo Líquido', value: '3h 45m', subtitle: '+1h hoje', subtitleColor: 'text-emerald-500', icon: Clock, color: 'text-primary', bgIcon: 'bg-primary/10' },
                        { title: 'Questões Resolvidas', value: '112', subtitle: '+25 hoje', subtitleColor: 'text-emerald-500', icon: Target, color: 'text-success', bgIcon: 'bg-success/10' },
                        { title: 'Tópicos Vistos', value: '4', valueSuffix: '/ 7', subtitle: '', subtitleColor: '', icon: BookOpen, color: 'text-accent', bgIcon: 'bg-accent/10' },
                        { title: 'Aproveitamento', value: '85%', subtitle: '+3% da média', subtitleColor: 'text-emerald-500', icon: TrendingUp, color: 'text-success', bgIcon: 'bg-success/10' }
                    ].map((metric, i) => (
                        <div key={i} className="card-papyrus p-4 sm:p-5 flex items-center gap-4 transition-transform hover:-translate-y-1 hover:shadow-md cursor-default border border-base-200 bg-base-100">
                            <div className={`p-3 rounded-2xl ${metric.bgIcon} shrink-0`}>
                                <metric.icon className={metric.color} size={24} />
                            </div>
                            <div className="flex flex-col text-left">
                                <span className="text-2xl font-bold text-base-content tracking-tight">
                                    {metric.value}
                                    {metric.valueSuffix && (
                                        <span className="text-sm font-semibold text-slate-400 ml-1.5">{metric.valueSuffix}</span>
                                    )}
                                </span>
                                <span className="text-xs font-medium text-neutral-content mt-0.5">{metric.title}</span>
                                {metric.subtitle && (
                                    <span className={`text-xs font-medium mt-1.5 ${metric.subtitleColor}`}>
                                        {metric.subtitle}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Revisões do Dia */}
            <section className="space-y-4">
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
                    isCompact={false}
                    registeredGoalIds={registeredGoalIds}
                />
            </section>

            {/* Lista de Metas */}
            <section className="space-y-4">


                <DailyGoalsList
                    dailyGoals={dailyGoals}
                    toggleGoalCompletion={toggleGoalCompletion}
                    handleOpenStudy={handleOpenStudy}
                    setIsRegisterModalOpen={setIsRegisterModalOpen}
                    onManualRegister={(goal) => {
                        setInitialRegisterData({ id: goal.id, subject: goal.subject, topicName: goal.topicName });
                        setIsRegisterModalOpen(true);
                    }}
                    setActiveTab={setActiveTab}
                    isCompact={false}
                    registeredGoalIds={registeredGoalIds}
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
                    if (initialRegisterData?.id) {
                        setRegisteredGoalIds(prev => new Set(prev).add(initialRegisterData.id));
                        toggleGoalCompletion(initialRegisterData.id);
                    }
                    setIsRegisterModalOpen(false);
                    setInitialRegisterData(null);
                }}
            />
        </div>
    );
}