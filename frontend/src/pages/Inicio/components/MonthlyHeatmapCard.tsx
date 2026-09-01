import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function MonthlyHeatmapCard() {
    // Dias fictícios do mês (ex: 31 dias + espaços em branco para alinhar com o dia da semana)
    // Para simplificar, vamos criar 31 dias.
    const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
    
    // Função para determinar a cor com base em horas estudadas fictícias (0, 1.5, 2.5, 3.5)
    const getHeatmapColor = (day) => {
        // Gerador pseudo-aleatório para visualização
        const val = (day * 7) % 5; // 0 a 4
        if (val === 0) return 'bg-slate-50 text-slate-400 border border-slate-100';
        if (val === 1 || val === 2) return 'bg-blue-100 text-blue-800';
        if (val === 3) return 'bg-blue-300 text-blue-900';
        return 'bg-primary text-white shadow-xs border border-primary/20'; // val === 4
    };

    const getTooltipText = (day) => {
        const val = (day * 7) % 5;
        if (val === 0) return `${day} de Agosto: 0h`;
        if (val === 1 || val === 2) return `${day} de Agosto: 1.5h`;
        if (val === 3) return `${day} de Agosto: 2.5h`;
        return `${day} de Agosto: 3.5h+`;
    };

    return (
        <div className="rounded-[22px] border border-base-300/80 bg-base-100 p-5 shadow-sm space-y-4 font-['Plus_Jakarta_Sans']">
            {/* HEADER */}
            <div className="flex items-center justify-between pb-2 border-b border-base-200">
                <div className="flex items-center gap-1">
                    <button className="btn btn-xs btn-ghost btn-square text-slate-400 hover:text-base-content hover:bg-base-200">
                        <ChevronLeft size={16} />
                    </button>
                    <span className="text-sm font-bold text-base-content">
                        Agosto 2026
                    </span>
                    <button className="btn btn-xs btn-ghost btn-square text-slate-400 hover:text-base-content hover:bg-base-200">
                        <ChevronRight size={16} />
                    </button>
                </div>
                <button className="btn btn-xs btn-ghost text-slate-500 hover:text-primary rounded-lg font-bold">
                    Ver Ano
                </button>
            </div>

            {/* GRADE DO CALENDÁRIO */}
            <div className="w-full">
                <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-neutral-content uppercase mb-2">
                    <span>Seg</span>
                    <span>Ter</span>
                    <span>Qua</span>
                    <span>Qui</span>
                    <span>Sex</span>
                    <span>Sáb</span>
                    <span>Dom</span>
                </div>
                
                <div className="grid grid-cols-7 gap-1.5">
                    {/* Espaços em branco para alinhar o primeiro dia (ex: começa na Sábado = 5 espaços) */}
                    {Array.from({ length: 5 }).map((_, idx) => (
                        <div key={`empty-${idx}`} className="aspect-square" />
                    ))}
                    
                    {/* Dias do mês */}
                    {daysInMonth.map(day => {
                        const bgClass = getHeatmapColor(day);
                        return (
                            <div 
                                key={day}
                                className={`tooltip tooltip-top tooltip-primary before:text-[10px] before:font-bold`}
                                data-tip={getTooltipText(day)}
                            >
                                <div className={`aspect-square rounded-lg flex items-center justify-center text-[11px] sm:text-xs font-bold transition-all hover:scale-110 cursor-pointer ${bgClass}`}>
                                    {day}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* FOOTER */}
            <div className="pt-3 border-t border-base-200 flex justify-between items-center text-[11px] font-medium text-slate-500">
                <span>22 de 31 dias cumpridos</span>
                <span className="font-bold text-primary">71%</span>
            </div>
        </div>
    );
}
