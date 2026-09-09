import React from 'react';
import { ArrowLeft, FileCheck } from 'lucide-react';

interface Props {
    setActiveTab: (tab: string) => void;
}

export default function PlanTemplates({ setActiveTab }: Props) {
    return (
        <div className="space-y-8 text-base-content animate-in fade-in duration-300">
            {/* HEADER AREA */}
            <div className="flex flex-col gap-3">
                {/* AÇÃO DE VOLTAR */}
                <button
                    onClick={() => setActiveTab('criar-plano')}
                    className="flex items-center gap-2 text-sm font-bold text-neutral-content hover:text-base-content/60 transition-colors w-fit cursor-pointer"
                >
                    <ArrowLeft size={16} />
                    <span>Voltar</span>
                </button>

                {/* CABEÇALHO EM CARD */}
                <div className="bg-base-100 p-6 rounded-[22px] border border-base-200 shadow-sm flex flex-col gap-4">
                    <div>
                        <h2 className="text-3xl font-black text-base-content tracking-tight">Planos de Estudo</h2>
                        <p className="text-sm text-neutral-content mt-2 max-w-2xl">
                            Selecione um dos planos pré-configurados pela nossa equipe
                        </p>
                    </div>
                </div>
            </div>

            {/* CONTEUDO PLACEHOLDER */}
            <div className="flex flex-col items-center justify-center p-12 bg-base-100 rounded-3xl border border-base-200 shadow-sm min-h-[400px]">
                <FileCheck size={64} className="text-primary/40 mb-4" />
                <h3 className="text-xl font-bold text-base-content">Página em Construção</h3>
                <p className="text-sm text-neutral-content mt-2 text-center max-w-md">
                    Em breve você poderá selecionar planos de estudos prontos e todo o seu plano de estudos será gerado automaticamente!
                </p>
            </div>
        </div>
    );
}
