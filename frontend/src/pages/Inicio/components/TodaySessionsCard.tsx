import React from 'react';
import { Clock, Target, FileEdit } from 'lucide-react';
import { toTitleCase } from '../../../utils/studyCalculations';

const defaultSessoes = [
    {
        id: 1,
        disciplina: 'DIREITO CONSTITUCIONAL',
        topico: 'Direitos e Garantias Fundamentais',
        minutos: 50,
        questoes: 20,
        acertos: 18
    },
    {
        id: 2,
        disciplina: 'LÍNGUA PORTUGUESA',
        topico: 'Emprego da Crase',
        minutos: 40,
        questoes: 15,
        acertos: 12
    }
];

export default function TodaySessionsCard({ sessoes = defaultSessoes }) {
    const totalMinutos = sessoes.reduce((acc, curr) => acc + curr.minutos, 0);
    const totalQuestoes = sessoes.reduce((acc, curr) => acc + curr.questoes, 0);
    const totalAcertos = sessoes.reduce((acc, curr) => acc + curr.acertos, 0);
    const taxaMedia = totalQuestoes > 0 ? Math.round((totalAcertos / totalQuestoes) * 100) : 0;

    const formatHoraTotal = (min) => {
        const h = Math.floor(min / 60);
        const m = min % 60;
        return `${String(h).padStart(2, '0')}h ${String(m).padStart(2, '0')}min`;
    };

    const getBorderColor = (disciplina = '') => {
        const d = disciplina.toLowerCase();
        if (d.includes('constitucional')) return 'bg-primary';
        if (d.includes('portuguesa') || d.includes('português')) return 'bg-secondary';
        if (d.includes('administrativo')) return 'bg-accent';
        return 'bg-primary';
    };

    return (
        <div className="rounded-[22px] border border-base-300 bg-base-100 shadow-sm overflow-hidden flex flex-col justify-between h-full">
            {/* HEADER */}
            <div className="p-4 pb-3 border-b border-base-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 text-primary flex items-center justify-center">
                        <FileEdit size={15} />
                    </div>
                    <h3 className="text-sm font-bold text-base-content">Estudo Detalhado de Hoje</h3>
                </div>
                <span className="badge badge-xs bg-slate-100 text-slate-600 font-semibold py-2 px-2.5 rounded-full border-slate-200">
                    {sessoes.length} {sessoes.length === 1 ? 'sessão' : 'sessões'} hoje
                </span>
            </div>

            {/* LISTA DE MATÉRIAS */}
            <div className="p-3.5 space-y-2.5 flex-1">
                {sessoes.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-36 text-center text-slate-400 gap-1.5">
                        <p className="text-xs font-medium">Nenhum estudo registrado hoje.</p>
                        <span className="text-[11px] text-slate-400">Inicie uma sessão para ver os detalhes aqui.</span>
                    </div>
                ) : (
                    sessoes.map((sessao) => {
                        const perc = sessao.questoes > 0 ? Math.round((sessao.acertos / sessao.questoes) * 100) : 0;
                        return (
                            <div
                                key={sessao.id}
                                className="relative pl-3.5 pr-3 py-2.5 rounded-xl border border-base-300 bg-white hover:border-slate-300 hover:shadow-xs transition-colors duration-150 space-y-2 overflow-hidden"
                            >
                                {/* Listra Lateral */}
                                <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl ${getBorderColor(sessao.disciplina)}`} />

                                <div>
                                    <h4 className="text-sm font-bold text-base-content tracking-wide">
                                        {toTitleCase(sessao.disciplina)}
                                    </h4>
                                    <p className="text-xs text-slate-500 font-normal mt-0.5">
                                        {sessao.topico}
                                    </p>
                                </div>

                                <div className="border-t border-slate-100 pt-2 flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100 font-medium">
                                        <Clock className="text-slate-400" size={13} />
                                        <span>{sessao.minutos} min líquidas</span>
                                    </div>

                                    <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-100 font-semibold">
                                        <Target className="text-emerald-600" size={13} />
                                        <span>{sessao.questoes} questões</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* RODAPÉ INTEGRADO */}
            <div className="px-4 py-3 bg-slate-50/80 border-t border-base-200 flex items-center justify-between text-xs mt-auto">
                <span className="text-slate-500 font-medium">
                    Total: <strong className="font-bold text-base-content tabular-nums">{formatHoraTotal(totalMinutos)}</strong>
                </span>
                <span className="text-slate-500 font-medium">
                    Questões: <strong className="font-bold text-secondary tabular-nums">{totalQuestoes} feitas</strong>
                </span>
            </div>
        </div>
    );
}
