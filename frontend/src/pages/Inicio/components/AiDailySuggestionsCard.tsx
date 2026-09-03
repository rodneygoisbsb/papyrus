import React, { useState } from 'react';
import { Sparkles, Lightbulb, TrendingUp, EyeOff, Play, CheckCircle2 } from 'lucide-react';

const defaultSuggestions = [
  {
    subjectId: 's1',
    subjectName: 'DIREITO ADMINISTRATIVO',
    colorClass: 'border-l-primary',
    dotColor: 'bg-primary',
    totalEstimatedTime: '50m',
    topics: [
      {
        id: 'sug-t1',
        name: 'Atos Administrativos: Anulação e Revogação',
        type: 'Revisão',
        statusTag: 'Ponto Fraco (58%)',
        durationMinutes: 30,
        questionsCount: 15,
        tecUrl: 'https://www.tecconcursos.com.br'
      }
    ]
  },
  {
    subjectId: 's2',
    subjectName: 'LÍNGUA PORTUGUESA',
    colorClass: 'border-l-emerald-500',
    dotColor: 'bg-emerald-500',
    totalEstimatedTime: '40m',
    topics: [
      {
        id: 'sug-t2',
        name: 'Emprego do Sinal Indicativo de Crase',
        type: 'Questões',
        statusTag: 'Sem estudo há 8 dias',
        durationMinutes: 40,
        questionsCount: 20,
        tecUrl: 'https://www.tecconcursos.com.br'
      }
    ]
  }
];

export default function AiDailySuggestionsCard({
  suggestions = defaultSuggestions,
  onStartFocusSession,
  onRegisterStudy
}) {
  const [items, setItems] = useState(suggestions);

  const handleDismissTopic = (topicId) => {
    setItems((prev) =>
      prev
        .map((group) => ({
          ...group,
          topics: group.topics.filter((t) => t.id !== topicId)
        }))
        .filter((group) => group.topics.length > 0)
    );
  };

  if (!items.length) {
    return (
      <div className="rounded-[22px] border border-base-300/80 bg-base-100 p-5 shadow-sm text-center">
        <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2">
          <CheckCircle2 size={18} />
        </div>
        <p className="text-xs font-bold text-base-content">Todas as sugestões foram concluídas!</p>
        <p className="text-[11px] text-slate-400 mt-0.5">A IA atualizará sua fila no próximo ciclo.</p>
      </div>
    );
  }

  return (
    <div className="rounded-[22px] border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-base-100 to-base-100 p-5 shadow-md space-y-4 relative">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-base-200">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-primary/10 text-primary">
            <Sparkles size={16} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-base-content">Sugestões do Dia</h3>
            <p className="text-[11px] text-slate-400">Baseado no seu histórico e retenção</p>
          </div>
        </div>
        <span className="badge badge-sm bg-primary/10 text-primary border border-primary/20 font-black px-2.5 py-1 rounded-md">
          ✨ IA
        </span>
      </div>

      {/* Lista de Matérias Agrupadas */}
      <div className="space-y-3">
        {items.map((group) => (
          <div
            key={group.subjectId}
            className="card-papyrus !p-3.5 !rounded-2xl space-y-3"
          >
            {/* Header da Matéria */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-primary" />
                <span className="text-xs font-black text-base-content uppercase tracking-wider">
                  {group.subjectName}
                </span>
              </div>
              <span className="text-[11px] font-semibold text-slate-500">
                {group.totalEstimatedTime}
              </span>
            </div>

            {/* Tópicos da Matéria */}
            <div className="space-y-2">
              {group.topics.map((topic) => (
                <div
                  key={topic.id}
                  className="bg-base-100 p-3 rounded-xl border border-base-200 flex items-center justify-between gap-3 hover:border-primary/30 transition-colors"
                >
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <TrendingUp size={13} className="text-amber-500 shrink-0" />
                      <span className="text-xs font-bold text-base-content truncate">
                        {topic.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                      <span className="badge badge-xs bg-blue-50 text-primary border-0 font-bold">
                        {topic.type}
                      </span>
                      <span className="badge badge-xs bg-amber-50 text-amber-700 border-0 font-bold">
                        {topic.statusTag}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">
                        ⏱ {topic.durationMinutes}m • {topic.questionsCount} questões
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleDismissTopic(topic.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                      title="Ocultar sugestão"
                    >
                      <EyeOff size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => onStartFocusSession && onStartFocusSession(topic)}
                      className="btn btn-xs btn-primary rounded-xl px-3 font-bold gap-1 shadow-xs"
                    >
                      <Play size={11} fill="currentColor" />
                      Estudar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Dica Pedagógica */}
      <div className="pt-3 border-t border-base-200 flex items-start gap-2 text-[11px] text-slate-500">
        <Lightbulb size={14} className="text-amber-500 shrink-0 mt-0.5" />
        <span>
          <strong className="text-slate-700">Dica da IA:</strong> Priorize resolver questões nos tópicos de retenção baixa (&lt;70%) antes de avançar na teoria.
        </span>
      </div>
    </div>
  );
}
