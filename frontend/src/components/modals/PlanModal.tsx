import React, { useState, useEffect } from 'react';
import { UploadCloud, X } from 'lucide-react';

interface PlanModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (nome: string, cargo: string, imagem: File | null) => void;
    initialData?: { nome: string; cargo: string } | null;
}

export default function PlanModal({ isOpen, onClose, onSave, initialData }: PlanModalProps) {
    const [nomeConcurso, setNomeConcurso] = useState('');
    const [cargo, setCargo] = useState('');
    const [imagem, setImagem] = useState<File | null>(null);

    // Quando o modal abre ou initialData muda, preenche os campos
    useEffect(() => {
        if (isOpen) {
            setNomeConcurso(initialData?.nome || '');
            setCargo(initialData?.cargo || '');
            setImagem(null);
        }
    }, [isOpen, initialData]);

    if (!isOpen) return null;

    const handleSave = () => {
        if (!nomeConcurso.trim() || !cargo.trim()) {
            alert('Por favor, preencha o Nome do Concurso e o Cargo.');
            return;
        }
        onSave(nomeConcurso, cargo, imagem);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-base-content/20 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-base-100 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
                {/* Header Modal */}
                <div className="flex items-center justify-between p-6 border-b border-base-200">
                    <h3 className="font-extrabold text-xl text-base-content">
                        {initialData ? 'Editar Plano' : 'Detalhes do Novo Plano'}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-neutral-content hover:text-base-content transition-colors rounded-full p-1 hover:bg-base-200"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Corpo Modal */}
                <div className="p-6 space-y-5">
                    <div className="form-control w-full">
                        <label className="label pt-0">
                            <span className="label-text font-bold text-base-content">Nome do Plano <span className="text-error">*</span></span>
                        </label>
                        <input
                            type="text"
                            placeholder="Ex: Polícia Federal 2024"
                            className="input w-full h-12 bg-base-100 border border-base-300/50 shadow-sm rounded-2xl mt-3 mb-2 focus:outline-none focus:ring-0 focus:border-base-300/50"
                            value={nomeConcurso}
                            onChange={(e) => setNomeConcurso(e.target.value)}
                        />
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-bold text-base-content">Cargo <span className="text-error">*</span></span>
                        </label>
                        <input
                            type="text"
                            placeholder="Ex: Agente de Polícia"
                            className="input w-full h-12 bg-base-100 border border-base-300/50 shadow-sm rounded-2xl mt-3 mb-2 focus:outline-none focus:ring-0 focus:border-base-300/50"
                            value={cargo}
                            onChange={(e) => setCargo(e.target.value)}
                        />
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-bold text-base-content">Imagem de Capa (Opcional)</span>
                        </label>
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-base-300 border-dashed rounded-2xl cursor-pointer bg-base-200/30 hover:bg-base-200/70 transition-colors mt-3">
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
                        onClick={onClose}
                        className="btn btn-ghost font-bold text-neutral-content hover:bg-base-200/50 rounded-xl"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSave}
                        className="btn btn-primary font-bold text-primary-content rounded-xl shadow-md hover:shadow-lg"
                    >
                        {initialData ? 'Salvar Alterações' : 'Avançar'}
                    </button>
                </div>
            </div>
        </div>
    );
}
