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
    Trash2,
    Save,
    CheckCircle2,
    Flame,
    TrendingUp,
    Play,
    Globe
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
    const [categoriasFixas] = useState([
        { id: 'teoria', nome: 'TEORIA', cor: 'bg-purple-600 text-white' },
        { id: 'revisao', nome: 'REVISÃO', cor: 'bg-rose-500 text-white' },
        { id: 'questoes', nome: 'QUESTÕES', cor: 'bg-emerald-500 text-white' },
        { id: 'simulados', nome: 'SIMULADOS', cor: 'bg-blue-500 text-white' }
    ]);

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
        <div className="space-y-6 animate-in fade-in duration-200 font-['Plus_Jakarta_Sans'] max-w-5xl mx-auto pb-12">
            {/* Header da Página */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-black text-base-content tracking-tight">Configurações & Preferências</h1>
                    <p className="text-xs text-slate-500 font-medium">Personalize os algoritmos de revisão, categorias, métricas e sons do sistema</p>
                </div>
                {salvo && (
                    <div className="badge badge-success text-white font-bold gap-1.5 py-2 px-3 animate-in fade-in">
                        <CheckCircle2 size={14} /> Preferências salvas com sucesso!
                    </div>
                )}
            </div>

            {/* Menu de Abas Estilo Bento */}
            <div className="flex items-center gap-2 border-b border-base-200 pb-2">
                <button
                    type="button"
                    onClick={() => setActiveTab('preferencias')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        activeTab === 'preferencias'
                            ? 'bg-primary text-primary-content shadow-xs'
                            : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
                    }`}
                >
                    <Sliders size={15} /> Preferências de Estudo
                </button>

                <button
                    type="button"
                    onClick={() => setActiveTab('categorias')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        activeTab === 'categorias'
                            ? 'bg-primary text-primary-content shadow-xs'
                            : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
                    }`}
                >
                    <Tag size={15} /> Categorias & Tags
                </button>

                <button
                    type="button"
                    onClick={() => setActiveTab('notificacoes')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        activeTab === 'notificacoes'
                            ? 'bg-primary text-primary-content shadow-xs'
                            : 'text-slate-500 hover:bg-slate-100 hover:text-slate-700'
                    }`}
                >
                    <Bell size={15} /> Notificações & Lembretes
                </button>
            </div>

            {/* ════════════════════════════════════════════════════════════════
                ABA 1: PREFERÊNCIAS DE ESTUDO
            ════════════════════════════════════════════════════════════════ */}
            {activeTab === 'preferencias' && (
                <form onSubmit={handleSave} className="space-y-6 animate-in fade-in">
                    
                    {/* 1. Dias de Estudo */}
                    <div className="rounded-[22px] border border-base-300/80 bg-base-100 p-6 shadow-sm space-y-4">
                        <div className="flex items-center justify-between border-b border-base-200 pb-3">
                            <div className="flex items-center gap-2">
                                <Calendar size={17} className="text-primary" />
                                <h3 className="text-sm font-bold text-base-content">Dias de Estudo da Semana</h3>
                            </div>
                            <span className="text-xs text-slate-400 font-medium">
                                {diasEstudo.length} dias selecionados
                            </span>
                        </div>

                        <div className="grid grid-cols-7 gap-2 sm:gap-3">
                            {DIAS_SEMANA.map((dia) => {
                                const ativo = diasEstudo.includes(dia.key);
                                return (
                                    <button
                                        key={dia.key}
                                        type="button"
                                        onClick={() => toggleDia(dia.key)}
                                        className={`py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer flex flex-col items-center justify-center gap-1 border ${
                                            ativo
                                                ? 'bg-primary text-primary-content border-primary shadow-xs'
                                                : 'bg-slate-50 text-slate-400 border-base-200 hover:border-slate-300'
                                        }`}
                                    >
                                        <span className="text-xs sm:text-sm">{dia.label}</span>
                                        <span className={`w-1.5 h-1.5 rounded-full ${ativo ? 'bg-white' : 'bg-slate-300'}`} />
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* 2. Régua de Classificação de Desempenho */}
                    <div className="rounded-[22px] border border-base-300/80 bg-base-100 p-6 shadow-sm space-y-4">
                        <div className="flex items-center justify-between border-b border-base-200 pb-3">
                            <div className="flex items-center gap-2">
                                <TrendingUp size={17} className="text-secondary" />
                                <h3 className="text-sm font-bold text-base-content">Classificação de Desempenho (% Acertos)</h3>
                            </div>
                            <span className="text-xs text-slate-400">Personalize as faixas de corte</span>
                        </div>

                        {/* Barra Visual Colorida */}
                        <div className="space-y-2">
                            <div className="h-4 rounded-xl overflow-hidden flex font-bold text-[10px] text-white text-center leading-4 shadow-inner">
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

                            <div className="grid grid-cols-2 gap-4 pt-3">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-600 flex items-center justify-between">
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
                                        className="range range-xs range-error"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-600 flex items-center justify-between">
                                        <span>Limite Superior para "Regular"</span>
                                        <span className="text-amber-600 font-extrabold">{corteRegular}%</span>
                                    </label>
                                    <input
                                        type="range"
                                        min={corteRuim + 1}
                                        max="95"
                                        value={corteRegular}
                                        onChange={(e) => setCorteRegular(Number(e.target.value))}
                                        className="range range-xs range-warning"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. Períodos das Revisões Espaçadas */}
                    <div className="rounded-[22px] border border-base-300/80 bg-base-100 p-6 shadow-sm space-y-4">
                        <div className="flex items-center justify-between border-b border-base-200 pb-3">
                            <div className="flex items-center gap-2">
                                <Clock size={17} className="text-accent" />
                                <h3 className="text-sm font-bold text-base-content">Período dos Ciclos de Revisão</h3>
                            </div>
                            <span className="text-[11px] text-slate-400">Curva de Esquecimento / Repetição</span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2.5">
                            {intervalosRevisao.map((intervalo) => (
                                <div
                                    key={intervalo}
                                    className="group flex items-center gap-1.5 bg-slate-50 border border-base-300 text-base-content px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-2xs hover:border-primary/50 transition-all"
                                >
                                    <span>{intervalo}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveIntervalo(intervalo)}
                                        className="text-slate-400 hover:text-rose-500 cursor-pointer ml-1"
                                        title="Remover ciclo"
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}

                            {showAddIntervalo ? (
                                <div className="flex items-center gap-1.5 animate-in fade-in">
                                    <input
                                        type="text"
                                        value={novoIntervalo}
                                        onChange={(e) => setNovoIntervalo(e.target.value)}
                                        placeholder="Ex: 90d"
                                        className="input input-xs bg-slate-50 border-primary w-20 rounded-lg text-xs font-bold text-center"
                                        autoFocus
                                    />
                                    <button
                                        type="button"
                                        onClick={handleAddIntervalo}
                                        className="btn btn-xs btn-primary rounded-lg font-bold"
                                    >
                                        Adicionar
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowAddIntervalo(false)}
                                        className="btn btn-xs btn-ghost rounded-lg text-slate-400"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => setShowAddIntervalo(true)}
                                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-dashed border-primary text-primary hover:bg-primary/10 text-xs font-bold transition-all cursor-pointer"
                                >
                                    <Plus size={13} /> Adicionar Ciclo
                                </button>
                            )}
                        </div>
                    </div>

                    {/* 4. Ajustes Regionais & Áudio */}
                    <div className="rounded-[22px] border border-base-300/80 bg-base-100 p-6 shadow-sm space-y-4">
                        <h3 className="text-sm font-bold text-base-content border-b border-base-200 pb-3 flex items-center gap-2">
                            <Volume2 size={17} className="text-primary" /> Cronômetro, Região e Áudio
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-600">Primeiro Dia da Semana</label>
                                <select
                                    value={primeiroDiaSemana}
                                    onChange={(e) => setPrimeiroDiaSemana(e.target.value)}
                                    className="select select-sm w-full bg-slate-50 border-base-300 rounded-xl text-xs font-semibold text-base-content focus:border-primary focus:bg-white"
                                >
                                    <option value="domingo">Domingo</option>
                                    <option value="segunda">Segunda-feira</option>
                                </select>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-600">Som do Alarme do Timer</label>
                                <div className="flex items-center gap-2">
                                    <select
                                        value={somTimer}
                                        onChange={(e) => setSomTimer(e.target.value)}
                                        className="select select-sm w-full bg-slate-50 border-base-300 rounded-xl text-xs font-semibold text-base-content focus:border-primary focus:bg-white"
                                    >
                                        <option value="melodia1">Melodia Suave 1</option>
                                        <option value="melodia2">Sino Tibetano Zen</option>
                                        <option value="digital">Beep Digital Clássico</option>
                                        <option value="vibra">Discreto / Sem Som</option>
                                    </select>
                                    <button
                                        type="button"
                                        onClick={playSampleSound}
                                        className={`btn btn-sm btn-outline rounded-xl shrink-0 ${isTocandoSom ? 'btn-primary' : ''}`}
                                        title="Ouvir som de teste"
                                    >
                                        <Volume2 size={14} className={isTocandoSom ? 'animate-bounce' : ''} />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-600">Fuso Horário</label>
                                <select
                                    value={fusoHorario}
                                    onChange={(e) => setFusoHorario(e.target.value)}
                                    className="select select-sm w-full bg-slate-50 border-base-300 rounded-xl text-xs font-semibold text-base-content focus:border-primary focus:bg-white"
                                >
                                    <option value="America/Sao_Paulo">(UTC-03:00) Brasília / São Paulo</option>
                                    <option value="America/Manaus">(UTC-04:00) Manaus / Boa Vista</option>
                                    <option value="America/Rio_Branco">(UTC-05:00) Acre</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end pt-2">
                        <button
                            type="submit"
                            className="btn btn-sm btn-primary rounded-xl px-6 font-bold text-xs gap-2 shadow-sm hover:bg-primary/90 cursor-pointer"
                        >
                            <Save size={14} /> Salvar Todas as Preferências
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
                    <div className="rounded-[22px] border border-base-300/80 bg-base-100 p-6 shadow-sm space-y-4">
                        <div className="flex items-center justify-between border-b border-base-200 pb-3">
                            <div className="flex items-center gap-2">
                                <Tag size={17} className="text-primary" />
                                <h3 className="text-sm font-bold text-base-content">Categorias Padrão do Sistema</h3>
                            </div>
                            <span className="text-[11px] text-slate-400 font-medium">Tipos estruturais de estudo</span>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            {categoriasFixas.map((cat) => (
                                <div
                                    key={cat.id}
                                    className={`px-4 py-2 rounded-xl text-xs font-black tracking-wider uppercase shadow-xs ${cat.cor}`}
                                >
                                    {cat.nome}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Categorias Personalizadas */}
                    <div className="rounded-[22px] border border-base-300/80 bg-base-100 p-6 shadow-sm space-y-4">
                        <div className="flex items-center justify-between border-b border-base-200 pb-3">
                            <div>
                                <h3 className="text-sm font-bold text-base-content">Categorias Personalizadas</h3>
                                <p className="text-[11px] text-slate-400">Crie tags adicionais para categorizar sessões e filtros</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setShowAddCategoria(true)}
                                className="btn btn-xs btn-primary rounded-xl font-bold gap-1 shadow-2xs"
                            >
                                <Plus size={13} /> Nova Categoria
                            </button>
                        </div>

                        <div className="flex flex-wrap items-center gap-2.5">
                            {categoriasCustom.map((cat) => (
                                <div
                                    key={cat.id}
                                    className={`group flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-xs ${cat.cor}`}
                                >
                                    <span>{cat.nome}</span>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveCategoria(cat.id)}
                                        className="opacity-70 hover:opacity-100 cursor-pointer ml-1"
                                        title="Remover tag"
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Modal/Form inline para adicionar categoria */}
                        {showAddCategoria && (
                            <form onSubmit={handleAddCategoria} className="p-4 rounded-2xl bg-slate-50 border border-base-300 space-y-3 animate-in fade-in">
                                <h4 className="text-xs font-bold text-base-content">Adicionar Nova Categoria</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    <div className="sm:col-span-2 space-y-1">
                                        <label className="text-[11px] font-bold text-slate-600">Nome da Categoria</label>
                                        <input
                                            type="text"
                                            value={novaCategoriaNome}
                                            onChange={(e) => setNovaCategoriaNome(e.target.value)}
                                            placeholder="Ex: ESTUDO DE CASO"
                                            className="input input-sm w-full bg-white border-base-300 rounded-xl text-xs font-bold"
                                            autoFocus
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[11px] font-bold text-slate-600">Cor do Badge</label>
                                        <select
                                            value={novaCategoriaCor}
                                            onChange={(e) => setNovaCategoriaCor(e.target.value)}
                                            className="select select-sm w-full bg-white border-base-300 rounded-xl text-xs font-bold"
                                        >
                                            <option value="bg-slate-700 text-white">Cinza Escuro</option>
                                            <option value="bg-cyan-600 text-white">Ciano</option>
                                            <option value="bg-pink-600 text-white">Rosa</option>
                                            <option value="bg-amber-600 text-white">Laranja Queimado</option>
                                            <option value="bg-emerald-600 text-white">Verde Floresta</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-2 pt-1">
                                    <button
                                        type="button"
                                        onClick={() => setShowAddCategoria(false)}
                                        className="btn btn-xs btn-ghost rounded-xl"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-xs btn-primary rounded-xl font-bold"
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
                <form onSubmit={handleSave} className="space-y-4 animate-in fade-in">
                    
                    <div className="rounded-[22px] border border-base-300/80 bg-base-100 p-6 shadow-sm space-y-4">
                        <div className="flex items-center justify-between border-b border-base-200 pb-3">
                            <div className="flex items-center gap-2">
                                <Bell size={17} className="text-primary" />
                                <h3 className="text-sm font-bold text-base-content">Tipos de Notificações</h3>
                            </div>
                            <span className="text-[11px] text-slate-400 font-medium">Alertas no navegador e e-mail</span>
                        </div>

                        {/* Card 1: Constância */}
                        <label className="flex items-start justify-between p-4 rounded-2xl bg-slate-50 border border-base-200 hover:bg-slate-100/70 transition-colors cursor-pointer gap-3">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <Flame size={16} className="text-accent" />
                                    <span className="text-xs font-bold text-base-content">Constância & Streak</span>
                                </div>
                                <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
                                    Lembretes diários para manter o ritmo dos seus estudos e criar uma rotina consistente e inabalável.
                                </p>
                            </div>
                            <input
                                type="checkbox"
                                checked={notificacoes.constancia}
                                onChange={(e) => setNotificacoes({ ...notificacoes, constancia: e.target.checked })}
                                className="checkbox checkbox-sm checkbox-primary mt-1"
                            />
                        </label>

                        {/* Card 2: Revisão */}
                        <label className="flex items-start justify-between p-4 rounded-2xl bg-slate-50 border border-base-200 hover:bg-slate-100/70 transition-colors cursor-pointer gap-3">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <Clock size={16} className="text-secondary" />
                                    <span className="text-xs font-bold text-base-content">Revisão Espaçada</span>
                                </div>
                                <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
                                    Notificações inteligentes para revisar tópicos e questões exatamente no momento ideal da sua curva de retenção.
                                </p>
                            </div>
                            <input
                                type="checkbox"
                                checked={notificacoes.revisao}
                                onChange={(e) => setNotificacoes({ ...notificacoes, revisao: e.target.checked })}
                                className="checkbox checkbox-sm checkbox-primary mt-1"
                            />
                        </label>

                        {/* Card 3: Feedback & Insights */}
                        <label className="flex items-start justify-between p-4 rounded-2xl bg-slate-50 border border-base-200 hover:bg-slate-100/70 transition-colors cursor-pointer gap-3">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <Sparkles size={16} className="text-primary" />
                                    <span className="text-xs font-bold text-base-content">Feedback & IA Insights</span>
                                </div>
                                <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
                                    Mensagens com insights, diagnósticos de retenção e sugestões sobre seu rendimento semanal.
                                </p>
                            </div>
                            <input
                                type="checkbox"
                                checked={notificacoes.feedback}
                                onChange={(e) => setNotificacoes({ ...notificacoes, feedback: e.target.checked })}
                                className="checkbox checkbox-sm checkbox-primary mt-1"
                            />
                        </label>
                    </div>

                    <div className="flex justify-end pt-2">
                        <button
                            type="submit"
                            className="btn btn-sm btn-primary rounded-xl px-6 font-bold text-xs gap-2 shadow-sm hover:bg-primary/90 cursor-pointer"
                        >
                            <Save size={14} /> Salvar Notificações
                        </button>
                    </div>
                </form>
            )}

        </div>
    );
}
