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

// Custom Dropdown for elegant UI
function CustomDropdown({ value, options, onChange }: { value: string, options: string[], onChange: (val: string) => void }) {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <div className="relative">
            <button 
                type="button" 
                onClick={() => setIsOpen(!isOpen)} 
                className="flex items-center gap-2 btn btn-sm h-9 bg-slate-50 hover:bg-slate-100 border-none font-bold text-slate-700 px-4 rounded-lg shadow-none"
            >
                {value}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                    <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
            {isOpen && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
                    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-50 w-full min-w-[110px] bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 flex flex-col animate-in fade-in zoom-in-95 duration-100 origin-bottom">
                        {options.map(opt => (
                            <button
                                key={opt}
                                type="button"
                                onClick={() => { onChange(opt); setIsOpen(false); }}
                                className={`px-4 py-2 text-sm text-center hover:bg-slate-50 transition-colors ${value === opt ? 'text-primary font-bold bg-primary/5' : 'text-slate-600 font-medium'}`}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

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
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 leading-none">Total na semana</span>
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
                    <CustomDropdown 
                        value={state.timeBlock.min}
                        options={['30min', '45min', '1h']}
                        onChange={(val) => updateState({ timeBlock: { ...state.timeBlock, min: val } })}
                    />
                    <span className="text-xs font-black uppercase text-slate-300">até</span>
                    <CustomDropdown 
                        value={state.timeBlock.max}
                        options={['1h', '1h30min', '2h', '2h30min']}
                        onChange={(val) => updateState({ timeBlock: { ...state.timeBlock, max: val } })}
                    />
                </div>
            </div>
        </div>
    );
}
