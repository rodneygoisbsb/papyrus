import React, { useState } from "react";
import { CheckCircle, Target, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";

const MOCK_EDITAL = [
    {
        id: 1,
        nome: "Direito Constitucional",
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
    }
];

function DisciplineAccordion({ disciplina }) {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm mb-3">
            {/* 2. Cabecalho clicável */}
            <div 
                className="px-5 py-4 bg-slate-50/50 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h2 className="font-bold text-slate-800 text-lg">
                    {disciplina.nome}
                </h2>
                <div className="flex items-center gap-4">
                    {isOpen ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
                </div>
            </div>
            
            {/* 3. Corpo (Tabela) */}
            {isOpen && (
                <div className="p-0 border-t border-slate-100">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            {/* CABEÇALHO DA TABELA */}
                            <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold">
                                <tr>
                                    <th className="p-4">Tópicos</th>
                                    <th className="p-4 text-center">Teoria</th>
                                    <th className="p-4 text-center">Revisões (R1-R6)</th>
                                    <th className="p-4 text-center">Questões</th>
                                    <th className="p-4 text-center">Link</th>
                                </tr>
                            </thead>
                            
                            {/* CORPO DA TABELA */}
                            <tbody className="divide-y divide-slate-100">
                                {disciplina.topics.map((topic) => (
                                    <tr key={topic.id} className="hover:bg-slate-50/50 transition-colors">
                                        {/* 1. Nome do Tópico */}
                                        <td className="p-4 font-semibold text-slate-700">
                                            {topic.nome}
                                        </td>

                                        {/* 2. Checkbox de Teoria */}
                                        <td className="p-4 text-center">
                                            <div className="flex justify-center">
                                                <input 
                                                    type="checkbox" 
                                                    checked={topic.teoria} 
                                                    readOnly 
                                                    className="w-4 h-4 text-emerald-500 rounded border-slate-300 focus:ring-emerald-500" 
                                                />
                                            </div>
                                        </td>

                                        {/* 3. Checkboxes de Revisão (R1 e R2 por enquanto) */}
                                        <td className="p-4 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <input type="checkbox" checked={topic.r1} readOnly className="w-4 h-4 text-emerald-500 rounded border-slate-300" title="R1" />
                                                <input type="checkbox" checked={topic.r2} readOnly className="w-4 h-4 text-emerald-500 rounded border-slate-300" title="R2" />
                                                <span className="text-xs text-slate-400">...</span>
                                            </div>
                                        </td>

                                        {/* 4. Ícone de Questões */}
                                        <td className="p-4 text-center">
                                            <button className="text-slate-400 hover:text-emerald-500 transition-colors p-1" title="Ver Estatísticas">
                                                <Target size={18} />
                                            </button>
                                        </td>

                                        {/* 5. Link Externo */}
                                        <td className="p-4 text-center">
                                            <button className="text-slate-400 hover:text-blue-500 transition-colors p-1" title="Acessar Caderno">
                                                <ExternalLink size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function EditalVerticalizadoPage() {
    return (
        <div className="space-y-6 animate-in fade-in duration-300 font-['Plus_Jakarta_Sans']">

            {/* 1. BARRA DE PROGRESSO GLOBAL */}
            <div className="bg-base-100 rounded-2xl p-6 border border-base-200 shadow-sm flex flex-col gap-4">
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Edital Verticalizado</h1>
                        <p className="text-sm text-slate-500 font-medium mt-1">Acompanhe seu progresso em cada disciplina</p>
                    </div>
                    <div className="text-right">
                        <span className="text-3xl font-black text-emerald-500 tracking-tighter">45%</span>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Concluído</p>
                    </div>
                </div>

                {/* Container cinza da barra (fundo) */}
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    {/* Barra verde preenchida (largura define o progresso) */}
                    <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000" style={{ width: '45%' }}></div>
                </div>
            </div>

            {/* 2. LISTA DE DISCIPLINAS */}
            <div className="space-y-3">
                {MOCK_EDITAL.map((disc) => (
                    <DisciplineAccordion key={disc.id} disciplina={disc} />
                ))}
            </div>

        </div>
    );
}