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
    ChevronRight,
    BookOpen,
    Folder
} from 'lucide-react';

const MENU = [
    { id: 'inicio', label: 'Início', icon: LayoutDashboard },
    { id: 'plano-estudos', label: 'Meu Plano', icon: Folder },
    { id: 'disciplinas', label: 'Disciplinas', icon: BookOpen },
    { id: 'planejamento', label: 'Planejamento', icon: Sliders },
    { id: 'metas', label: 'Metas Diárias', icon: CheckCircle2 },
    { id: 'edital', label: 'Edital Verticalizado', icon: ListOrdered },
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
            onMouseEnter={() => setExpanded(true)}
            onMouseLeave={() => setExpanded(false)}
            className={[
                expanded ? 'w-60' : 'w-[68px]',
                'bg-base-100 flex flex-col justify-between shrink-0 h-screen sticky top-0 z-40 transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] border-r border-base-300/60 shadow-[4px_0_24px_rgba(0,0,0,0.03)]',
                'select-none hidden md:flex',
            ].join(' ')}
        >
            {/* ── TOPO ─────────────────────────────────────────────── */}
            <div className="flex flex-col flex-1 overflow-hidden">

                {/* Logo */}
                <div className="flex items-center gap-3 px-[14px] h-[68px] shrink-0">
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
                            maxWidth: expanded ? '200px' : '0',
                            opacity: expanded ? 1 : 0,
                            transition: 'max-width 150ms ease-out, opacity 150ms ease-out',
                        }}
                    >
                        <h1 className="font-black text-sm uppercase text-slate-800 tracking-tight leading-none">Papyrus</h1>
                        <p className="text-xs font-bold uppercase tracking-[0.12em] mt-0.5 text-blue-600">

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