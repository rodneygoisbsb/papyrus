import React from 'react';
import { Flame } from 'lucide-react';

export default function Header({ plans, selectedPlanId, setSelectedPlanId, streakDays = 12 }) {
    return (
        <header className="h-16 px-8 flex items-center justify-between bg-base-100 border-b border-base-300/60 sticky top-0 z-10 shrink-0">
            <div className="flex items-center gap-3 text-xs">
                <span className="uppercase font-bold text-neutral-content">Plano Selecionado:</span>
                <select
                    value={selectedPlanId}
                    onChange={(e) => setSelectedPlanId(e.target.value)}
                    className="select select-sm bg-base-200 text-primary font-bold border border-base-300 rounded-xl cursor-pointer focus:outline-none"
                >
                    {plans.map((p) => (
                        <option key={p.id} value={p.id}>
                            {p.title}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 px-3.5 py-1.5 rounded-full font-bold">
                    <Flame size={16} className="fill-primary animate-pulse" />
                    <span>{streakDays} dias de constância</span>
                </div>
            </div>
        </header>
    );
}