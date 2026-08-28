import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
    X,
    BookOpen,
    FileText,
    PenTool,
    Layers,
    Plus,
    Minus,
    Clock,
    Check,
    ChevronDown,
    Sparkles,
    Loader2
} from 'lucide-react';

/* COMPONENTE INTERNO: CUSTOM DROPDOWN FECHADO (ENCLOSED SAAS SELECT) */
function CustomSelect({ label, value, options = [], onChange, placeholder, disabled }) {
    const [isOpen, setIsOpen] = useState(false);
    const selectedOption = options.find((opt) => String(opt.id ?? opt.value ?? opt) === String(value));
    const displayText = selectedOption
        ? (selectedOption.name ?? selectedOption.label ?? selectedOption)
        : placeholder;

    return (
        <div className="space-y-1.5">
            {label && (
                <label className="text-xs font-semibold text-neutral-content block">
                    {label}
                </label>
            )}
            <div className="relative">
                <button
                    type="button"
                    disabled={disabled}
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-full h-[44px] px-3.5 rounded-xl border flex items-center justify-between text-xs font-medium transition-all shadow-2xs select-none ${disabled
                            ? 'bg-base-200/50 border-base-300/50 text-neutral-content/50 cursor-not-allowed'
                            : isOpen
                                ? 'bg-base-100 border-primary ring-2 ring-primary/15 text-base-content'
                                : 'bg-base-100 hover:bg-base-200/40 border-base-300/80 text-base-content cursor-pointer'
                        }`}
                >
                    <span className={`truncate ${!selectedOption ? 'text-neutral-content' : 'text-base-content font-medium'}`}>
                        {displayText}
                    </span>
                    <ChevronDown
                        size={15}
                        className={`text-neutral-content shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-primary' : ''
                            }`}
                    />
                </button>

                {isOpen && !disabled && (
                    <>
                        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                        <ul className="absolute left-0 right-0 top-full mt-1.5 bg-base-100 border border-base-300/90 rounded-2xl shadow-xl p-1.5 z-50 max-h-56 overflow-y-auto animate-in fade-in zoom-in-95 duration-150 space-y-0.5">
                            {options.map((opt) => {
                                const optVal = opt.id ?? opt.value ?? opt;
                                const optLabel = opt.name ?? opt.label ?? opt;
                                const isSelected = String(optVal) === String(value);

                                return (
                                    <li key={String(optVal)}>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                onChange(optVal);
                                                setIsOpen(false);
                                            }}
                                            className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-between cursor-pointer ${isSelected
                                                    ? 'bg-primary text-primary-content font-bold shadow-2xs'
                                                    : 'text-base-content hover:bg-base-200/70'
                                                }`}
                                        >
                                            <span className="truncate">{optLabel}</span>
                                            {isSelected && <Check size={14} className="shrink-0" />}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </>
                )}
            </div>
        </div>
    );
}

export default function RegisterStudyModal({
    isOpen,
    onClose,
    initialSeconds = 0,
    disciplines = [],
    selectedGoal = null,
    onSaveStudy = () => { }
}) {
    if (!isOpen) return null;

    const availableDisciplines = disciplines.length > 0 ? disciplines : [
        {
            id: 1,
            name: 'Língua Portuguesa',
            topics: [
                { id: 101, name: '1. Compreensão e interpretação de textos de gêneros variados.' },
                { id: 102, name: '2. Reconhecimento de tipos e gêneros textuais.' },
                { id: 103, name: '3. Emprego do sinal indicativo de crase.' }
            ]
        },
        {
            id: 2,
            name: 'Direito Constitucional',
            topics: [
                { id: 201, name: 'Direitos e Garantias Fundamentais (Art. 5º)' },
                { id: 202, name: 'Da Organização do Estado e dos Poderes' },
                { id: 203, name: 'Defesa do Estado e das Instituições Democráticas' }
            ]
        },
        {
            id: 3,
            name: 'Direito Administrativo',
            topics: [
                { id: 301, name: 'Lei 8.112/90 – Regime Disciplinar e Responsabilidades' },
                { id: 302, name: 'Atos Administrativos: Conceito, Requisitos e Atributos' }
            ]
        }
    ];

    const isSpecificGoal = Boolean(selectedGoal);

    const [disciplineId, setDisciplineId] = useState(selectedGoal?.subjectId || '');
    const currentDiscipline = availableDisciplines.find((d) => String(d.id) === String(disciplineId));
    const topicsList = currentDiscipline?.topics || [];
    const [topicId, setTopicId] = useState(selectedGoal?.topicId || '');
    const [studyType, setStudyType] = useState(selectedGoal?.type || '');

    const initialHrs = Math.floor(initialSeconds / 3600);
    const initialMins = Math.floor((initialSeconds % 3600) / 60);
    const [hours, setHours] = useState(initialHrs);
    const [minutes, setMinutes] = useState(initialMins);

    const addQuickTime = (minsToAdd) => {
        const totalMins = hours * 60 + minutes + minsToAdd;
        setHours(Math.floor(totalMins / 60));
        setMinutes(totalMins % 60);
    };

    const [materials, setMaterials] = useState({
        pdf: false,
        videoaula: false,
        questoes: false,
        leiSeca: false,
        resumoProprio: false
    });

    const toggleMaterial = (key) => setMaterials((prev) => ({ ...prev, [key]: !prev[key] }));

    const [questionsDone, setQuestionsDone] = useState(0);
    const [questionsCorrect, setQuestionsCorrect] = useState(0);

    const accuracyRate = questionsDone > 0
        ? Math.min(100, Math.round((questionsCorrect / questionsDone) * 100))
        : null;

    const [revisoes, setRevisoes] = useState({
        r24h: true,
        r7d: true,
        r15d: false,
        r30d: true,
        r60d: false,
        r90d: false
    });
    const [blockRevision, setBlockRevision] = useState(true);

    const toggleRevisao = (key) => setRevisoes((prev) => ({ ...prev, [key]: !prev[key] }));

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFinalizar = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const chosenTopic = topicsList.find((t) => String(t.id) === String(topicId));
        const totalMinutes = Number(hours) * 60 + Number(minutes);

        const payload = {
            disciplineId: disciplineId || null,
            disciplineName: currentDiscipline?.name || 'Estudo Geral',
            topicId: topicId || null,
            topicName: isSpecificGoal
                ? selectedGoal.topicName
                : (chosenTopic?.name || 'Assunto Geral'),
            studyType: studyType || 'Teoria',
            durationMinutes: Math.max(1, totalMinutes),
            formattedTime: `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`,
            materials,
            questionsDone,
            questionsCorrect,
            accuracyRate,
            revisoes,
            blockRevision
        };

        setTimeout(() => {
            onSaveStudy(payload);
            setIsSubmitting(false);
            onClose();
        }, 400);
    };

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 bg-neutral/60 backdrop-blur-xs animate-in fade-in duration-150 font-['Plus_Jakarta_Sans'] select-none">
            <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

            <div
                className="relative z-10 bg-base-100 border border-base-300 rounded-[20px] w-full max-w-[640px] shadow-2xl flex flex-col max-h-[88vh] overflow-hidden text-base-content"
                onClick={(e) => e.stopPropagation()}
            >
                {/* HEADER FIXO */}
                <header className="px-7 pt-6 pb-4 border-b border-base-200/80 flex justify-between items-center shrink-0 bg-base-100">
                    <div className="flex items-center gap-3.5">
                        <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 shadow-2xs">
                            <BookOpen size={18} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-base-content tracking-tight leading-snug">
                                Registrar Estudo
                            </h2>
                            <p className="text-xs text-neutral-content font-medium mt-0.5">
                                Preencha os dados da sessão e configure as revisões
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-content hover:text-base-content hover:bg-base-200 transition-colors cursor-pointer"
                        title="Fechar"
                    >
                        <X size={18} />
                    </button>
                </header>

                {/* CORPO DO FORMULÁRIO COM CUSTOM SELECTS */}
                <form
                    id="register-study-form"
                    onSubmit={handleFinalizar}
                    className="px-7 py-5 overflow-y-auto space-y-6 flex-1 bg-base-100"
                >
                    {/* BLOCO 1: DADOS ESSENCIAIS (CUSTOM SELECTS ENCLOSED 44PX) */}
                    <div className="space-y-4">
                        {/* Disciplina */}
                        <CustomSelect
                            label="Disciplina"
                            placeholder="Selecione uma disciplina..."
                            value={disciplineId}
                            options={availableDisciplines}
                            disabled={isSpecificGoal}
                            onChange={(newDiscId) => {
                                setDisciplineId(newDiscId);
                                setTopicId('');
                            }}
                        />

                        {/* Assunto / Tópico */}
                        <CustomSelect
                            label="Assunto / Tópico"
                            placeholder={disciplineId ? "Selecione um assunto..." : "Selecione a disciplina primeiro..."}
                            value={topicId}
                            options={topicsList}
                            disabled={isSpecificGoal || !disciplineId}
                            onChange={(newTopicId) => setTopicId(newTopicId)}
                        />

                        {/* Grid 2 Colunas: Tipo de Estudo & Tempo Líquido */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                            <CustomSelect
                                label="Tipo de estudo"
                                placeholder="Selecione o tipo..."
                                value={studyType}
                                options={[
                                    { id: 'Teoria', name: 'Teoria' },
                                    { id: 'Questões', name: 'Questões' },
                                    { id: 'Misto', name: 'Misto (Teoria + Questões)' },
                                    { id: 'Revisão', name: 'Revisão' },
                                    { id: 'Lei Seca', name: 'Lei Seca' }
                                ]}
                                onChange={(val) => setStudyType(val)}
                            />

                            {/* Tempo Líquido */}
                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                    <label className="text-xs font-semibold text-neutral-content">
                                        Tempo líquido
                                    </label>
                                    <div className="flex items-center gap-1">
                                        <button
                                            type="button"
                                            onClick={() => addQuickTime(15)}
                                            className="text-[10px] font-bold text-primary hover:bg-primary/10 px-1.5 py-0.5 rounded-md transition-colors cursor-pointer active:scale-95"
                                        >
                                            +15m
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => addQuickTime(30)}
                                            className="text-[10px] font-bold text-primary hover:bg-primary/10 px-1.5 py-0.5 rounded-md transition-colors cursor-pointer active:scale-95"
                                        >
                                            +30m
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => addQuickTime(60)}
                                            className="text-[10px] font-bold text-primary hover:bg-primary/10 px-1.5 py-0.5 rounded-md transition-colors cursor-pointer active:scale-95"
                                        >
                                            +1h
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between bg-base-100 hover:bg-base-200/30 border border-base-300/80 rounded-xl px-3.5 h-[44px] shadow-2xs focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15 transition-all">
                                    <div className="flex items-center gap-2">
                                        <Clock size={15} className="text-neutral-content shrink-0" />

                                        <select
                                            value={hours}
                                            onChange={(e) => setHours(Number(e.target.value))}
                                            className="bg-transparent font-mono font-bold text-xs outline-none cursor-pointer text-base-content appearance-none pr-1"
                                        >
                                            {Array.from({ length: 13 }, (_, i) => (
                                                <option key={i} value={i} className="bg-base-100 text-base-content font-sans">
                                                    {String(i).padStart(2, '0')}h
                                                </option>
                                            ))}
                                        </select>

                                        <span className="font-bold text-neutral-content">:</span>

                                        <select
                                            value={minutes}
                                            onChange={(e) => setMinutes(Number(e.target.value))}
                                            className="bg-transparent font-mono font-bold text-xs outline-none cursor-pointer text-base-content appearance-none"
                                        >
                                            {Array.from({ length: 60 }, (_, i) => (
                                                <option key={i} value={i} className="bg-base-100 text-base-content font-sans">
                                                    {String(i).padStart(2, '0')}min
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <ChevronDown size={14} className="text-neutral-content" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="h-px bg-base-200/80 my-1" />

                    {/* BLOCO 2: ANOTAÇÕES & CADERNOS */}
                    <div className="space-y-2.5">
                        <span className="text-xs font-semibold text-neutral-content tracking-wide block">
                            Anotações & Cadernos
                        </span>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="bg-base-100 border border-base-300 hover:border-rose-300 p-3.5 rounded-xl flex items-center justify-between gap-3 transition-all group shadow-2xs cursor-pointer hover:bg-base-200/30">
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="w-8 h-8 rounded-lg bg-rose-50 border border-rose-200/80 flex items-center justify-center text-rose-600 shrink-0">
                                        <FileText size={16} />
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="font-bold text-xs text-base-content group-hover:text-rose-600 transition-colors truncate">
                                            Caderno de Erros
                                        </h4>
                                        <p className="text-[11px] text-neutral-content truncate">
                                            Pegadinhas e erros
                                        </p>
                                    </div>
                                </div>
                                <span className="text-xs font-bold text-primary group-hover:translate-x-0.5 flex items-center gap-0.5 transition-transform shrink-0">
                                    Editar →
                                </span>
                            </div>

                            <div className="bg-base-100 border border-base-300 hover:border-primary/40 p-3.5 rounded-xl flex items-center justify-between gap-3 transition-all group shadow-2xs cursor-pointer hover:bg-base-200/30">
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                                        <PenTool size={16} />
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="font-bold text-xs text-base-content group-hover:text-primary transition-colors truncate">
                                            Resumo da Matéria
                                        </h4>
                                        <p className="text-[11px] text-neutral-content truncate">
                                            Pontos-chave e mapas
                                        </p>
                                    </div>
                                </div>
                                <span className="text-xs font-bold text-primary group-hover:translate-x-0.5 flex items-center gap-0.5 transition-transform shrink-0">
                                    Editar →
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="h-px bg-base-200/80 my-1" />

                    {/* BLOCO 3: MATERIAL & DESEMPENHO EM QUESTÕES */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                        <div className="md:col-span-7 space-y-2">
                            <span className="text-xs font-semibold text-neutral-content tracking-wide block">
                                Material utilizado
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                                {[
                                    { key: 'pdf', label: 'PDF' },
                                    { key: 'videoaula', label: 'Videoaula' },
                                    { key: 'questoes', label: 'Questões' },
                                    { key: 'leiSeca', label: 'Lei Seca' },
                                    { key: 'resumoProprio', label: 'Resumo Próprio' }
                                ].map((item) => {
                                    const isSelected = materials[item.key];
                                    return (
                                        <button
                                            key={item.key}
                                            type="button"
                                            onClick={() => toggleMaterial(item.key)}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all active:scale-95 cursor-pointer ${isSelected
                                                    ? 'bg-primary text-primary-content font-semibold shadow-xs'
                                                    : 'bg-base-200/60 border border-base-300 text-neutral-content hover:text-base-content hover:bg-base-200'
                                                }`}
                                        >
                                            {item.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="md:col-span-5 space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold text-neutral-content tracking-wide">
                                    Desempenho
                                </span>

                                {accuracyRate !== null && (
                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-success/15 text-success animate-in fade-in zoom-in-95 duration-150">
                                        <Sparkles size={10} />
                                        Taxa: {accuracyRate}%
                                    </span>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-2.5">
                                <div className="space-y-1">
                                    <span className="text-[11px] text-neutral-content font-medium block">Feitas</span>
                                    <div className="bg-base-200/50 border border-base-300 rounded-xl p-1 flex items-center justify-between">
                                        <button
                                            type="button"
                                            onClick={() => setQuestionsDone((prev) => Math.max(0, prev - 1))}
                                            className="w-7 h-7 rounded-lg bg-base-100 hover:bg-base-300 text-neutral-content hover:text-base-content flex items-center justify-center font-bold shadow-2xs active:scale-95"
                                        >
                                            <Minus size={12} />
                                        </button>
                                        <span className="font-mono text-xs font-bold text-base-content tabular-nums px-1">
                                            {questionsDone}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => setQuestionsDone((prev) => prev + 1)}
                                            className="w-7 h-7 rounded-lg bg-base-100 hover:bg-base-300 text-neutral-content hover:text-base-content flex items-center justify-center font-bold shadow-2xs active:scale-95"
                                        >
                                            <Plus size={12} />
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <span className="text-[11px] text-neutral-content font-medium block">Acertos</span>
                                    <div className="bg-base-200/50 border border-base-300 rounded-xl p-1 flex items-center justify-between">
                                        <button
                                            type="button"
                                            onClick={() => setQuestionsCorrect((prev) => Math.max(0, prev - 1))}
                                            className="w-7 h-7 rounded-lg bg-base-100 hover:bg-base-300 text-neutral-content hover:text-base-content flex items-center justify-center font-bold shadow-2xs active:scale-95"
                                        >
                                            <Minus size={12} />
                                        </button>
                                        <span className="font-mono text-xs font-bold text-primary tabular-nums px-1">
                                            {questionsCorrect}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => setQuestionsCorrect((prev) => Math.min(questionsDone + 1, prev + 1))}
                                            className="w-7 h-7 rounded-lg bg-base-100 hover:bg-base-300 text-neutral-content hover:text-base-content flex items-center justify-center font-bold shadow-2xs active:scale-95"
                                        >
                                            <Plus size={12} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="h-px bg-base-200/80 my-1" />

                    {/* BLOCO 4: REVISÃO ESPAÇADA & REVISÃO EM BLOCO */}
                    <div className="space-y-3">
                        <span className="text-xs font-semibold text-neutral-content tracking-wide block">
                            Agendamento de revisões periódicas
                        </span>

                        <div className="flex flex-wrap gap-1.5">
                            {[
                                { key: 'r24h', label: '24 horas' },
                                { key: 'r7d', label: '7 dias' },
                                { key: 'r15d', label: '15 dias' },
                                { key: 'r30d', label: '30 dias' },
                                { key: 'r60d', label: '60 dias' },
                                { key: 'r90d', label: '90 dias' }
                            ].map((item) => {
                                const isSelected = revisoes[item.key];
                                return (
                                    <button
                                        key={item.key}
                                        type="button"
                                        onClick={() => toggleRevisao(item.key)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all active:scale-95 cursor-pointer ${isSelected
                                                ? 'bg-primary text-primary-content font-semibold shadow-xs'
                                                : 'bg-base-200/60 border border-base-300 text-neutral-content hover:text-base-content hover:bg-base-200'
                                            }`}
                                    >
                                        {item.label}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="bg-base-200/50 border border-base-300/80 rounded-xl p-3.5 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                                    <Layers size={16} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-xs text-base-content">
                                        Agendar revisão em bloco
                                    </h4>
                                    <p className="text-[11px] text-neutral-content">
                                        Dispara revisão automática a cada 3 tópicos desta matéria
                                    </p>
                                </div>
                            </div>

                            <input
                                type="checkbox"
                                checked={blockRevision}
                                onChange={(e) => setBlockRevision(e.target.checked)}
                                className="toggle toggle-primary toggle-sm cursor-pointer"
                            />
                        </div>
                    </div>
                </form>

                {/* RODAPÉ FIXO */}
                <footer className="px-7 py-4 border-t border-base-200/80 flex items-center justify-end gap-3 shrink-0 bg-base-100 rounded-b-[20px]">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="h-[42px] px-4 rounded-xl text-xs font-semibold text-neutral-content hover:text-base-content hover:bg-base-200 transition-colors cursor-pointer disabled:opacity-50"
                    >
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        form="register-study-form"
                        disabled={isSubmitting}
                        className="h-[42px] px-6 rounded-xl text-xs font-bold bg-primary text-primary-content hover:bg-primary/90 shadow-md shadow-primary/20 flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 size={16} className="animate-spin" />
                                <span>Salvando...</span>
                            </>
                        ) : (
                            <span>Registrar Estudo</span>
                        )}
                    </button>
                </footer>
            </div>
        </div>,
        document.body
    );
}