// src/pages/ConfiguracoesPage.jsx
import React, { useState } from 'react';
import {
    Sliders,
    Tag,
    Bell,
    Clock,
    Volume2,
    Calendar,
    Sparkles,
    Plus,
    Save,
    CheckCircle2,
    Flame,
    TrendingUp,
} from 'lucide-react';

const DIAS_SEMANA = [
    { key: 'dom', label: 'Dom', full: 'Domingo' },
    { key: 'seg', label: 'Seg', full: 'Segunda' },
    { key: 'ter', label: 'Ter', full: 'Terça' },
    { key: 'qua', label: 'Qua', full: 'Quarta' },
    { key: 'qui', label: 'Qui', full: 'Quinta' },
    { key: 'sex', label: 'Sex', full: 'Sexta' },
    { key: 'sab', label: 'Sáb', full: 'Sábado' },
];

const CORES_PALETA = [
    { value: 'bg-purple-600 text-white', label: 'Roxo' },
    { value: 'bg-rose-500 text-white', label: 'Rosa' },
    { value: 'bg-red-500 text-white', label: 'Vermelho' },
    { value: 'bg-emerald-500 text-white', label: 'Verde' },
    { value: 'bg-blue-500 text-white', label: 'Azul' },
    { value: 'bg-amber-500 text-white', label: 'Laranja' },
    { value: 'bg-indigo-600 text-white', label: 'Índigo' },
    { value: 'bg-slate-700 text-white', label: 'Cinza' },
    { value: 'bg-cyan-600 text-white', label: 'Ciano' },
];

export default function ConfiguracoesPage() {
    const [activeTab, setActiveTab] = useState('preferencias'); // 'preferencias' | 'categorias' | 'notificacoes'
    const [salvo, setSalvo] = useState(false);

    // 1. DIAS DE ESTUDO & ROTINA
    const [diasEstudo, setDiasEstudo] = useState(['seg', 'ter', 'qua', 'qui', 'sex', 'sab']);
    const [primeiroDiaSemana, setPrimeiroDiaSemana] = useState('domingo');
    const [fusoHorario, setFusoHorario] = useState('America/Sao_Paulo');

    // 2. CLASSIFICAÇÃO DE DESEMPENHO (RÉGUA DE METAS)
    const [corteRuim, setCorteRuim] = useState(65);
    const [corteRegular, setCorteRegular] = useState(75);

    // 3. INTERVALOS DE REVISÃO ESPAÇADA
    const [intervalosRevisao, setIntervalosRevisao] = useState(['1d', '7d', '30d', '60d', '120d']);
    const [novoIntervalo, setNovoIntervalo] = useState('');
    const [showAddIntervalo, setShowAddIntervalo] = useState(false);

    // 4. SOM DO TIMER
    const [somTimer, setSomTimer] = useState('melodia1');
    const [isTocandoSom, setIsTocandoSom] = useState(false);

    // 5. CATEGORIAS FIXAS & PERSONALIZADAS
    const [categoriasFixas, setCategoriasFixas] = useState([
        { id: 'teoria', nome: 'TEORIA', cor: 'bg-blue-500 text-white' },
        { id: 'revisao', nome: 'REVISÃO', cor: 'bg-amber-500 text-white' },
        { id: 'questoes', nome: 'QUESTÕES', cor: 'bg-emerald-500 text-white' },
        { id: 'simulados', nome: 'SIMULADOS', cor: 'bg-purple-600 text-white' },
        { id: 'atrasada', nome: 'ATRASADA', cor: 'bg-red-500 text-white' }
    ]);
    const [editingFixedCat, setEditingFixedCat] = useState(null);

    const [categoriasCustom, setCategoriasCustom] = useState([
        { id: 'c1', nome: 'LEI SECA', cor: 'bg-amber-500 text-white' },
        { id: 'c2', nome: 'JURISPRUDÊNCIA', cor: 'bg-indigo-600 text-white' },
        { id: 'c3', nome: 'REDAÇÃO DISCURSIVA', cor: 'bg-teal-600 text-white' }
    ]);
    const [novaCategoriaNome, setNovaCategoriaNome] = useState('');
    const [novaCategoriaCor, setNovaCategoriaCor] = useState('bg-slate-700 text-white');
    const [showAddCategoria, setShowAddCategoria] = useState(false);

    // 6. NOTIFICAÇÕES INTELIGENTES
    const [notificacoes, setNotificacoes] = useState({
        constancia: true,
        revisao: true,
        feedback: true
    });

    const toggleDia = (key) => {
        setDiasEstudo((prev) =>
            prev.includes(key) ? prev.filter((d) => d !== key) : [...prev, key]
        );
    };

    const handleAddIntervalo = (e) => {
        e?.preventDefault();
        if (!novoIntervalo.trim()) return;
        const val = novoIntervalo.trim().toLowerCase().endsWith('d') ? novoIntervalo.trim() : `${novoIntervalo.trim()}d`;
        if (!intervalosRevisao.includes(val)) {
            setIntervalosRevisao([...intervalosRevisao, val]);
        }
        setNovoIntervalo('');
        setShowAddIntervalo(false);
    };

    const handleRemoveIntervalo = (item) => {
        setIntervalosRevisao(intervalosRevisao.filter((i) => i !== item));
    };

    const handleAddCategoria = (e) => {
        e?.preventDefault();
        if (!novaCategoriaNome.trim()) return;
        const nova = {
            id: `cust-${Date.now()}`,
            nome: novaCategoriaNome.trim().toUpperCase(),
            cor: novaCategoriaCor
        };
        setCategoriasCustom([...categoriasCustom, nova]);
        setNovaCategoriaNome('');
        setShowAddCategoria(false);
    };

    const handleRemoveCategoria = (id) => {
        setCategoriasCustom(categoriasCustom.filter((c) => c.id !== id));
    };

    const playSampleSound = () => {
        setIsTocandoSom(true);
        setTimeout(() => setIsTocandoSom(false), 1200);
    };

    const handleSave = (e) => {
        e?.preventDefault();
        setSalvo(true);
        setTimeout(() => setSalvo(false), 3000);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-200 font-['Plus_Jakarta_Sans'] max-w-5xl mx-auto pb-12 pt-4">
            
            {/* Mensagem de Sucesso Flutuante */}
            {salvo && (
                <div className="badge badge-success text-white font-bold gap-2 py-3 px-4 animate-in fade-in slide-in-from-top-2 absolute top-6 right-6 z-50 shadow-lg text-sm rounded-xl">
                    <CheckCircle2 size={18} /> Preferências salvas com sucesso!
                </div>
            )}

            {/* Menu de Abas Estilo Bento */}
            <div className="flex items-center gap-3 border-b border-base-200 pb-3">
                <button
                    type="button"
                    onClick={() => setActiveTab('preferencias')}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                        activeTab === 'preferencias'
                            ? 'bg-primary text-primary-content shadow-md'
                            : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
                    }`}
                >
                    <Sliders size={18} /> Preferências de Estudo
                </button>

                <button
                    type="button"
                    onClick={() => setActiveTab('categorias')}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                        activeTab === 'categorias'
                            ? 'bg-primary text-primary-content shadow-md'
                            : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
                    }`}
                >
                    <Tag size={18} /> Categorias & Tags
                </button>

                <button
                    type="button"
                    onClick={() => setActiveTab('notificacoes')}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                        activeTab === 'notificacoes'
                            ? 'bg-primary text-primary-content shadow-md'
                            : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
                    }`}
                >
                    <Bell size={18} /> Notificações & Lembretes
                </button>
            </div>

            {/* ════════════════════════════════════════════════════════════════
                ABA 1: PREFERÊNCIAS DE ESTUDO
            ════════════════════════════════════════════════════════════════ */}
            {activeTab === 'preferencias' && (
                <form onSubmit={handleSave} className="space-y-6 animate-in fade-in">
                    
                    {/* 1. Dias de Estudo */}
                    <div className="rounded-[24px] border border-base-300/80 bg-base-100 p-8 shadow-sm space-y-6">
                        <div className="flex items-center justify-between border-b border-base-200 pb-4">
                            <div className="flex items-center gap-3">
                                <Calendar size={20} className="text-primary" />
                                <h3 className="text-base font-bold text-base-content">Dias de Estudo da Semana</h3>
                            </div>
                            <span className="text-sm text-slate-400 font-medium">
                                {diasEstudo.length} dias selecionados
                            </span>
                        </div>

                        <div className="grid grid-cols-7 gap-3 sm:gap-4">
                            {DIAS_SEMANA.map((dia) => {
                                const ativo = diasEstudo.includes(dia.key);
                                return (
                                    <button
                                        key={dia.key}
                                        type="button"
                                        onClick={() => toggleDia(dia.key)}
                                        className={`py-4 rounded-2xl text-sm font-bold transition-all cursor-pointer flex flex-col items-center justify-center gap-2 border ${
                                            ativo
                                                ? 'bg-primary text-primary-content border-primary shadow-md'
                                                : 'bg-slate-50 text-slate-400 border-base-200 hover:border-slate-300 hover:bg-slate-100'
                                        }`}
                                    >
                                        <span className="text-sm">{dia.label}</span>
                                        <span className={`w-2 h-2 rounded-full ${ativo ? 'bg-white' : 'bg-slate-300'}`} />
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* 2. Régua de Classificação de Desempenho */}
                    <div className="rounded-[24px] border border-base-300/80 bg-base-100 p-8 shadow-sm space-y-6">
                        <div className="flex items-center justify-between border-b border-base-200 pb-4">
                            <div className="flex items-center gap-3">
                                <TrendingUp size={20} className="text-secondary" />
                                <h3 className="text-base font-bold text-base-content">Classificação de Desempenho (% Acertos)</h3>
                            </div>
                            <span className="text-sm text-slate-400">Personalize as faixas de corte</span>
                        </div>

                        {/* Barra Visual Colorida */}
                        <div className="space-y-4">
                            <div className="h-6 rounded-xl overflow-hidden flex font-bold text-sm text-white text-center leading-6 shadow-inner">
                                <div style={{ width: `${corteRuim}%` }} className="bg-rose-500 transition-all">
                                    Ruim (&lt;{corteRuim}%)
                                </div>
                                <div style={{ width: `${corteRegular - corteRuim}%` }} className="bg-amber-500 transition-all">
                                    Regular
                                </div>
                                <div style={{ width: `${100 - corteRegular}%` }} className="bg-emerald-500 transition-all">
                                    Bom (&gt;{corteRegular}%)
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6 pt-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-600 flex items-center justify-between">
                                        <span>Limite Superior para "Ruim"</span>
                                        <span className="text-rose-600 font-extrabold">{corteRuim}%</span>
                                    </label>
                                    <input
                                        type="range"
                                        min="30"
                                        max="75"
                                        value={corteRuim}
                                        onChange={(e) => {
                                            const v = Number(e.target.value);
                                            if (v < corteRegular) setCorteRuim(v);
                                        }}
                                        className="range range-sm range-error"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-600 flex items-center justify-between">
                                        <span>Limite Superior para "Regular"</span>
                                        <span className="text-amber-600 font-extrabold">{corteRegular}%</span>
                                    </label>
                                    <input
                                        type="range"
                                        min={corteRuim + 1}
                                        max="95"
                                        value={corteRegular}
                                        onChange={(e) => setCorteRegular(Number(e.target.value))}
                                        className="range range-sm range-warning"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. Períodos das Revisões Espaçadas */}
                    <div className="rounded-[24px] border border-base-300/80 bg-base-100 p-8 shadow-sm space-y-6">
                        <div className="flex items-center justify-between border-b border-base-200 pb-4">
                            <div className="flex items-center gap-3">
                                <Clock size={20} className="text-accent" />
                                <h3 className="text-base font-bold text-base-content">Período dos Ciclos de Revisão</h3>
                            </div>
                            <span className="text-sm text-slate-400">Curva de Esquecimento / Repetição</span>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            {intervalosRevisao.map((intervalo) => {
                                const num = intervalo.replace(/\D/g, '');
                                const label = num === '1' ? '1 DIA' : (num ? `${num} DIAS` : intervalo.toUpperCase());
                                return (
                                <div
                                    key={intervalo}
                                    className="group flex items-center gap-2 bg-slate-50 border border-base-300 text-base-content px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:border-primary/50 transition-all uppercase tracking-wider"
                                >
                                    <span>{label}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveIntervalo(intervalo)}
                                        className="text-slate-400 hover:text-rose-500 cursor-pointer ml-2"
                                        title="Remover ciclo"
                                    >
                                        &times;
                                    </button>
                                </div>
                            )})}

                            {showAddIntervalo ? (
                                <div className="flex items-center gap-2 animate-in fade-in">
                                    <input
                                        type="text"
                                        value={novoIntervalo}
                                        onChange={(e) => setNovoIntervalo(e.target.value)}
                                        placeholder="Ex: 90d"
                                        className="input bg-slate-50 border-primary w-24 rounded-xl text-sm font-bold text-center h-10"
                                        autoFocus
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddIntervalo}
                                        className="btn btn-primary rounded-xl font-bold h-10 min-h-10 px-4"
                                    >
                                        Adicionar
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowAddIntervalo(false)}
                                        className="btn btn-ghost rounded-xl text-slate-500 h-10 min-h-10 px-4"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => setShowAddIntervalo(true)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-dashed border-primary/50 text-primary hover:bg-primary/10 hover:border-primary text-sm font-bold transition-all cursor-pointer"
                                >
                                    <Plus size={16} /> Adicionar Ciclo
                                </button>
                            )}
                        </div>
                    </div>

                    {/* 4. Ajustes Regionais & Áudio */}
                    <div className="rounded-[24px] border border-base-300/80 bg-base-100 p-8 shadow-sm space-y-6">
                        <h3 className="text-base font-bold text-base-content border-b border-base-200 pb-4 flex items-center gap-3">
                            <Volume2 size={20} className="text-primary" /> Cronômetro, Região e Áudio
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-600">Primeiro Dia da Semana</label>
                                <select
                                    value={primeiroDiaSemana}
                                    onChange={(e) => setPrimeiroDiaSemana(e.target.value)}
                                    className="select w-full bg-slate-50 border-base-300 rounded-xl text-sm font-semibold text-base-content focus:border-primary focus:bg-white h-12"
                                >
                                    <option value="domingo">Domingo</option>
                                    <option value="segunda">Segunda-feira</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-600">Som do Alarme do Timer</label>
                                <div className="flex items-center gap-2">
                                    <select
                                        value={somTimer}
                                        onChange={(e) => setSomTimer(e.target.value)}
                                        className="select w-full bg-slate-50 border-base-300 rounded-xl text-sm font-semibold text-base-content focus:border-primary focus:bg-white h-12"
                                    >
                                        <option value="melodia1">Melodia Suave 1</option>
                                        <option value="melodia2">Sino Tibetano Zen</option>
                                        <option value="digital">Beep Digital Clássico</option>
                                        <option value="vibra">Discreto / Sem Som</option>
                                    </select>
                                    <button
                                        type="button"
                                        onClick={playSampleSound}
                                        className={`btn btn-outline rounded-xl shrink-0 h-12 w-12 p-0 ${isTocandoSom ? 'btn-primary' : ''}`}
                                        title="Ouvir som de teste"
                                    >
                                        <Volume2 size={18} className={isTocandoSom ? 'animate-bounce' : ''} />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-600">Fuso Horário</label>
                                <select
                                    value={fusoHorario}
                                    onChange={(e) => setFusoHorario(e.target.value)}
                                    className="select w-full bg-slate-50 border-base-300 rounded-xl text-sm font-semibold text-base-content focus:border-primary focus:bg-white h-12"
                                >
                                    <option value="America/Sao_Paulo">(UTC-03:00) Brasília / São Paulo</option>
                                    <option value="America/Manaus">(UTC-04:00) Manaus / Boa Vista</option>
                                    <option value="America/Rio_Branco">(UTC-05:00) Acre</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            className="btn btn-primary rounded-xl px-8 font-bold text-sm gap-2 shadow-sm hover:bg-primary/90 cursor-pointer h-12"
                        >
                            <Save size={18} /> Salvar Todas as Preferências
                        </button>
                    </div>
                </form>
            )}

            {/* ════════════════════════════════════════════════════════════════
                ABA 2: CATEGORIAS & TAGS
            ════════════════════════════════════════════════════════════════ */}
            {activeTab === 'categorias' && (
                <div className="space-y-6 animate-in fade-in">
                    {/* Categorias Fixas */}
                    <div className="rounded-[24px] border border-base-300/80 bg-base-100 p-8 shadow-sm space-y-6">
                        <div className="flex items-center justify-between border-b border-base-200 pb-4">
                            <div className="flex items-center gap-3">
                                <Tag size={20} className="text-primary" />
                                <h3 className="text-base font-bold text-base-content">Categorias Padrão do Sistema</h3>
                            </div>
                            <span className="text-sm text-slate-400 font-medium">Tipos estruturais de estudo</span>
                        </div>

                        <div className="flex flex-wrap items-center gap-4">
                            {categoriasFixas.map((cat) => (
                                <div key={cat.id} className="relative">
                                    <button
                                        type="button"
                                        onClick={() => setEditingFixedCat(editingFixedCat === cat.id ? null : cat.id)}
                                        className={`group relative px-5 py-2.5 rounded-xl text-sm font-black tracking-wider uppercase shadow-md cursor-pointer overflow-hidden transition-transform active:scale-95 ${cat.cor}`}
                                        title="Clique para alterar a cor"
                                    >
                                        <span className="group-hover:opacity-0 transition-opacity">{cat.nome}</span>
                                        <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 text-white text-sm">
                                            MUDAR COR
                                        </span>
                                    </button>

                                    {/* Popover Flutuante */}
                                    {editingFixedCat === cat.id && (
                                        <div className="absolute top-full left-0 mt-3 z-50 bg-base-100 rounded-2xl shadow-xl border border-base-300 p-4 w-[180px] animate-in fade-in slide-in-from-top-2 duration-150">
                                            <div className="flex justify-between items-center mb-3 pb-2 border-b border-base-200">
                                                <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Cor</span>
                                                <button type="button" onClick={() => setEditingFixedCat(null)} className="text-slate-400 hover:text-slate-600 text-sm cursor-pointer">✕</button>
                                            </div>
                                            <div className="grid grid-cols-3 gap-3">
                                                {CORES_PALETA.map(cor => (
                                                    <button
                                                        key={cor.value}
                                                        type="button"
                                                        onClick={() => {
                                                            const novas = categoriasFixas.map(c => c.id === cat.id ? { ...c, cor: cor.value } : c);
                                                            setCategoriasFixas(novas);
                                                            setEditingFixedCat(null);
                                                        }}
                                                        className={`w-8 h-8 mx-auto rounded-full cursor-pointer transition-all hover:scale-110 flex items-center justify-center shadow-sm border-2 ${cat.cor === cor.value ? 'border-primary scale-110' : 'border-transparent'} ${cor.value.split(' ')[0]}`}
                                                        title={cor.label}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Categorias Personalizadas */}
                    <div className="rounded-[24px] border border-base-300/80 bg-base-100 p-8 shadow-sm space-y-6">
                        <div className="flex items-center justify-between border-b border-base-200 pb-4">
                            <div>
                                <h3 className="text-base font-bold text-base-content mb-1">Categorias Personalizadas</h3>
                                <p className="text-sm text-slate-500">Crie tags adicionais para categorizar sessões e filtros</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowAddCategoria(true)}
                                className="btn btn-primary rounded-xl font-bold gap-2 shadow-sm px-5 h-12"
                            >
                                <Plus size={16} /> Nova Categoria
                            </button>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            {categoriasCustom.map((cat) => (
                                <div
                                    key={cat.id}
                                    className={`group flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold shadow-sm ${cat.cor}`}
                                >
                                    <span>{cat.nome}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveCategoria(cat.id)}
                                        className="opacity-70 hover:opacity-100 cursor-pointer ml-2"
                                        title="Remover tag"
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Modal/Form inline para adicionar categoria */}
                        {showAddCategoria && (
                            <form onSubmit={handleAddCategoria} className="p-5 rounded-2xl bg-slate-50 border border-base-300 space-y-4 animate-in fade-in mt-4">
                                <h4 className="text-sm font-bold text-base-content">Adicionar Nova Categoria</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="sm:col-span-2 space-y-2">
                                        <label className="text-sm font-bold text-slate-600">Nome da Categoria</label>
                                        <input
                                            type="text"
                                            value={novaCategoriaNome}
                                            onChange={(e) => setNovaCategoriaNome(e.target.value)}
                                            placeholder="Ex: ESTUDO DE CASO"
                                            className="input w-full bg-white border-base-300 rounded-xl text-sm font-bold h-12"
                                            autoFocus
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-600">Cor do Badge</label>
                                        <div className="flex items-center gap-3 h-12 bg-white px-3 rounded-xl border border-base-300">
                                            {CORES_PALETA.map(cor => (
                                                <button
                                                    key={cor.value}
                                                    type="button"
                                                    onClick={() => setNovaCategoriaCor(cor.value)}
                                                    className={`w-6 h-6 rounded-full cursor-pointer transition-all ${novaCategoriaCor === cor.value ? 'ring-2 ring-primary ring-offset-2 scale-110' : 'hover:scale-110'} ${cor.value.split(' ')[0]}`}
                                                    title={cor.label}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowAddCategoria(false)}
                                        className="btn btn-ghost rounded-xl h-12 px-6"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary rounded-xl font-bold h-12 px-6"
                                    >
                                        Salvar Categoria
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}

            {/* ════════════════════════════════════════════════════════════════
                ABA 3: NOTIFICAÇÕES & LEMBRETES
            ════════════════════════════════════════════════════════════════ */}
            {activeTab === 'notificacoes' && (
                <form onSubmit={handleSave} className="space-y-6 animate-in fade-in">
                    
                    <div className="rounded-[24px] border border-base-300/80 bg-base-100 p-8 shadow-sm space-y-5">
                        <div className="flex items-center justify-between border-b border-base-200 pb-4">
                            <div className="flex items-center gap-3">
                                <Bell size={20} className="text-primary" />
                                <h3 className="text-base font-bold text-base-content">Tipos de Notificações</h3>
                            </div>
                            <span className="text-sm text-slate-400 font-medium">Alertas no navegador e e-mail</span>
                        </div>

                        {/* Card 1: Constância */}
                        <label className="flex items-start justify-between p-5 rounded-2xl bg-slate-50 border border-base-200 hover:bg-slate-100/70 transition-colors cursor-pointer gap-4">
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <Flame size={18} className="text-accent" />
                                    <span className="text-sm font-bold text-base-content">Constância & Streak</span>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed font-normal">
                                    Lembretes diários para manter o ritmo dos seus estudos e criar uma rotina consistente e inabalável.
                                </p>
                            </div>
                            <input
                                type="checkbox"
                                checked={notificacoes.constancia}
                                onChange={(e) => setNotificacoes({ ...notificacoes, constancia: e.target.checked })}
                                className="checkbox checkbox-primary mt-1"
                            />
                        </label>

                        {/* Card 2: Revisão */}
                        <label className="flex items-start justify-between p-5 rounded-2xl bg-slate-50 border border-base-200 hover:bg-slate-100/70 transition-colors cursor-pointer gap-4">
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <Clock size={18} className="text-secondary" />
                                    <span className="text-sm font-bold text-base-content">Revisão Espaçada</span>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed font-normal">
                                    Notificações inteligentes para revisar tópicos e questões exatamente no momento ideal da sua curva de retenção.
                                </p>
                            </div>
                            <input
                                type="checkbox"
                                checked={notificacoes.revisao}
                                onChange={(e) => setNotificacoes({ ...notificacoes, revisao: e.target.checked })}
                                className="checkbox checkbox-primary mt-1"
                            />
                        </label>

                        {/* Card 3: Feedback & Insights */}
                        <label className="flex items-start justify-between p-5 rounded-2xl bg-slate-50 border border-base-200 hover:bg-slate-100/70 transition-colors cursor-pointer gap-4">
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <Sparkles size={18} className="text-primary" />
                                    <span className="text-sm font-bold text-base-content">Feedback & IA Insights</span>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed font-normal">
                                    Mensagens com insights, diagnósticos de retenção e sugestões sobre seu rendimento semanal.
                                </p>
                            </div>
                            <input
                                type="checkbox"
                                checked={notificacoes.feedback}
                                onChange={(e) => setNotificacoes({ ...notificacoes, feedback: e.target.checked })}
                                className="checkbox checkbox-primary mt-1"
                            />
                        </label>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            className="btn btn-primary rounded-xl px-8 font-bold text-sm gap-2 shadow-sm hover:bg-primary/90 cursor-pointer h-12"
                        >
                            <Save size={18} /> Salvar Notificações
                        </button>
                    </div>
                </form>
            )}

        </div>
    );
}
