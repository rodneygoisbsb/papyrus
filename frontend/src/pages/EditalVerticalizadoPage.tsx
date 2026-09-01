import React from 'react';

export default function EditalVerticalizadoTab({ editalTopics, toggleEditalCheck }) {
    const colunasRevisao = ['theory', 'r1', 'r2', 'r3', 'r4', 'r5', 'r6'];

    return (
        <div className="space-y-6 animate-in fade-in duration-200">
            <div>
                <h2 className="text-2xl font-black text-base-content">Edital Verticalizado & Revisões Espaçadas</h2>
                <p className="text-xs text-neutral-content">Controle de fechamento de teoria e 6 ciclos de revisões ($R_1$ a $R_6$)</p>
            </div>

            <div className="bg-base-100 border border-base-300/70 rounded-3xl overflow-x-auto shadow-sm p-2">
                <table className="table table-xs w-full text-left">
                    <thead className="bg-base-200/80 text-base-content font-bold rounded-2xl">
                        <tr>
                            <th className="p-4 font-black">DISCIPLINA & TÓPICO DO EDITAL</th>
                            <th className="p-4 text-center font-bold">TEORIA</th>
                            <th className="p-4 text-center font-bold">R1 (24h)</th>
                            <th className="p-4 text-center font-bold">R2 (7d)</th>
                            <th className="p-4 text-center font-bold">R3 (15d)</th>
                            <th className="p-4 text-center font-bold">R4 (30d)</th>
                            <th className="p-4 text-center font-bold">R5 (60d)</th>
                            <th className="p-4 text-center font-bold">R6 (90d)</th>
                            <th className="p-4 text-center font-bold">ÚLTIMO ESTUDO</th>
                            <th className="p-4 text-center font-bold">DESEMPENHO</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-base-300">
                        {editalTopics.map((topic) => (
                            <tr key={topic.id} className="hover:bg-base-200/50 transition-colors">
                                <td className="p-4 font-semibold text-base-content">
                                    <span className="text-[10px] uppercase block font-bold text-primary">{topic.subject}</span>
                                    {topic.name}
                                </td>
                                {colunasRevisao.map((col) => (
                                    <td key={col} className="p-4 text-center">
                                        <input
                                            type="checkbox"
                                            checked={topic[col]}
                                            onChange={() => toggleEditalCheck(topic.id, col)}
                                            className="checkbox checkbox-xs checkbox-primary rounded-md cursor-pointer"
                                        />
                                    </td>
                                ))}
                                <td className="p-4 text-center text-neutral-content font-mono text-[11px]">
                                    {topic.lastStudied}
                                </td>
                                <td className="p-4 text-center font-bold">
                                    {topic.totalQuestions > 0 ? (
                                        <span className="text-secondary font-mono">
                                            {Math.round((topic.correctQuestions / topic.totalQuestions) * 100)}% ({topic.correctQuestions}/{topic.totalQuestions})
                                        </span>
                                    ) : (
                                        <span className="text-neutral-content">-</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}