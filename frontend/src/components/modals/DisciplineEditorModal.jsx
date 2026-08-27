import React from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

export default function DisciplineEditorModal({
    activeDisciplineEditor,
    setActiveDisciplineEditor,
    newTopicInput,
    setNewTopicInput,
    handleAddTopicToDiscipline,
    handleDeleteTopicFromEditor,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    draggedTopicIndex,
    handleDeleteDiscipline,
    handleSaveDisciplineEditor
}) {
    if (!activeDisciplineEditor) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
            <div className="bg-base-100 rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden border border-base-300">
                <div className="p-6 border-b border-base-300 flex justify-between items-center bg-base-100">
                    <h3 className="text-xl font-black text-base-content">{activeDisciplineEditor.name}</h3>
                    <button
                        type="button"
                        onClick={() => setActiveDisciplineEditor(null)}
                        className="btn btn-ghost btn-xs btn-circle text-neutral-content hover:text-base-content"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
                    <div>
                        <label className="text-neutral-content font-bold block mb-1.5 uppercase">Nome da Disciplina</label>
                        <input
                            type="text"
                            value={activeDisciplineEditor.name}
                            onChange={(e) => setActiveDisciplineEditor({ ...activeDisciplineEditor, name: e.target.value })}
                            className="input w-full bg-base-200 text-base-content font-bold outline-none rounded-2xl border border-base-300"
                        />
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="font-extrabold text-base-content uppercase tracking-wider">Tópicos do Edital</span>
                            <span className="text-neutral-content font-semibold">
                                {activeDisciplineEditor.topics.length} tópicos cadastrados
                            </span>
                        </div>

                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Digite o nome do novo tópico/assunto..."
                                value={newTopicInput}
                                onChange={(e) => setNewTopicInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleAddTopicToDiscipline();
                                }}
                                className="input flex-1 bg-base-200 text-base-content outline-none text-xs rounded-2xl border border-base-300"
                            />
                            <button
                                type="button"
                                onClick={handleAddTopicToDiscipline}
                                className="btn btn-primary btn-sm text-white font-bold px-4 py-2 rounded-2xl flex items-center gap-1.5 shadow-sm border-none"
                            >
                                <Plus size={15} /> Adicionar
                            </button>
                        </div>

                        <div className="bg-base-200 rounded-3xl divide-y divide-base-300 max-h-64 overflow-y-auto p-1 border border-base-300">
                            {activeDisciplineEditor.topics.length === 0 ? (
                                <div className="p-6 text-center text-neutral-content">Nenhum tópico adicionado ainda.</div>
                            ) : (
                                activeDisciplineEditor.topics.map((t, idx) => (
                                    <div
                                        key={t.id}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, idx)}
                                        onDragOver={(e) => handleDragOver(e, idx)}
                                        onDragEnd={handleDragEnd}
                                        className={`p-3.5 flex items-center justify-between transition-colors select-none cursor-grab active:cursor-grabbing rounded-2xl ${draggedTopicIndex === idx ? 'bg-primary/10' : 'hover:bg-base-100'
                                            }`}
                                    >
                                        <span className="font-semibold text-base-content truncate pr-4 pointer-events-none">{t.name}</span>

                                        <div className="flex items-center shrink-0">
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteTopicFromEditor(t.id);
                                                }}
                                                className="btn btn-ghost btn-xs btn-circle text-neutral-content hover:text-error transition-colors"
                                                title="Excluir Tópico"
                                            >
                                                <Trash2 size={15} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-base-200/50 border-t border-base-300 flex justify-between items-center rounded-b-3xl">
                    <button
                        type="button"
                        onClick={() => handleDeleteDiscipline(activeDisciplineEditor.id)}
                        className="btn btn-sm btn-ghost text-error px-4 py-2 rounded-2xl text-xs font-bold hover:bg-error/10"
                    >
                        Remover Disciplina
                    </button>
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={() => setActiveDisciplineEditor(null)}
                            className="btn btn-sm btn-ghost px-4 py-2 rounded-2xl text-xs font-bold text-neutral-content hover:text-base-content"
                        >
                            Cancelar
                        </button>
                        <button
                            type="button"
                            onClick={handleSaveDisciplineEditor}
                            className="btn btn-sm btn-primary text-white font-bold text-xs px-6 py-2 rounded-2xl shadow-md border-none"
                        >
                            Salvar Alterações
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}