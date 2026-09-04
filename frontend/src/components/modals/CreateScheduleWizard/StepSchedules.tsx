import React from 'react';
import { WizardState } from './index';

interface StepSchedulesProps {
    state: WizardState;
    updateState: (updates: Partial<WizardState>) => void;
}

const DAYS = [
    { key: 'DOM', label: 'DOM' },
    { key: 'SEG', label: 'SEG' },
    { key: 'TER', label: 'TER' },
    { key: 'QUA', label: 'QUA' },
    { key: 'QUI', label: 'QUI' },
    { key: 'SEX', label: 'SEX' },
    { key: 'SÁB', label: 'SÁB' },
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

    return (
        <div className="flex flex-col items-center text-center space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
            <p className="text-sm font-medium text-slate-600">
                Quais <span className="font-bold text-slate-800">dias</span> e quantas <span className="font-bold text-slate-800">horas</span> pretende estudar?
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 w-full max-w-lg">
                {DAYS.map(({ key, label }) => {
                    const dayData = state.schedules[key];
                    return (
                        <div key={key} className="flex items-center gap-3">
                            <input 
                                type="checkbox" 
                                checked={dayData.active}
                                onChange={() => handleDayToggle(key)}
                                className="checkbox checkbox-sm checkbox-primary" 
                            />
                            <div className={`w-12 py-1 text-xs font-bold rounded text-center transition-colors ${
                                dayData.active ? 'bg-primary text-white' : 'bg-slate-200 text-slate-400'
                            }`}>
                                {label}
                            </div>
                            <input 
                                type="time" 
                                value={dayData.hours}
                                onChange={(e) => handleHoursChange(key, e.target.value)}
                                disabled={!dayData.active}
                                className="input input-sm input-bordered w-24 text-center font-bold text-slate-700 disabled:opacity-50"
                            />
                            <span className="text-xs text-slate-400 font-medium whitespace-nowrap">horas diárias</span>
                        </div>
                    );
                })}

                <div className="col-span-1 sm:col-span-2 mt-4">
                    <div className="bg-primary/10 text-primary font-bold py-3 px-6 rounded-xl inline-flex items-center justify-center gap-2">
                        Total na Semana: <span>{calculateTotalHours()}h</span>
                    </div>
                </div>
            </div>

            <div className="w-full max-w-lg border-t border-slate-100 pt-8 flex flex-col items-center gap-4">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Qual mínimo e máximo de tempo que deseja estudar uma mesma disciplina?
                </p>
                <div className="flex items-center gap-4">
                    <select 
                        className="select select-bordered select-sm w-32 font-bold text-slate-700"
                        value={state.timeBlock.min}
                        onChange={(e) => updateState({ timeBlock: { ...state.timeBlock, min: e.target.value } })}
                    >
                        <option>30min</option>
                        <option>45min</option>
                        <option>1h</option>
                    </select>
                    <span className="text-slate-400 font-bold">a</span>
                    <select 
                        className="select select-bordered select-sm w-32 font-bold text-slate-700"
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
