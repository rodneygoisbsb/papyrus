import React from 'react';
import { Calendar } from 'lucide-react';
import { getHeatmapLevelColor } from '../../../utils/studyCalculations';

export default function StudyHeatmap() {
    const diasSemanaLabels = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
    const heatmapData = [
        [{ date: '01 Out', level: 1, hours: '1.2h' }, { date: '08 Out', level: 2, hours: '2.5h' }, { date: '15 Out', level: 4, hours: '4.8h' }, { date: '22 Out', level: 4, hours: '5.1h' }],
        [{ date: '02 Out', level: 2, hours: '2.0h' }, { date: '09 Out', level: 3, hours: '3.4h' }, { date: '16 Out', level: 4, hours: '4.5h' }, { date: '23 Out', level: 3, hours: '3.8h' }],
        [{ date: '03 Out', level: 2, hours: '2.1h' }, { date: '10 Out', level: 1, hours: '1.0h' }, { date: '17 Out', level: 3, hours: '3.2h' }, { date: '24 Out', level: 4, hours: '4.6h' }],
        [{ date: '04 Out', level: 3, hours: '3.0h' }, { date: '11 Out', level: 2, hours: '2.4h' }, { date: '18 Out', level: 4, hours: '4.2h' }, { date: '25 Out', level: 4, hours: '4.9h' }],
        [{ date: '05 Out', level: 1, hours: '1.5h' }, { date: '12 Out', level: 4, hours: '4.0h' }, { date: '19 Out', level: 3, hours: '3.5h' }, { date: '26 Out', level: 4, hours: '4.5h' }],
        [{ date: '06 Out', level: 2, hours: '2.2h' }, { date: '13 Out', level: 3, hours: '3.1h' }, { date: '20 Out', level: 4, hours: '4.3h' }, { date: '27 Out', level: 4, hours: '5.0h' }],
        [{ date: '07 Out', level: 0, hours: '0.0h' }, { date: '14 Out', level: 2, hours: '2.0h' }, { date: '21 Out', level: 4, hours: '4.0h' }, { date: '28 Out', level: 3, hours: '3.6h' }]
    ];

    return (
        <div className="card-papyrus space-y-4">
            {/* Cabeçalho */}
            <div className="flex items-center justify-between pb-2 border-b border-base-300/60">
                <div className="flex items-center gap-2">
                    <Calendar size={18} className="text-primary" />
                    <h3 className="font-bold text-sm tracking-tight text-base-content">
                        Constância de Estudos
                    </h3>
                </div>
                <span className="text-xs font-semibold text-neutral-content">
                    Últimos 28 dias
                </span>
            </div>

            {/* Matriz 7 Dias x 14 Semanas */}
            <div className="space-y-1.5 my-3">
                {diasSemanaLabels.map((dia, rowIdx) => (
                    <div key={dia} className="flex items-center gap-2">
                        <span className="text-[11px] font-semibold text-neutral-content w-6 shrink-0">
                            {dia}
                        </span>

                        <div className="grid grid-cols-[repeat(14,minmax(0,1fr))] gap-1 flex-1">
                            {heatmapData[rowIdx].map((item, colIdx) => (
                                <div
                                    key={colIdx}
                                    className="tooltip tooltip-top"
                                    data-tip={`(${dia}): ${item.hours} líquidas`}
                                >
                                    <div
                                        className={`w-full aspect-square rounded-[4px] transition-transform duration-200 ease-out hover:scale-125 cursor-pointer shadow-2xs ${getHeatmapLevelColor(item.level)} transform-gpu`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Barra Inferior de Legenda Contínua (Full-Width Gradient) */}
            <div className="pt-3 border-t border-base-300/60 space-y-1.5">
                <div className="flex justify-between items-center text-[10px] font-semibold text-neutral-content px-0.5">
                    <span>0h</span>
                    <span>2h</span>
                    <span>4h</span>
                    <span>4h+</span>
                </div>
                <div className="w-full h-2 rounded-full bg-gradient-to-r from-base-200 via-primary/50 to-primary border border-base-300/60" />
                <span className="text-[10px] font-medium text-neutral-content/80 text-center block pt-0.5">
                    Horas líquidas (Horas de Estudo Efetivo)
                </span>
            </div>
        </div>
    );
}
