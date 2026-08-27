import React, { useState } from 'react';
import { Plus, Trash2, Edit3, Folder, BookOpen, X, Check, ArrowRight } from 'lucide-react';

export default function ConcursosTab({
    disciplines = [],
    activeDisciplineEditor = null,
    setActiveDisciplineEditor = () => { },
    onOpenNewDiscipline = () => { },
    onEditDiscipline = () => { },
    onDeleteDiscipline = () => { },
    onSaveDiscipline = () => { }
}) {
    const [newTopicText, setNewTopicText] = useState('');

    // Cores semânticas oficiais para as fitas laterais de identificação
    const availableColors = [
        { label: 'Azul (Constitucional)', hex: '#2563EB' },
        { label: 'Laranja (Administrativo)', hex: '#EA580C' },
        { label: 'Verde (Português)', hex: '#16A34A' },
        { label: 'Roxo (Penal)', hex: '#7C3AED' },
        { label: 'Carmesim (Raciocínio Lógico)', hex: '#E11D48' },
        { label: 'Ciano (Legislação)', hex: '#0891B2' }
    ];

    // Adiciona novo tópico na lista do modal
    const handleAddTopic = () => {
        if (!newTopicText.trim()) return;
        const newTopic = {
            id: `t_temp_${Date.now()}`,
            name: newTopicText.trim(),
            theoryCompleted: false
        };
        setActiveDisciplineEditor((prev) => ({
            ...prev,
            topics: [...(prev?.topics || []), newTopic]
        }));
        setNewTopicText('');
    };

    // Remove tópico da lista no modal
    const handleRemoveTopic = (topicId) => {
        setActiveDisciplineEditor((prev) => ({
            ...prev,
            topics: (prev?.topics || []).filter((t) => t.id !== topicId)
        }));
    };

    return (
        <div className="space-y-6 font-['Plus_Jakarta_Sans'] text-base-content animate-in fade-in duration-200">

            {/* 1. CABEÇALHO DA SEÇÃO DE CONCURSOS */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-base-100 p-6 rounded-3xl border border-base-300/70 shadow-xs">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <BookOpen size={20} className="text-primary" />
                        <h2 className="text-xl font-bold tracking-tight text-base-content">
                            Disciplinas do Concurso
                        </h2>
                    </div>
                    <p className="text-xs text-neutral-content">
                        Adicione matérias e monte o edital verticalizado do seu concurso.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onOpenNewDiscipline}
                    className="btn btn-primary text-primary-content font-bold gap-2 rounded-xl shadow-xs"
                >
                    <Plus size={16} /> Nova Disciplina
                </button>
            </div>

            {/* 2. GRID DE DISCIPLINAS CADASTRADAS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(!disciplines || disciplines.length === 0) ? (
                    <div className="col-span-full p-12 text-center bg-base-100 border border-base-300/60 rounded-3xl text-neutral-content space-y-3">
                        <Folder size={36} className="mx-auto text-neutral-content/40" />
                        <p className="text-sm font-semibold text-base-content">
                            Nenhuma disciplina cadastrada ainda.
                        </p>
                        <p className="text-xs text-neutral-content max-w-sm mx-auto">
                            Clique no botão <b>"+ Nova Disciplina"</b> acima para cadastrar Direito Constitucional, Português ou qualquer outra matéria.
                        </p>
                    </div>
                ) : (
                    disciplines.map((disc) => (
                        <div
                            key={disc.id}
                            className="bg-base-100 border border-base-300/70 rounded-3xl p-6 shadow-xs flex flex-col justify-between hover:shadow-sm transition-all border-l-[6px]"
                            style={{ borderLeftColor: disc.colorHex || '#2563EB' }}
                        >
                            <div>
                                {/* Nome da Matéria e Ações */}
                                <div className="flex justify-between items-start gap-2">
                                    <h3 className="font-bold text-base tracking-tight text-base-content uppercase truncate">
                                        {disc.name}
                                    </h3>
                                    <div className="flex items-center gap-1 shrink-0">
                                        <button
                                            type="button"
                                            onClick={() => onEditDiscipline(disc)}
                                            className="btn btn-ghost btn-xs btn-square text-neutral-content hover:text-primary rounded-lg"
                                            title="Editar Disciplina"
                                        >
                                            <Edit3 size={15} />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => onDeleteDiscipline(disc.id)}
                                            className="btn btn-ghost btn-xs btn-square text-neutral-content hover:text-error rounded-lg"
                                            title="Excluir Disciplina"
                                        >
                                            <Trash2 size={15} />
                                        </button>
                                    </div>
                                </div>

                                {/* Métricas da Disciplina */}
                                <div className="grid grid-cols-3 gap-2 bg-base-200/40 border border-base-300/50 p-3 rounded-2xl my-4 text-center">
                                    <div>
                                        <span className="text-xl font-bold text-primary block leading-none tabular-nums">
                                            {disc.studiedTopics || 0}
                                        </span>
                                        <span className="text-[10px] text-neutral-content uppercase font-semibold mt-1 block">
                                            Estudados
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-xl font-bold text-base-content block leading-none tabular-nums">
                                            {disc.totalTopics || disc.topics?.length || 0}
                                        </span>
                                        <span className="text-[10px] text-neutral-content uppercase font-semibold mt-1 block">
                                            Totais
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-xl font-bold text-[#16A34A] block leading-none tabular-nums">
                                            {disc.questionsDone || 0}
                                        </span>
                                        <span className="text-[10px] text-neutral-content uppercase font-semibold mt-1 block">
                                            Questões
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Rodapé do Card */}
                            <div className="pt-3 flex justify-between items-center text-xs text-neutral-content border-t border-base-300/60 font-medium">
                                <span className="flex items-center gap-1.5">
                                    <Folder size={14} className="text-primary" />
                                    {disc.topics?.length || 0} tópicos no edital
                                </span>
                                <button
                                    type="button"
                                    onClick={() => onEditDiscipline(disc)}
                                    className="text-primary font-semibold hover:underline flex items-center gap-0.5 text-[11px]"
                                >
                                    Ver tópicos <ArrowRight size={12} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* 3. MODAL DE CRIAÇÃO / EDIÇÃO DE DISCIPLINA */}
            {activeDisciplineEditor && (
                <div className="modal modal-open bg-black/40 backdrop-blur-xs">
                    <div className="modal-box max-w-xl bg-base-100 rounded-3xl border border-base-300/80 shadow-2xl p-6 space-y-5 font-['Plus_Jakarta_Sans']">

                        {/* Topo do Modal */}
                        <div className="flex justify-between items-center pb-3 border-b border-base-300/60">
                            <div className="flex items-center gap-2">
                                <BookOpen size={18} className="text-primary" />
                                <h3 className="font-bold text-base text-base-content">
                                    {activeDisciplineEditor.id ? 'Editar Disciplina' : 'Nova Disciplina'}
                                </h3>
                            </div>
                            <button
                                type="button"
                                onClick={() => setActiveDisciplineEditor(null)}
                                className="btn btn-ghost btn-xs btn-square rounded-full text-neutral-content hover:text-base-content"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Input Nome da Matéria */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-neutral-content">
                                Nome da Matéria
                            </label>
                            <input
                                type="text"
                                placeholder="Ex: DIREITO PROCESSUAL PENAL"
                                value={activeDisciplineEditor.name || ''}
                                onChange={(e) =>
                                    setActiveDisciplineEditor((prev) => ({ ...prev, name: e.target.value }))
                                }
                                className="input input-bordered w-full bg-base-200/40 focus:bg-base-100 rounded-xl text-sm font-semibold"
                                autoFocus
                            />
                        </div>

                        {/* Seletor de Cores da Fita */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-neutral-content">
                                Cor de Identificação
                            </label>
                            <div className="flex items-center gap-2.5 flex-wrap">
                                {availableColors.map((cor) => (
                                    <button
                                        key={cor.hex}
                                        type="button"
                                        onClick={() =>
                                            setActiveDisciplineEditor((prev) => ({ ...prev, colorHex: cor.hex }))
                                        }
                                        className={`w-7 h-7 rounded-full transition-transform cursor-pointer border-2 ${activeDisciplineEditor.colorHex === cor.hex
                                                ? 'scale-110 border-base-content shadow-xs ring-2 ring-primary/40'
                                                : 'border-transparent opacity-80 hover:opacity-100'
                                            }`}
                                        style={{ backgroundColor: cor.hex }}
                                        title={cor.label}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Inclusão de Tópicos do Edital */}
                        <div className="space-y-2 pt-2 border-t border-base-300/60">
                            <div className="flex justify-between items-center">
                                <label className="text-xs font-bold uppercase tracking-wider text-neutral-content">
                                    Assuntos / Tópicos do Edital
                                </label>
                                <span className="text-xs font-semibold text-primary">
                                    {activeDisciplineEditor.topics?.length || 0} adicionados
                                </span>
                            </div>

                            {/* Campo para digitar o assunto */}
                            <div className="flex gap-2">
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
                                    className="input input-bordered flex-1 bg-base-200/40 focus:bg-base-100 rounded-xl text-sm"
                                />
                                <button
                                    type="button"
                                    onClick={handleAddTopic}
                                    className="btn btn-primary text-primary-content font-bold rounded-xl px-4 shrink-0"
                                >
                                    <Plus size={16} /> Adicionar
                                </button>
                            </div>

                            {/* Lista com Rolagem dos Tópicos Adicionados */}
                            <div className="max-h-40 overflow-y-auto space-y-1.5 pr-1 mt-2">
                                {(!activeDisciplineEditor.topics || activeDisciplineEditor.topics.length === 0) ? (
                                    <p className="text-xs text-neutral-content italic py-3 text-center bg-base-200/20 rounded-xl border border-dashed border-base-300">
                                        Nenhum tópico adicionado. Digite o assunto e clique em "Adicionar" (ou tecle Enter).
                                    </p>
                                ) : (
                                    activeDisciplineEditor.topics.map((topic, index) => (
                                        <div
                                            key={topic.id || index}
                                            className="flex items-center justify-between p-2.5 rounded-xl bg-base-200/50 border border-base-300/60 text-xs font-medium"
                                        >
                                            <span className="truncate pr-2">
                                                <b className="text-primary mr-2">{index + 1}.</b> {topic.name}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveTopic(topic.id)}
                                                className="text-neutral-content hover:text-error transition-colors p-1"
                                                title="Remover Tópico"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Ações Inferiores */}
                        <div className="flex justify-end gap-2 pt-4 border-t border-base-300/60">
                            <button
                                type="button"
                                onClick={() => setActiveDisciplineEditor(null)}
                                className="btn btn-sm btn-ghost rounded-xl"
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                onClick={onSaveDiscipline}
                                className="btn btn-sm btn-primary text-primary-content font-bold px-5 rounded-xl shadow-xs"
                            >
                                Salvar Disciplina
                            </button>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
}