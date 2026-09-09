// src/components/layout/Header.jsx
import React, { useState } from 'react';
import { Flame, ChevronDown, Check } from 'lucide-react';
import StudyTimer from './StudyTimer';

export default function Header({
    planosDisponiveis = [],
    selectedPlanId,
    setSelectedPlanId,
    streakDays = 0,
}) {
    const [isPlanOpen, setIsPlanOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const planoAtivo = planosDisponiveis.find((p) => p.id === selectedPlanId);

    // Monitora o scroll para fixar apenas o cronômetro
    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className="h-[68px] px-7 flex items-center justify-between bg-base-100 border-b border-base-300/60 relative z-20 shrink-0 shadow-sm">
            {/* ESQUERDA: Seletor de plano */}
            <div className="flex items-center gap-3 pl-4">
                <span className="text-xs uppercase font-bold tracking-widest text-neutral-content">
                    Plano:
                </span>
                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setIsPlanOpen((v) => !v)}
                        className="flex items-center gap-2 bg-base-200/70 hover:bg-base-200 text-primary font-bold text-xs px-3.5 py-2 rounded-xl border border-base-300/70 transition-colors duration-150 cursor-pointer"
                    >
                        <span>{planoAtivo?.nome || 'Selecionar'}</span>
                        <ChevronDown size={13} className={`transition-transform duration-200 ${isPlanOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isPlanOpen && (
                        <>
                            <div className="fixed inset-0 z-40" onClick={() => setIsPlanOpen(false)} />
                            <ul className="absolute left-0 mt-2 w-56 bg-base-100 border border-base-300/70 rounded-2xl shadow-xl p-1.5 z-50 space-y-0.5 animate-in fade-in zoom-in-95 duration-150">
                                {planosDisponiveis.map((plano) => (
                                    <li key={plano.id}>
                                        <button
                                            type="button"
                                            onClick={() => { setSelectedPlanId(plano.id); setIsPlanOpen(false); }}
                                            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between cursor-pointer transition-all ${selectedPlanId === plano.id
                                                ? 'bg-primary text-primary-content font-bold'
                                                : 'text-base-content hover:bg-base-200/70'
                                                }`}
                                        >
                                            {plano.nome}
                                            {selectedPlanId === plano.id && <Check size={13} />}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            </div>

            {/* DIREITA: Cronômetro + Streak */}
            <div className="flex items-center gap-3">
                {/* Badge streak */}
                <div className="flex items-center gap-1.5 bg-orange-50 border border-orange-200 text-accent font-bold text-xs rounded-full px-3.5 py-1.5 shadow-2xs">
                    <Flame size={15} className="text-accent fill-accent/80 shrink-0" />
                    <span className="hidden sm:inline">{streakDays} dias</span>
                    <span className="sm:hidden">{streakDays}d</span>
                </div>

                {/* Cronômetro Oficial (Flex quando no topo, Fixed quando rola) */}
                <div className={isScrolled ? "fixed top-[12px] right-7 z-50 animate-in fade-in slide-in-from-top-2 duration-300" : "relative z-30"}>
                    <StudyTimer isFloating={isScrolled} />
                </div>
            </div>
        </header>
    );
}