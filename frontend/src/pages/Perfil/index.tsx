// src/pages/PerfilPage.jsx
import React, { useState } from 'react';
import {
    User,
    Mail,
    Lock,
    Shield,
    Camera,
    Save,
    CheckCircle2,
    Eye,
    EyeOff,
    MapPin,
    Calendar,
    ChevronRight,
} from 'lucide-react';

export default function PerfilPage() {
    const [activeSection, setActiveSection] = useState('dados'); // 'dados' | 'seguranca'
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
        <div className="space-y-6 animate-in fade-in duration-200 font-['Plus_Jakarta_Sans'] max-w-5xl mx-auto pb-12 pt-4">
            
            {/* Mensagem de Sucesso Flutuante */}
            {salvo && (
                <div className="badge badge-success text-white font-bold gap-2 py-3 px-4 animate-in fade-in slide-in-from-top-2 absolute top-6 right-6 z-50 shadow-lg text-sm rounded-xl">
                    <CheckCircle2 size={18} /> Alterações salvas com sucesso!
                </div>
            )}

            {/* Layout Principal: 2 Colunas */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Coluna Esquerda: Card de Identidade + Menu Rápido (4 cols) */}
                <div className="lg:col-span-4 space-y-6">
                    
                    {/* Card de Identidade */}
                    <div className="rounded-[24px] border border-base-300/80 bg-base-100 p-8 shadow-sm flex flex-col items-center text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-r from-primary/15 via-blue-100 to-primary/10" />
                        
                        {/* Avatar */}
                        <div className="relative mt-6 mb-4 group cursor-pointer">
                            <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-primary to-blue-400 text-white flex items-center justify-center text-4xl font-black shadow-lg border-4 border-white">
                                {dadosPessoais.nome.charAt(0)}{dadosPessoais.sobrenome.charAt(0)}
                            </div>
                            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                <Camera size={24} />
                            </div>
                        </div>

                        <h2 className="text-xl font-black text-base-content leading-tight mb-1">
                            {dadosPessoais.nome} {dadosPessoais.sobrenome}
                        </h2>
                        <p className="text-sm text-slate-500 font-medium mb-2">{dadosPessoais.email}</p>

                        <div className="w-full pt-6 mt-4 border-t border-base-200 text-left space-y-3 text-sm">
                            <div className="flex items-center justify-between text-slate-500">
                                <span className="flex items-center gap-2"><MapPin size={16} className="text-slate-400" /> Localização</span>
                                <span className="font-bold text-base-content">{dadosPessoais.cidade}, {dadosPessoais.uf}</span>
                            </div>
                            <div className="flex items-center justify-between text-slate-500">
                                <span className="flex items-center gap-2"><Calendar size={16} className="text-slate-400" /> Membro desde</span>
                                <span className="font-bold text-base-content">Jan/2026</span>
                            </div>
                        </div>
                    </div>

                    {/* Navegação entre seções da conta */}
                    <div className="rounded-[24px] border border-base-300/80 bg-base-100 p-3 shadow-sm space-y-2">
                        <button
                            type="button"
                            onClick={() => setActiveSection('dados')}
                            className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                                activeSection === 'dados'
                                    ? 'bg-primary text-primary-content shadow-md'
                                    : 'text-slate-600 hover:bg-slate-50'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <User size={18} />
                                <span>Dados Pessoais</span>
                            </div>
                            <ChevronRight size={16} className={activeSection === 'dados' ? 'text-white' : 'text-slate-400'} />
                        </button>

                        <button
                            type="button"
                            onClick={() => setActiveSection('seguranca')}
                            className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                                activeSection === 'seguranca'
                                    ? 'bg-primary text-primary-content shadow-md'
                                    : 'text-slate-600 hover:bg-slate-50'
                            }`}
                        >
                            <div className="flex items-center gap-3">
                                <Lock size={18} />
                                <span>Segurança & Senha</span>
                            </div>
                            <ChevronRight size={16} className={activeSection === 'seguranca' ? 'text-white' : 'text-slate-400'} />
                        </button>
                    </div>

                </div>

                {/* Coluna Direita: Formulários Ativos (8 cols) */}
                <div className="lg:col-span-8">
                    
                    {/* SEÇÃO 1: DADOS PESSOAIS */}
                    {activeSection === 'dados' && (
                        <form onSubmit={handleSalvar} className="rounded-[24px] border border-base-300/80 bg-base-100 p-8 shadow-sm space-y-8 animate-in fade-in">
                            <div className="flex items-center justify-between border-b border-base-200 pb-5">
                                <div className="flex items-center gap-3">
                                    <User size={22} className="text-primary" />
                                    <h3 className="text-lg font-bold text-base-content">Informações Pessoais</h3>
                                </div>
                                <span className="text-sm text-slate-400 font-medium">Atualize seu cadastro</span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-600">Nome</label>
                                    <input
                                        type="text"
                                        value={dadosPessoais.nome}
                                        onChange={(e) => setDadosPessoais({ ...dadosPessoais, nome: e.target.value })}
                                        className="input w-full bg-slate-50 border-base-300 rounded-xl text-sm font-semibold text-base-content focus:border-primary focus:bg-white px-4 h-12"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-600">Sobrenome</label>
                                    <input
                                        type="text"
                                        value={dadosPessoais.sobrenome}
                                        onChange={(e) => setDadosPessoais({ ...dadosPessoais, sobrenome: e.target.value })}
                                        className="input w-full bg-slate-50 border-base-300 rounded-xl text-sm font-semibold text-base-content focus:border-primary focus:bg-white px-4 h-12"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-600">Apelido (Nome Social)</label>
                                    <input
                                        type="text"
                                        value={dadosPessoais.apelido}
                                        onChange={(e) => setDadosPessoais({ ...dadosPessoais, apelido: e.target.value })}
                                        className="input w-full bg-slate-50 border-base-300 rounded-xl text-sm font-semibold text-base-content focus:border-primary focus:bg-white px-4 h-12"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-600">Data de Nascimento</label>
                                    <input
                                        type="date"
                                        value={dadosPessoais.aniversario}
                                        onChange={(e) => setDadosPessoais({ ...dadosPessoais, aniversario: e.target.value })}
                                        className="input w-full bg-slate-50 border-base-300 rounded-xl text-sm font-semibold text-base-content focus:border-primary focus:bg-white px-4 h-12"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-600">Gênero</label>
                                    <select
                                        value={dadosPessoais.genero}
                                        onChange={(e) => setDadosPessoais({ ...dadosPessoais, genero: e.target.value })}
                                        className="select w-full bg-slate-50 border-base-300 rounded-xl text-sm font-semibold text-base-content focus:border-primary focus:bg-white px-4 h-12"
                                    >
                                        <option value="masculino">Masculino</option>
                                        <option value="feminino">Feminino</option>
                                        <option value="outro">Outro / Prefiro não informar</option>
                                    </select>
                                </div>

                                <div className="grid grid-cols-3 gap-3">
                                    <div className="col-span-2 space-y-2">
                                        <label className="text-sm font-bold text-slate-600">Cidade</label>
                                        <input
                                            type="text"
                                            value={dadosPessoais.cidade}
                                            onChange={(e) => setDadosPessoais({ ...dadosPessoais, cidade: e.target.value })}
                                            className="input w-full bg-slate-50 border-base-300 rounded-xl text-sm font-semibold text-base-content focus:border-primary focus:bg-white px-4 h-12"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-600">UF</label>
                                        <input
                                            type="text"
                                            maxLength={2}
                                            value={dadosPessoais.uf}
                                            onChange={(e) => setDadosPessoais({ ...dadosPessoais, uf: e.target.value.toUpperCase() })}
                                            className="input w-full bg-slate-50 border-base-300 rounded-xl text-sm font-semibold text-base-content focus:border-primary focus:bg-white text-center uppercase px-2 h-12"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-600">E-mail Cadastrado</label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        value={dadosPessoais.email}
                                        onChange={(e) => setDadosPessoais({ ...dadosPessoais, email: e.target.value })}
                                        className="input w-full bg-slate-50 border-base-300 rounded-xl text-sm font-semibold text-base-content focus:border-primary focus:bg-white pl-10 h-12"
                                    />
                                    <Mail size={18} className="absolute left-3 top-3.5 text-slate-400" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-600">Concurso / Cargo Alvo Principal</label>
                                <input
                                    type="text"
                                    value={dadosPessoais.cargoAlvo}
                                    onChange={(e) => setDadosPessoais({ ...dadosPessoais, cargoAlvo: e.target.value })}
                                    className="input w-full bg-slate-50 border-base-300 rounded-xl text-sm font-semibold text-base-content focus:border-primary focus:bg-white px-4 h-12"
                                    placeholder="Ex: Delegado de Polícia Civil / Auditor Fiscal"
                                />
                            </div>

                            <div className="pt-6 border-t border-base-200 flex justify-end">
                                <button
                                    type="submit"
                                    className="btn btn-primary rounded-xl px-8 font-bold text-sm gap-2 shadow-sm hover:bg-primary/90 cursor-pointer h-12"
                                >
                                    <Save size={18} /> Salvar Dados Pessoais
                                </button>
                            </div>
                        </form>
                    )}

                    {/* SEÇÃO 3: SEGURANÇA & SENHA */}
                    {activeSection === 'seguranca' && (
                        <form onSubmit={handleSalvar} className="rounded-[24px] border border-base-300/80 bg-base-100 p-8 shadow-sm space-y-8 animate-in fade-in">
                            <div className="flex items-center justify-between border-b border-base-200 pb-5">
                                <div className="flex items-center gap-3">
                                    <Shield size={22} className="text-primary" />
                                    <h3 className="text-lg font-bold text-base-content">Segurança da Conta</h3>
                                </div>
                                <span className="text-sm text-slate-400 font-medium">Controle de acesso</span>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-600">Senha Atual</label>
                                    <div className="relative">
                                        <input
                                            type={showSenhaAtual ? 'text' : 'password'}
                                            value={seguranca.senhaAtual}
                                            onChange={(e) => setSeguranca({ ...seguranca, senhaAtual: e.target.value })}
                                            placeholder="••••••••••••"
                                            className="input w-full bg-slate-50 border-base-300 rounded-xl text-sm font-semibold text-base-content focus:border-primary focus:bg-white pr-12 px-4 h-12"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowSenhaAtual(!showSenhaAtual)}
                                            className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
                                        >
                                            {showSenhaAtual ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-600">Nova Senha</label>
                                        <div className="relative">
                                            <input
                                                type={showNovaSenha ? 'text' : 'password'}
                                                value={seguranca.novaSenha}
                                                onChange={(e) => setSeguranca({ ...seguranca, novaSenha: e.target.value })}
                                                placeholder="Mínimo de 8 dígitos"
                                                className="input w-full bg-slate-50 border-base-300 rounded-xl text-sm font-semibold text-base-content focus:border-primary focus:bg-white pr-12 px-4 h-12"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowNovaSenha(!showNovaSenha)}
                                                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
                                            >
                                                {showNovaSenha ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-600">Confirmar Nova Senha</label>
                                        <input
                                            type="password"
                                            value={seguranca.confirmarSenha}
                                            onChange={(e) => setSeguranca({ ...seguranca, confirmarSenha: e.target.value })}
                                            placeholder="Repita a nova senha"
                                            className="input w-full bg-slate-50 border-base-300 rounded-xl text-sm font-semibold text-base-content focus:border-primary focus:bg-white px-4 h-12"
                                        />
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <label className="flex items-center justify-between p-5 rounded-2xl bg-slate-50 border border-base-200 cursor-pointer hover:bg-slate-100/80 transition-colors">
                                        <div className="space-y-1">
                                            <span className="text-sm font-bold text-base-content block">Autenticação em Duas Etapas (2FA)</span>
                                            <span className="text-sm text-slate-500 font-medium">Exibir código adicional via e-mail ao logar em novo dispositivo</span>
                                        </div>
                                        <input
                                            type="checkbox"
                                            checked={seguranca.autenticacaoDoisFatores}
                                            onChange={(e) => setSeguranca({ ...seguranca, autenticacaoDoisFatores: e.target.checked })}
                                            className="checkbox checkbox-primary"
                                        />
                                    </label>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-base-200 flex justify-end">
                                <button
                                    type="submit"
                                    className="btn btn-primary rounded-xl px-8 font-bold text-sm gap-2 shadow-sm hover:bg-primary/90 cursor-pointer h-12"
                                >
                                    <Save size={18} /> Atualizar Segurança
                                </button>
                            </div>
                        </form>
                    )}

                </div>

            </div>
        </div>
    );
}
