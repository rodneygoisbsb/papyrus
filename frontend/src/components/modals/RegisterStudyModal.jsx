// src/components/modals/RegisterStudyModal.jsx
import React, { useState, useEffect } from 'react';
import {
    X,
    BookOpen,
    Clock,
    Sparkles,
    ChevronRight,
    Layers,
    FileWarning,
    PenLine,
    Minus,
    Plus,
    CalendarCheck2
} from 'lucide-react';

export default function RegisterStudyModal({
    isOpen,
    onClose,
    initialTime = { hours: 0, minutes: 0 },
    onSave
}) {
    // ─── Estados ─────────────────────────────────────────────────
    const [disciplina, setDisciplina] = useState('');
    const [topico, setTopico] = useState('');
    const [tipoEstudo, setTipoEstudo] = useState('Teoria');
    const [horas, setHoras] = useState(initialTime.hours ?? 0);
    const [minutos, setMinutos] = useState(initialTime.minutes ?? 0);

    const [materiais, setMateriais] = useState({
        pdf: false, videoaula: false, questoes: false,
        leiSeca: false, resumoProprio: false,
    });

    const [questoesFeitas, setQuestoesFeitas] = useState(0);
    const [acertos, setAcertos] = useState(0);
    const [revisoes, setRevisoes] = useState([]);
    const [agendarEmBloco, setAgendarEmBloco] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setHoras(initialTime.hours ?? 0);
            setMinutos(initialTime.minutes ?? 0);
            setDisciplina('');
            setTopico('');
            setTipoEstudo('Teoria');
            setMateriais({ pdf: false, videoaula: false, questoes: false, leiSeca: false, resumoProprio: false });
            setQuestoesFeitas(0);
            setAcertos(0);
            setRevisoes([]);
            setAgendarEmBloco(false);
            setIsSaving(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    // ─── Helpers ─────────────────────────────────────────────────
    const adicionarTempo = (m) => {
        const total = horas * 60 + minutos + m;
        setHoras(Math.floor(total / 60));
        setMinutos(total % 60);
    };

    const alternarCiclo = (ciclo) =>
        setRevisoes((p) => p.includes(ciclo) ? p.filter((c) => c !== ciclo) : [...p, ciclo]);

    const alternarMaterial = (k) =>
        setMateriais((p) => ({ ...p, [k]: !p[k] }));

    const taxa = questoesFeitas > 0 ? Math.round((acertos / questoesFeitas) * 100) : 0;

    const handleSalvar = () => {
        setIsSaving(true);
        setTimeout(() => {
            onSave?.({ disciplina, topico, tipoEstudo, horas, minutos, materiais, questoesFeitas, acertos, taxa, revisoes, agendarEmBloco });
            setIsSaving(false);
            onClose();
        }, 380);
    };

    const MATERIAIS = [
        { id: 'pdf', label: 'PDF' },
        { id: 'videoaula', label: 'Videoaula' },
        { id: 'questoes', label: 'Questões' },
        { id: 'leiSeca', label: 'Lei Seca' },
        { id: 'resumoProprio', label: 'Resumo Próprio' },
    ];

    const CICLOS = [
        { id: '24h', label: '24 horas' },
        { id: '7d', label: '7 dias' },
        { id: '15d', label: '15 dias' },
        { id: '30d', label: '30 dias' },
        { id: '60d', label: '60 dias' },
        { id: '90d', label: '90 dias' },
    ];

    /* ─────────────────────────────────────────────────────────── */
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4 animate-in fade-in duration-150">
            <div className="bg-white w-full max-w-3xl rounded-2xl shadow-[0_24px_80px_-12px_rgba(0,0,0,0.18)] flex flex-col max-h-[92vh] overflow-hidden border border-slate-200/80">

                {/* ══ CABEÇALHO com fundo gradiente sutil ════════════════ */}
                <header className="px-8 pt-7 pb-5 flex items-start justify-between border-b border-slate-100 shrink-0 bg-gradient-to-r from-blue-50/60 via-white to-white">
                    <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/30">
                            <BookOpen size={20} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-slate-900 tracking-tight leading-tight">
                                Registrar estudo
                            </h2>
                            <p className="text-[12px] text-slate-400 mt-0.5">
                                Preencha os dados da sessão e configure as revisões
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer mt-0.5"
                    >
                        <X size={15} />
                    </button>
                </header>

                {/* ══ CORPO ══════════════════════════════════════════════ */}
                <div className="px-8 py-6 overflow-y-auto flex-1 space-y-6 bg-slate-50/40">

                    {/* ── Disciplina & Assunto — fundo branco elevado ───── */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-sm">
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                                Disciplina
                            </label>
                            <select
                                value={disciplina}
                                onChange={(e) => setDisciplina(e.target.value)}
                                className="select w-full bg-slate-50 text-slate-700 font-medium rounded-xl border border-slate-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/15 text-sm h-11 transition-all"
                            >
                                <option value="">Selecione uma disciplina...</option>
                                <option>Direito Constitucional</option>
                                <option>Direito Administrativo</option>
                                <option>Língua Portuguesa</option>
                                <option>Banco de Dados</option>
                                <option>Engenharia de Software</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                                Assunto / Tópico
                            </label>
                            <select
                                value={topico}
                                onChange={(e) => setTopico(e.target.value)}
                                className="select w-full bg-slate-50 text-slate-700 font-medium rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/15 text-sm h-11 transition-all"
                            >
                                <option value="">Selecione um assunto...</option>
                                <option>Controle Concentrado de Constitucionalidade</option>
                                <option>Lei 8.112/90 — Regime Disciplinar</option>
                                <option>Emprego do Sinal Indicativo de Crase</option>
                                <option>Modelagem Entidade-Relacionamento</option>
                            </select>
                        </div>
                    </div>

                    {/* ── Tipo de estudo + Tempo — fundo azul suave ─────── */}
                    <div className="bg-blue-50/70 rounded-2xl border border-blue-100 p-5 space-y-3">
                        <div className="flex items-center justify-between gap-4 flex-wrap">
                            <div className="flex items-center gap-3">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-blue-400 whitespace-nowrap">
                                    Tipo de estudo
                                </label>
                                <select
                                    value={tipoEstudo}
                                    onChange={(e) => setTipoEstudo(e.target.value)}
                                    className="select select-sm bg-white text-slate-700 font-semibold rounded-lg border border-blue-200 focus:border-blue-500 focus:outline-none text-sm shadow-sm"
                                >
                                    <option>Teoria</option>
                                    <option>Revisão</option>
                                    <option>Questões</option>
                                    <option>Leitura de Lei</option>
                                </select>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">
                                    Adicionar tempo
                                </span>
                                <div className="flex items-center gap-1.5">
                                    {[{ l: '+15m', m: 15 }, { l: '+30m', m: 30 }, { l: '+1h', m: 60 }].map(({ l, m }) => (
                                        <button
                                            key={l}
                                            type="button"
                                            onClick={() => adicionarTempo(m)}
                                            className="px-3 py-1 rounded-full bg-white border border-blue-200 text-blue-500 hover:bg-blue-500 hover:text-white hover:border-blue-500 font-bold text-[11px] transition-all duration-150 active:scale-95 cursor-pointer shadow-sm"
                                        >
                                            {l}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Display do cronômetro */}
                        <div className="flex items-center justify-between px-4 py-3.5 bg-white rounded-xl border border-blue-100 shadow-sm">
                            <div className="flex items-center gap-2.5 text-blue-500">
                                <Clock size={16} />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">
                                    Duração registrada
                                </span>
                            </div>
                            <span className="text-2xl font-bold text-slate-800 tracking-tight tabular-nums"
                                style={{ fontFeatureSettings: "'tnum' on" }}>
                                {String(horas).padStart(2, '0')}
                                <span className="text-base text-slate-400 font-normal mx-1">h</span>
                                {String(minutos).padStart(2, '0')}
                                <span className="text-base text-slate-400 font-normal ml-1">min</span>
                            </span>
                        </div>
                    </div>

                    {/* ── Anotações — fundo branco com ícones coloridos ─── */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-sm">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                            Anotações & Cadernos
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                {
                                    icon: <FileWarning size={18} className="text-red-400" />,
                                    bg: 'bg-red-50 border border-red-100',
                                    title: 'Caderno de Erros',
                                    sub: 'Pegadinhas e questões erradas',
                                },
                                {
                                    icon: <PenLine size={18} className="text-emerald-500" />,
                                    bg: 'bg-emerald-50 border border-emerald-100',
                                    title: 'Resumo da Matéria',
                                    sub: 'Pontos-chave e mnemônicos',
                                },
                            ].map(({ icon, bg, title, sub }) => (
                                <button
                                    key={title}
                                    type="button"
                                    className="group flex items-center gap-3 p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-slate-300 hover:shadow-md transition-all duration-200 cursor-pointer text-left"
                                >
                                    <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
                                        {icon}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <span className="block text-sm font-bold text-slate-800">{title}</span>
                                        <span className="block text-xs text-slate-400 mt-0.5 truncate">{sub}</span>
                                    </div>
                                    <span className="text-xs font-bold text-blue-500 flex items-center gap-0.5 shrink-0 opacity-0 group-hover:opacity-100 transition-all">
                                        Editar
                                        <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ── Material + Desempenho ─────────────────────────── */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* Material Utilizado */}
                        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-sm">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                Material utilizado
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {MATERIAIS.map(({ id, label }) => {
                                    const on = materiais[id];
                                    return (
                                        <button
                                            key={id}
                                            type="button"
                                            onClick={() => alternarMaterial(id)}
                                            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-150 active:scale-95 cursor-pointer ${on
                                                ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/25'
                                                : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-600'
                                                }`}
                                        >
                                            {label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Desempenho */}
                        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-sm">
                            <div className="flex items-center justify-between">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                    Desempenho em questões
                                </p>
                                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5">
                                    <Sparkles size={10} />
                                    Taxa: {taxa}%
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    {
                                        label: 'Feitas',
                                        value: questoesFeitas,
                                        onDec: () => setQuestoesFeitas((v) => Math.max(0, v - 1)),
                                        onInc: () => setQuestoesFeitas((v) => v + 1),
                                        numClass: 'text-slate-800',
                                    },
                                    {
                                        label: 'Acertos',
                                        value: acertos,
                                        onDec: () => setAcertos((v) => Math.max(0, v - 1)),
                                        onInc: () => setAcertos((v) => Math.min(questoesFeitas, v + 1)),
                                        numClass: 'text-emerald-600',
                                    },
                                ].map(({ label, value, onDec, onInc, numClass }) => (
                                    <div key={label}>
                                        <span className="block text-[11px] font-semibold text-slate-400 mb-1.5">{label}</span>
                                        <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50 shadow-2xs">
                                            <button type="button" onClick={onDec}
                                                className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer border-r border-slate-200">
                                                <Minus size={13} />
                                            </button>
                                            <span className={`flex-1 text-center text-base font-bold tabular-nums bg-white ${numClass}`}
                                                style={{ fontFeatureSettings: "'tnum' on" }}>
                                                {value}
                                            </span>
                                            <button type="button" onClick={onInc}
                                                className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer border-l border-slate-200">
                                                <Plus size={13} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ── Revisões Periódicas ───────────────────────────── */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-sm">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                            Agendamento de revisões periódicas
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {CICLOS.map(({ id, label }) => {
                                const on = revisoes.includes(id);
                                return (
                                    <button
                                        key={id}
                                        type="button"
                                        onClick={() => alternarCiclo(id)}
                                        className={`px-4 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-150 active:scale-95 cursor-pointer ${on
                                            ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/25'
                                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-blue-400 hover:text-blue-600'
                                            }`}
                                    >
                                        {label}
                                    </button>
                                );
                            })}
                        </div>

                        {/* ── Agendar em Bloco — com estado visual ativo ── */}
                        <div
                            role="button"
                            tabIndex={0}
                            onClick={() => setAgendarEmBloco((v) => !v)}
                            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setAgendarEmBloco((v) => !v)}
                            className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer select-none outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${agendarEmBloco
                                ? 'bg-blue-600 border-blue-600 shadow-md shadow-blue-500/25'
                                : 'bg-slate-50 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                {/* Ícone muda de estado */}
                                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-200 ${agendarEmBloco
                                    ? 'bg-blue-500/40'
                                    : 'bg-white border border-slate-200'
                                    }`}>
                                    <CalendarCheck2
                                        size={17}
                                        className={`transition-colors duration-200 ${agendarEmBloco ? 'text-white' : 'text-slate-400'}`}
                                    />
                                </div>
                                <div>
                                    <span className={`block text-sm font-bold transition-colors duration-200 ${agendarEmBloco ? 'text-white' : 'text-slate-800'}`}>
                                        Agendar revisão em bloco
                                    </span>
                                    <span className={`block text-[11px] mt-0.5 transition-colors duration-200 ${agendarEmBloco ? 'text-blue-200' : 'text-slate-400'}`}>
                                        Dispara revisão automática a cada 3 tópicos desta matéria
                                    </span>
                                </div>
                            </div>

                            {/* Toggle pill CSS puro */}
                            <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 shrink-0 ${agendarEmBloco ? 'bg-white/30' : 'bg-slate-300'}`}>
                                <span className={`inline-block h-4 w-4 rounded-full transition-all duration-200 shadow-sm ${agendarEmBloco
                                    ? 'translate-x-6 bg-white'
                                    : 'translate-x-1 bg-white'
                                    }`} />
                            </div>
                        </div>
                    </div>

                </div>

                {/* ══ RODAPÉ ══════════════════════════════════════════════ */}
                <footer className="px-8 py-5 border-t border-slate-100 bg-white flex items-center justify-end gap-3 shrink-0">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-5 py-2 rounded-xl text-sm font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        onClick={handleSalvar}
                        disabled={isSaving}
                        className="px-6 py-2 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98] shadow-md shadow-blue-500/30 cursor-pointer min-w-[150px] transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                    >
                        {isSaving ? (
                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                            </svg>
                        ) : (
                            'Registrar estudo'
                        )}
                    </button>
                </footer>

            </div>
        </div>
    );
}