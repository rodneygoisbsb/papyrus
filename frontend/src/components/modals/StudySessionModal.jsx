import React from 'react';
import { X, Clock, Play, RotateCcw, Trophy, FileText, PenTool, Layers } from 'lucide-react';

export default function StudySessionModal({
    activeStudyModal,
    setActiveStudyModal,
    isFocusMode,
    setIsFocusMode,
    timerSeconds,
    setTimerSeconds,
    setIsTimerRunning,
    formatTimer,
    isManualTime,
    setIsManualTime,
    manualMinutes,
    setManualMinutes,
    handleFinishStudy,
    setActiveEditorModal,
    selectedMethods,
    setSelectedMethods,
    questionsDone,
    setQuestionsDone,
    questionsRight,
    setQuestionsRight,
    revisions,
    setRevisions,
    blockRevisionChecked,
    setBlockRevisionChecked
}) {
    if (!activeStudyModal || isFocusMode) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
            <div className="bg-base-100 rounded-3xl w-full max-w-4xl shadow-2xl flex flex-col max-h-[95vh] relative overflow-hidden border border-base-300">
                <button
                    type="button"
                    onClick={() => setActiveStudyModal(null)}
                    className="btn btn-ghost btn-sm btn-circle absolute top-6 right-6 text-neutral-content hover:text-base-content transition-colors cursor-pointer"
                >
                    <X size={22} />
                </button>

                <div className="p-8 pb-6 border-b border-base-300 shrink-0 bg-base-100">
                    <p className="text-primary font-bold text-xs uppercase tracking-wider">{activeStudyModal.subject}</p>
                    <h2 className="text-base-content font-black text-2xl mt-1 pr-8">{activeStudyModal.topicName}</h2>

                    <div className="flex flex-wrap items-center justify-between mt-6 gap-4">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 bg-base-200 px-4 py-2.5 rounded-2xl text-base-content border border-base-300">
                                <Clock size={18} className="text-primary" />
                                <span className="font-mono text-xl font-bold tracking-wider">{formatTimer(timerSeconds)}</span>
                            </div>

                            {!isManualTime && (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsTimerRunning(true);
                                            setIsFocusMode(true);
                                        }}
                                        className="h-11 px-4 flex items-center gap-2 rounded-2xl bg-primary hover:bg-primary/90 text-primary-content font-bold text-xs transition-all shadow-sm shadow-primary/25 active:scale-95 cursor-pointer"
                                    >
                                        <Play size={15} fill="currentColor" /> Modo Concentração
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setTimerSeconds(0);
                                            setIsTimerRunning(false);
                                        }}
                                        className="w-11 h-11 flex items-center justify-center rounded-2xl bg-base-200 hover:bg-base-300 text-neutral-content hover:text-base-content transition-colors cursor-pointer border border-base-300"
                                        title="Zerar Cronômetro"
                                    >
                                        <RotateCcw size={16} />
                                    </button>
                                </>
                            )}

                            <button
                                type="button"
                                onClick={() => setIsManualTime(!isManualTime)}
                                className="text-xs font-bold text-neutral-content hover:text-primary underline ml-1 transition-colors cursor-pointer"
                            >
                                {isManualTime ? 'Voltar para Cronômetro' : 'Inserir Tempo Manual'}
                            </button>
                        </div>

                        <button
                            type="button"
                            onClick={handleFinishStudy}
                            className="h-11 px-6 rounded-2xl bg-secondary hover:bg-secondary/90 text-secondary-content font-black text-xs flex items-center gap-2 transition-all shadow-md shadow-secondary/25 active:scale-95 cursor-pointer"
                        >
                            <Trophy size={18} /> Finalizar Tarefa
                        </button>
                    </div>

                    {isManualTime && (
                        <div className="mt-4 flex items-center gap-3 bg-base-200 p-3.5 rounded-2xl w-fit border border-base-300">
                            <span className="text-xs font-bold text-base-content">Tempo estudado:</span>
                            <input
                                type="number"
                                value={manualMinutes}
                                onChange={(e) => setManualMinutes(e.target.value)}
                                className="bg-base-100 border border-base-300 rounded-xl w-20 px-3 py-1.5 text-primary font-mono font-bold text-base outline-none text-center"
                            />
                            <span className="text-xs font-medium text-neutral-content">min</span>
                        </div>
                    )}
                </div>

                <div className="p-8 space-y-6 bg-base-200/40 overflow-y-auto">
                    <div className="space-y-2">
                        <span className="text-xs font-bold text-neutral-content uppercase tracking-wider block mb-2">Anotações</span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() => setActiveEditorModal({ type: 'errors', title: 'Caderno de Erros' })}
                                className="bg-base-100 border border-base-300/70 p-5 rounded-3xl flex items-center justify-between group transition-all text-left shadow-sm hover:shadow-md cursor-pointer"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-error/10 flex items-center justify-center text-error group-hover:scale-105 transition-transform">
                                        <FileText size={22} />
                                    </div>
                                    <div>
                                        <h4 className="font-extrabold text-sm text-base-content">Caderno de Erros</h4>
                                        <p className="text-[11px] text-neutral-content mt-0.5">Pegadinhas e questões erradas</p>
                                    </div>
                                </div>
                                <span className="text-xs font-bold text-error group-hover:translate-x-1 transition-transform">Editar →</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setActiveEditorModal({ type: 'summary', title: 'Resumo da Matéria' })}
                                className="bg-base-100 border border-base-300/70 p-5 rounded-3xl flex items-center justify-between group transition-all text-left shadow-sm hover:shadow-md cursor-pointer"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                                        <PenTool size={22} />
                                    </div>
                                    <div>
                                        <h4 className="font-extrabold text-sm text-base-content">Resumo da Matéria</h4>
                                        <p className="text-[11px] text-neutral-content mt-0.5">Pontos-chave e mnemônicos</p>
                                    </div>
                                </div>
                                <span className="text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">Editar →</span>
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <span className="text-xs font-bold text-neutral-content uppercase tracking-wider block mb-2">Material Utilizado</span>
                            <div className="flex flex-wrap gap-2">
                                {['PDF', 'Videoaula', 'Questões', 'Lei Seca', 'Resumo Próprio'].map((method) => {
                                    const isSelected = selectedMethods.includes(method);
                                    return (
                                        <button
                                            key={method}
                                            type="button"
                                            onClick={() => {
                                                setSelectedMethods((prev) =>
                                                    prev.includes(method) ? prev.filter((m) => m !== method) : [...prev, method]
                                                );
                                            }}
                                            className={`text-xs font-bold px-4 py-2.5 rounded-2xl transition-all cursor-pointer ${isSelected
                                                    ? 'bg-primary text-white shadow-sm shadow-primary/20'
                                                    : 'bg-base-100 border border-base-300 text-neutral-content hover:bg-base-200'
                                                }`}
                                        >
                                            {method}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <span className="text-xs font-bold text-neutral-content uppercase tracking-wider block mb-2">Desempenho em Questões</span>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label className="text-[10px] font-bold text-neutral-content mb-1 block">Feitas</label>
                                    <div className="flex items-center justify-between bg-base-100 border border-base-300 rounded-2xl p-1.5 shadow-2xs">
                                        <button
                                            type="button"
                                            onClick={() => setQuestionsDone((prev) => Math.max(0, Number(prev || 0) - 1))}
                                            className="w-8 h-8 flex items-center justify-center text-primary text-base font-bold select-none hover:bg-base-200 rounded-xl cursor-pointer transition-colors"
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            min="0"
                                            value={questionsDone ?? ''}
                                            onChange={(e) => setQuestionsDone(e.target.value)}
                                            placeholder="0"
                                            className="w-full bg-transparent text-center text-base-content font-bold text-sm outline-none"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setQuestionsDone((prev) => Number(prev || 0) + 1)}
                                            className="w-8 h-8 text-primary flex items-center justify-center text-sm font-bold select-none hover:bg-base-200 rounded-xl cursor-pointer transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <label className="text-[10px] font-bold text-neutral-content mb-1 block">Acertos</label>
                                    <div className="flex items-center justify-between bg-base-100 border border-base-300 rounded-2xl p-1.5 shadow-2xs">
                                        <button
                                            type="button"
                                            onClick={() => setQuestionsRight((prev) => Math.max(0, Number(prev || 0) - 1))}
                                            className="w-8 h-8 flex items-center justify-center text-secondary text-base font-bold select-none hover:bg-base-200 rounded-xl cursor-pointer transition-colors"
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            min="0"
                                            value={questionsRight ?? ''}
                                            onChange={(e) => setQuestionsRight(e.target.value)}
                                            placeholder="0"
                                            className="w-full bg-transparent text-center text-base-content font-bold text-sm outline-none"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setQuestionsRight((prev) => Number(prev || 0) + 1)}
                                            className="w-8 h-8 text-secondary flex items-center justify-center text-sm font-bold select-none hover:bg-base-200 rounded-xl cursor-pointer transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 bg-base-100 border border-base-300/70 p-7 rounded-3xl shadow-sm">
                        <span className="text-xs font-bold text-neutral-content block tracking-wider uppercase">AGENDAMENTO DE REVISÕES PERIÓDICAS</span>

                        <div className="flex flex-wrap gap-2.5">
                            {[
                                { key: 'r24h', label: '24 horas' },
                                { key: 'r7d', label: '7 dias' },
                                { key: 'r15d', label: '15 dias' },
                                { key: 'r30d', label: '30 dias' },
                                { key: 'r60d', label: '60 dias' },
                                { key: 'r90d', label: '90 dias' }
                            ].map((rev) => {
                                const isRevActive = revisions[rev.key];
                                return (
                                    <button
                                        key={rev.key}
                                        type="button"
                                        onClick={() => setRevisions({ ...revisions, [rev.key]: !revisions[rev.key] })}
                                        className={`text-xs font-bold px-4 py-2.5 rounded-2xl transition-all cursor-pointer ${isRevActive
                                                ? 'bg-primary text-white shadow-sm shadow-primary/20'
                                                : 'bg-base-200 border border-base-300 text-neutral-content hover:bg-base-300'
                                            }`}
                                    >
                                        {rev.label}
                                    </button>
                                );
                            })}
                        </div>

                        <div
                            onClick={() => setBlockRevisionChecked(!blockRevisionChecked)}
                            className={`p-4 rounded-2xl transition-all cursor-pointer flex items-center justify-between select-none border border-base-300 ${blockRevisionChecked ? 'bg-primary/10' : 'bg-base-200 hover:bg-base-300'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-xl ${blockRevisionChecked ? 'bg-primary/20 text-primary' : 'bg-base-300 text-neutral-content'}`}>
                                    <Layers size={18} />
                                </div>
                                <div>
                                    <div className={`text-xs font-bold ${blockRevisionChecked ? 'text-primary' : 'text-neutral-content'}`}>
                                        Agendar Revisão em Bloco
                                    </div>
                                    <div className="text-[10px] text-neutral-content mt-0.5">
                                        Dispara revisão automática a cada 3 tópicos desta matéria
                                    </div>
                                </div>
                            </div>

                            <div className={`w-11 h-6 rounded-full p-0.5 transition-colors ${blockRevisionChecked ? 'bg-primary' : 'bg-neutral'}`}>
                                <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${blockRevisionChecked ? 'translate-x-5' : 'translate-x-0'}`} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}