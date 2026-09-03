// src/pages/PerfilPage.jsx
import React, { useState } from 'react';
import {
    User,
    Mail,
    Lock,
    Shield,
    Trophy,
    Camera,
    Save,
    CheckCircle2,
    Eye,
    EyeOff,
    Sparkles,
    MapPin,
    Calendar,
    ChevronRight,
    Award
} from 'lucide-react';

export default function PerfilPage() {
    const [activeSection, setActiveSection] = useState('dados'); // 'dados' | 'ranking' | 'seguranca'
    const [salvo, setSalvo] = useState(false);

    // Estado dos dados pessoais
    const [dadosPessoais, setDadosPessoais] = useState({
        nome: 'Rodney',
        sobrenome: 'Góis',
        apelido: 'Rodney Gois',
        aniversario: '2000-01-01',
        genero: 'masculino',
        cidade: 'Brasília',
        uf: 'DF',
        email: 'rodneygoisofc@gmail.com',
        cargoAlvo: 'Oficial da PM-DF',
        biografia: 'Constância e disciplina. Rumo à aprovação!'
    });

    // Estado do ranking
    const [rankingConfig, setRankingConfig] = useState({
        participarRanking: true,
        nomeExibicao: 'Rodney Gois',
        exibirHoras: true,
        exibirQuestoes: true
    });

    // Estado de segurança
    const [seguranca, setSeguranca] = useState({
        senhaAtual: '',
        novaSenha: '',
        confirmarSenha: '',
        autenticacaoDoisFatores: true
    });
    const [showSenhaAtual, setShowSenhaAtual] = useState(false);
    const [showNovaSenha, setShowNovaSenha] = useState(false);

    const handleSalvar = (e) => {
        e?.preventDefault();
        setSalvo(true);
        setTimeout(() => setSalvo(false), 3000);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-200 font-['Plus_Jakarta_Sans'] max-w-5xl mx-auto pb-12">
            {/* Header da Página */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-black text-base-content tracking-tight">Minha Conta & Perfil</h1>
                    <p className="text-xs text-slate-500 font-medium">Gerencie suas informações de concurseiro, privacidade e acesso</p>
                </div>
                {salvo && (
                    <div className="badge badge-success text-white font-bold gap-1.5 py-2 px-3 animate-in fade-in">
                        <CheckCircle2 size={14} /> Alterações salvas com sucesso!
                    </div>
                )}
            </div>

            {/* Layout Principal: 2 Colunas */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                {/* Coluna Esquerda: Card de Identidade + Menu Rápido (4 cols) */}
                <div className="lg:col-span-4 space-y-4">
                    
                    {/* Card de Identidade */}
                    <div className="rounded-[22px] border border-base-300/80 bg-base-100 p-6 shadow-sm flex flex-col items-center text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-r from-primary/15 via-blue-100 to-primary/10" />
                        
                        {/* Avatar */}
                        <div className="relative mt-4 mb-3 group cursor-pointer">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-primary to-blue-400 text-white flex items-center justify-center text-2xl font-black shadow-md border-4 border-white">
                                {dadosPessoais.nome.charAt(0)}{dadosPessoais.sobrenome.charAt(0)}
                            </div>
                            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                <Camera size={18} />
                            </div>
                        </div>

                        <h2 className="text-sm font-black text-base-content leading-tight">
                            {dadosPessoais.nome} {dadosPessoais.sobrenome}
                        </h2>
                        <p className="text-xs text-slate-400 font-medium">{dadosPessoais.email}</p>

                        <div className="flex items-center gap-1.5 mt-2">
                            <span className="badge badge-sm bg-primary/10 text-primary border-primary/20 font-bold px-2.5 py-2 rounded-lg">
                                Concurseiro PRO
                            </span>
                            <span className="badge badge-sm bg-emerald-50 text-emerald-700 border-emerald-200 font-bold px-2.5 py-2 rounded-lg">
                                {dadosPessoais.cargoAlvo}
                            </span>
                        </div>

                        <div className="w-full pt-4 mt-4 border-t border-base-200 text-left space-y-2 text-xs">
                            <div className="flex items-center justify-between text-slate-500">
                                <span className="flex items-center gap-1.5"><MapPin size={13} className="text-slate-400" /> Localização</span>
                                <span className="font-bold text-base-content">{dadosPessoais.cidade}, {dadosPessoais.uf}</span>
                            </div>
                            <div className="flex items-center justify-between text-slate-500">
                                <span className="flex items-center gap-1.5"><Calendar size={13} className="text-slate-400" /> Membro desde</span>
                                <span className="font-bold text-base-content">Jan/2026</span>
                            </div>
                        </div>
                    </div>

                    {/* Navegação entre seções da conta */}
                    <div className="rounded-[22px] border border-base-300/80 bg-base-100 p-2 shadow-sm space-y-1">
                        <button
                            type="button"
                            onClick={() => setActiveSection('dados')}
                            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                activeSection === 'dados'
                                    ? 'bg-primary text-primary-content shadow-xs'
                                    : 'text-slate-600 hover:bg-slate-50'
                            }`}
                        >
                            <div className="flex items-center gap-2.5">
                                <User size={16} />
                                <span>Dados Pessoais</span>
                            </div>
                            <ChevronRight size={14} className={activeSection === 'dados' ? 'text-white' : 'text-slate-400'} />
                        </button>

                        <button
                            type="button"
                            onClick={() => setActiveSection('ranking')}
                            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                activeSection === 'ranking'
                                    ? 'bg-primary text-primary-content shadow-xs'
                                    : 'text-slate-600 hover:bg-slate-50'
                            }`}
                        >
                            <div className="flex items-center gap-2.5">
                                <Trophy size={16} className="text-amber-500" />
                                <span>Ranking & Visibilidade</span>
                            </div>
                            <span className="badge badge-xs bg-amber-100 text-amber-800 font-extrabold px-1.5 py-1 rounded">NOVO</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setActiveSection('seguranca')}
                            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                activeSection === 'seguranca'
                                    ? 'bg-primary text-primary-content shadow-xs'
                                    : 'text-slate-600 hover:bg-slate-50'
                            }`}
                        >
                            <div className="flex items-center gap-2.5">
                                <Lock size={16} />
                                <span>Segurança & Senha</span>
                            </div>
                            <ChevronRight size={14} className={activeSection === 'seguranca' ? 'text-white' : 'text-slate-400'} />
                        </button>
                    </div>

                </div>

                {/* Coluna Direita: Formulários Ativos (8 cols) */}
                <div className="lg:col-span-8">
                    
                    {/* SEÇÃO 1: DADOS PESSOAIS */}
                    {activeSection === 'dados' && (
                        <form onSubmit={handleSalvar} className="rounded-[22px] border border-base-300/80 bg-base-100 p-6 shadow-sm space-y-5 animate-in fade-in">
                            <div className="flex items-center justify-between border-b border-base-200 pb-3">
                                <div className="flex items-center gap-2">
                                    <User size={17} className="text-primary" />
                                    <h3 className="text-sm font-bold text-base-content">Informações Pessoais</h3>
                                </div>
                                <span className="text-[11px] text-slate-400 font-medium">Atualize seu cadastro</span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-600">Nome</label>
                                    <input
                                        type="text"
                                        value={dadosPessoais.nome}
                                        onChange={(e) => setDadosPessoais({ ...dadosPessoais, nome: e.target.value })}
                                        className="input input-sm w-full bg-slate-50 border-base-300 rounded-xl text-xs font-semibold text-base-content focus:border-primary focus:bg-white"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-600">Sobrenome</label>
                                    <input
                                        type="text"
                                        value={dadosPessoais.sobrenome}
                                        onChange={(e) => setDadosPessoais({ ...dadosPessoais, sobrenome: e.target.value })}
                                        className="input input-sm w-full bg-slate-50 border-base-300 rounded-xl text-xs font-semibold text-base-content focus:border-primary focus:bg-white"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-600">Apelido (Nome Social)</label>
                                    <input
                                        type="text"
                                        value={dadosPessoais.apelido}
                                        onChange={(e) => setDadosPessoais({ ...dadosPessoais, apelido: e.target.value })}
                                        className="input input-sm w-full bg-slate-50 border-base-300 rounded-xl text-xs font-semibold text-base-content focus:border-primary focus:bg-white"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-600">Data de Nascimento</label>
                                    <input
                                        type="date"
                                        value={dadosPessoais.aniversario}
                                        onChange={(e) => setDadosPessoais({ ...dadosPessoais, aniversario: e.target.value })}
                                        className="input input-sm w-full bg-slate-50 border-base-300 rounded-xl text-xs font-semibold text-base-content focus:border-primary focus:bg-white"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-600">Gênero</label>
                                    <select
                                        value={dadosPessoais.genero}
                                        onChange={(e) => setDadosPessoais({ ...dadosPessoais, genero: e.target.value })}
                                        className="select select-sm w-full bg-slate-50 border-base-300 rounded-xl text-xs font-semibold text-base-content focus:border-primary focus:bg-white"
                                    >
                                        <option value="masculino">Masculino</option>
                                        <option value="feminino">Feminino</option>
                                        <option value="outro">Outro / Prefiro não informar</option>
                                    </select>
                                </div>

                                <div className="grid grid-cols-3 gap-2">
                                    <div className="col-span-2 space-y-1">
                                        <label className="text-xs font-bold text-slate-600">Cidade</label>
                                        <input
                                            type="text"
                                            value={dadosPessoais.cidade}
                                            onChange={(e) => setDadosPessoais({ ...dadosPessoais, cidade: e.target.value })}
                                            className="input input-sm w-full bg-slate-50 border-base-300 rounded-xl text-xs font-semibold text-base-content focus:border-primary focus:bg-white"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-600">UF</label>
                                        <input
                                            type="text"
                                            maxLength={2}
                                            value={dadosPessoais.uf}
                                            onChange={(e) => setDadosPessoais({ ...dadosPessoais, uf: e.target.value.toUpperCase() })}
                                            className="input input-sm w-full bg-slate-50 border-base-300 rounded-xl text-xs font-semibold text-base-content focus:border-primary focus:bg-white text-center uppercase"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-600">E-mail Cadastrado</label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        value={dadosPessoais.email}
                                        onChange={(e) => setDadosPessoais({ ...dadosPessoais, email: e.target.value })}
                                        className="input input-sm w-full bg-slate-50 border-base-300 rounded-xl text-xs font-semibold text-base-content focus:border-primary focus:bg-white pl-8"
                                    />
                                    <Mail size={14} className="absolute left-2.5 top-2.5 text-slate-400" />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold text-slate-600">Concurso / Cargo Alvo Principal</label>
                                <input
                                    type="text"
                                    value={dadosPessoais.cargoAlvo}
                                    onChange={(e) => setDadosPessoais({ ...dadosPessoais, cargoAlvo: e.target.value })}
                                    className="input input-sm w-full bg-slate-50 border-base-300 rounded-xl text-xs font-semibold text-base-content focus:border-primary focus:bg-white"
                                    placeholder="Ex: Delegado de Polícia Civil / Auditor Fiscal"
                                />
                            </div>

                            <div className="pt-3 border-t border-base-200 flex justify-end">
                                <button
                                    type="submit"
                                    className="btn btn-sm btn-primary rounded-xl px-5 font-bold text-xs gap-1.5 shadow-sm hover:bg-primary/90 cursor-pointer"
                                >
                                    <Save size={14} /> Salvar Dados Pessoais
                                </button>
                            </div>
                        </form>
                    )}

                    {/* SEÇÃO 2: RANKING & COMUNIDADE */}
                    {activeSection === 'ranking' && (
                        <form onSubmit={handleSalvar} className="rounded-[22px] border border-base-300/80 bg-base-100 p-6 shadow-sm space-y-5 animate-in fade-in">
                            <div className="flex items-center justify-between border-b border-base-200 pb-3">
                                <div className="flex items-center gap-2">
                                    <Trophy size={17} className="text-amber-500" />
                                    <h3 className="text-sm font-bold text-base-content">Ranking & Visibilidade</h3>
                                </div>
                                <span className="badge badge-sm bg-amber-50 text-amber-800 border-amber-200 font-bold">Gamificação</span>
                            </div>

                            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/70 flex items-start gap-3">
                                <Sparkles size={18} className="text-amber-600 shrink-0 mt-0.5" />
                                <div className="space-y-0.5 text-xs text-amber-900">
                                    <p className="font-bold">Como funciona o Ranking Papyrus?</p>
                                    <p className="text-amber-700 text-[11px] leading-relaxed">
                                        Compare seu volume de horas líquidas e taxa de acertos em simulados com outros estudantes do mesmo cargo alvo para manter o foco competitivo.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-base-200 cursor-pointer hover:bg-slate-100/60 transition-colors">
                                    <div className="space-y-0.5">
                                        <span className="text-xs font-bold text-base-content block">Participar do Ranking Geral</span>
                                        <span className="text-[11px] text-slate-400 font-normal">Exibir sua pontuação e conquistas nas tabelas públicas</span>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={rankingConfig.participarRanking}
                                        onChange={(e) => setRankingConfig({ ...rankingConfig, participarRanking: e.target.checked })}
                                        className="checkbox checkbox-sm checkbox-primary"
                                    />
                                </label>

                                <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-base-200 cursor-pointer hover:bg-slate-100/60 transition-colors">
                                    <div className="space-y-0.5">
                                        <span className="text-xs font-bold text-base-content block">Exibir Total de Horas Semanais</span>
                                        <span className="text-[11px] text-slate-400 font-normal">Outros concurseiros poderão ver seu tempo de estudo acumulado</span>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={rankingConfig.exibirHoras}
                                        onChange={(e) => setRankingConfig({ ...rankingConfig, exibirHoras: e.target.checked })}
                                        className="checkbox checkbox-sm checkbox-primary"
                                    />
                                </label>

                                <div className="space-y-1 pt-1">
                                    <label className="text-xs font-bold text-slate-600">Nome de Exibição no Ranking</label>
                                    <input
                                        type="text"
                                        value={rankingConfig.nomeExibicao}
                                        onChange={(e) => setRankingConfig({ ...rankingConfig, nomeExibicao: e.target.value })}
                                        className="input input-sm w-full bg-slate-50 border-base-300 rounded-xl text-xs font-semibold text-base-content focus:border-primary focus:bg-white"
                                        placeholder="Seu apelido público"
                                    />
                                </div>
                            </div>

                            <div className="pt-3 border-t border-base-200 flex justify-end">
                                <button
                                    type="submit"
                                    className="btn btn-sm btn-primary rounded-xl px-5 font-bold text-xs gap-1.5 shadow-sm hover:bg-primary/90 cursor-pointer"
                                >
                                    <Save size={14} /> Salvar Preferências de Ranking
                                </button>
                            </div>
                        </form>
                    )}

                    {/* SEÇÃO 3: SEGURANÇA & SENHA */}
                    {activeSection === 'seguranca' && (
                        <form onSubmit={handleSalvar} className="rounded-[22px] border border-base-300/80 bg-base-100 p-6 shadow-sm space-y-5 animate-in fade-in">
                            <div className="flex items-center justify-between border-b border-base-200 pb-3">
                                <div className="flex items-center gap-2">
                                    <Shield size={17} className="text-primary" />
                                    <h3 className="text-sm font-bold text-base-content">Segurança da Conta</h3>
                                </div>
                                <span className="text-[11px] text-slate-400 font-medium">Controle de acesso</span>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-slate-600">Senha Atual</label>
                                    <div className="relative">
                                        <input
                                            type={showSenhaAtual ? 'text' : 'password'}
                                            value={seguranca.senhaAtual}
                                            onChange={(e) => setSeguranca({ ...seguranca, senhaAtual: e.target.value })}
                                            placeholder="••••••••••••"
                                            className="input input-sm w-full bg-slate-50 border-base-300 rounded-xl text-xs font-semibold text-base-content focus:border-primary focus:bg-white pr-9"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowSenhaAtual(!showSenhaAtual)}
                                            className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                                        >
                                            {showSenhaAtual ? <EyeOff size={14} /> : <Eye size={14} />}
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-600">Nova Senha</label>
                                        <div className="relative">
                                            <input
                                                type={showNovaSenha ? 'text' : 'password'}
                                                value={seguranca.novaSenha}
                                                onChange={(e) => setSeguranca({ ...seguranca, novaSenha: e.target.value })}
                                                placeholder="Mínimo de 8 dígitos"
                                                className="input input-sm w-full bg-slate-50 border-base-300 rounded-xl text-xs font-semibold text-base-content focus:border-primary focus:bg-white pr-9"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowNovaSenha(!showNovaSenha)}
                                                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                                            >
                                                {showNovaSenha ? <EyeOff size={14} /> : <Eye size={14} />}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-600">Confirmar Nova Senha</label>
                                        <input
                                            type="password"
                                            value={seguranca.confirmarSenha}
                                            onChange={(e) => setSeguranca({ ...seguranca, confirmarSenha: e.target.value })}
                                            placeholder="Repita a nova senha"
                                            className="input input-sm w-full bg-slate-50 border-base-300 rounded-xl text-xs font-semibold text-base-content focus:border-primary focus:bg-white"
                                        />
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <label className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-base-200 cursor-pointer hover:bg-slate-100/60 transition-colors">
                                        <div className="space-y-0.5">
                                            <span className="text-xs font-bold text-base-content block">Autenticação em Duas Etapas (2FA)</span>
                                            <span className="text-[11px] text-slate-400 font-normal">Exigir código adicional via e-mail ao logar em novo dispositivo</span>
                                        </div>
                                        <input
                                            type="checkbox"
                                            checked={seguranca.autenticacaoDoisFatores}
                                            onChange={(e) => setSeguranca({ ...seguranca, autenticacaoDoisFatores: e.target.checked })}
                                            className="checkbox checkbox-sm checkbox-primary"
                                        />
                                    </label>
                                </div>
                            </div>

                            <div className="pt-3 border-t border-base-200 flex justify-end">
                                <button
                                    type="submit"
                                    className="btn btn-sm btn-primary rounded-xl px-5 font-bold text-xs gap-1.5 shadow-sm hover:bg-primary/90 cursor-pointer"
                                >
                                    <Save size={14} /> Atualizar Segurança
                                </button>
                            </div>
                        </form>
                    )}

                </div>

            </div>
        </div>
    );
}
