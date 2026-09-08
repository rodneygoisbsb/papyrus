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

    const totalTopicsInPlan = disciplines.reduce((sum, d) => sum + (d.totalTopics || d.topics?.length || 0), 0);
    const studiedTopicsInPlan = disciplines.reduce((sum, d) => sum + (d.studiedTopics || 0), 0);
    const planProgressPercent = totalTopicsInPlan > 0 ? Math.round((studiedTopicsInPlan / totalTopicsInPlan) * 100) : 0;

    return (
        <div className="space-y-6 font-['Plus_Jakarta_Sans'] text-base-content animate-in fade-in duration-200">
            {/* 1. CABEÇALHO DA SEÇÃO DE DISCIPLINAS */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 bg-base-100 p-6 rounded-3xl border border-base-300/70 shadow-xs">

                <div className="flex items-center gap-5 w-full">
                    {/* Imagem do Plano / Logo */}
                    {currentPlan?.imagemUrl ? (
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shrink-0 border border-base-300/50 shadow-sm bg-base-200 flex items-center justify-center">
                            <img src={currentPlan.imagemUrl} alt={currentPlan.nome} className="w-full h-full object-cover" />
                        </div>
                    ) : (
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary flex items-center justify-center shrink-0 border border-primary/20 shadow-sm">
                            <BookOpen size={32} />
                        </div>
                    )}

                    <div className="flex-1 w-full min-w-0">
                        <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4 mb-1">
                            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-base-content uppercase truncate">
                                {currentPlan?.nome || 'Suas Disciplinas'}
                            </h2>
                            <div className="badge badge-sm bg-blue-500/10 text-blue-600 border-none font-bold px-2 py-2 shrink-0 rounded-lg">
                                {planProgressPercent}% Concluído
                            </div>
                        </div>
                        <p className="text-xs sm:text-sm text-neutral-content font-medium truncate mb-3">
                            {currentPlan?.orgao || 'Adicione e edite matérias e tópicos para os seus planos de estudo.'}
                        </p>

                        {/* Barra de Progresso Real do Edital */}
                        <div className="w-full max-w-md">
                            <div className="flex justify-between items-center text-xs font-bold text-neutral-content mb-1 uppercase tracking-wider">
                                <span>Progresso Geral</span>
                                <span>{studiedTopicsInPlan} / {totalTopicsInPlan} tópicos</span>
                            </div>
                            <div className="w-full bg-base-200 rounded-full h-1.5 overflow-hidden border border-base-300">
                                <div
                                    className="bg-blue-500 h-full rounded-full transition-[width] duration-700 ease-out"
                                    style={{ width: `${planProgressPercent}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="shrink-0 w-full sm:w-auto flex justify-end mt-2 sm:mt-0">
                    <button
                        type="button"
                        onClick={onOpenNewDiscipline}
                        className="btn btn-primary flex items-center gap-2 bg-primary text-primary-content  rounded-xl transition-all shadow-sm hover:shadow-md hover:bg-primary/90 font-bold group cursor-pointer shrink-0"
                    >
                        <Plus size={16} className="group-hover:rotate-90 transition-transform duration-300" /><span>Nova Disciplina</span>
                    </button>
                </div>
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
                            className="card-papyrus flex flex-col justify-between relative min-h-[160px] group transition-all duration-300 hover:-translate-y-1 bg-base-100"
                        >
                            {/* Hover Efeito: Borda Sutil + Sombra com a cor da disciplina */}
                            <div
                                className="absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                style={{
                                    boxShadow: `0 12px 30px -10px ${disc.colorHex}40`,
                                    border: `1px solid ${disc.colorHex}40`
                                }}
                            />

                            {/* Top row: Dot and Actions */}
                            <div className="flex justify-between items-start relative z-10 w-full mb-3">
                                <div
                                    className="w-4 h-4 rounded-full shrink-0 mt-1 opacity-60"
                                    style={{
                                        backgroundColor: disc.colorHex || '#2563EB'
                                    }}
                                />
                                <div className="flex items-center gap-1 shrink-0 -mr-2 -mt-2">
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

                            {/* Title */}
                            <div className="mb-6 relative z-10 min-w-0">
                                <h3 className="font-extrabold text-base tracking-tight text-base-content uppercase truncate">
                                    {disc.name}
                                </h3>
                            </div>

                            {/* Bottom Stats */}
                            <div className="pt-4 flex justify-between items-end text-xs font-bold uppercase tracking-wider border-t border-base-300/60 mt-auto">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-lg font-bold text-content leading-none">
                                        {disc.studiedTopics || 0}
                                    </span>
                                    <span className="text-neutral-content/90">
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
