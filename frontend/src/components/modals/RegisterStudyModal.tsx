import React, { useState } from 'react';
import {
    X, BookOpen, Clock, Sparkles, ChevronRight,
    FileWarning, PenLine, Minus, Plus, CalendarCheck2, ChevronDown, Check
} from 'lucide-react';
import { useRegisterStudyForm } from '../../hooks/useRegisterStudyForm';
import { STUDY_MATERIALS, REVISION_CYCLES } from '../../utils/studyConstants';
import NotebookEditorModal from './NotebookEditorModal';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Discipline } from '../../types/study';

const toTitleCase = (str: string) => {
    if (!str) return '';
    return str
        .toLowerCase()
        .split(' ')
        .map(word => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ');
};

interface RegisterStudyModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialTime?: { hours: number; minutes: number };
    recordedTime?: string;
    initialData?: Record<string, any>;
    onSave?: (data: any) => void;
}

const INITIAL_DISCIPLINAS: Discipline[] = [
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
];

export default function RegisterStudyModal({
    isOpen,
    onClose,
    initialTime = { hours: 0, minutes: 0 },
    recordedTime,
    initialData,
    onSave
}: RegisterStudyModalProps) {
    const [activeNotebook, setActiveNotebook] = useState<string | null>(null);
    const [storedDisciplinas] = useLocalStorage<Discipline[]>('@papyrus:disciplines', INITIAL_DISCIPLINAS);
    const disciplinas = Array.isArray(storedDisciplinas) && storedDisciplinas.length > 0 ? storedDisciplinas : INITIAL_DISCIPLINAS;

    const [disciplinaFocus, setDisciplinaFocus] = useState(false);
    const [topicoFocus, setTopicoFocus] = useState(false);

    const {
        disciplina, setDisciplina,
        topico, setTopico,
        tipoEstudo, setTipoEstudo,
        dataEstudo, setDataEstudo,
        horas,
        minutos,
        materiais,
        questoesFeitas,
        acertos,
        revisoes,
        agendarEmBloco, setAgendarEmBloco,
        teoriaFinalizada, setTeoriaFinalizada,
        isSaving,
        adicionarTempo,
        alternarCiclo,
        alternarMaterial,
        incrementarQuestoes,
        incrementarAcertos,
        setQuestoesFeitas,
        setAcertos,
        handleSalvar,
        taxaAcertos
    } = useRegisterStudyForm({
        isOpen, recordedTime, initialTime, initialData, onSave: (data) => {
            onSave?.(data);
            onClose();
        }
    });

    const safeDisciplina = (disciplina || '').trim().toLowerCase();
    const safeTopico = (topico || '').trim().toLowerCase();

    const selectedDiscipline = disciplinas.find(d => (d?.name || '').trim().toLowerCase() === safeDisciplina);
    const availableTopics = selectedDiscipline && Array.isArray(selectedDiscipline.topics) ? selectedDiscipline.topics : [];

    const isDisciplinaExactMatch = safeDisciplina === '' || disciplinas.some(d => (d?.name || '').trim().toLowerCase() === safeDisciplina);
    const filteredDisciplinas = isDisciplinaExactMatch
        ? disciplinas
        : disciplinas.filter(d => (d?.name || '').trim().toLowerCase().includes(safeDisciplina));

    const isTopicoExactMatch = safeTopico === '' || availableTopics.some(t => (t?.name || '').trim().toLowerCase() === safeTopico);
    const filteredTopicos = isTopicoExactMatch
        ? availableTopics
        : availableTopics.filter(t => (t?.name || '').trim().toLowerCase().includes(safeTopico));

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4 animate-in fade-in duration-150">
            <div className="bg-white w-full max-w-3xl rounded-2xl shadow-[0_24px_80px_-12px_rgba(0,0,0,0.18)] flex flex-col max-h-[92vh] overflow-hidden border border-slate-200/80">
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
                        className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer mt-0.5 transform-gpu"
                    >
                        <X size={15} />
                    </button>
                </header>

                <div className="px-8 py-6 overflow-y-auto flex-1 space-y-6 bg-slate-50/40">
                    <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-sm">
                        <div className="relative">
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                                Disciplina
                            </label>
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    placeholder="Qual matéria você estudou?"
                                    value={disciplina}
                                    onChange={(e) => {
                                        setDisciplina(e.target.value);
                                        setTopico('');
                                    }}
                                    onFocus={() => setDisciplinaFocus(true)}
                                    onBlur={() => setTimeout(() => setDisciplinaFocus(false), 200)}
                                    className="input w-full bg-slate-50 text-slate-700 font-medium rounded-xl border border-slate-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/15 text-sm h-11 transition-colors duration-150 pr-10 cursor-pointer"
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 text-slate-400 hover:text-blue-500 cursor-pointer transform-gpu"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setDisciplinaFocus(!disciplinaFocus);
                                    }}
                                >
                                    <ChevronDown size={16} className={`transition-transform duration-200 ${disciplinaFocus ? 'rotate-180' : ''}`} />
                                </button>
                            </div>
                            {disciplinaFocus && filteredDisciplinas.length > 0 && (
                                <ul className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl max-h-48 overflow-y-auto">
                                    {filteredDisciplinas.map((d) => (
                                        <li
                                            key={d.id}
                                            onMouseDown={(e) => {
                                                e.preventDefault();
                                                setDisciplina(toTitleCase(d.name));
                                                setTopico('');
                                                setDisciplinaFocus(false);
                                            }}
                                            className="px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium cursor-pointer transition-colors border-b border-slate-50 last:border-0"
                                        >
                                            {toTitleCase(d.name)}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className="relative">
                            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                                Assunto / Tópico
                            </label>
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    placeholder="Qual assunto / tópico?"
                                    value={topico}
                                    onChange={(e) => setTopico(e.target.value)}
                                    onFocus={() => setTopicoFocus(true)}
                                    onBlur={() => setTimeout(() => setTopicoFocus(false), 200)}
                                    className="input w-full bg-slate-50 text-slate-700 font-medium rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/15 text-sm h-11 transition-colors duration-150 pr-10 cursor-pointer"
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 text-slate-400 hover:text-blue-500 transform-gpu"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setTopicoFocus(!topicoFocus);
                                    }}
                                >
                                    <ChevronDown size={16} className={`transition-transform duration-200 ${topicoFocus ? 'rotate-180' : ''}`} />
                                </button>
                            </div>
                            {topicoFocus && filteredTopicos.length > 0 && (
                                <ul className="absolute z-50 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl max-h-48 overflow-y-auto">
                                    {filteredTopicos.map((t) => (
                                        <li
                                            key={t.id}
                                            onMouseDown={(e) => {
                                                e.preventDefault();
                                                setTopico(toTitleCase(t.name));
                                                setTopicoFocus(false);
                                            }}
                                            className="px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium cursor-pointer transition-colors border-b border-slate-50 last:border-0"
                                        >
                                            {toTitleCase(t.name)}
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {/* Teoria Finalizada Checkbox */}
                            <label className="mt-3 ml-1 flex items-center gap-2 cursor-pointer w-fit group">
                                <div className={`w-3.5 h-3.5 rounded-[3px] border flex items-center justify-center transition-colors ${teoriaFinalizada ? 'bg-emerald-500 border-emerald-500' : 'bg-white border-slate-300 group-hover:border-slate-400'}`}>
                                    {teoriaFinalizada && <Check size={10} className="text-white" strokeWidth={3} />}
                                </div>
                                <span className={`text-[10px] font-bold uppercase tracking-widest select-none mt-[1px] ${teoriaFinalizada ? 'text-slate-800' : 'text-slate-500'}`}>
                                    Teoria Finalizada
                                </span>
                                <input
                                    type="checkbox"
                                    className="hidden"
                                    checked={teoriaFinalizada}
                                    onChange={(e) => setTeoriaFinalizada(e.target.checked)}
                                />
                            </label>
                        </div>
                    </div>

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
                                            className="px-3 py-1 rounded-full bg-white border border-blue-200 text-blue-500 font-bold text-[11px] active:scale-95 cursor-pointer shadow-sm transform-gpu"
                                        >
                                            {l}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 flex-wrap pt-3 border-t border-blue-100/50">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-blue-400 whitespace-nowrap">
                                Data do estudo
                            </label>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => setDataEstudo(new Date().toISOString().split('T')[0])}
                                    className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors cursor-pointer ${dataEstudo === new Date().toISOString().split('T')[0] ? 'bg-blue-500 text-white shadow-sm' : 'bg-white text-blue-500 border border-blue-200 active:scale-95 hover:bg-blue-50'}`}
                                >
                                    Hoje
                                </button>
                                <input
                                    type="date"
                                    value={dataEstudo}
                                    onChange={(e) => setDataEstudo(e.target.value)}
                                    className="px-3 py-1 h-7 text-xs bg-white text-slate-700 font-semibold rounded-md border border-blue-200 focus:outline-none focus:border-blue-500 shadow-sm cursor-pointer hover:border-blue-400 transition-colors"
                                    max={new Date().toISOString().split('T')[0]}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between px-4 py-3.5 bg-white rounded-xl border border-blue-100 shadow-sm">
                            <div className="flex items-center gap-2.5 text-blue-500">
                                <Clock size={16} />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">
                                    Duração registrada
                                </span>
                            </div>
                            <span className="text-2xl font-medium text-slate-700 tracking-tight tabular-nums"
                                style={{ fontFeatureSettings: "'tnum' on" }}>
                                {String(horas).padStart(2, '0')}
                                <span className="text-sm text-slate-400 font-normal mx-1">h</span>
                                {String(minutos).padStart(2, '0')}
                                <span className="text-sm text-slate-400 font-normal ml-1">min</span>
                            </span>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-sm">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                            Anotações
                        </p>
                        <div className="grid grid-cols-1">
                            <button
                                type="button"
                                onClick={() => setActiveNotebook('Anotações')}
                                className="group flex items-center gap-3 p-4 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-slate-300 hover:shadow-md transition-colors duration-150 cursor-pointer text-left"
                            >
                                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                                    <PenLine size={18} className="text-blue-500" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <span className="block text-sm font-bold text-slate-800">Bloco de Anotações</span>
                                    <span className="block text-xs text-slate-400 mt-0.5 truncate">Registre observações, resumos ou dúvidas</span>
                                </div>
                                <span className="text-xs font-bold text-blue-500 flex items-center gap-0.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out">
                                    Editar
                                    <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform transform-gpu" />
                                </span>
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-sm">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                Material utilizado
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {STUDY_MATERIALS.map(({ id, label }) => {
                                    const on = materiais.includes(id);
                                    return (
                                        <button
                                            key={id}
                                            type="button"
                                            onClick={() => alternarMaterial(id)}
                                            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border active:scale-95 cursor-pointer transform-gpu ${on
                                                ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/25'
                                                : 'bg-slate-50 text-slate-600 border-slate-200'
                                                }`}
                                        >
                                            {label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-sm">
                            <div className="flex items-center justify-between">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                    Desempenho em questões
                                </p>
                                <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5">
                                    <Sparkles size={10} />
                                    Taxa: {taxaAcertos}%
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    {
                                        label: 'Feitas',
                                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                                            const val = e.target.value;
                                            setQuestoesFeitas(val === '' ? '' : Number(val));
                                        },
                                        value: questoesFeitas,
                                        onDec: () => incrementarQuestoes(-1),
                                        onInc: () => incrementarQuestoes(1),
                                        numClass: 'text-slate-800',
                                    },
                                    {
                                        label: 'Acertos',
                                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                                            const val = e.target.value;
                                            setAcertos(val === '' ? '' : Number(val));
                                        },
                                        value: acertos,
                                        onDec: () => incrementarAcertos(-1),
                                        onInc: () => (typeof acertos === 'number' ? acertos : 0) < (typeof questoesFeitas === 'number' ? questoesFeitas : 0) && incrementarAcertos(1),
                                        numClass: 'text-emerald-600',
                                    },
                                ].map(({ label, value, onDec, onInc, onChange, numClass }) => (
                                    <div key={label}>
                                        <span className="block text-[11px] font-semibold text-slate-400 mb-1.5">{label}</span>
                                        <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50 shadow-2xs">
                                            <button type="button" onClick={onDec}
                                                className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer border-r border-slate-200 transform-gpu">
                                                <Minus size={13} />
                                            </button>
                                            <input type="number"
                                                value={value}
                                                onChange={onChange}
                                                className={`flex-1 text-center text-base font-bold tabular-nums bg-white ${numClass} outline-none bg-transparent w-full [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]`}
                                                style={{ fontFeatureSettings: "'tnum' on" }}
                                            />
                                            <button type="button" onClick={onInc}
                                                className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer border-l border-slate-200 transform-gpu">
                                                <Plus size={13} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-sm">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                            Agendamento de revisões periódicas
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {REVISION_CYCLES.map(({ id, label }) => {
                                const on = revisoes.includes(id);
                                return (
                                    <button
                                        key={id}
                                        type="button"
                                        onClick={() => alternarCiclo(id)}
                                        className={`px-4 py-1.5 rounded-lg text-xs font-semibold border active:scale-95 cursor-pointer transform-gpu ${on
                                            ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/25'
                                            : 'bg-slate-50 text-slate-600 border-slate-200'
                                            }`}
                                    >
                                        {label}
                                    </button>
                                );
                            })}
                        </div>

                        <div
                            role="button"
                            tabIndex={0}
                            onClick={() => setAgendarEmBloco((v) => !v)}
                            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setAgendarEmBloco((v) => !v)}
                            className={`group flex items-center justify-between p-4 rounded-xl border cursor-pointer select-none outline-none transition-colors duration-200 ease-out focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 overflow-hidden relative ${agendarEmBloco
                                ? 'bg-blue-600 border-blue-600 shadow-md shadow-blue-500/25'
                                : 'bg-slate-50 border-slate-200'
                                }`}
                        >
                            <div className="flex items-center gap-3 relative z-10">
                                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 ${agendarEmBloco
                                    ? 'bg-blue-500/40'
                                    : 'bg-white border border-slate-200'
                                    }`}>
                                    <CalendarCheck2
                                        size={17}
                                        className={`transition-colors duration-300 ${agendarEmBloco ? 'text-white' : 'text-slate-400'}`}
                                    />
                                </div>
                                <div>
                                    <span className={`block text-sm font-bold transition-colors duration-300 ${agendarEmBloco ? 'text-white' : 'text-slate-800'}`}>
                                        Agendar revisão em bloco
                                    </span>
                                    <span className={`block text-[11px] mt-0.5 transition-colors duration-300 ${agendarEmBloco ? 'text-blue-200' : 'text-slate-400'}`}>
                                        Dispara revisão automática a cada 3 tópicos desta matéria
                                    </span>
                                </div>
                            </div>

                            <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-150 shrink-0 z-10 ${agendarEmBloco ? 'bg-white/30' : 'bg-slate-300'}`}>
                                <span className={`inline-block h-4 w-4 rounded-full transition-transform duration-200 ease-out shadow-sm bg-white transform-gpu ${agendarEmBloco
                                    ? 'translate-x-6'
                                    : 'translate-x-1'
                                    }`} />
                            </div>
                        </div>
                    </div>

                </div>

                <footer className="px-8 py-5 border-t border-slate-100 bg-white flex items-center justify-end gap-3 shrink-0">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-5 py-2 rounded-xl text-sm font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer transform-gpu"
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        onClick={handleSalvar}
                        disabled={isSaving}
                        className="px-6 py-2 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98] shadow-md shadow-blue-500/30 cursor-pointer min-w-[150px] transition-transform duration-200 ease-out disabled:opacity-70 flex items-center justify-center gap-2 transform-gpu"
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

            {/* Modal Secundário do Editor de Texto Rico */}
            <NotebookEditorModal
                isOpen={activeNotebook !== null}
                title={activeNotebook}
                onClose={() => setActiveNotebook(null)}
                onSave={(content) => {
                    console.log(`Salvou o ${activeNotebook}:`, content);
                }}
            />
        </div>
    );
}