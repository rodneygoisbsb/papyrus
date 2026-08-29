import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  LayoutDashboard,
  BookOpen,
  CheckSquare,
  Calendar,
  ListTodo,
  Sliders,
  BarChart3,
  User,
  Settings,
  Flame,
  ChevronDown,
  Check,
  Layers,
  Play,
  Pause,
  Square
} from 'lucide-react';

// Importação das Abas Principais
import InicioTab from './components/tabs/InicioTab';
import ConcursosTab from './components/tabs/ConcursosTab';

// Instância segura da API com fallback
const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  timeout: 4000
});

export default function App() {
  // 1. ESTADOS DE NAVEGAÇÃO E PLANO ATIVO
  const [activeTab, setActiveTab] = useState('inicio');
  const [selectedPlanId, setSelectedPlanId] = useState(1);
  const [isPlanDropdownOpen, setIsPlanDropdownOpen] = useState(false);

  const [planosDisponiveis] = useState([
    { id: 1, nome: 'PM-DF Oficial' },
    { id: 2, nome: 'Polícia Federal - Agente' }
  ]);

  // 2. ESTADOS DE MÉTRICAS E PRODUTIVIDADE (SOFT KPIS)
  const [weeklyHoursStudied, setWeeklyHoursStudied] = useState(14);
  const [weeklyHoursGoal, setWeeklyHoursGoal] = useState(25);
  const [weeklyProgressPercentage, setWeeklyProgressPercentage] = useState(56);
  const [overallAccuracy, setOverallAccuracy] = useState('81.7');
  const [totalQuestionsCorrect, setTotalQuestionsCorrect] = useState(98);
  const [totalQuestionsDone, setTotalQuestionsDone] = useState(120);
  const [weeklyAccuracyVariation, setWeeklyAccuracyVariation] = useState(4.2);

  const [todayMinutesStudied, setTodayMinutesStudied] = useState(90);
  const [todayQuestionsDone, setTodayQuestionsDone] = useState(35);
  const [todayQuestionsCorrect, setTodayQuestionsCorrect] = useState(29);

  // ============================================================
  // ESTADOS DO CRONÔMETRO GLOBAL & MODAL DE REGISTRO
  // ============================================================
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [activityForm, setActivityForm] = useState({
    subject: 'BANCO DE DADOS',
    topic: 'Modelagem Conceitual (Entidade-Relacionamento)',
    questionsDone: 10,
    questionsCorrect: 8,
    notes: ''
  });

  // Tick do cronômetro a cada 1 segundo quando ativo
  useEffect(() => {
    let interval = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Formatação em HH:MM:SS
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

  const handleSaveActivity = (e) => {
    e.preventDefault();
    alert(`Sessão registrada com sucesso!\nTempo líquido: ${formatStopwatch(timerSeconds)}\nQuestões: ${activityForm.questionsCorrect}/${activityForm.questionsDone}`);
    setIsRegisterModalOpen(false);
    setTimerSeconds(0);
  };

  // 3. ESTADO DAS METAS DIÁRIAS DO CONCURSO
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

  // 4. ESTADOS DAS DISCIPLINAS (ABA CONCURSOS)
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

  // 5. CARREGAMENTO REATIVO DO BANCO DE DADOS (SPRING BOOT)
  const carregarDisciplinasDoBanco = async (planId = 1) => {
    try {
      const response = await api.get(`/plans/${planId}/disciplines`);
      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        setDisciplines(response.data);
      }
    } catch (error) {
      console.warn('Backend offline ou sem dados cadastrados. Mantendo dados locais.', error.message);
    }
  };

  useEffect(() => {
    carregarDisciplinasDoBanco(selectedPlanId);
  }, [selectedPlanId]);

  // 6. SALVAR OU EDITAR DISCIPLINA NO POSTGRESQL / LOCAL
  const handleSaveDisciplineEditor = async () => {
    if (!activeDisciplineEditor || !activeDisciplineEditor.name?.trim()) return;

    const payload = {
      name: activeDisciplineEditor.name.trim(),
      colorHex: activeDisciplineEditor.colorHex || '#2563EB',
      topics: (activeDisciplineEditor.topics || []).map((t) => ({
        id: t.id,
        name: t.name,
        theoryCompleted: t.theoryCompleted || false
      }))
    };

    try {
      const isNew =
        !activeDisciplineEditor.id ||
        String(activeDisciplineEditor.id).startsWith('d_') ||
        String(activeDisciplineEditor.id).startsWith('temp_') ||
        String(activeDisciplineEditor.id).startsWith('t_temp_');

      if (isNew) {
        await api.post(`/plans/${selectedPlanId}/disciplines`, payload);
      } else {
        await api.put(`/disciplines/${activeDisciplineEditor.id}`, payload);
      }

      await carregarDisciplinasDoBanco(selectedPlanId);
      setActiveDisciplineEditor(null);
    } catch (error) {
      console.error('Falha na API ao salvar disciplina, aplicando fallback local:', error);

      const novaDisciplinaLocal = {
        id: activeDisciplineEditor.id || Date.now(),
        planId: selectedPlanId,
        name: payload.name,
        colorHex: payload.colorHex,
        studiedTopics: 0,
        totalTopics: payload.topics.length,
        questionsDone: 0,
        topics: payload.topics
      };

      setDisciplines((prev) => {
        const existe = prev.some((d) => d.id === novaDisciplinaLocal.id);
        if (existe) {
          return prev.map((d) => (d.id === novaDisciplinaLocal.id ? novaDisciplinaLocal : d));
        }
        return [...prev, novaDisciplinaLocal];
      });

      setActiveDisciplineEditor(null);
    }
  };

  // 7. EXCLUIR DISCIPLINA
  const handleDeleteDiscipline = async (discId) => {
    if (!confirm('Deseja realmente remover esta disciplina e seus tópicos?')) return;

    try {
      if (typeof discId === 'number') {
        await api.delete(`/disciplines/${discId}`);
      }
      setDisciplines((prev) => prev.filter((d) => d.id !== discId));
    } catch (error) {
      console.error('Erro na API ao excluir, removendo localmente:', error);
      setDisciplines((prev) => prev.filter((d) => d.id !== discId));
    }
  };

  // 8. ALTERNAR CONCLUSÃO DE META (REATIVIDADE DE TEMPO E HORAS)
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

  return (
    <div className="min-h-screen bg-base-200 flex font-['Plus_Jakarta_Sans'] text-base-content antialiased">

      {/* 1. SIDEBAR RETRÁTIL BRANCA (bg-base-100 COM EXPANSÃO NO HOVER) */}
      <aside className="group/sidebar w-20 hover:w-64 bg-base-100 border-r border-base-300/60 flex flex-col justify-between p-4 shrink-0 h-screen sticky top-0 z-40 hidden md:flex font-['Plus_Jakarta_Sans'] transition-all duration-300 ease-in-out overflow-x-hidden shadow-xs">

        {/* BLOCO SUPERIOR: LOGO + NAVEGAÇÃO PRINCIPAL */}
        <div className="space-y-6">

          {/* Logo Papyrus (Ícone centralizado no repouso + Texto com Fade-in no Hover) */}
          <div className="flex items-center gap-3 px-1 py-1">
            <div className="w-11 h-11 rounded-2xl bg-primary flex items-center justify-center text-primary-content font-black text-xl shadow-xs shrink-0">
              P
            </div>
            <div className="opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-200 whitespace-nowrap overflow-hidden">
              <h1 className="font-extrabold text-base tracking-tight leading-none text-base-content">
                Papyrus
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-widest text-primary block mt-1">
                Estudos PRO
              </span>
            </div>
          </div>

          {/* Divisor Semântico */}
          <div className="h-px bg-base-300/60 w-full" />

          {/* Menu de Navegação Vertical */}
          <nav className="space-y-1.5">
            {[
              { id: 'inicio', icon: LayoutDashboard, label: 'Início' },
              { id: 'concursos', icon: BookOpen, label: 'Concursos' },
              { id: 'metas', icon: CheckSquare, label: 'Metas diárias' },
              { id: 'quadro', icon: Calendar, label: 'Quadro Semanal' },
              { id: 'edital', icon: ListTodo, label: 'Edital Verticalizado' },
              { id: 'planejamento', icon: Sliders, label: 'Planejamento' },
              { id: 'desempenho', icon: BarChart3, label: 'Desempenho' }
            ].map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  title={item.label}
                  className={`w-full min-h-[44px] flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-150 ease-out cursor-pointer active:scale-[0.98] ${isActive
                    ? 'bg-primary text-primary-content shadow-xs font-bold'
                    : 'text-neutral-content hover:bg-base-200/70 hover:text-base-content'
                    }`}
                >
                  <item.icon size={20} className="shrink-0" />
                  <span className="truncate opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* BLOCO INFERIOR: PERFIL E CONFIGURAÇÕES SEMPRE FIXADOS */}
        <div className="pt-4 border-t border-base-300/60 space-y-1">
          <button
            type="button"
            title="Perfil"
            className="w-full min-h-[44px] flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl text-sm font-semibold text-neutral-content hover:bg-base-200/70 hover:text-base-content transition-all duration-150 ease-out cursor-pointer active:scale-[0.98]"
          >
            <User size={20} className="shrink-0" />
            <span className="truncate opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              Perfil
            </span>
          </button>

          <button
            type="button"
            title="Configurações"
            className="w-full min-h-[44px] flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl text-sm font-semibold text-neutral-content hover:bg-base-200/70 hover:text-base-content transition-all duration-150 ease-out cursor-pointer active:scale-[0.98]"
          >
            <Settings size={20} className="shrink-0" />
            <span className="truncate opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              Configurações
            </span>
          </button>
        </div>

      </aside>

      {/* 2. ÁREA PRINCIPAL DE CONTEÚDO */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* HEADER SUPERIOR COM DROPDOWN CONTROLADO */}
        <header className="bg-base-100/80 backdrop-blur-md border-b border-base-300/60 px-6 py-3.5 flex justify-between items-center sticky top-0 z-30">

          {/* SELETOR DE PLANO COM ALINHAMENTO HORIZONTAL */}
          <div className="flex items-center gap-2.5">
            <span className="text-xs uppercase tracking-wider font-bold text-neutral-content hidden sm:inline">
              PLANO SELECIONADO:
            </span>

            <div className="relative">
              {/* Botão Gatilho (Abre apenas no clique) */}
              <button
                type="button"
                onClick={() => setIsPlanDropdownOpen(!isPlanDropdownOpen)}
                className="flex items-center gap-2 bg-base-200/60 hover:bg-base-200 text-primary font-bold text-xs sm:text-sm px-3.5 py-1.5 rounded-xl border border-base-300/70 transition-all cursor-pointer shadow-2xs"
              >
                <span>
                  {planosDisponiveis.find((p) => p.id === selectedPlanId)?.nome || 'Selecionar Plano'}
                </span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${isPlanDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Menu Flutuante (Renderiza somente se isPlanDropdownOpen === true) */}
              {isPlanDropdownOpen && (
                <>
                  {/* Backdrop invisível para fechar ao clicar fora */}
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsPlanDropdownOpen(false)}
                  />

                  {/* Caixa de Opções Flutuante */}
                  <ul className="absolute left-0 mt-2 w-60 bg-base-100 border border-base-300/70 rounded-2xl shadow-xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-1">
                    {planosDisponiveis.map((plano) => (
                      <li key={plano.id}>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedPlanId(plano.id);
                            setIsPlanDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-between cursor-pointer ${selectedPlanId === plano.id
                            ? 'bg-primary text-primary-content font-bold shadow-2xs'
                            : 'text-base-content hover:bg-base-200/70'
                            }`}
                        >
                          <span>{plano.nome}</span>
                          {selectedPlanId === plano.id && <Check size={14} />}
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>

          {/* LADO DIREITO: CRONÔMETRO DE SESSÃO + CONSTÂNCIA */}
          <div className="flex items-center gap-3">

            {/* CRONÔMETRO GLOBAL DE ESTUDO */}
            <div className="flex items-center bg-base-100 border border-base-300 px-3 py-1.5 rounded-2xl shadow-2xs gap-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-base-content tabular-nums">
                <span className={`w-2 h-2 rounded-full ${isTimerRunning ? 'bg-error animate-pulse' : 'bg-base-300'}`} />
                <span>{formatStopwatch(timerSeconds)}</span>
              </div>

              <div className="flex items-center gap-1">
                {/* Play / Pause */}
                <button
                  type="button"
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className={`btn btn-xs btn-circle ${isTimerRunning ? 'btn-warning text-warning-content' : 'btn-primary text-primary-content'
                    } shadow-2xs`}
                  title={isTimerRunning ? 'Pausar Estudo' : 'Iniciar Estudo'}
                >
                  {isTimerRunning ? <Pause size={12} /> : <Play size={12} fill="currentColor" />}
                </button>

                {/* Parar e Abrir Modal de Registro */}
                {timerSeconds > 0 && (
                  <button
                    type="button"
                    onClick={handleStopAndRegister}
                    className="btn btn-xs btn-circle btn-error text-error-content shadow-2xs"
                    title="Finalizar e Registrar Sessão"
                  >
                    <Square size={11} fill="currentColor" />
                  </button>
                )}
              </div>
            </div>

            {/* BADGE DE CONSTÂNCIA */}
            <div className="badge badge-lg bg-blue-50 text-primary border border-blue-200/80 font-bold text-xs gap-1.5 py-3.5 px-3.5 rounded-2xl shadow-2xs">
              <Flame size={15} className="text-primary fill-primary" />
              <span className="hidden sm:inline">12 dias de constância</span>
              <span className="sm:hidden">12d</span>
            </div>

          </div>

        </header>

        {/* CORPO DINÂMICO DAS TELAS */}
        <main className="p-6 max-w-7xl w-full mx-auto flex-1">

          {/* ABA 1: INÍCIO (DASHBOARD) */}
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

          {/* ABA 2: CONCURSOS (CRUD DE DISCIPLINAS E EDITAL) */}
          {activeTab === 'concursos' && (
            <ConcursosTab
              disciplines={disciplines}
              activeDisciplineEditor={activeDisciplineEditor}
              setActiveDisciplineEditor={setActiveDisciplineEditor}
              onOpenNewDiscipline={() =>
                setActiveDisciplineEditor({
                  id: null,
                  name: '',
                  colorHex: '#2563EB',
                  topics: []
                })
              }
              onEditDiscipline={(disc) => setActiveDisciplineEditor({ ...disc })}
              onDeleteDiscipline={handleDeleteDiscipline}
              onSaveDiscipline={handleSaveDisciplineEditor}
            />
          )}

          {/* FALLBACK VISUAL PARA DEMAIS ABAS EM DESENVOLVIMENTO */}
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
                className="btn btn-sm btn-primary text-primary-content font-bold rounded-xl"
              >
                Voltar para o Início
              </button>
            </div>
          )}

        </main>
      </div>
      {/* ============================================================
          MODAL DE REGISTRO DE SESSÃO / ATIVIDADE
          ============================================================ */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-base-100 border border-base-300 w-full max-w-lg rounded-3xl p-6 sm:p-7 shadow-xl space-y-5 animate-in zoom-in-95 duration-200">

            {/* Cabeçalho do Modal */}
            <div className="flex justify-between items-start border-b border-base-300 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-primary">Sessão Concluída</span>
                <h3 className="text-lg font-bold text-base-content tracking-tight">Registrar Atividade de Estudo</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsRegisterModalOpen(false)}
                className="btn btn-sm btn-circle btn-ghost text-neutral-content hover:text-base-content"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveActivity} className="space-y-4">

              {/* Tempo Estudado (Leitura) */}
              <div className="bg-base-200/60 p-3.5 rounded-2xl border border-base-300 flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-content">Tempo Líquido Registrado</span>
                <span className="text-base font-bold text-primary tabular-nums">{formatStopwatch(timerSeconds)}</span>
              </div>

              {/* Matéria e Tópico */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-base-content mb-1">Disciplina</label>
                  <select
                    value={activityForm.subject}
                    onChange={(e) => setActivityForm({ ...activityForm, subject: e.target.value })}
                    className="select select-bordered select-sm w-full rounded-xl bg-base-100 text-xs font-medium border-base-300 focus:border-primary"
                  >
                    <option value="BANCO DE DADOS">Banco de Dados</option>
                    <option value="LÍNGUA PORTUGUESA">Língua Portuguesa</option>
                    <option value="FERRAMENTAS E LINGUAGENS">Ferramentas e Linguagens</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-base-content mb-1">Tópico Estudado</label>
                  <input
                    type="text"
                    value={activityForm.topic}
                    onChange={(e) => setActivityForm({ ...activityForm, topic: e.target.value })}
                    className="input input-bordered input-sm w-full rounded-xl bg-base-100 text-xs font-medium border-base-300 focus:border-primary"
                    placeholder="Ex: Formas Normais e SQL"
                    required
                  />
                </div>
              </div>

              {/* Questões e Assertividade */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-base-content mb-1">Questões Feitas</label>
                  <input
                    type="number"
                    min="0"
                    value={activityForm.questionsDone}
                    onChange={(e) => setActivityForm({ ...activityForm, questionsDone: Number(e.target.value) })}
                    className="input input-bordered input-sm w-full rounded-xl bg-base-100 text-xs font-medium border-base-300 focus:border-primary tabular-nums"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-base-content mb-1">Acertos</label>
                  <input
                    type="number"
                    min="0"
                    max={activityForm.questionsDone}
                    value={activityForm.questionsCorrect}
                    onChange={(e) => setActivityForm({ ...activityForm, questionsCorrect: Number(e.target.value) })}
                    className="input input-bordered input-sm w-full rounded-xl bg-base-100 text-xs font-medium border-base-300 focus:border-primary tabular-nums"
                  />
                </div>
              </div>

              {/* Taxa Calculada Automática */}
              <div className="text-right text-[11px] font-bold text-neutral-content">
                Taxa de Assertividade:{' '}
                <span className="text-primary font-black">
                  {activityForm.questionsDone > 0
                    ? Math.round((activityForm.questionsCorrect / activityForm.questionsDone) * 100)
                    : 0}%
                </span>
              </div>

              {/* Ações */}
              <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-base-300">
                <button
                  type="button"
                  onClick={() => setIsRegisterModalOpen(false)}
                  className="btn btn-sm btn-ghost rounded-xl text-xs"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn btn-sm btn-primary rounded-xl text-xs font-bold text-primary-content shadow-xs"
                >
                  Salvar Atividade
                </button>
              </div>

            </form>

          </div>
        </div>
      )}
    </div>
  );
}