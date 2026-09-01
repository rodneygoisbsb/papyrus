import React from 'react';
import { PenSquare, Clock, Target } from 'lucide-react';

export default function TodaySessionsCard({
    sessions = [
        {
            id: 1,
            subject: 'DIREITO CONSTITUCIONAL',
            topic: 'Direitos e Garantias Fundamentais',
            durationMinutes: 50,
            questionsDone: 20,
            questionsCorrect: 18
        },
        {
            id: 2,
            subject: 'LÍNGUA PORTUGUESA',
            topic: 'Emprego da Crase',
            durationMinutes: 40,
            questionsDone: 15,
            questionsCorrect: 12
        }
    ]
}) {
    return (
        <div className="rounded-[22px] border border-base-300/80 bg-base-100 p-5 shadow-sm space-y-3 font-['Plus_Jakarta_Sans']">
            {/* HEADER */}
            <div className="flex items-center gap-2 pb-2 border-b border-base-200">
                <PenSquare size={18} className="text-primary" />
                <h2 className="text-sm font-bold text-base-content">Estudo Detalhado de Hoje</h2>
            </div>

            {/* LISTA DE SESSÕES */}
            <div className="space-y-2">
                {sessions.length === 0 ? (
                    <div className="p-6 text-center text-xs text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                        Nenhuma sessão finalizada hoje. Inicie uma revisão ao lado para registrar seu progresso.
                    </div>
                ) : (
                    sessions.map(session => {
                        const accuracy = session.questionsDone > 0 
                            ? Math.round((session.questionsCorrect / session.questionsDone) * 100)
                            : 0;
                            
                        return (
                            <div key={session.id} className="p-3 rounded-xl bg-slate-50/80 border border-base-200 space-y-2 hover:bg-slate-100/50 transition-colors">
                                {/* Linha 1: Disciplina e Tópico */}
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold text-base-content uppercase tracking-tight">
                                        {session.subject}
                                    </span>
                                    <span className="text-xs text-slate-500 font-normal">
                                        {session.topic}
                                    </span>
                                </div>
                                
                                {/* Linha 2: Métricas */}
                                <div className="flex items-center justify-between pt-1">
                                    <div className="flex items-center gap-1 text-[11px] font-medium text-slate-600">
                                        <Clock size={12} className="text-slate-400" />
                                        <span>{session.durationMinutes} min líquidas</span>
                                    </div>
                                    
                                    {session.questionsDone > 0 && (
                                        <div className="flex items-center gap-1 text-[11px] font-medium text-slate-600">
                                            <Target size={12} className="text-secondary" />
                                            <span>
                                                {session.questionsDone} questões ({session.questionsCorrect} acertos • <span className="text-secondary font-bold">{accuracy}%</span>)
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
