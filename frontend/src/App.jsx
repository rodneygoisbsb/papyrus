// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Layers } from 'lucide-react';

// 1. Layout Base
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';

// 2. Telas / Abas
import InicioTab from './components/tabs/InicioTab';
import ConcursosTab from './components/tabs/ConcursosTab';

// 3. Modais Globais
import RegisterStudyModal from './components/modals/RegisterStudyModal';

export default function App() {
  // 1. NAVEGAÇÃO E PLANOS
  const [activeTab, setActiveTab] = useState('inicio');
  const [selectedPlanId, setSelectedPlanId] = useState(1);
  const [planosDisponiveis] = useState([
    { id: 1, nome: 'PM-DF Oficial' },
    { id: 2, nome: 'Polícia Federal - Agente' }
  ]);

  // 2. MÉTRICAS E PRODUTIVIDADE (KPIS)
  const [weeklyHoursStudied, setWeeklyHoursStudied] = useState(14);
  const [weeklyHoursGoal] = useState(25);
  const [weeklyProgressPercentage] = useState(56);
  const [overallAccuracy] = useState('81.7');
  const [totalQuestionsCorrect] = useState(98);
  const [totalQuestionsDone] = useState(120);
  const [weeklyAccuracyVariation] = useState(4.2);

  const [todayMinutesStudied, setTodayMinutesStudied] = useState(90);
  const [todayQuestionsDone, setTodayQuestionsDone] = useState(35);
  const [todayQuestionsCorrect, setTodayQuestionsCorrect] = useState(29);

  // 3. CRONÔMETRO GLOBAL & MODAL
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isTimerRunning) {
      interval = setInterval(() => setTimerSeconds((prev) => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatStopwatch = (totalSec) => {
    const hrs = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleStopAndRegister = () => {
    setIsTimerRunning(false);
    setIsRegisterModalOpen(true);
  };

  // 4. METAS DIÁRIAS
  const [dailyGoals, setDailyGoals] = useState([
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
  const [disciplines, setDisciplines] = useState([
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

  return (
    <div className="min-h-screen bg-base-200 flex font-sans text-base-content antialiased">
      {/* 1. SIDEBAR MODULAR */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 2. ÁREA CENTRAL DE CONTEÚDO (HEADER + MAIN) */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* HEADER GLOBAL (Agora posicionado corretamente no topo da coluna de conteúdo) */}
        <Header
          planosDisponiveis={planosDisponiveis}
          selectedPlanId={selectedPlanId}
          setSelectedPlanId={setSelectedPlanId}
          timerSeconds={timerSeconds}
          isTimerRunning={isTimerRunning}
          setIsTimerRunning={setIsTimerRunning}
          formatStopwatch={formatStopwatch}
          handleStopAndRegister={handleStopAndRegister}
          streakDays={12}
        />

        {/* CORPO DINÂMICO DAS TELAS */}
        <main className="p-6 max-w-7xl w-full mx-auto flex-1">
          {activeTab === 'inicio' && (
            <InicioTab
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
              handleOpenStudy={() => { }}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'concursos' && (
            <ConcursosTab
              disciplines={disciplines}
              activeDisciplineEditor={activeDisciplineEditor}
              setActiveDisciplineEditor={setActiveDisciplineEditor}
              onOpenNewDiscipline={() =>
                setActiveDisciplineEditor({ id: null, name: '', colorHex: '#2563EB', topics: [] })
              }
              onEditDiscipline={(disc) => setActiveDisciplineEditor({ ...disc })}
              onDeleteDiscipline={handleDeleteDiscipline}
              onSaveDiscipline={handleSaveDisciplineEditor}
            />
          )}

          {activeTab !== 'inicio' && activeTab !== 'concursos' && (
            <div className="bg-base-100 border border-base-300/70 p-12 rounded-3xl shadow-xs text-center space-y-4">
              <Layers size={40} className="mx-auto text-primary" />
              <h3 className="text-lg font-bold text-base-content capitalize">
                Aba {activeTab}
              </h3>
              <p className="text-xs text-neutral-content max-w-md mx-auto">
                Esta aba está integrada ao ecossistema Papyrus e pronta para receber os próximos módulos.
              </p>
              <button
                type="button"
                onClick={() => setActiveTab('inicio')}
                className="btn btn-sm btn-primary text-primary-content font-bold rounded-xl cursor-pointer"
              >
                Voltar para o Início
              </button>
            </div>
          )}
        </main>
      </div>

      {/* 3. MODAL GLOBAL DE REGISTRO */}
      <RegisterStudyModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        recordedTime={formatStopwatch(timerSeconds)}
        onSave={(dados) => {
          console.info('Sessão registrada com sucesso:', dados);
          setIsRegisterModalOpen(false);
          setTimerSeconds(0);
          setIsTimerRunning(false);
        }}
      />
    </div>
  );
}