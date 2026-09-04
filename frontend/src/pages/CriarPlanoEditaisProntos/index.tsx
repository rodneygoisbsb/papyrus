import React from 'react';
import { ArrowLeft, FileCheck } from 'lucide-react';

interface Props {
    setActiveTab: (tab: string) => void;
}

export default function CriarPlanoEditaisProntosPage({ setActiveTab }: Props) {
    return (
        <div className="space-y-8 font-['Plus_Jakarta_Sans'] text-base-content animate-in fade-in duration-300">
            {/* CABEÇALHO */}
            <div className="flex flex-col gap-4 pb-6 border-b border-base-300/70">
                <button
                    onClick={() => setActiveTab('criar-plano')}
                    className="flex items-center gap-2 text-sm font-bold text-neutral-content hover:text-base-content transition-colors w-fit"
                >
                    <ArrowLeft size={16} />
                    <span>Voltar para Opções</span>
                </button>
                <div>
                    <h2 className="text-3xl font-black text-base-content tracking-tight">Editais Prontos</h2>
                    <p className="text-sm text-neutral-content mt-2 max-w-2xl">
                        Selecione um dos editais pré-configurados pela nossa equipe.
                    </p>
                </div>
            </div>

            {/* CONTEUDO PLACEHOLDER */}
            <div className="flex flex-col items-center justify-center p-12 bg-base-100 rounded-3xl border border-base-200 shadow-sm min-h-[400px]">
                <FileCheck size={64} className="text-primary/40 mb-4" />
                <h3 className="text-xl font-bold text-base-content">Página em Construção</h3>
                <p className="text-sm text-neutral-content mt-2 text-center max-w-md">
                    Em breve você poderá selecionar editais prontos e todo o seu plano de estudos será gerado magicamente!
                </p>
            </div>
        </div>
    );
}
