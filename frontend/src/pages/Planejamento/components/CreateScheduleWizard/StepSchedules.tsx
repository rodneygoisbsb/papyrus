import React from 'react';
import { WizardState } from './index';
import { Clock, CalendarDays, Timer } from 'lucide-react';

interface StepSchedulesProps {
    state: WizardState;
    updateState: (updates: Partial<WizardState>) => void;
}

const DAYS = [
    { key: 'DOM', label: 'Domingo', short: 'Dom' },
    { key: 'SEG', label: 'Segunda', short: 'Seg' },
    { key: 'TER', label: 'Terça', short: 'Ter' },
    { key: 'QUA', label: 'Quarta', short: 'Qua' },
    { key: 'QUI', label: 'Quinta', short: 'Qui' },
    { key: 'SEX', label: 'Sexta', short: 'Sex' },
    { key: 'SÁB', label: 'Sábado', short: 'Sáb' },
];

export default function StepSchedules({ state, updateState }: StepSchedulesProps) {
    
    const handleDayToggle = (dayKey: string) => {
        const dayData = state.schedules[dayKey];
        updateState({
            schedules: {
                ...state.schedules,
                [dayKey]: { ...dayData, active: !dayData.active }
            }
        });
    };

    const handleHoursChange = (dayKey: string, hours: string) => {
        const dayData = state.schedules[dayKey];
        updateState({
            schedules: {
                ...state.schedules,
                [dayKey]: { ...dayData, hours }
            }
        });
    };

    const calculateTotalHours = () => {
        let totalMins = 0;
        Object.values(state.schedules).forEach(day => {
            if (day.active && day.hours) {
                const [h, m] = day.hours.split(':').map(Number);
                if (!isNaN(h)) totalMins += h * 60;
                if (!isNaN(m)) totalMins += m;
            }
        });
        return Math.floor(totalMins / 60);
    };

    const totalHours = calculateTotalHours();

    return (
        <div className="w-full flex flex-col gap-8 pb-8 relative z-10">
            {/* Header & Total Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-primary/5 border border-primary/20 rounded-2xl p-5 shadow-sm">
                <div>
                    <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                        <CalendarDays className="text-primary" size={20} />
                        Disponibilidade Semanal
                    </h3>
                    <p className="text-sm text-slate-600 mt-1">
                        Ative os dias que pretende estudar e defina a carga horária de cada um.
                    </p>
                </div>
                <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-xl border border-primary/20 shadow-sm shrink-0">
                    <Clock className="text-primary" size={18} />
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 leading-none">Total na semana</span>
                        <span className="text-lg font-black text-primary leading-tight">{totalHours}h</span>
                    </div>
                </div>
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {DAYS.map(({ key, label, short }) => {
                    const dayData = state.schedules[key];
                    const isActive = dayData.active;
                    
                    return (
                        <div 
                            key={key} 
                            className={`relative overflow-hidden rounded-xl border transition-all duration-200 flex flex-col p-4 gap-3 ${
                                isActive 
                                ? 'bg-white border-primary/40 shadow-md shadow-primary/5 ring-1 ring-primary/10' 
                                : 'bg-slate-50 border-slate-200/60 opacity-80 hover:opacity-100 hover:border-slate-300'
                            }`}
                        >
                            <div className="flex items-center justify-between">
                                <span className={`font-bold ${isActive ? 'text-slate-800' : 'text-slate-500'}`}>
                                    {label}
                                </span>
                                <input 
                                    type="checkbox" 
                                    className="toggle toggle-sm toggle-primary" 
                                    checked={isActive}
                                    onChange={() => handleDayToggle(key)}
                                />
                            </div>
                            
                            <div className={`transition-all duration-200 ease-in-out ${isActive ? 'h-9 opacity-100' : 'h-0 opacity-0 overflow-hidden'}`}>
                                <div className="flex items-center gap-2 h-full bg-slate-50/80 rounded-lg p-1 border border-slate-100">
                                    <input 
                                        type="time" 
                                        value={dayData.hours}
                                        onChange={(e) => handleHoursChange(key, e.target.value)}
                                        className="w-full bg-transparent border-none text-center font-bold text-sm text-slate-700 focus:ring-0 focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Time Blocks Configuration */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-slate-200 flex items-center justify-center shrink-0">
                        <Timer className="text-slate-600" size={20} />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800">Duração dos Blocos</h4>
                        <p className="text-xs text-slate-500 mt-1 max-w-sm">
                            Defina o tempo mínimo e máximo que você quer passar estudando a mesma matéria antes de trocar.
                        </p>
                    </div>
                </div>
                
                <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm shrink-0 w-fit">
                    <select 
                        className="select select-sm border-none bg-slate-50 font-bold text-slate-700 focus:ring-0 hover:bg-slate-100 transition-colors"
                        value={state.timeBlock.min}
                        onChange={(e) => updateState({ timeBlock: { ...state.timeBlock, min: e.target.value } })}
                    >
                        <option>30min</option>
                        <option>45min</option>
                        <option>1h</option>
                    </select>
                    <span className="text-[11px] font-black uppercase text-slate-300">até</span>
                    <select 
                        className="select select-sm border-none bg-slate-50 font-bold text-slate-700 focus:ring-0 hover:bg-slate-100 transition-colors"
                        value={state.timeBlock.max}
                        onChange={(e) => updateState({ timeBlock: { ...state.timeBlock, max: e.target.value } })}
                    >
                        <option>1h</option>
                        <option>1h30min</option>
                        <option>2h</option>
                        <option>2h30min</option>
                    </select>
                </div>
            </div>
        </div>
    );
}
