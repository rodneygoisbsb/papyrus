import React, { useState } from 'react';
import { FileCheck, PencilRuler, ArrowLeft, UploadCloud, X } from 'lucide-react';

interface CriarPlanoPageProps {
    setActiveTab: (tab: string) => void;
    onPlanCreated?: (nome: string, cargo: string) => void;
}

export default function CriarPlanoPage({ setActiveTab, onPlanCreated }: CriarPlanoPageProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFlow, setSelectedFlow] = useState<string | null>(null);

    // Formulário do Modal
    const [nomeConcurso, setNomeConcurso] = useState('');
    const [cargo, setCargo] = useState('');
    const [imagem, setImagem] = useState<File | null>(null);

    const handleOptionClick = (tab: string) => {
        if (tab === 'criar-plano-editais-prontos') {
            setActiveTab(tab);
        } else {
            setSelectedFlow(tab);
            setIsModalOpen(true);
        }
    };

    const handleAvançar = () => {
        // Validação simples
        if (!nomeConcurso.trim() || !cargo.trim()) {
            alert('Por favor, preencha o Nome do Concurso e o Cargo.');
            return;
        }
        
        if (onPlanCreated) {
            onPlanCreated(nomeConcurso, cargo);
        }

        if (selectedFlow) {
            setActiveTab(selectedFlow);
        }
        setIsModalOpen(false);
    };

    const fecharModal = () => {
        setIsModalOpen(false);
        setSelectedFlow(null);
        setNomeConcurso('');
        setCargo('');
        setImagem(null);
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
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-base-content/20 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-base-100 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
                        {/* Header Modal */}
                        <div className="flex items-center justify-between p-6 border-b border-base-200">
                            <h3 className="font-extrabold text-xl text-base-content">Detalhes do Novo Plano</h3>
                            <button 
                                onClick={fecharModal}
                                className="text-neutral-content hover:text-base-content transition-colors rounded-full p-1 hover:bg-base-200"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Corpo Modal */}
                        <div className="p-6 space-y-5">
                            <div className="form-control w-full">
                                <label className="label pt-0">
                                    <span className="label-text font-bold text-base-content">Nome do Concurso / Edital <span className="text-error">*</span></span>
                                </label>
                                <input 
                                    type="text" 
                                    placeholder="Ex: Polícia Federal 2024" 
                                    className="input input-bordered w-full bg-base-200/50 focus:bg-base-100 transition-colors"
                                    value={nomeConcurso}
                                    onChange={(e) => setNomeConcurso(e.target.value)}
                                />
                            </div>

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-bold text-base-content">Cargo Almejado <span className="text-error">*</span></span>
                                </label>
                                <input 
                                    type="text" 
                                    placeholder="Ex: Agente de Polícia" 
                                    className="input input-bordered w-full bg-base-200/50 focus:bg-base-100 transition-colors"
                                    value={cargo}
                                    onChange={(e) => setCargo(e.target.value)}
                                />
                            </div>

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-bold text-base-content">Imagem de Capa (Opcional)</span>
                                </label>
                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-base-300 border-dashed rounded-2xl cursor-pointer bg-base-200/30 hover:bg-base-200/70 transition-colors">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <UploadCloud className="w-8 h-8 mb-3 text-neutral-content" />
                                        <p className="mb-2 text-sm text-neutral-content">
                                            <span className="font-semibold text-primary">Clique para fazer upload</span>
                                        </p>
                                        <p className="text-xs text-neutral-content/70">PNG, JPG (MAX. 2MB)</p>
                                    </div>
                                    <input 
                                        type="file" 
                                        className="hidden" 
                                        accept="image/png, image/jpeg"
                                        onChange={(e) => e.target.files && setImagem(e.target.files[0])}
                                    />
                                </label>
                                {imagem && (
                                    <span className="text-xs text-emerald-600 font-medium mt-2 text-center">
                                        Imagem selecionada: {imagem.name}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Footer Modal */}
                        <div className="p-6 pt-4 border-t border-base-200 bg-base-50 flex gap-3 justify-end">
                            <button 
                                onClick={fecharModal}
                                className="btn btn-ghost font-bold text-neutral-content hover:bg-base-200/50 rounded-xl"
                            >
                                Cancelar
                            </button>
                            <button 
                                onClick={handleAvançar}
                                className="btn btn-primary font-bold text-primary-content rounded-xl shadow-md hover:shadow-lg"
                            >
                                Avançar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
