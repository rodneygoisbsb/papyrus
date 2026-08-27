import React from 'react';
import { Plus, Trash2, Folder, Edit2 } from 'lucide-react';

export default function ConcursosTab({
    plans,
    setPlans,
    currentPlan,
    currentDisciplines,
    totalPlanTopics,
    totalPlanStudied,
    topicsRemaining,
    progressPercentage,
    handleAddNewDiscipline,
    handleDeletePlan,
    setActiveTab,
    setActiveDisciplineEditor,
    handleDeleteDiscipline
}) {
    return (
        <div className="space-y-6 animate-in fade-in duration-200">
            <div>
                <div
                    onClick={() => alert('Em breve integração com novo plano!')}
                    className="bg-base-100 rounded-3xl p-4 flex items-center gap-3 cursor-pointer transition-all group w-fit pr-6 shadow-sm hover:shadow-md border border-base-300/60"
                >
                    <div className="w-9 h-9 rounded-2xl bg-primary/10 group-hover:bg-primary text-primary group-hover:text-primary-content flex items-center justify-center transition-colors shrink-0">
                        <Plus size={18} />
                    </div>
                    <div>
                        <h4 className="font-extrabold text-xs text-base-content group-hover:text-primary transition-colors">Criar Novo Plano</h4>
                        <p className="text-[10px] text-neutral-content">Adicionar novo concurso</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
                <div className="lg:col-span-2 bg-base-100 border border-base-300/60 rounded-3xl p-7 relative shadow-sm flex flex-col md:flex-row gap-6 items-center justify-between">
                    <div className="flex flex-col md:flex-row gap-6 items-center w-full">
                        <div className="relative group/logo shrink-0">
                            <input
                                type="file"
                                accept="image/*"
                                id="logo-upload-input"
                                className="hidden"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        const imageUrl = URL.createObjectURL(file);
                                        setPlans(plans.map((p) => (p.id === currentPlan.id ? { ...p, logoUrl: imageUrl } : p)));
                                    }
                                }}
                            />
                            <label
                                htmlFor="logo-upload-input"
                                className="w-32 h-32 md:w-36 md:h-36 rounded-2xl flex flex-col items-center justify-center font-black text-primary-content text-4xl shadow-inner cursor-pointer overflow-hidden relative bg-primary shadow-md shadow-primary/20"
                                style={{ backgroundColor: currentPlan.logoUrl ? 'transparent' : (currentPlan.colorHex || '#1E60F6') }}
                            >
                                {currentPlan.logoUrl ? (
                                    <img src={currentPlan.logoUrl} alt="Logo do Concurso" className="w-full h-full object-cover" />
                                ) : (
                                    <span>{currentPlan.title.charAt(0)}</span>
                                )}
                                <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover/logo:opacity-100 flex flex-col items-center justify-center text-white transition-opacity text-center p-2">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-white">Alterar Logo</span>
                                </div>
                            </label>
                        </div>

                        <div className="flex-1 w-full space-y-2">
                            <h3 className="text-3xl font-black text-base-content">{currentPlan.title}</h3>
                            <div className="space-y-1 pt-1 text-xs text-neutral-content">
                                <p><span className="font-bold text-base-content">Data da Prova:</span> {currentPlan.targetDate}</p>
                                <p><span className="font-bold text-base-content">Cargo:</span> {currentPlan.role}</p>
                                <p><span className="font-bold text-base-content">Total de Matérias:</span> {currentDisciplines.length} disciplinas ({totalPlanTopics} tópicos)</p>
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-6 right-6 flex items-center gap-2 z-10">
                        <button
                            type="button"
                            onClick={handleAddNewDiscipline}
                            className="bg-primary/10 hover:bg-primary/20 text-primary font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                            <Plus size={14} /> Nova Disciplina
                        </button>
                        <button
                            type="button"
                            onClick={() => handleDeletePlan(currentPlan.id)}
                            className="p-2.5 text-error hover:bg-error/20 bg-error/10 rounded-xl transition-all cursor-pointer flex items-center justify-center"
                            title="Excluir Plano"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                </div>

                <div className="flex flex-col justify-between gap-4">
                    <div className="bg-base-100 border border-base-300/60 rounded-3xl p-6 flex flex-col justify-between shadow-sm flex-1">
                        <div>
                            <div className="flex justify-between items-baseline mb-1">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-content">Progresso do Edital</span>
                                <span className="text-xl font-black text-primary">{progressPercentage}%</span>
                            </div>
                            <p className="text-[11px] text-neutral-content">
                                {totalPlanStudied} de {totalPlanTopics} tópicos estudados ({topicsRemaining} restantes)
                            </p>
                        </div>
                        <div className="w-full bg-base-300 h-2.5 rounded-full mt-3 overflow-hidden">
                            <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%` }} />
                        </div>
                    </div>

                    <div className="bg-base-100 border border-base-300/60 rounded-3xl p-6 flex items-center justify-around text-center shadow-sm flex-1">
                        <div>
                            <span className="text-2xl font-black text-base-content block">{currentPlan.questionsTotal}</span>
                            <span className="text-[10px] text-neutral-content font-bold uppercase tracking-wider">Questões Feitas</span>
                        </div>
                        <div className="w-[1px] h-10 bg-base-300" />
                        <div>
                            <span className="text-2xl font-black text-secondary block">{currentPlan.accuracy}%</span>
                            <span className="text-[10px] text-neutral-content font-bold uppercase tracking-wider">Desempenho</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {currentDisciplines.map((d) => {
                        const total = d.topics?.length || 0;
                        return (
                            <div
                                key={d.id}
                                className="relative overflow-hidden bg-base-100 border border-base-300/60 rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all group"
                            >
                                <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary" />
                                <div className="space-y-4 pt-1">
                                    <h5 className="font-extrabold text-base text-base-content truncate">{d.name}</h5>
                                    <div className="grid grid-cols-3 gap-2 text-center bg-base-200/80 p-3.5 rounded-2xl">
                                        <div>
                                            <span className="block font-black text-2xl text-primary tracking-tight">{d.studiedTopics}</span>
                                            <span className="text-neutral-content text-[10px] font-bold uppercase tracking-wide mt-0.5 block">Estudados</span>
                                        </div>
                                        <div>
                                            <span className="block font-black text-2xl text-base-content tracking-tight">{total}</span>
                                            <span className="text-neutral-content text-[10px] font-bold uppercase tracking-wide mt-0.5 block">Totais</span>
                                        </div>
                                        <div>
                                            <span className="block font-black text-2xl text-secondary tracking-tight">{d.questionsDone}</span>
                                            <span className="text-neutral-content text-[10px] font-bold uppercase tracking-wide mt-0.5 block">Questões</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-end gap-1.5 pt-4 mt-2 relative z-20">
                                    <button
                                        type="button"
                                        onClick={() => setActiveTab('edital')}
                                        className="group/btn flex items-center gap-1.5 py-1.5 px-3 rounded-xl text-primary hover:bg-primary/10 transition-all duration-300 cursor-pointer overflow-hidden select-none"
                                    >
                                        <Folder size={18} className="shrink-0 text-primary" />
                                        <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover/btn:max-w-[150px] group-hover/btn:opacity-100 text-xs font-bold text-primary transition-all duration-300 ease-out">
                                            Edital Verticalizado
                                        </span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setActiveDisciplineEditor({ ...d })}
                                        className="group/btn flex items-center gap-1.5 py-1.5 px-3 rounded-xl text-info hover:bg-info/10 transition-all duration-300 cursor-pointer overflow-hidden select-none"
                                    >
                                        <Edit2 size={18} className="shrink-0 text-info" />
                                        <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover/btn:max-w-[130px] group-hover/btn:opacity-100 text-xs font-bold text-info transition-all duration-300 ease-out">
                                            Editar Assuntos
                                        </span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleDeleteDiscipline(d.id)}
                                        className="group/btn flex items-center gap-1.5 py-1.5 px-3 rounded-xl text-error hover:bg-error/15 transition-all duration-300 cursor-pointer overflow-hidden select-none"
                                    >
                                        <Trash2 size={18} className="shrink-0 text-error" />
                                        <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover/btn:max-w-[80px] group-hover/btn:opacity-100 text-xs font-bold text-error transition-all duration-300 ease-out">
                                            Remover
                                        </span>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}