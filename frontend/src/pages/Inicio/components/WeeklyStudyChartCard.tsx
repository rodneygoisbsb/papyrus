import React, { useState } from 'react';
import { BarChart3, ChevronLeft, ChevronRight } from 'lucide-react';

export default function WeeklyStudyChartCard() {
    const [mode, setMode] = useState('tempo'); // 'tempo' ou 'questoes'

    // Dados fictícios para demonstração
    const chartData = [
        { day: 'Dom', timeValue: 2, questionValue: 30 },
        { day: 'Seg', timeValue: 4.5, questionValue: 85 },
        { day: 'Ter', timeValue: 3, questionValue: 40 },
        { day: 'Qua', timeValue: 0, questionValue: 0 },
        { day: 'Qui', timeValue: 5, questionValue: 110 },
        { day: 'Sex', timeValue: 3.2, questionValue: 55 },
        { day: 'Sáb', timeValue: 1.5, questionValue: 20 },
    ];

    const maxTime = Math.max(...chartData.map(d => d.timeValue));
    const maxQuestions = Math.max(...chartData.map(d => d.questionValue));
    
    const totalTime = chartData.reduce((acc, d) => acc + d.timeValue, 0);
    const totalQuestions = chartData.reduce((acc, d) => acc + d.questionValue, 0);

    const averageTime = (totalTime / 7).toFixed(1);
    const averageQuestions = Math.round(totalQuestions / 7);

    return (
        <div className="rounded-[22px] border border-base-300/80 bg-base-100 p-5 shadow-sm flex flex-col space-y-4 font-['Plus_Jakarta_Sans']">
            {/* HEADER */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <BarChart3 size={18} className="text-primary" />
                    <h2 className="text-sm font-bold text-base-content">Evolução Semanal</h2>
                </div>

                <div className="flex items-center gap-2">
                    <button className="btn btn-xs btn-ghost btn-square text-slate-400 hover:text-base-content hover:bg-base-200 transform-gpu">
                        <ChevronLeft size={16} />
                    </button>
                    <span className="text-xs font-semibold text-slate-600">
                        14/01 - 20/01
                    </span>
                    <button className="btn btn-xs btn-ghost btn-square text-slate-400 hover:text-base-content hover:bg-base-200 transform-gpu">
                        <ChevronRight size={16} />
                    </button>
                </div>

                <div className="bg-base-200 p-0.5 rounded-xl flex gap-1">
                    <button 
                        onClick={() => setMode('tempo')}
                        className={`text-xs px-3 py-1 rounded-lg cursor-pointer transition-all ${
                            mode === 'tempo' 
                                ? 'bg-white shadow-xs text-primary font-bold' 
                                : 'text-slate-500 font-semibold hover:text-slate-700'
                        }`}
                    >
                        Tempo
                    </button>
                    <button 
                        onClick={() => setMode('questoes')}
                        className={`text-xs px-3 py-1 rounded-lg cursor-pointer transition-all ${
                            mode === 'questoes' 
                                ? 'bg-white shadow-xs text-accent font-bold' 
                                : 'text-slate-500 font-semibold hover:text-slate-700'
                        }`}
                    >
                        Questões
                    </button>
                </div>
            </div>

            {/* CHART AREA */}
            <div className="relative h-48 w-full mt-4 flex items-end justify-between px-2 pt-6">
                {/* Linhas de grade (horizontal) */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6">
                    <div className="w-full border-b border-dashed border-slate-100/70 h-0" />
                    <div className="w-full border-b border-dashed border-slate-100/70 h-0" />
                    <div className="w-full border-b border-dashed border-slate-100/70 h-0" />
                    <div className="w-full border-b border-slate-200 h-0" />
                </div>

                {/* Barras e rótulos */}
                {chartData.map((data, idx) => {
                    let heightPercent = 0;
                    if (mode === 'tempo') {
                        heightPercent = maxTime > 0 ? (data.timeValue / maxTime) * 100 : 0;
                    } else {
                        heightPercent = maxQuestions > 0 ? (data.questionValue / maxQuestions) * 100 : 0;
                    }
                    // Força um mínimo de 2% para os dias com valor > 0, para não sumir totalmente
                    if (heightPercent > 0 && heightPercent < 2) heightPercent = 2;

                    return (
                        <div key={idx} className="relative flex flex-col items-center justify-end h-full w-[10%] group z-10">
                            {/* Tooltip Hover */}
                            <div className="absolute -top-10 opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-[opacity,transform] duration-150 ease-out pointer-events-none z-20 transform-gpu will-change-[opacity,transform]">
                                <div className="bg-slate-800 text-white text-[10px] font-bold py-1 px-2.5 rounded-lg shadow-lg whitespace-nowrap">
                                    {data.day.toUpperCase()}: {mode === 'tempo' ? `${data.timeValue}h de estudo` : `${data.questionValue} questões`}
                                    {/* Seta do tooltip */}
                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800 transform-gpu" />
                                </div>
                            </div>

                            {/* Barra */}
                            <div className="w-full flex items-end h-[calc(100%-1.5rem)]">
                                <div 
                                    className={`w-full rounded-t-xl transition-all duration-500 ease-out ${
                                        mode === 'tempo' ? 'bg-primary hover:bg-primary/80' : 'bg-accent hover:bg-accent/80'
                                    }`}
                                    style={{ height: `${heightPercent}%` }}
                                />
                            </div>

                            {/* Rótulo do dia */}
                            <span className="text-[10px] font-bold uppercase text-slate-400 mt-2 h-4">
                                {data.day}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* FOOTER SUMMARY */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs mt-2">
                <div className="flex flex-col">
                    <span className="text-slate-400 font-medium">Acumulado na semana</span>
                    <span className="font-bold text-base-content text-sm">
                        {mode === 'tempo' ? `${totalTime.toFixed(1)}h` : `${totalQuestions} questões`}
                    </span>
                </div>
                <div className="flex flex-col text-right">
                    <span className="text-slate-400 font-medium">Média diária</span>
                    <span className="font-bold text-base-content text-sm">
                        {mode === 'tempo' ? `${averageTime}h/dia` : `${averageQuestions}/dia`}
                    </span>
                </div>
            </div>
        </div>
    );
}
