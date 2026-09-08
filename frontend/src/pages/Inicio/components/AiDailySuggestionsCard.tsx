import React, { useState } from 'react';
import { Lightbulb, EyeOff, Play, CheckCircle2, Sparkles } from 'lucide-react';
import { toTitleCase } from '../../../utils/studyCalculations';

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
    colorClass: 'border-l-success',
    dotColor: 'bg-success',
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

  const flatTopics = items.flatMap(group =>
    group.topics.map(topic => ({ ...topic, subjectName: group.subjectName, subjectColor: group.colorClass }))
  );

  if (!flatTopics.length) {
    return (
      <div className="rounded-[22px] border border-base-300/80 bg-base-100 p-5 shadow-sm text-center">
        <div className="w-8 h-8 rounded-full bg-success/10 text-success flex items-center justify-center mx-auto mb-2">
          <CheckCircle2 size={18} />
        </div>
        <p className="text-xs font-bold text-base-content">Todas as sugestões foram concluídas!</p>
        <p className="text-xs text-neutral-content mt-0.5">A IA atualizará sua fila no próximo ciclo.</p>
      </div>
    );
  }

  return (
    <div className="card-papyrus !p-0 flex flex-col justify-between h-full overflow-hidden font-['Plus_Jakarta_Sans']">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-base-200/60 flex items-center justify-between">
        <div className="flex flex-col gap-0.5">
          <span className="text-xs uppercase tracking-wider font-bold text-base-content/70">Sugestões do Dia</span>

        </div>
        <span className="badge badge-sm bg-accent/15 text-accent border-none font-bold px-3 py-2.5 rounded-lg shadow-sm flex items-center gap-1.5">
          <Sparkles size={13} className="fill-accent" /> IA
        </span>
      </div>

      {/* Lista de Sugestões Nivelada (Flat) */}
      <div className="px-5 pb-2 overflow-y-auto flex-1">
        {flatTopics.map((topic) => (
          <div
            key={topic.id}
            className="group relative py-4 border-b border-base-200/60 last:border-0 hover:bg-base-200/30 transition-colors duration-200 -mx-5 px-5 cursor-pointer"
            onClick={() => onStartFocusSession && onStartFocusSession(topic)}
          >
            <div className="flex items-start gap-3.5 min-w-0">
              {/* Barra vertical colorida */}
              <div className={`w-1.5 h-8 mt-1 rounded-full shrink-0 ${topic.subjectColor ? topic.subjectColor.replace('border-l-', 'bg-') : 'bg-primary'}`} />
              
              <div className="flex flex-col flex-1 min-w-0">
                {/* Textos */}
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="text-sm font-bold truncate transition-colors duration-150 text-base-content">
                    {toTitleCase(topic.subjectName)}
                  </span>
                  <span className="text-xs font-medium truncate transition-colors duration-150 text-neutral-content">
                    {topic.name}
                  </span>
                </div>

                {/* Linha 3: Tags e Ações com Safe Zone */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 mt-1">
                  {/* Lado Esquerdo: Tags */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="badge badge-xs border-none text-[10px] uppercase tracking-wider px-2 py-1.5 rounded bg-info/10 text-info font-bold">
                      {topic.type}
                    </span>
                    <span className="badge badge-xs border-none text-[10px] uppercase tracking-wider px-2 py-1.5 rounded bg-accent/10 text-accent font-bold">
                      {topic.statusTag}
                    </span>
                    <span className="badge badge-xs bg-base-200 text-neutral-content font-medium px-2 py-1.5 rounded-md border-none text-[10px]">
                      {topic.durationMinutes} min
                    </span>
                  </div>

                  {/* Lado Direito: Ações (Safe Zone - Gap 4 = 16px) */}
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDismissTopic(topic.id);
                      }}
                      className="btn btn-xs btn-ghost text-neutral-content hover:bg-base-200 px-2 h-8 min-h-0"
                      title="Ocultar sugestão"
                    >
                      <EyeOff size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onStartFocusSession && onStartFocusSession(topic);
                      }}
                      className="btn btn-sm bg-primary/10 text-primary hover:bg-primary/20 border-none rounded-xl px-5 font-bold gap-1.5 h-8 min-h-0 text-xs shadow-none"
                    >
                      <Play size={12} fill="currentColor" />
                      Estudar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Dica Pedagógica */}
      <div className="px-4 py-3.5 bg-base-100 border-t border-base-200 flex items-start gap-2 text-xs text-neutral-content mt-auto">
        <Lightbulb size={14} className="text-accent shrink-0 mt-0.5" />
        <span>
          <strong className="text-base-content">Dica da IA:</strong> Priorize resolver questões nos tópicos de retenção baixa (&lt;70%) antes de avançar na teoria.
        </span>
      </div>
    </div>
  );
}
