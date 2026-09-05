import React from 'react';
import { Plus, Trash2, Edit3, Folder, BookOpen } from 'lucide-react';
import DisciplineEditorModal from './components/DisciplineEditorModal';

export default function DisciplinasPage({
    currentPlan,
    disciplines = [],
    activeDisciplineEditor = null,
    setActiveDisciplineEditor = () => { },
    onOpenNewDiscipline = () => { },
    onEditDiscipline = () => { },
    onDeleteDiscipline = () => { },
    onSaveDiscipline = () => { }
}) {


    return (
        <div className="space-y-6 font-['Plus_Jakarta_Sans'] text-base-content animate-in fade-in duration-200">
            {/* 1. CABEÇALHO DA SEÇÃO DE DISCIPLINAS */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-base-100 p-6 rounded-3xl border border-base-300/70 shadow-xs">
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <BookOpen size={20} className="text-primary" />
                        <h2 className="text-xl font-bold tracking-tight text-base-content uppercase">
                            {currentPlan?.nome || 'Suas Disciplinas'}
                        </h2>
                    </div>
                    <p className="text-xs text-neutral-content font-medium">
                        {currentPlan?.orgao || 'Adicione e edite matérias e tópicos para os seus planos de estudo.'}
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
                    <div className="col-span-full card-papyrus !p-12 text-center text-neutral-content space-y-3">
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
                            className="card-papyrus flex flex-col justify-between border-l-[9px] relative min-h-[160px]"
                            style={{ borderLeftColor: disc.colorHex || '#2563EB' }}
                        >
                            {/* Top Bar: Title & Actions */}
                            <div className="flex justify-between items-start gap-2 mb-6">
                                <h3 className="font-bold text-base tracking-tight text-base-content uppercase truncate mt-10">
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

                            {/* Bottom Stats */}
                            <div className="pt-4 flex justify-between items-end text-[11px] font-bold uppercase tracking-wider border-t border-base-300/60 mt-auto">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-lg font-bold text-primary leading-none">
                                        {disc.studiedTopics || 0}
                                    </span>
                                    <span className="text-neutral-content/70">
                                        / {disc.totalTopics || disc.topics?.length || 0} tópicos
                                    </span>
                                </div>
                                <div className="text-[#16A34A] flex items-baseline gap-1">
                                    <span className="text-lg font-bold leading-none">
                                        {disc.questionsDone || 0}
                                    </span>
                                    <span className="mb-[2px] text-success/60">questões</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* 3. MODAL DE CRIAÇÃO / EDIÇÃO DE DISCIPLINA */}
            <DisciplineEditorModal
                activeDisciplineEditor={activeDisciplineEditor}
                setActiveDisciplineEditor={setActiveDisciplineEditor}
                onSaveDiscipline={onSaveDiscipline}
            />
        </div>
    );
}
