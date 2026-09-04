import React, { useState } from 'react';
import { FileCheck, PencilRuler, ArrowLeft } from 'lucide-react';
import PlanModal from '../../components/modals/PlanModal';

interface CriarPlanoPageProps {
    setActiveTab: (tab: string) => void;
    onPlanCreated?: (nome: string, cargo: string, imagem: File | null) => void;
}

export default function CriarPlanoPage({ setActiveTab, onPlanCreated }: CriarPlanoPageProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFlow, setSelectedFlow] = useState<string | null>(null);

    const handleOptionClick = (tab: string) => {
        if (tab === 'criar-plano-editais-prontos') {
            setActiveTab(tab);
        } else {
            setSelectedFlow(tab);
            setIsModalOpen(true);
        }
    };

    const handleAvançar = (nome: string, cargo: string, imagem: File | null) => {
        if (onPlanCreated) {
            onPlanCreated(nome, cargo, imagem);
        }

        if (selectedFlow) {
            setActiveTab(selectedFlow);
        }
        setIsModalOpen(false);
    };

    const options = [
        {
            id: 'editais-prontos',
            title: 'Editais Prontos',
            description: 'Escolha um edital já cadastrado e tenha todas as disciplinas e assuntos configurados automaticamente.',
            icon: <FileCheck size={28} />,
            colorClass: 'text-primary',
            bgLightClass: 'bg-primary/10',
            hoverClass: 'hover:border-primary/40 hover:shadow-primary/10',
            action: () => handleOptionClick('criar-plano-editais-prontos')
        },
        {
            id: 'manual',
            title: 'Criar Plano Manualmente',
            description: 'Cadastre suas disciplinas e cole a lista de assuntos de forma flexível.',
            icon: <PencilRuler size={28} />,
            colorClass: 'text-emerald-600',
            bgLightClass: 'bg-emerald-600/10',
            hoverClass: 'hover:border-emerald-600/40 hover:shadow-emerald-600/10',
            action: () => handleOptionClick('disciplinas')
        }
    ];

    return (
        <div className="space-y-8 font-['Plus_Jakarta_Sans'] text-base-content animate-in fade-in duration-300">
            {/* CABEÇALHO */}
            <div className="flex flex-col gap-4 pb-6 border-b border-base-300/70">
                <button
                    onClick={() => setActiveTab('plano-estudos')}
                    className="flex items-center gap-2 text-sm font-bold text-neutral-content hover:text-base-content transition-colors w-fit"
                >
                    <ArrowLeft size={16} />
                    <span>Voltar para Meus Planos</span>
                </button>
                <div>
                    <h2 className="text-3xl font-black text-base-content tracking-tight">Como você quer criar seu Plano?</h2>
                    <p className="text-sm text-neutral-content mt-2 max-w-2xl">
                        Escolha a forma que melhor se adapta a sua necessidade para cadastrar as disciplinas e assuntos do seu novo plano de estudos.
                    </p>
                </div>
            </div>

            {/* GRID DE OPÇÕES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
                {options.map((option) => (
                    <div
                        key={option.id}
                        onClick={option.action}
                        className={`bg-base-100 p-8 rounded-3xl border border-base-200 shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-all duration-300 cursor-pointer group flex flex-col gap-5 ${option.hoverClass} hover:-translate-y-1 hover:shadow-xl`}
                    >
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${option.bgLightClass} ${option.colorClass} group-hover:scale-110 transition-transform duration-300`}>
                            {option.icon}
                        </div>
                        <div>
                            <h3 className="font-extrabold text-base-content text-xl mb-2 group-hover:text-primary transition-colors">
                                {option.title}
                            </h3>
                            <p className="text-sm text-neutral-content/80 leading-relaxed font-medium">
                                {option.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* MODAL DE DADOS INICIAIS */}
            <PlanModal 
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedFlow(null);
                }}
                onSave={(nome, cargo) => handleAvançar(nome, cargo)}
            />
        </div>
    );
}
