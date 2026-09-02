// src/components/layout/Sidebar.jsx
import React, { useState } from 'react';
import {
    LayoutDashboard,
    Award,
    CheckCircle2,
    CalendarDays,
    ListOrdered,
    Sliders,
    BarChart3,
    User,
    Settings,
    ChevronRight
} from 'lucide-react';

const MENU = [
    { id: 'inicio', label: 'Início', icon: LayoutDashboard },
    { id: 'concursos', label: 'Concursos', icon: Award },
    { id: 'metas', label: 'Metas diárias', icon: CheckCircle2 },
    { id: 'quadro', label: 'Quadro Semanal', icon: CalendarDays },
    { id: 'edital', label: 'Edital Verticalizado', icon: ListOrdered },
    { id: 'planejamento', label: 'Planejamento', icon: Sliders },
    { id: 'desempenho', label: 'Desempenho', icon: BarChart3 },
];

const BOTTOM = [
    { id: 'perfil', label: 'Perfil', icon: User },
    { id: 'configuracoes', label: 'Configurações', icon: Settings },
];

const ITEM_H = 40;
const ITEM_GAP = 4;

export default function Sidebar({ activeTab, setActiveTab }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <aside
            className={[
                expanded ? 'w-60' : 'w-[68px]',
                'h-screen bg-white border-r border-slate-100 relative',
                'flex flex-col justify-between',
                'shrink-0 sticky top-0 z-40',
                'transition-[width] duration-150 ease-out',
                'select-none hidden md:flex',
                'shadow-[2px_0_20px_rgba(0,0,0,0.04)]',
            ].join(' ')}
        >
            {/* Botão flutuante para expandir/recolher */}
            <button
                onClick={() => setExpanded(!expanded)}
                className="absolute -right-3 top-7 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-300 hover:shadow-md transition-colors duration-150 z-50 cursor-pointer transform-gpu"
            >
                <ChevronRight size={14} className={`transition-transform duration-200 ${expanded ?'rotate-180' : ''}`} />
            </button>
            {/* ── TOPO ─────────────────────────────────────────────── */}
            <div className="flex flex-col flex-1 overflow-hidden">

                {/* Logo */}
                <div className="flex items-center gap-3 px-[14px] py-5 border-b border-slate-100 shrink-0">
                    <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-base shrink-0 shadow-lg"
                        style={{
                            background: 'var(--color-primary)',
                            boxShadow: '0 4px 14px rgba(var(--color-primary) / 0.35)',
                        }}
                    >
                        P
                    </div>

                    <div
                        className="overflow-hidden whitespace-nowrap"
                        style={{
                            maxWidth: expanded ? '140px' : '0',
                            opacity: expanded ? 1 : 0,
                            transition: 'max-width 150ms ease-out, opacity 150ms ease-out',
                        }}
                    >
                        <h1 className="font-black text-sm text-slate-800 tracking-tight leading-none">Papyrus</h1>
                        <p className="text-[9px] font-bold uppercase tracking-[0.12em] mt-0.5 text-blue-600">
                            Estudos PRO
                        </p>
                    </div>
                </div>

                {/* Navegação */}
                <nav
                    className="p-3 flex-1 overflow-y-auto overflow-x-hidden relative"
                    style={{ display: 'flex', flexDirection: 'column', gap: `${ITEM_GAP}px` }}
                >
                    {MENU.map(({ id, label, icon: Icon }) => {
                        const active = activeTab === id;
                        return (
                            <button
                                key={id}
                                type="button"
                                title={!expanded ? label : undefined}
                                onClick={() => setActiveTab(id)}
                                style={{ height: `${ITEM_H}px`, gap: '12px' }}
                                className={[
                                    'relative z-10 w-full flex items-center rounded-xl px-3',
                                    'text-sm font-semibold transition-all duration-150 cursor-pointer active:scale-95',
                                    active
                                        ? 'bg-primary text-primary-content shadow-sm'
                                        : 'text-slate-400 hover:text-slate-700',
                                ].join(' ')}
                            >
                                <Icon size={18} className="shrink-0" />

                                <span
                                    className="whitespace-nowrap overflow-hidden"
                                    style={{
                                        maxWidth: expanded ? '160px' : '0',
                                        opacity: expanded ? 1 : 0,
                                        transition: 'max-width 150ms ease-out, opacity 150ms ease-out',
                                    }}
                                >
                                    {label}
                                </span>
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* ── RODAPÉ ───────────────────────────────────────────── */}
            <div className="px-3 pb-4 pt-3 border-t border-slate-100 flex flex-col gap-1 shrink-0">
                {BOTTOM.map(({ id, label, icon: Icon }) => {
                    const active = activeTab === id;
                    return (
                        <button
                            key={id}
                            type="button"
                            title={!expanded ? label : undefined}
                            onClick={() => setActiveTab(id)}
                            style={{ height: `${ITEM_H}px`, gap: '12px' }}
                            className={[
                                'w-full flex items-center rounded-xl px-3',
                                'text-sm font-semibold transition-all duration-150 cursor-pointer active:scale-95',
                                active
                                    ? 'bg-primary/10 text-primary font-bold'
                                    : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100',
                            ].join(' ')}
                        >
                            <Icon size={18} className="shrink-0" />
                            <span
                                className="whitespace-nowrap overflow-hidden"
                                style={{
                                    maxWidth: expanded ? '160px' : '0',
                                    opacity: expanded ? 1 : 0,
                                    transition: 'max-width 150ms ease-out, opacity 150ms ease-out',
                                }}
                            >
                                {label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </aside>
    );
}