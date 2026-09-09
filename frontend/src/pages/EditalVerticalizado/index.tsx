import React, { useState } from "react";
import { CheckCircle, Target, ExternalLink, ChevronDown, ChevronUp, Check, Calendar, X, Percent } from "lucide-react";

const INITIAL_DATA = [
    {
        id: 1,
        nome: "Direito Constitucional",
        theme: "primary",
        topics: [
            { id: "1.1", nome: "1.1 Princípios Fundamentais", teoria: true, r1: true, r2: false, questoes: { feitas: 20, erradas: 2 } },
            { id: "1.2", nome: "1.2 Direitos e Garantias Fundamentais", teoria: false, r1: false, r2: false, questoes: { feitas: 0, erradas: 0 } },
            { id: "1.3", nome: "1.3 Nacionalidade", teoria: true, r1: false, r2: false, questoes: { feitas: 0, erradas: 0 } },
            { id: "1.4", nome: "1.4 Direitos Sociais", teoria: false, r1: false, r2: false, questoes: { feitas: 90, erradas: 14 } },
            { id: "1.5", nome: "1.5 Direitos Sociais", teoria: true, r1: true, r2: true, questoes: { feitas: 40, erradas: 7 } }
        ]
    },
    {
        id: 2,
        nome: "Direito Administrativo",
        theme: "tertiary",
        topics: [
            { id: "2.1", nome: "2.1 Princípios Fundamentais", teoria: true, r1: true, r2: true, questoes: { feitas: 50, erradas: 10 } },
            { id: "2.2", nome: "2.2 Organização do Estado", teoria: true, r1: false, r2: false, questoes: { feitas: 15, erradas: 5 } },
            { id: "2.3", nome: "2.3 Agentes Públicos", teoria: false, r1: false, r2: false, questoes: { feitas: 0, erradas: 0 } },
            { id: "2.4", nome: "2.4 Atos Administrativos", teoria: false, r1: false, r2: false, questoes: { feitas: 100, erradas: 20 } },
            { id: "2.5", nome: "2.5 Licitações e Contratos", teoria: true, r1: false, r2: false, questoes: { feitas: 20, erradas: 2 } },
            { id: "2.6", nome: "2.6 Responsabilidade Civil do Estado", teoria: true, r1: true, r2: true, questoes: { feitas: 0, erradas: 0 } },
            { id: "2.7", nome: "2.7 Poderes Administrativos", teoria: false, r1: false, r2: false, questoes: { feitas: 0, erradas: 0 } },
            { id: "2.8", nome: "2.8 Controle da Administração Pública", teoria: true, r1: false, r2: false, questoes: { feitas: 27, erradas: 5 } },
            { id: "2.9", nome: "2.9 Improbidade Administrativa", teoria: false, r1: false, r2: false, questoes: { feitas: 0, erradas: 0 } },
            { id: "2.10", nome: "2.10 Serviços Públicos", teoria: true, r1: true, r2: true, questoes: { feitas: 40, erradas: 7 } }
        ]
    },
    {
        id: 3,
        nome: "Língua Portuguesa",
        theme: "accent",
        topics: [
            { id: "3.1", nome: "3.1 Compreensão e Interpretação de Textos", teoria: true, r1: true, r2: true, questoes: { feitas: 150, erradas: 30 } },
            { id: "3.2", nome: "3.2 Tipologia Textual", teoria: true, r1: true, r2: false, questoes: { feitas: 45, erradas: 10 } },
            { id: "3.3", nome: "3.3 Ortografia Oficial", teoria: true, r1: true, r2: true, questoes: { feitas: 80, erradas: 5 } },
            { id: "3.4", nome: "3.4 Acentuação Gráfica", teoria: true, r1: true, r2: true, questoes: { feitas: 60, erradas: 8 } },
            { id: "3.5", nome: "3.5 Sintaxe da Oração", teoria: false, r1: false, r2: false, questoes: { feitas: 0, erradas: 0 } }
        ]
    },
    {
        id: 4,
        nome: "Raciocínio Lógico",
        theme: "info",
        topics: [
            { id: "4.1", nome: "4.1 Estruturas Lógicas", teoria: true, r1: true, r2: false, questoes: { feitas: 35, erradas: 12 } },
            { id: "4.2", nome: "4.2 Lógica de Argumentação", teoria: false, r1: false, r2: false, questoes: { feitas: 0, erradas: 0 } },
            { id: "4.3", nome: "4.3 Diagramas Lógicos", teoria: false, r1: false, r2: false, questoes: { feitas: 0, erradas: 0 } },
            { id: "4.4", nome: "4.4 Probabilidade", teoria: false, r1: false, r2: false, questoes: { feitas: 0, erradas: 0 } }
        ]
    },
    {
        id: 5,
        nome: "Noções de Informática",
        theme: "secondary",
        topics: [
            { id: "5.1", nome: "5.1 Sistemas Operacionais", teoria: true, r1: true, r2: true, questoes: { feitas: 80, erradas: 15 } },
            { id: "5.2", nome: "5.2 Editores de Texto e Planilhas", teoria: true, r1: true, r2: true, questoes: { feitas: 120, erradas: 20 } },
            { id: "5.3", nome: "5.3 Redes de Computadores", teoria: true, r1: true, r2: true, questoes: { feitas: 90, erradas: 10 } },
            { id: "5.4", nome: "5.4 Segurança da Informação", teoria: true, r1: true, r2: true, questoes: { feitas: 110, erradas: 18 } }
        ]
    }
];

function RevisionsModal({ topic, onClose, onToggle }) {
    if (!topic) return null;

    const revisoes = [
        { key: "r1", label: "R 01", done: topic.r1 },
        { key: "r2", label: "R 02", done: topic.r2 },
        { key: "r3", label: "R 03", done: topic.r3 },
        { key: "r4", label: "R 04", done: topic.r4 },
        { key: "r5", label: "R 05", done: topic.r5 },
        { key: "r6", label: "R 06", done: topic.r6 },
    ];

    return (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/80">
                    <div>
                        <h3 className="font-bold text-slate-800 text-lg">Controle de Revisões</h3>
                        <p className="text-sm text-slate-500 font-medium mt-0.5 line-clamp-1">{topic.nome}</p>
                    </div>
                    <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 grid grid-cols-2 gap-3 bg-white">
                    {revisoes.map((rev) => (
                        <button
                            key={rev.key}
                            onClick={() => onToggle(rev.key)}
                            className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${rev.done
                                ? 'border-emerald-500 bg-emerald-50/50 text-emerald-700 shadow-sm'
                                : 'border-slate-100 hover:border-slate-300 text-slate-600 hover:bg-slate-50'
                                }`}
                        >
                            <span className="font-bold">{rev.label}</span>
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${rev.done ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-300'
                                }`}>
                                <Check size={14} strokeWidth={3} />
                            </div>
                        </button>
                    ))}
                </div>

                <div className="p-5 border-t border-slate-100 bg-slate-50 flex justify-end">
                    <button onClick={onClose} className="px-6 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl transition-colors shadow-sm">
                        Concluído
                    </button>
                </div>
            </div>
        </div>
    );
}

function QuestoesModal({ topic, onClose }) {
    if (!topic) return null;

    const feitasNum = parseInt(topic.questoes?.feitas) || 0;
    const erradasNum = parseInt(topic.questoes?.erradas) || 0;
    const certasNum = feitasNum - erradasNum;
    const aproveitamento = feitasNum > 0 ? Math.round((certasNum / feitasNum) * 100) : 0;

    return (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/80">
                    <div>
                        <h3 className="font-bold text-slate-800 text-lg">Desempenho</h3>
                        <p className="text-sm text-slate-500 font-medium mt-0.5 line-clamp-1">{topic.nome}</p>
                    </div>
                    <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 bg-white space-y-4">
                    {/* Aproveitamento Geral */}
                    <div className="flex flex-col items-center justify-center bg-slate-50 p-6 rounded-xl border border-slate-100">
                        <span className="font-bold text-slate-500 text-sm mb-1">Aproveitamento Geral</span>
                        <span className={`text-4xl font-black ${feitasNum === 0 ? 'text-slate-400' :
                            aproveitamento >= 80 ? 'text-emerald-500' :
                                aproveitamento >= 60 ? 'text-amber-500' : 'text-rose-500'
                            }`}>
                            {aproveitamento}%
                        </span>
                    </div>

                    {/* Detalhamento */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex flex-col items-center text-center">
                            <span className="text-slate-500 text-[11px] font-bold uppercase tracking-wide">Resolvidas</span>
                            <span className="text-2xl font-black text-slate-700 mt-1">{feitasNum}</span>
                        </div>
                        <div className="bg-rose-50 border border-rose-100 rounded-xl p-4 flex flex-col items-center text-center">
                            <span className="text-rose-500 text-[11px] font-bold uppercase tracking-wide">Erradas</span>
                            <span className="text-2xl font-black text-rose-600 mt-1">{erradasNum}</span>
                        </div>
                    </div>
                </div>

                <div className="p-5 border-t border-slate-100 bg-slate-50">
                    <button onClick={onClose} className="w-full px-6 py-2.5 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl transition-colors shadow-sm">
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    );
}

function DisciplineAccordion({ disciplina, onUpdateTopic }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedRevisionTopic, setSelectedRevisionTopic] = useState(null);
    const [selectedQuestoesTopic, setSelectedQuestoesTopic] = useState(null);

    const teoriaConcluida = disciplina.topics.filter(t => t.teoria).length;
    const totalTopics = disciplina.topics.length;
    const progress = totalTopics > 0 ? Math.round((teoriaConcluida / totalTopics) * 100) : 0;

    // Mapa de cores para cada matéria usando o design system do Papyrus (index.css)
    const colorThemes = {
        primary: { bar: "bg-primary/40", text: "text-primary/80", pill: "bg-primary/10 border-primary/20" },
        secondary: { bar: "bg-secondary/40", text: "text-secondary/80", pill: "bg-secondary/10 border-secondary/20" },
        tertiary: { bar: "bg-tertiary/40", text: "text-tertiary/80", pill: "bg-tertiary/10 border-tertiary/20" },
        accent: { bar: "bg-accent/40", text: "text-accent/80", pill: "bg-accent/10 border-accent/20" },
        info: { bar: "bg-info/40", text: "text-info/80", pill: "bg-info/10 border-info/20" },
        success: { bar: "bg-success/40", text: "text-success/80", pill: "bg-success/10 border-success/20" },
        warning: { bar: "bg-warning/40", text: "text-warning/80", pill: "bg-warning/10 border-warning/20" },
        error: { bar: "bg-error/40", text: "text-error/80", pill: "bg-error/10 border-error/20" },
    };

    const theme = colorThemes[disciplina.theme] || colorThemes.primary;

    const handleToggleTeoria = (topic) => {
        onUpdateTopic(disciplina.id, topic.id, { ...topic, teoria: !topic.teoria });
    };

    const handleToggleRevision = (topicId, revKey) => {
        const topic = disciplina.topics.find(t => t.id === topicId);
        if (topic) {
            onUpdateTopic(disciplina.id, topic.id, { ...topic, [revKey]: !topic[revKey] });
        }
    };

    return (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm mb-3">
            {/* Cabecalho clicável */}
            <div
                className="relative overflow-hidden cursor-pointer bg-slate-50 transition-colors hover:bg-slate-100/80"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="relative z-10 px-5 py-4 flex items-center justify-between">
                    <div>
                        <h2 className="font-bold text-slate-800 text-lg leading-tight">
                            {disciplina.nome}
                        </h2>
                    </div>
                    <div className="flex items-center gap-4">
                        {/* Barra de progresso pequena */}
                        <div className="w-32 h-1.5 bg-slate-200/60 rounded-full overflow-hidden hidden sm:block">
                            <div
                                className={`h-full ${theme.bar} transition-all duration-700 ease-in-out`}
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>

                        <span className={`text-[13px] font-bold ${theme.text} ${theme.pill} backdrop-blur-sm px-2 py-0.5 rounded shadow-sm border`}>
                            {progress}%
                        </span>
                        {isOpen ? <ChevronUp size={20} className="text-slate-500" /> : <ChevronDown size={20} className="text-slate-500" />}
                    </div>
                </div>
            </div>

            {/* Corpo (Tabela) */}
            {isOpen && (
                <div className="p-0 border-t border-slate-100 relative">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            {/* CABEÇALHO DA TABELA */}
                            <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold">
                                <tr>
                                    <th className="p-4 text-center">Tópicos</th>
                                    <th className="p-4 text-center">Teoria</th>
                                    <th className="p-4 text-center">Revisões</th>
                                    <th className="p-4 text-center">Questões</th>
                                    <th className="p-4 text-center">Link</th>
                                </tr>
                            </thead>

                            {/* CORPO DA TABELA */}
                            <tbody className="divide-y divide-slate-100">
                                {disciplina.topics.map((topic) => {
                                    const feitas = topic.questoes?.feitas || 0;
                                    const erradas = topic.questoes?.erradas || 0;
                                    const aproveitamento = feitas > 0 ? Math.round(((feitas - erradas) / feitas) * 100) : 0;

                                    return (
                                        <tr key={topic.id} className="hover:bg-slate-50/50 transition-colors">
                                            {/* 1. Nome do Tópico */}
                                            <td className="p-4 font-semibold text-slate-700">
                                                {topic.nome}
                                            </td>

                                            {/* 2. Checkbox de Teoria Elegante */}
                                            <td className="p-4 text-center">
                                                <div className="flex justify-center">
                                                    <button
                                                        onClick={() => handleToggleTeoria(topic)}
                                                        className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${topic.teoria
                                                            ? 'bg-emerald-500 border-emerald-500 text-white shadow-sm shadow-emerald-200'
                                                            : 'bg-slate-50 border-slate-300 hover:border-emerald-400 text-transparent hover:text-emerald-100'
                                                            }`}
                                                    >
                                                        <Check size={14} strokeWidth={3} />
                                                    </button>
                                                </div>
                                            </td>

                                            {/* 3. Botão do Modal de Revisões */}
                                            <td className="p-4 text-center">
                                                <button
                                                    onClick={() => setSelectedRevisionTopic(topic)}
                                                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg font-bold text-xs transition-colors"
                                                    title="Gerenciar Revisões"
                                                >
                                                    <Calendar size={14} />
                                                    {[topic.r1, topic.r2, topic.r3, topic.r4, topic.r5, topic.r6].filter(Boolean).length}/6
                                                </button>
                                            </td>

                                            {/* 4. Ícone de Questões / Aproveitamento */}
                                            <td className="p-4 text-center">
                                                <button
                                                    onClick={() => setSelectedQuestoesTopic(topic)}
                                                    className={`inline-flex items-center justify-center min-w-[3rem] px-2 py-1.5 rounded-lg font-bold text-xs transition-colors ${feitas === 0 ? 'bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-600' :
                                                        aproveitamento >= 80 ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' :
                                                            aproveitamento >= 60 ? 'bg-amber-50 text-amber-600 hover:bg-amber-100' : 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                                                        }`}
                                                    title="Ver Desempenho"
                                                >
                                                    {feitas > 0 ? `${aproveitamento}%` : '-'}
                                                </button>
                                            </td>

                                            {/* 5. Link Externo */}
                                            <td className="p-4 text-center">
                                                <button className="text-slate-400 hover:text-blue-500 transition-colors p-1" title="Acessar Caderno">
                                                    <ExternalLink size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Modais */}
                    {selectedRevisionTopic && (
                        <RevisionsModal
                            topic={selectedRevisionTopic}
                            onClose={() => setSelectedRevisionTopic(null)}
                            onToggle={(revKey) => {
                                handleToggleRevision(selectedRevisionTopic.id, revKey);
                                // A atualização do state vai acontecer de cima para baixo. Como o topic é copiado,
                                // o modal precisaria receber o topic atualizado. Para manter simples, 
                                // nós atualizamos e fechamos ou apenas passamos a atualização e a UI reflete.
                                // Neste caso, onToggle apenas despacha a atualização.
                                // Para que o Modal se atualize na hora, o state selectedRevisionTopic precisa do novo objeto.
                                setSelectedRevisionTopic(prev => ({ ...prev, [revKey]: !prev[revKey] }));
                            }}
                        />
                    )}

                    {selectedQuestoesTopic && (
                        <QuestoesModal
                            topic={selectedQuestoesTopic}
                            onClose={() => setSelectedQuestoesTopic(null)}
                        />
                    )}
                </div>
            )}
        </div>
    );
}

export default function EditalVerticalizadoPage() {
    const [edital, setEdital] = useState(INITIAL_DATA);

    // Calcular o progresso global (Teorias concluídas / Total de tópicos)
    const totalTopicsGlobal = edital.reduce((acc, disc) => acc + disc.topics.length, 0);
    const completedTopicsGlobal = edital.reduce((acc, disc) => acc + disc.topics.filter(t => t.teoria).length, 0);
    const globalProgress = totalTopicsGlobal > 0 ? Math.round((completedTopicsGlobal / totalTopicsGlobal) * 100) : 0;

    const handleUpdateTopic = (disciplinaId, topicId, newTopic) => {
        setEdital(prev => prev.map(d => {
            if (d.id !== disciplinaId) return d;
            return {
                ...d,
                topics: d.topics.map(t => t.id === topicId ? newTopic : t)
            };
        }));
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-300 font-['Plus_Jakarta_Sans']">
            {/* 1. BARRA DE PROGRESSO GLOBAL */}
            <div className="bg-base-100 rounded-2xl p-6 border border-base-200 shadow-sm flex flex-col gap-4">
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Edital Verticalizado</h1>
                    </div>
                    <div className="text-right flex gap-2 items-center">
                        <span className="text-2xl font-black text-emerald-500 tracking-tighter">{globalProgress}%</span>
                        <p className="text-[12px] font-bold text-slate-400 mt-3 uppercase tracking-widest">Concluído</p>
                    </div>
                </div>

                {/* Container cinza da barra (fundo) */}
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    {/* Barra verde preenchida (largura define o progresso) */}
                    <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000" style={{ width: `${globalProgress}%` }}></div>
                </div>
            </div>

            {/* 2. LISTA DE DISCIPLINAS */}
            <div className="space-y-3">
                {edital.map((disc) => (
                    <DisciplineAccordion
                        key={disc.id}
                        disciplina={disc}
                        onUpdateTopic={handleUpdateTopic}
                    />
                ))}
            </div>
        </div>
    );
}