import React, { useState, useEffect, useRef } from 'react';
import api from './services/api';

// Layout
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';

// Tabs
import InicioTab from './components/tabs/InicioTab';
import ConcursosTab from './components/tabs/ConcursosTab';
import MetasTab from './components/tabs/MetasTab';
import QuadroSemanalTab from './components/tabs/QuadroSemanalTab';
import EditalVerticalizadoTab from './components/tabs/EditalVerticalizadoTab';
import PlanejamentoTab from './components/tabs/PlanejamentoTab';
import DesempenhoTab from './components/tabs/DesempenhoTab';

// Modals
import DisciplineEditorModal from './components/modals/DisciplineEditorModal';
import StudySessionModal from './components/modals/StudySessionModal';
import RichTextEditorModal from './components/modals/RichTextEditorModal';
import FocusModeModal from './components/modals/FocusModeModal';

export default function App() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);

  // -------------------------------------------------------------
  // ESTADO DOS CONCURSOS E DISCIPLINAS
  // -------------------------------------------------------------
  const [plans, setPlans] = useState([
    {
      id: '1',
      title: 'PM-DF Oficial',
      edital: 'Polícia Militar do Distrito Federal',
      role: 'Cadete Policial Militar',
      targetDate: '20/12/2026',
      badgeColor: 'bg-primary',
      colorHex: '#1E60F6',
      logoUrl: '',
      questionsTotal: 420,
      accuracy: 84
    },
    {
      id: '2',
      title: 'Plano BB (Agente de Tecnologia)',
      edital: 'Banco do Brasil',
      role: 'Agente de Tecnologia (2026)',
      targetDate: '13/08/2026',
      badgeColor: 'bg-secondary',
      colorHex: '#00D084',
      logoUrl: '',
      questionsTotal: 35,
      accuracy: 78
    }
  ]);
  const [selectedPlanId, setSelectedPlanId] = useState('1');

  const [disciplines, setDisciplines] = useState([
    {
      id: 'd1',
      planId: '1',
      name: 'Direito Constitucional',
      studiedTopics: 8,
      totalTopics: 22,
      questionsDone: 140,
      topics: [
        { id: 't1_1', name: '1. Direitos e Garantias Fundamentais (Art. 5º)' },
        { id: 't1_2', name: '2. Direitos Sociais e Nacionalidade' },
        { id: 't1_3', name: '3. Organização Político-Administrativa do Estado' },
        { id: 't1_4', name: '4. Poder Executivo e Atribuições' },
        { id: 't1_5', name: '5. Segurança Pública (Art. 144)' }
      ]
    },
    {
      id: 'd2',
      planId: '1',
      name: 'Língua Portuguesa',
      studiedTopics: 12,
      totalTopics: 18,
      questionsDone: 210,
      topics: [
        { id: 't2_1', name: '1. Compreensão e Interpretação de Textos' },
        { id: 't2_2', name: '2. Tipologia e Gêneros Textuais' },
        { id: 't2_3', name: '3. Ortografia Oficial e Acentuação Gráfica' },
        { id: 't2_4', name: '4. Emprego do Sinal Indicativo de Crase' },
        { id: 't2_5', name: '5. Sintaxe da Oração e do Período' }
      ]
    },
    {
      id: 'd3',
      planId: '1',
      name: 'Direito Administrativo',
      studiedTopics: 6,
      totalTopics: 20,
      questionsDone: 95,
      topics: [
        { id: 't3_1', name: '1. Princípios da Administração Pública' },
        { id: 't3_2', name: '2. Atos Administrativos (Atributos e Espécies)' },
        { id: 't3_3', name: '3. Poderes Administrativos' }
      ]
    },
    {
      id: 'd4',
      planId: '1',
      name: 'Raciocínio Lógico Matemático',
      studiedTopics: 4,
      totalTopics: 14,
      questionsDone: 80,
      topics: [
        { id: 't4_1', name: '1. Proposições Simples e Compostas' },
        { id: 't4_2', name: '2. Equivalências Lógicas e Negações' }
      ]
    }
  ]);

  const currentPlan = plans.find((p) => p.id === selectedPlanId) || plans[0];
  const currentDisciplines = disciplines.filter((d) => d.planId === currentPlan.id);

  const totalPlanTopics = currentDisciplines.reduce((acc, d) => acc + (d.topics?.length || 0), 0);
  const totalPlanStudied = currentDisciplines.reduce((acc, d) => acc + (d.studiedTopics || 0), 0);
  const progressPercentage = totalPlanTopics > 0 ? Math.round((totalPlanStudied / totalPlanTopics) * 100) : 0;
  const topicsRemaining = Math.max(0, totalPlanTopics - totalPlanStudied);

  // -------------------------------------------------------------
  // ESTATÍSTICAS ACUMULADAS DINÂMICAS
  // -------------------------------------------------------------
  const [todayMinutesStudied, setTodayMinutesStudied] = useState(90);
  const [todayQuestionsDone, setTodayQuestionsDone] = useState(35);

  const [weeklyHoursStudied, setWeeklyHoursStudied] = useState(14);
  const [weeklyHoursGoal, setWeeklyHoursGoal] = useState(25);
  const weeklyProgressPercentage =
    weeklyHoursGoal > 0 ? Math.min(100, Math.round((weeklyHoursStudied / weeklyHoursGoal) * 100)) : 0;

  const [totalQuestionsDone, setTotalQuestionsDone] = useState(120);
  const [totalQuestionsCorrect, setTotalQuestionsCorrect] = useState(98);
  const overallAccuracy =
    totalQuestionsDone > 0 ? ((totalQuestionsCorrect / totalQuestionsDone) * 100).toFixed(1) : '0.0';

  // Drag & Drop Tópicos
  const [activeDisciplineEditor, setActiveDisciplineEditor] = useState(null);
  const [newTopicInput, setNewTopicInput] = useState('');
  const [draggedTopicIndex, setDraggedTopicIndex] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedTopicIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedTopicIndex === null || draggedTopicIndex === index) return;

    const list = [...activeDisciplineEditor.topics];
    const item = list.splice(draggedTopicIndex, 1)[0];
    list.splice(index, 0, item);

    setDraggedTopicIndex(index);
    setActiveDisciplineEditor({ ...activeDisciplineEditor, topics: list });
  };

  const handleDragEnd = () => setDraggedTopicIndex(null);

  // -------------------------------------------------------------
  // METAS E REVISÕES DIÁRIAS
  // -------------------------------------------------------------
  const [dailyGoals, setDailyGoals] = useState([
    {
      id: 'g1',
      topicId: 't1_1',
      subject: 'DIREITO CONSTITUCIONAL',
      subjectColor: '#1E60F6',
      borderClass: 'border-l-primary',
      topicName: 'Direitos e Garantias Fundamentais (Art. 5º)',
      importance: 'Alta Incidência',
      type: 'THEORY',
      durationMinutes: 90,
      completed: false,
      studyMethod: '',
      tecUrl: 'https://www.tecconcursos.com.br',
      videoUrl: 'https://www.grancursosonline.com.br',
      pdfUrl: '#',
      errorNotes: '<h3>Pegadinha:</h3><p>Inviolabilidade do domicílio: flagrante delito ou desastre permite entrar à noite.</p>',
      summaryNotes: '<h3>Art. 5º</h3><p>• Homens e mulheres iguais.<br>• Princípio da legalidade estrita.</p>'
    },
    {
      id: 'g2',
      topicId: 't2_4',
      subject: 'LÍNGUA PORTUGUESA',
      subjectColor: '#00D084',
      borderClass: 'border-l-secondary',
      topicName: 'Emprego do Sinal Indicativo de Crase',
      importance: 'Alta Incidência',
      type: 'REVISION',
      revisionTag: 'Revisão 7 dias',
      durationMinutes: 45,
      completed: false,
      studyMethod: 'Videoaula',
      tecUrl: 'https://www.tecconcursos.com.br',
      videoUrl: 'https://www.grancursosonline.com.br',
      pdfUrl: '#',
      errorNotes: '<p>Não usar crase antes de pronomes de tratamento.</p>',
      summaryNotes: '<p>Crase = A + A.</p>'
    },
    {
      id: 'g3',
      topicId: 't3_1',
      subject: 'DIREITO ADMINISTRATIVO',
      subjectColor: '#FF7A1A',
      borderClass: 'border-l-accent',
      topicName: 'Lei 8.112/90 - Regime Disciplinar e Responsabilidades',
      importance: 'Alta Incidência',
      type: 'THEORY',
      durationMinutes: 60,
      completed: false,
      studyMethod: 'PDF',
      tecUrl: 'https://www.tecconcursos.com.br',
      videoUrl: '',
      pdfUrl: '#',
      errorNotes: '',
      summaryNotes: ''
    },
    {
      id: 'g4',
      topicId: 't4_2',
      subject: 'RACIOCÍNIO LÓGICO',
      subjectColor: '#F43F5E',
      borderClass: 'border-l-error',
      topicName: 'Equivalências Lógicas e Negações de Proposições',
      importance: 'Média Incidência',
      type: 'REVISION',
      revisionTag: 'Revisão 24h',
      durationMinutes: 30,
      completed: false,
      studyMethod: 'Questões',
      tecUrl: 'https://www.tecconcursos.com.br',
      videoUrl: '',
      pdfUrl: '#',
      errorNotes: '',
      summaryNotes: ''
    }
  ]);

  const [editalTopics, setEditalTopics] = useState([
    { id: 't1', subject: 'LÍNGUA PORTUGUESA', name: 'Compreensão e Interpretação de Textos', theory: true, r1: true, r2: true, r3: false, r4: false, r5: false, r6: false, lastStudied: '24/08/2026', totalQuestions: 60, correctQuestions: 54 },
    { id: 't2', subject: 'LÍNGUA PORTUGUESA', name: 'Ortografia Oficial e Acentuação Gráfica', theory: true, r1: true, r2: false, r3: false, r4: false, r5: false, r6: false, lastStudied: '22/08/2026', totalQuestions: 40, correctQuestions: 35 },
    { id: 't3', subject: 'LÍNGUA PORTUGUESA', name: 'Emprego do Sinal Indicativo de Crase', theory: false, r1: false, r2: false, r3: false, r4: false, r5: false, r6: false, lastStudied: '-', totalQuestions: 0, correctQuestions: 0 },
    { id: 't4', subject: 'DIREITO CONSTITUCIONAL', name: 'Direitos e Deveres Individuais e Coletivos (Art. 5º)', theory: true, r1: true, r2: true, r3: true, r4: false, r5: false, r6: false, lastStudied: '25/08/2026', totalQuestions: 95, correctQuestions: 82 }
  ]);

  // -------------------------------------------------------------
  // ESTADOS DE MODAIS E CONTROLES
  // -------------------------------------------------------------
  const [activeStudyModal, setActiveStudyModal] = useState(null);
  const [activeEditorModal, setActiveEditorModal] = useState(null);
  const [summaryHtml, setSummaryHtml] = useState('');
  const [errorHtml, setErrorHtml] = useState('');
  const editorRef = useRef(null);

  const [selectedMethods, setSelectedMethods] = useState([]);
  const [isManualTime, setIsManualTime] = useState(false);
  const [manualMinutes, setManualMinutes] = useState(60);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [questionsDone, setQuestionsDone] = useState(0);
  const [questionsRight, setQuestionsRight] = useState(0);
  const [revisions, setRevisions] = useState({ r24h: false, r7d: false, r15d: false, r30d: false, r60d: false, r90d: false });
  const [blockRevisionChecked, setBlockRevisionChecked] = useState(true);

  useEffect(() => {
    let interval = null;
    if (isTimerRunning && !isManualTime) {
      interval = setInterval(() => setTimerSeconds((prev) => prev + 1), 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, isManualTime]);

  useEffect(() => {
    if (activeEditorModal && editorRef.current) {
      editorRef.current.innerHTML = activeEditorModal.type === 'errors' ? errorHtml : summaryHtml;
      editorRef.current.focus();
    }
  }, [activeEditorModal]);

  const formatTimer = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs > 0 ? `${hrs.toString().padStart(2, '0')}:` : ''}${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleDeletePlan = (planId) => {
    if (plans.length <= 1) {
      alert('Você precisa ter pelo menos um plano cadastrado.');
      return;
    }
    if (confirm('Tem certeza que deseja excluir este plano?')) {
      const remainingPlans = plans.filter((p) => p.id !== planId);
      setPlans(remainingPlans);
      setDisciplines(disciplines.filter((d) => d.planId !== planId));
      setSelectedPlanId(remainingPlans[0].id);
    }
  };

  const handleAddNewDiscipline = () => {
    const newDisc = {
      id: 'd_' + Date.now(),
      planId: currentPlan.id,
      name: 'Nova Disciplina',
      studiedTopics: 0,
      totalTopics: 0,
      questionsDone: 0,
      topics: []
    };
    setDisciplines([...disciplines, newDisc]);
    setActiveDisciplineEditor({ ...newDisc });
  };

  const handleSaveDisciplineEditor = () => {
    if (!activeDisciplineEditor) return;
    setDisciplines((prev) =>
      prev.map((d) =>
        d.id === activeDisciplineEditor.id
          ? {
            ...activeDisciplineEditor,
            totalTopics: activeDisciplineEditor.topics.length
          }
          : d
      )
    );
    setActiveDisciplineEditor(null);
  };

  const handleDeleteDiscipline = (discId) => {
    if (confirm('Deseja remover esta disciplina e seus tópicos?')) {
      setDisciplines((prev) => prev.filter((d) => d.id !== discId));
      setActiveDisciplineEditor(null);
    }
  };

  const handleAddTopicToDiscipline = () => {
    if (!newTopicInput.trim() || !activeDisciplineEditor) return;
    const newTopic = {
      id: 't_' + Date.now(),
      name: `${activeDisciplineEditor.topics.length + 1}. ${newTopicInput.trim()}`
    };
    setActiveDisciplineEditor({
      ...activeDisciplineEditor,
      topics: [...activeDisciplineEditor.topics, newTopic]
    });
    setNewTopicInput('');
  };

  const handleDeleteTopicFromEditor = (topicId) => {
    if (!activeDisciplineEditor) return;
    setActiveDisciplineEditor({
      ...activeDisciplineEditor,
      topics: activeDisciplineEditor.topics.filter((t) => t.id !== topicId)
    });
  };

  const handleOpenStudy = (goal) => {
    setActiveStudyModal(goal);
    setSummaryHtml(goal.summaryNotes || '');
    setErrorHtml(goal.errorNotes || '');
    setSelectedMethods(goal.studyMethod ? goal.studyMethod.split(', ') : []);
    setQuestionsDone(goal.questionsTotal || 0);
    setQuestionsRight(goal.questionsCorrect || 0);
    setManualMinutes(goal.durationMinutes || 60);
    setTimerSeconds(0);
    setIsTimerRunning(false);
    setIsManualTime(false);
    setIsFocusMode(false);
    setActiveEditorModal(null);
  };

  const toggleGoalCompletion = (goalId) => {
    setDailyGoals((prev) =>
      prev.map((g) => (g.id === goalId ? { ...g, completed: !g.completed } : g))
    );
  };

  const execCmd = (command, value = null) => {
    document.execCommand(command, false, value);
    if (editorRef.current) editorRef.current.focus();
  };

  const saveEditorContent = () => {
    if (editorRef.current && activeEditorModal) {
      const content = editorRef.current.innerHTML;
      if (activeEditorModal.type === 'errors') setErrorHtml(content);
      else setSummaryHtml(content);
    }
    setActiveEditorModal(null);
  };

  const handleFinishStudy = async () => {
    if (!activeStudyModal) return;
    const calculatedMinutes = isManualTime
      ? Number(manualMinutes)
      : timerSeconds > 0
        ? Math.max(1, Math.floor(timerSeconds / 60))
        : Number(manualMinutes);

    const qDone = Number(questionsDone) || 0;
    const qRight = Number(questionsRight) || 0;
    const methodsString = selectedMethods.join(', ');

    const selectedIntervalDays = [];
    if (revisions.r24h) selectedIntervalDays.push(1);
    if (revisions.r7d) selectedIntervalDays.push(7);
    if (revisions.r15d) selectedIntervalDays.push(15);
    if (revisions.r30d) selectedIntervalDays.push(30);
    if (revisions.r60d) selectedIntervalDays.push(60);
    if (revisions.r90d) selectedIntervalDays.push(90);

    setTodayMinutesStudied((prev) => prev + calculatedMinutes);
    setTodayQuestionsDone((prev) => prev + qDone);
    setWeeklyHoursStudied((prev) => Number((prev + calculatedMinutes / 60).toFixed(1)));
    setTotalQuestionsDone((prev) => prev + qDone);
    setTotalQuestionsCorrect((prev) => prev + qRight);

    try {
      await api.post(`/topics/${activeStudyModal.topicId}/complete`, {
        selectedIntervalDays,
        scheduleBlockRevision: blockRevisionChecked,
        actualDurationMinutes: calculatedMinutes,
        questionsTotal: qDone,
        questionsCorrect: qRight,
        studyMethod: methodsString,
        errorNotebookNotes: errorHtml,
        summaryNotes: summaryHtml
      });
    } catch {
      console.log('Salvo no estado local');
    }

    setDailyGoals((prev) =>
      prev.map((g) =>
        g.id === activeStudyModal.id
          ? {
            ...g,
            completed: true,
            durationMinutes: calculatedMinutes,
            questionsTotal: qDone,
            questionsCorrect: qRight,
            summaryNotes: summaryHtml,
            errorNotes: errorHtml,
            studyMethod: methodsString
          }
          : g
      )
    );

    setIsFocusMode(false);
    setActiveStudyModal(null);
    setIsTimerRunning(false);
  };

  const toggleEditalCheck = (topicId, field) => {
    setEditalTopics((prev) =>
      prev.map((item) => (item.id === topicId ? { ...item, [field]: !item[field] } : item))
    );
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-base-100 text-base-content font-['Plus_Jakarta_Sans'] antialiased">
      <div className="flex w-full h-full">
        {/* SIDEBAR */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
        />

        {/* MAIN WRAPPER */}
        <main className="flex-1 flex flex-col overflow-y-auto bg-base-100 z-0">
          <Header
            plans={plans}
            selectedPlanId={selectedPlanId}
            setSelectedPlanId={setSelectedPlanId}
            streakDays={12}
          />

          <div className="p-8 max-w-7xl w-full mx-auto space-y-7">
            {activeTab === 'inicio' && (
              <InicioTab
                weeklyHoursStudied={weeklyHoursStudied}
                weeklyHoursGoal={weeklyHoursGoal}
                weeklyProgressPercentage={weeklyProgressPercentage}
                overallAccuracy={overallAccuracy}
                totalQuestionsCorrect={totalQuestionsCorrect}
                totalQuestionsDone={totalQuestionsDone}
                todayMinutesStudied={todayMinutesStudied}
                todayQuestionsDone={todayQuestionsDone}
                dailyGoals={dailyGoals}
                toggleGoalCompletion={toggleGoalCompletion}
                handleOpenStudy={handleOpenStudy}
                setActiveTab={setActiveTab}
              />
            )}

            {activeTab === 'concursos' && (
              <ConcursosTab
                plans={plans}
                setPlans={setPlans}
                currentPlan={currentPlan}
                currentDisciplines={currentDisciplines}
                totalPlanTopics={totalPlanTopics}
                totalPlanStudied={totalPlanStudied}
                topicsRemaining={topicsRemaining}
                progressPercentage={progressPercentage}
                handleAddNewDiscipline={handleAddNewDiscipline}
                handleDeletePlan={handleDeletePlan}
                setActiveTab={setActiveTab}
                setActiveDisciplineEditor={setActiveDisciplineEditor}
                handleDeleteDiscipline={handleDeleteDiscipline}
              />
            )}

            {activeTab === 'metas' && (
              <MetasTab dailyGoals={dailyGoals} handleOpenStudy={handleOpenStudy} />
            )}

            {activeTab === 'quadro' && <QuadroSemanalTab />}

            {activeTab === 'edital' && (
              <EditalVerticalizadoTab
                editalTopics={editalTopics}
                toggleEditalCheck={toggleEditalCheck}
              />
            )}

            {activeTab === 'planejamento' && <PlanejamentoTab />}

            {activeTab === 'desempenho' && <DesempenhoTab />}
          </div>
        </main>
      </div>

      {/* MODAIS GLOBAIS */}
      <DisciplineEditorModal
        activeDisciplineEditor={activeDisciplineEditor}
        setActiveDisciplineEditor={setActiveDisciplineEditor}
        newTopicInput={newTopicInput}
        setNewTopicInput={setNewTopicInput}
        handleAddTopicToDiscipline={handleAddTopicToDiscipline}
        handleDeleteTopicFromEditor={handleDeleteTopicFromEditor}
        handleDragStart={handleDragStart}
        handleDragOver={handleDragOver}
        handleDragEnd={handleDragEnd}
        draggedTopicIndex={draggedTopicIndex}
        handleDeleteDiscipline={handleDeleteDiscipline}
        handleSaveDisciplineEditor={handleSaveDisciplineEditor}
      />

      <StudySessionModal
        activeStudyModal={activeStudyModal}
        setActiveStudyModal={setActiveStudyModal}
        isFocusMode={isFocusMode}
        setIsFocusMode={setIsFocusMode}
        timerSeconds={timerSeconds}
        setTimerSeconds={setTimerSeconds}
        setIsTimerRunning={setIsTimerRunning}
        formatTimer={formatTimer}
        isManualTime={isManualTime}
        setIsManualTime={setIsManualTime}
        manualMinutes={manualMinutes}
        setManualMinutes={setManualMinutes}
        handleFinishStudy={handleFinishStudy}
        setActiveEditorModal={setActiveEditorModal}
        selectedMethods={selectedMethods}
        setSelectedMethods={setSelectedMethods}
        questionsDone={questionsDone}
        setQuestionsDone={setQuestionsDone}
        questionsRight={questionsRight}
        setQuestionsRight={setQuestionsRight}
        revisions={revisions}
        setRevisions={setRevisions}
        blockRevisionChecked={blockRevisionChecked}
        setBlockRevisionChecked={setBlockRevisionChecked}
      />

      <RichTextEditorModal
        activeEditorModal={activeEditorModal}
        setActiveEditorModal={setActiveEditorModal}
        activeStudyModal={activeStudyModal}
        editorRef={editorRef}
        execCmd={execCmd}
        saveEditorContent={saveEditorContent}
      />

      <FocusModeModal
        activeStudyModal={activeStudyModal}
        isFocusMode={isFocusMode}
        setIsFocusMode={setIsFocusMode}
        timerSeconds={timerSeconds}
        setTimerSeconds={setTimerSeconds}
        isTimerRunning={isTimerRunning}
        setIsTimerRunning={setIsTimerRunning}
        formatTimer={formatTimer}
        handleFinishStudy={handleFinishStudy}
      />
    </div>
  );
}