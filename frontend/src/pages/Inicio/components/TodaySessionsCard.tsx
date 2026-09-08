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

    const getCardBg = (disciplina = '') => {
        const d = disciplina.toLowerCase();
        if (d.includes('constitucional')) return 'bg-primary/5';
        if (d.includes('portuguesa') || d.includes('português')) return 'bg-secondary/10';
        if (d.includes('administrativo')) return 'bg-accent/10';
        return 'bg-primary/5';
    };

    return (
        <div className="card-papyrus !p-0 flex flex-col justify-between h-full overflow-hidden">
            {/* HEADER */}
            <div className="px-5 pt-5 pb-4 border-b border-base-200/60 flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider font-bold text-base-content/70">
                    ESTUDO DE HOJE
                </span>
                <span className="badge badge-sm bg-base-200 text-neutral-content font-semibold py-2 px-2.5 rounded-lg border-base-300">
                    {sessoes.length} {sessoes.length === 1 ? 'sessão' : 'sessões'} hoje
                </span>
            </div>

            {/* LISTA DE MATÉRIAS */}
            <div className="px-5 pb-2 flex-1 overflow-y-auto">
                {sessoes.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-36 text-center text-neutral-content gap-1.5 mt-4">
                        <p className="text-xs font-medium">Nenhum estudo registrado hoje.</p>
                        <span className="text-xs opacity-70">Inicie uma sessão para ver os detalhes aqui.</span>
                    </div>
                ) : (
                    sessoes.map((sessao) => {
                        const perc = sessao.questoes > 0 ? Math.round((sessao.acertos / sessao.questoes) * 100) : 0;
                        return (
                            <div
                                key={sessao.id}
                                className={`group relative py-4 border-b border-base-200/60 last:border-0 hover:bg-base-200/30 transition-colors duration-200 -mx-5 px-5`}
                            >
                                <div className="flex items-center gap-2">
                                    <div className={`w-1.5 h-6 rounded-full shrink-0 ${getCardBg(sessao.disciplina).replace('/5', '').replace('/10', '')}`} />
                                    <div>
                                        <h4 className="text-sm font-bold text-base-content tracking-wide">
                                            {toTitleCase(sessao.disciplina)}
                                        </h4>
                                        <div className="text-xs font-medium text-neutral-content flex items-center gap-1.5 mt-0.5">
                                            <span>⏱ {formatHoraTotal(sessao.minutos)}</span>
                                            {sessao.questoes > 0 && (
                                                <>
                                                    <span className="opacity-50">|</span>
                                                    <span>{sessao.questoes} Questões</span>
                                                    <span className="opacity-50">|</span>
                                                    <span>{perc}% Acerto</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* RODAPÉ INTEGRADO */}

        </div>
    );
}
