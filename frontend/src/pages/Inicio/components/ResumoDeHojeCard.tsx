import React from 'react';
import { Clock, Target, BookOpen } from 'lucide-react';

export default function ResumoDeHojeCard({
    todayMinutesStudied = 90,
    todayQuestionsDone = 35,
    dailyMinutesGoal = 240,
    disciplinesStudied = 3
}) {
    return (
        <div className="relative overflow-hidden rounded-[22px] border border-blue-500/30 bg-gradient-to-br from-white via-white to-blue-50/40 p-6 shadow-[0_10px_30px_-6px_rgba(37,99,235,0.09)] transition-all duration-200 ease-out hover:-translate-y-1 hover:border-blue-500/45 hover:shadow-[0_16px_35px_-6px_rgba(37,99,235,0.14)] active:scale-[0.99] flex flex-col h-full min-h-[220px]">
            
            {/* Linha de acento luminoso superior */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-200 via-blue-600 to-blue-200" />

            {/* Cabeçalho */}
            <div className="flex justify-between items-center h-8 mb-6">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600 shrink-0">
                        <Clock size={16} />
                    </div>
                    <span className="text-xs uppercase tracking-wider font-bold text-neutral-content">
                        RESUMO DE HOJE
                    </span>
                </div>
                
                <div className="badge badge-sm bg-blue-500/10 text-blue-600 border border-blue-500/30 font-bold text-[10px] gap-1.5 py-2 px-2.5 rounded-full shadow-2xs shrink-0">
                    Meta Diária: {Math.floor(dailyMinutesGoal / 60)}h
                </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center sm:justify-around items-center gap-6 mt-2 w-full">
                
                {/* Gráfico Circular Central */}
                <div className="relative flex flex-col items-center justify-center shrink-0">
                    <div 
                        className="radial-progress text-blue-500 transition-all duration-1000 ease-out" 
                        style={{
                            "--value": Math.min(100, Math.round((todayMinutesStudied / dailyMinutesGoal) * 100)), 
                            "--size": "9.5rem", 
                            "--thickness": "14px"
                        } as any}
                        role="progressbar"
                    >
                        {/* Círculo de fundo cinza */}
                        <div className="absolute inset-0 rounded-full border-[14px] border-base-200 -z-10" />
                        
                        <div className="flex flex-col items-center justify-center mt-2">
                            <div className="flex items-baseline gap-0.5">
                                <span className="text-3xl font-black tracking-tight text-base-content leading-none">
                                    {Math.floor(todayMinutesStudied / 60)}
                                </span>
                                <span className="text-lg font-bold text-base-content leading-none">h</span>
                                <span className="text-3xl font-black tracking-tight text-base-content leading-none ml-1">
                                    {todayMinutesStudied % 60}
                                </span>
                                <span className="text-lg font-bold text-base-content leading-none">m</span>
                            </div>
                            <span className="text-[10px] font-bold text-neutral-content uppercase tracking-widest mt-1">
                                Estudados
                            </span>
                        </div>
                    </div>
                </div>

                {/* Estatísticas Rápidas */}
                <div className="flex flex-row sm:flex-col gap-3 w-full sm:w-auto">
                    {/* Questões */}
                    <div className="flex-1 bg-white border border-base-200 rounded-2xl p-3 shadow-xs flex flex-col items-center sm:items-start text-center sm:text-left hover:border-emerald-500/40 transition-colors">
                        <div className="flex items-center gap-1.5 text-emerald-500 mb-1">
                            <Target size={14} />
                            <span className="text-[10px] font-bold uppercase tracking-wider">Questões</span>
                        </div>
                        <div className="flex items-baseline gap-1">
                            <span className="text-xl font-black text-base-content leading-none">{todayQuestionsDone}</span>
                            <span className="text-xs font-medium text-neutral-content leading-none">resolvidas</span>
                        </div>
                    </div>

                    {/* Disciplinas */}
                    <div className="flex-1 bg-white border border-base-200 rounded-2xl p-3 shadow-xs flex flex-col items-center sm:items-start text-center sm:text-left hover:border-purple-500/40 transition-colors">
                        <div className="flex items-center gap-1.5 text-purple-500 mb-1">
                            <BookOpen size={14} />
                            <span className="text-[10px] font-bold uppercase tracking-wider">Disciplinas</span>
                        </div>
                        <div className="flex items-baseline gap-1">
                            <span className="text-xl font-black text-base-content leading-none">{disciplinesStudied}</span>
                            <span className="text-xs font-medium text-neutral-content leading-none">revisadas</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
