import React from 'react';

export default function QuadroSemanalTab() {
    const diasDaSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

    return (
        <div className="space-y-6 animate-in fade-in duration-200">
            <div>
                <h2 className="text-2xl font-black text-base-content">Quadro Semanal de Metas</h2>
                <p className="text-xs text-neutral-content">Distribuição visual das metas de teoria, revisão e simulados em cada dia da semana</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
                {diasDaSemana.map((day, idx) => (
                    <div key={day} className="card-papyrus min-h-[260px] flex flex-col justify-between space-y-4">
                        <div>
                            <div className="border-b border-base-300 pb-2 mb-3">
                                <span className="text-xs font-black uppercase text-base-content">{day}</span>
                            </div>
                            {idx === 0 && (
                                <div className="p-3 rounded-2xl bg-primary/10 space-y-1">
                                    <span className="text-[10px] font-bold text-primary uppercase">Dir. Constitucional</span>
                                    <p className="text-xs font-semibold text-base-content">Art. 5º (Incisos I a XX)</p>
                                    <span className="text-[10px] text-neutral-content block font-mono">90 min • Teoria</span>
                                </div>
                            )}
                        </div>
                        <button
                            type="button"
                            className="w-full text-center text-[11px] font-bold text-neutral-content hover:text-primary py-2 rounded-2xl hover:bg-base-200 transition-colors cursor-pointer"
                        >
                            + Incluir Meta
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}