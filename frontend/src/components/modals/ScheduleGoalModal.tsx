import React, { useState } from 'react';
import { X, Calendar, BookOpen, Clock, Target } from 'lucide-react';
import { useModalLenis } from '../../hooks/useModalLenis';

interface ScheduleGoalModalProps {
    onClose: () => void;
    targetDate?: string | null;
}

export default function ScheduleGoalModal({ onClose, targetDate }: ScheduleGoalModalProps) {
    // Desativa o scroll da página enquanto o modal estiver aberto
    useModalLenis(true);

    const [subject, setSubject] = useState('');
    const [topic, setTopic] = useState('');
    const [type, setType] = useState('THEORY');
    const [duration, setDuration] = useState('60');

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        // Em um app real, enviaria os dados para o backend aqui
        console.log('Nova meta agendada:', { subject, topic, type, duration, targetDate });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-base-300/60 backdrop-blur-sm animate-in fade-in duration-200 font-['Plus_Jakarta_Sans']">
            <div className="bg-base-100 rounded-[28px] shadow-xl w-full max-w-md overflow-hidden flex flex-col border border-base-200">
                
                {/* HEADER */}
                <div className="flex items-center justify-between p-5 border-b border-base-200 bg-base-50/50">
                    <div>
                        <h2 className="text-lg font-black text-base-content flex items-center gap-2">
                            <Calendar size={20} className="text-primary" />
                            Agendar Meta
                        </h2>
                        {targetDate && (
                            <p className="text-xs font-semibold text-neutral-content mt-1">
                                Para o dia: <span className="text-primary">{targetDate}</span>
                            </p>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="btn btn-sm btn-circle btn-ghost text-slate-400 hover:bg-base-200"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* BODY */}
                <form onSubmit={handleSave} className="p-6 space-y-5">
                    
                    {/* Disciplina */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-base-content uppercase tracking-wider flex items-center gap-1.5">
                            <BookOpen size={14} className="text-slate-400" />
                            Disciplina
                        </label>
                        <select 
                            className="select select-bordered w-full bg-base-50 focus:border-primary focus:ring-1 focus:ring-primary/20 text-sm font-semibold h-11"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            required
                        >
                            <option value="" disabled>Selecione a disciplina...</option>
                            <option value="Direito Constitucional">Direito Constitucional</option>
                            <option value="Direito Administrativo">Direito Administrativo</option>
                            <option value="Língua Portuguesa">Língua Portuguesa</option>
                            <option value="Raciocínio Lógico">Raciocínio Lógico</option>
                        </select>
                    </div>

                    {/* Assunto */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-base-content uppercase tracking-wider flex items-center gap-1.5">
                            <Target size={14} className="text-slate-400" />
                            Assunto (Tópico)
                        </label>
                        <input 
                            type="text" 
                            className="input input-bordered w-full bg-base-50 focus:border-primary focus:ring-1 focus:ring-primary/20 text-sm font-semibold h-11"
                            placeholder="Ex: Licitações (Lei 14.133)"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Tipo */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-base-content uppercase tracking-wider">
                                Tipo de Estudo
                            </label>
                            <select 
                                className="select select-bordered w-full bg-base-50 focus:border-primary focus:ring-1 focus:ring-primary/20 text-sm font-semibold h-11"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option value="THEORY">Teoria</option>
                                <option value="REVISION">Revisão</option>
                                <option value="QUESTIONS">Questões</option>
                            </select>
                        </div>

                        {/* Duração */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-base-content uppercase tracking-wider flex items-center gap-1.5">
                                <Clock size={14} className="text-slate-400" />
                                Tempo (min)
                            </label>
                            <input 
                                type="number" 
                                min="10"
                                step="10"
                                className="input input-bordered w-full bg-base-50 focus:border-primary focus:ring-1 focus:ring-primary/20 text-sm font-semibold h-11"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* FOOTER */}
                    <div className="pt-4 mt-6 border-t border-base-200 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn btn-ghost font-bold text-slate-500 hover:bg-base-200"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary font-bold px-6"
                        >
                            Agendar Meta
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}
