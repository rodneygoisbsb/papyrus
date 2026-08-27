import React from 'react';

export default function DesempenhoTab() {
    const desempenhoMaterias = [
        { name: 'Direito Constitucional', pct: 86, color: 'bg-primary' },
        { name: 'Direito Administrativo', pct: 88, color: 'bg-secondary' },
        { name: 'Língua Portuguesa', pct: 72, color: 'bg-accent' },
        { name: 'Raciocínio Lógico (RLM)', pct: 58, color: 'bg-error' }
    ];

    return (
        <div className="space-y-6 animate-in fade-in duration-200">
            <h2 className="text-2xl font-black text-base-content">Painel de Desempenho</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-base-100 border border-base-300/70 rounded-3xl p-7 space-y-3 shadow-sm">
                    <h3 className="font-bold text-sm text-base-content">Taxa de Acerto por Disciplina</h3>
                    {desempenhoMaterias.map((subj) => (
                        <div key={subj.name} className="space-y-1">
                            <div className="flex justify-between text-xs font-semibold">
                                <span className="text-base-content font-medium">{subj.name}</span>
                                <span className="font-mono text-neutral-content">{subj.pct}%</span>
                            </div>
                            <div className="w-full bg-base-300 h-2.5 rounded-full overflow-hidden">
                                <div className={`h-full ${subj.color}`} style={{ width: `${subj.pct}%` }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}