// src/App.jsx
import React, { useState } from 'react';
import { Layers } from 'lucide-react';

// 1. Layout Base
import MainLayout from './components/layout/MainLayout';

import InicioPage from './pages/Inicio';
import ConcursosPage from './pages/Concursos';
import MetasPage from './pages/Metas';
import PerfilPage from './pages/Perfil';
import ConfiguracoesPage from './pages/Configuracoes';
import DisciplinasPage from './pages/Disciplinas';
import PlanoEstudosPage from './pages/PlanoEstudos';
import PlanejamentoPage from './pages/Planejamento';
import DesempenhoPage from './pages/Desempenho';
import EditalVerticalizadoPage from './pages/EditalVerticalizado';
import CriarPlanoPage from './pages/CriarPlano';
import PlanTemplates from './pages/CriarPlano/components/PlanTemplates';

// 3. Hooks personalizados
import { useLocalStorage } from './hooks/useLocalStorage';

export default function App() {
  // 1. NAVEGAÇÃO E PLANOS
  const [activeTab, setActiveTab] = useLocalStorage('@papyrus:activeTab', 'inicio');
  const [selectedPlanId, setSelectedPlanId] = useLocalStorage('@papyrus:selectedPlanId', 1);
  const [planosDisponiveis, setPlanosDisponiveis] = useLocalStorage('@papyrus:planosDisponiveis', [
    {
        id: 1,
        nome: 'PM-DF Oficial',
        orgao: 'Polícia Militar do Distrito Federal',
        questoes: 1250,
        acerto: 78,
        horas: 145,
        atualizacao: 'Atualizado hoje',
        iconColor: 'text-blue-600',
        bgLight: 'bg-blue-50'
    },
    {
        id: 2,
        nome: 'Plano Banco do Brasil',
        orgao: 'Agente Comercial',
        questoes: 840,
        acerto: 82,
        horas: 92,
        atualizacao: 'Atualizado há 2 dias',
        iconColor: 'text-amber-500',
        bgLight: 'bg-amber-50'
    },
    {
        id: 3,
        nome: 'Polícia Federal',
        orgao: 'Agente de Polícia Federal',
        questoes: 410,
        acerto: 65,
        horas: 55,
        atualizacao: 'Atualizado há 1 semana',
        iconColor: 'text-slate-800',
        bgLight: 'bg-slate-100'
    }
  ]);

  const handleCreatePlan = (nome: string, cargo: string, imagem: File | null) => {
    let imagemUrl = undefined;
    if (imagem) {
        imagemUrl = URL.createObjectURL(imagem);
    }

    const newPlan = {
      id: Date.now(),
      nome,
      orgao: cargo,
      imagemUrl,
      questoes: 0,
      acerto: 0,
      horas: 0,
      atualizacao: 'Atualizado hoje',
      iconColor: 'text-emerald-600',
      bgLight: 'bg-emerald-50'
    };
    
    setPlanosDisponiveis((prev: any) => [...prev, newPlan]);
    setSelectedPlanId(newPlan.id);
  };

  const handleDeletePlan = (id: number) => {
    if (confirm('Deseja realmente excluir este plano?')) {
        setPlanosDisponiveis((prev: any) => prev.filter((p: any) => p.id !== id));
        if (selectedPlanId === id) {
            setSelectedPlanId(null);
        }
    }
  };

  const handleEditPlan = (updatedPlan: any) => {
    setPlanosDisponiveis((prev: any) => 
        prev.map((p: any) => (p.id === updatedPlan.id ? updatedPlan : p))
    );
  };

  const currentPlan = planosDisponiveis.find((p: any) => p.id === selectedPlanId) || planosDisponiveis[0];

  // 2. MÉTRICAS E PRODUTIVIDADE (KPIS)
  const [weeklyHoursStudied, setWeeklyHoursStudied] = useLocalStorage('@papyrus:weeklyHoursStudied', 14);
  const [weeklyHoursGoal] = useState(25);
  const [weeklyProgressPercentage] = useState(56);
  const [overallAccuracy] = useState('81.7');
  const [totalQuestionsCorrect] = useState(98);
  const [totalQuestionsDone] = useState(120);
  const [weeklyAccuracyVariation] = useState(4.2);

  const [todayMinutesStudied, setTodayMinutesStudied] = useLocalStorage('@papyrus:todayMinutesStudied', 90);
  const [todayQuestionsDone, setTodayQuestionsDone] = useLocalStorage('@papyrus:todayQuestionsDone', 35);
  const [todayQuestionsCorrect, setTodayQuestionsCorrect] = useLocalStorage('@papyrus:todayQuestionsCorrect', 29);

  // 4. METAS DIÁRIAS E REVISOES DO DIA
  const [dailyGoals, setDailyGoals] = useLocalStorage('@papyrus:dailyGoals', [
    {
      id: 'g1',
      subject: 'DIREITO CONSTITUCIONAL',
      topicName: 'Direitos e Garantias Fundamentais (Art. 5º)',
      type: 'THEORY',
      durationMinutes: 60,
      completed: false,
      tecUrl: 'https://www.tecconcursos.com.br',
      videoUrl: 'https://youtube.com',
      pdfUrl: '#'
    },
    {
      id: 'g2',
      subject: 'DIREITO ADMINISTRATIVO',
      topicName: 'Lei 8.112/90 – Regime Disciplinar e Responsabilidades',
      type: 'THEORY',
      durationMinutes: 60,
      completed: false,
      tecUrl: 'https://www.tecconcursos.com.br',
      videoUrl: '',
      pdfUrl: '#'
    },
    {
      id: 'g3',
      subject: 'LÍNGUA PORTUGUESA',
      topicName: 'Emprego do Sinal Indicativo de Crase',
      type: 'THEORY',
      durationMinutes: 60,
      completed: false,
      tecUrl: 'https://www.tecconcursos.com.br',
      videoUrl: 'https://youtube.com',
      pdfUrl: '#'
    },
    {
      id: 'r1',
      subject: 'DIREITO ADMINISTRATIVO',
      topicName: 'Lei 8.112/90 – Agentes Públicos',
      type: 'REVISION',
      durationMinutes: 60,
      completed: false,
      revisionTag: '7 Dias'
    },
    {
      id: 'r2',
      subject: 'LÍNGUA PORTUGUESA',
      topicName: 'Pontuação',
      type: 'REVISION',
      durationMinutes: 60,
      completed: false,
      revisionTag: '1 Dia',
    },
    {
      id: 'q1',
      subject: 'APRENDIZAGEM DE MÁQUINA',
      topicName: 'Noções de Aprendizagem de Máquina',
      type: 'QUESTIONS',
      durationMinutes: 60,
      completed: false,
      revisionTag: 'exercícios',
      tecUrl: 'https://www.tecconcursos.com.br',
      pdfUrl: '#'
    }
  ]);

  const toggleGoalCompletion = (goalId) => {
    setDailyGoals((prevGoals) =>
      prevGoals.map((g) => {
        if (g.id === goalId) {
          const isNowCompleted = !g.completed;
          const duration = Number(g.durationMinutes || 60);

          if (isNowCompleted) {
            setTodayMinutesStudied((prev) => prev + duration);
            setWeeklyHoursStudied((prev) => Number((prev + duration / 60).toFixed(1)));
          } else {
            setTodayMinutesStudied((prev) => Math.max(0, prev - duration));
            setWeeklyHoursStudied((prev) => Math.max(0, Number((prev - duration / 60).toFixed(1))));
          }

          return { ...g, completed: isNowCompleted };
        }
        return g;
      })
    );
  };

  // 5. DISCIPLINAS (ABA CONCURSOS)
  const [disciplines, setDisciplines] = useLocalStorage('@papyrus:disciplines', [
    {
      id: 1,
      name: 'DIREITO CONSTITUCIONAL',
      colorHex: '#2563EB',
      studiedTopics: 8,
      totalTopics: 5,
      questionsDone: 140,
      topics: [
        { id: 't1', name: 'Direitos e Garantias Fundamentais (Art. 5º)', theoryCompleted: true },
        { id: 't2', name: 'Organização dos Poderes', theoryCompleted: false }
      ]
    },
    {
      id: 2,
      name: 'LÍNGUA PORTUGUESA',
      colorHex: '#16A34A',
      studiedTopics: 12,
      totalTopics: 5,
      questionsDone: 210,
      topics: [
        { id: 't3', name: 'Emprego da Crase', theoryCompleted: true },
        { id: 't4', name: 'Pontuação e Sintaxe', theoryCompleted: false }
      ]
    },
    {
      id: 3,
      name: 'DIREITO ADMINISTRATIVO',
      colorHex: '#EA580C',
      studiedTopics: 6,
      totalTopics: 3,
      questionsDone: 95,
      topics: [
        { id: 't5', name: 'Lei 8.112/90 - Regime Disciplinar', theoryCompleted: true }
      ]
    }
  ]);

  const [activeDisciplineEditor, setActiveDisciplineEditor] = useState(null);

  const handleSaveDisciplineEditor = () => {
    if (!activeDisciplineEditor || !activeDisciplineEditor.name?.trim()) return;

    const novaDisciplina = {
      id: activeDisciplineEditor.id || Date.now(),
      name: activeDisciplineEditor.name.trim(),
      colorHex: activeDisciplineEditor.colorHex || '#2563EB',
      studiedTopics: activeDisciplineEditor.studiedTopics || 0,
      totalTopics: (activeDisciplineEditor.topics || []).length,
      questionsDone: activeDisciplineEditor.questionsDone || 0,
      topics: (activeDisciplineEditor.topics || []).map((t) => ({
        id: t.id,
        name: t.name,
        theoryCompleted: t.theoryCompleted || false
      }))
    };

    setDisciplines((prev) => {
      const existe = prev.some((d) => d.id === novaDisciplina.id);
      return existe
        ? prev.map((d) => (d.id === novaDisciplina.id ? novaDisciplina : d))
        : [...prev, novaDisciplina];
    });

    setActiveDisciplineEditor(null);
  };

  const handleDeleteDiscipline = (discId) => {
    if (!confirm('Deseja realmente remover esta disciplina e seus tópicos?')) return;
    setDisciplines((prev) => prev.filter((d) => d.id !== discId));
  };

  const handleOpenStudy = (goal) => {
    window.dispatchEvent(new CustomEvent('papyrus:open-zen-focus', { detail: goal }));
  };

  const handleReplanGoals = () => {
    setDailyGoals((prev) => 
      prev.map((g) => ({
        ...g,
        isOverdue: false,
        daysOverdue: 0
      }))
    );
  };

  return (
    <MainLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      planosDisponiveis={planosDisponiveis}
      selectedPlanId={selectedPlanId}
      setSelectedPlanId={setSelectedPlanId}
      streakDays={12}
    >
      {activeTab === 'inicio' && (
        <InicioPage
          weeklyHoursStudied={weeklyHoursStudied}
          weeklyHoursGoal={weeklyHoursGoal}
          weeklyProgressPercentage={weeklyProgressPercentage}
          overallAccuracy={overallAccuracy}
          totalQuestionsCorrect={totalQuestionsCorrect}
          totalQuestionsDone={totalQuestionsDone}
          weeklyAccuracyVariation={weeklyAccuracyVariation}
          todayMinutesStudied={todayMinutesStudied}
          todayQuestionsDone={todayQuestionsDone}
          todayQuestionsCorrect={todayQuestionsCorrect}
          dailyGoals={dailyGoals}
          toggleGoalCompletion={toggleGoalCompletion}
          handleOpenStudy={handleOpenStudy}
          setActiveTab={setActiveTab}
          handleReplanGoals={handleReplanGoals}
        />
      )}

      {activeTab === 'disciplinas' && (
        <DisciplinasPage
          currentPlan={currentPlan}
          disciplines={disciplines}
          activeDisciplineEditor={activeDisciplineEditor}
          setActiveDisciplineEditor={setActiveDisciplineEditor}
          onOpenNewDiscipline={() =>
            setActiveDisciplineEditor({ id: null, name: '', colorHex: '#2563EB', topics: [] })
          }
          onEditDiscipline={(disc: any) => setActiveDisciplineEditor({ ...disc })}
          onDeleteDiscipline={handleDeleteDiscipline}
          onSaveDiscipline={handleSaveDisciplineEditor}
        />
      )}

      {activeTab === 'plano-estudos' && (
        <PlanoEstudosPage 
            planos={planosDisponiveis} 
            selectedPlanId={selectedPlanId}
            setActiveTab={setActiveTab} 
            onSelectPlan={setSelectedPlanId}
            onDeletePlan={handleDeletePlan}
            onEditPlan={handleEditPlan}
        />
      )}

      {activeTab === 'criar-plano' && (
        <CriarPlanoPage onPlanCreated={handleCreatePlan} setActiveTab={setActiveTab} />
      )}

      {activeTab === 'criar-plano-editais-prontos' && (
        <PlanTemplates setActiveTab={setActiveTab} />
      )}

      {activeTab === 'metas' && (
        <MetasPage
          dailyGoals={dailyGoals}
          toggleGoalCompletion={toggleGoalCompletion}
          handleOpenStudy={handleOpenStudy}
          setActiveTab={setActiveTab}
        />
      )}

      {activeTab === 'perfil' && <PerfilPage />}

      {activeTab === 'configuracoes' && <ConfiguracoesPage />}

      {activeTab === 'planejamento' && <PlanejamentoPage />}

      {activeTab !== 'inicio' && activeTab !== 'disciplinas' && activeTab !== 'plano-estudos' && activeTab !== 'metas' && activeTab !== 'perfil' && activeTab !== 'configuracoes' && activeTab !== 'planejamento' && !activeTab.startsWith('criar-plano') && (
        <div className="card-papyrus !p-12 text-center space-y-4 flex flex-col items-center justify-center h-full min-h-[400px]">
          <Layers size={40} className="text-primary" />
          <h3 className="text-lg font-bold text-base-content capitalize">
            Aba {activeTab}
          </h3>
          <p className="text-xs text-neutral-content max-w-md">
            Esta aba está integrada ao ecossistema Papyrus e pronta para receber os próximos módulos.
          </p>
          <button
            type="button"
            onClick={() => setActiveTab('inicio')}
            className="btn btn-sm btn-primary text-primary-content font-bold rounded-xl cursor-pointer mt-2"
          >
            Voltar para o Início
          </button>
        </div>
      )}
    </MainLayout>
  );
}