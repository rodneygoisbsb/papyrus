import React, { useState } from 'react';
import { BookOpen, X, ListChecks, Plus, Trash2 } from 'lucide-react';
import { useDisciplineEditor } from '../../../hooks/useDisciplineEditor';

interface DisciplineEditorModalProps {
    activeDisciplineEditor: any;
    setActiveDisciplineEditor: (val: any) => void;
    onSaveDiscipline: () => void;
}

export default function DisciplineEditorModal({
    activeDisciplineEditor,
    setActiveDisciplineEditor,
    onSaveDiscipline
}: DisciplineEditorModalProps) {
    const {
        newTopicText,
        setNewTopicText,
        handleAddTopic,
        handleRemoveTopic,
        handleAddTopicsBulk
    } = useDisciplineEditor(activeDisciplineEditor, setActiveDisciplineEditor);

    const [isBulkMode, setIsBulkMode] = useState(false);
    const [bulkText, setBulkText] = useState('');

    const onBulkAdd = () => {
        handleAddTopicsBulk(bulkText);
        setBulkText('');
        setIsBulkMode(false);
    };

    const availableColors = [
        { label: 'Azul (Constitucional)', hex: '#2563EB' },
        { label: 'Laranja (Administrativo)', hex: '#EA580C' },
        { label: 'Verde (Português)', hex: '#16A34A' },
        { label: 'Roxo (Penal)', hex: '#7C3AED' },
        { label: 'Carmesim (Raciocínio Lógico)', hex: '#E11D48' },
        { label: 'Ciano (Legislação)', hex: '#0891B2' }
    ];

    if (!activeDisciplineEditor) return null;

    return (
        <div className="modal modal-open bg-black/40 backdrop-blur-sm">
            <div className="modal-box max-w-4xl bg-base-100 rounded-3xl border border-base-300/80 shadow-2xl p-0 flex flex-col font-['Plus_Jakarta_Sans'] overflow-hidden">
                {/* HEADER */}
                <div className="flex justify-between items-center px-8 py-5 border-b border-base-300/60 bg-base-100 z-10">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 flex items-center justify-center bg-primary/10 rounded-2xl text-primary">
                            <BookOpen size={24} />
                        </div>
                        <div>
                            <h3 className="font-extrabold text-lg text-base-content leading-tight">
                                {activeDisciplineEditor.id ? 'Editar Disciplina' : 'Nova Disciplina'}
                            </h3>
                            <p className="text-xs text-neutral-content font-medium mt-1.5">
                                Configure os detalhes da matéria e seus tópicos do edital.
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => setActiveDisciplineEditor(null)}
                        className="btn btn-ghost btn-sm btn-square rounded-xl text-neutral-content hover:text-base-content hover:bg-base-200"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* CONTENT GRID */}
                <div className="flex flex-col md:flex-row h-full">
                    {/* LEFT COLUMN - CONFIGS */}
                    <div className="w-full md:w-2/5 p-8 border-b md:border-b-0 md:border-r border-base-300/60 flex flex-col gap-8 bg-base-100">
                        {/* Nome da Matéria */}
                        <div className="space-y-2.5">
                            <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-content flex items-center gap-2">
                                Nome da Matéria
                            </label>
                            <input
                                type="text"
                                placeholder="Ex: DIREITO PROCESSUAL PENAL"
                                value={activeDisciplineEditor.name || ''}
                                onChange={(e) =>
                                    setActiveDisciplineEditor((prev: any) => ({ ...prev, name: e.target.value }))
                                }
                                className="input input-bordered w-full bg-base-200/40 focus:bg-base-100 focus:outline-none rounded-2xl font-bold text-sm text-base-content shadow-sm"
                                autoFocus
                            />
                        </div>

                        {/* Cor de Identificação */}
                        <div className="space-y-3">
                            <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-content">
                                Cor de Identificação
                            </label>
                            <div className="grid grid-cols-4 gap-3 mt-3 w-70">
                                {availableColors.map((cor) => (
                                    <button
                                        key={cor.hex}
                                        type="button"
                                        onClick={() =>
                                            setActiveDisciplineEditor((prev: any) => ({ ...prev, colorHex: cor.hex }))
                                        }
                                        className={`aspect-square rounded-2xl transition-all cursor-pointer border-2 ${activeDisciplineEditor.colorHex === cor.hex
                                            ? 'scale-105 border-base-100 shadow-[0_4px_12px_rgba(0,0,0,0.15)] ring-2'
                                            : 'border-transparent opacity-60 hover:opacity-100 hover:scale-105'
                                            }`}
                                        style={{
                                            backgroundColor: cor.hex,
                                            ...(activeDisciplineEditor.colorHex === cor.hex ? { ringColor: cor.hex } : {})
                                        }}
                                        title={cor.label}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN - TOPICS */}
                    <div className="w-full md:w-3/5 p-8 bg-base-200/30 flex flex-col">
                        <div className="flex justify-between items-center mb-5">
                            <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-content">
                                Tópicos do Edital
                            </label>
                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsBulkMode(!isBulkMode)}
                                    className="text-[10px] font-bold uppercase text-primary hover:text-primary-focus transition-colors flex items-center gap-1.5 bg-primary/10 px-2.5 py-1.5 rounded-lg"
                                >
                                    <ListChecks size={14} />
                                    {isBulkMode ? 'Adicionar Unitário' : 'Adicionar em Lote'}
                                </button>
                                <span className="text-xs font-bold text-neutral-content bg-base-300/40 px-2.5 py-1 rounded-lg">
                                    {activeDisciplineEditor.topics?.length || 0}
                                </span>
                            </div>
                        </div>

                        {isBulkMode ? (
                            <div className="flex flex-col gap-3">
                                <textarea
                                    placeholder="Cole sua lista de assuntos aqui (um por linha)..."
                                    value={bulkText}
                                    onChange={(e) => setBulkText(e.target.value)}
                                    className="textarea textarea-bordered w-full h-24 bg-base-100 focus:bg-base-100 rounded-2xl text-sm resize-none leading-relaxed shadow-sm"
                                />
                                <button
                                    type="button"
                                    onClick={onBulkAdd}
                                    className="btn btn-primary text-primary-content font-bold rounded-xl self-end px-6 shadow-md"
                                >
                                    <Plus size={18} /> Gerar Tópicos
                                </button>
                            </div>
                        ) : (
                            <div className="flex gap-2 relative">
                                <input
                                    type="text"
                                    placeholder="Ex: Inquérito Policial (Art. 4º ao 23)"
                                    value={newTopicText}
                                    onChange={(e) => setNewTopicText(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            handleAddTopic();
                                        }
                                    }}
                                    className="input input-bordered h-12 pr-12 w-full bg-base-100 focus:bg-base-100 focus:outline-none rounded-2xl text-sm font-medium shadow-sm"
                                />
                                <button
                                    type="button"
                                    onClick={handleAddTopic}
                                    className="absolute right-1 top-1 bottom-1 aspect-square flex items-center justify-center bg-primary text-primary-content rounded-xl hover:bg-primary-focus transition-colors shadow-sm"
                                    title="Adicionar Tópico"
                                >
                                    <Plus size={20} strokeWidth={3} />
                                </button>
                            </div>
                        )}

                        {/* Lista Scrollável */}
                        <div className="flex-1 overflow-y-auto mt-6 pr-2 space-y-2 custom-scrollbar min-h-[150px] max-h-[300px]">
                            {(!activeDisciplineEditor.topics || activeDisciplineEditor.topics.length === 0) ? (
                                <div className="h-full flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-base-300 rounded-3xl opacity-60">
                                    <BookOpen size={32} className="text-neutral-content mb-3" />
                                    <p className="text-sm font-bold text-base-content">Nenhum tópico adicionado</p>
                                    <p className="text-xs text-neutral-content mt-1">Adicione os assuntos da matéria acima.</p>
                                </div>
                            ) : (
                                activeDisciplineEditor.topics.map((topic: any, index: number) => (
                                    <div
                                        key={topic.id || index}
                                        className="group flex items-center justify-between p-3 rounded-2xl bg-base-100 border border-base-300/50 shadow-sm hover:border-primary/30 hover:shadow-md transition-all"
                                    >
                                        <span className="truncate pr-4 text-sm font-medium text-base-content">
                                            <b className="text-primary/70 mr-2">{index + 1}.</b> {topic.name}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveTopic(topic.id)}
                                            className="opacity-0 group-hover:opacity-100 text-neutral-content hover:text-error transition-all p-1.5 bg-base-200 hover:bg-error/10 rounded-lg shrink-0"
                                            title="Remover Tópico"
                                        >
                                            <Trash2 size={15} />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* FOOTER */}
                <div className="flex justify-end gap-3 px-8 py-5 border-t border-base-300/60 bg-base-100 z-10">
                    <button
                        type="button"
                        onClick={() => setActiveDisciplineEditor(null)}
                        className="btn btn-ghost font-bold rounded-xl text-neutral-content hover:bg-base-200"
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        onClick={onSaveDiscipline}
                        className="btn btn-primary text-primary-content font-bold px-8 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                    >
                        Salvar Disciplina
                    </button>
                </div>
            </div>
        </div>
    );
}