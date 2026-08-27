import React from 'react';
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
    ChevronLeft,
    ChevronRight
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, isCollapsed, setIsCollapsed }) {
    const menuItems = [
        { id: 'inicio', label: 'Início', icon: LayoutDashboard },
        { id: 'concursos', label: 'Concursos', icon: Award },
        { id: 'metas', label: 'Metas diárias', icon: CheckCircle2 },
        { id: 'quadro', label: 'Quadro Semanal', icon: CalendarDays },
        { id: 'edital', label: 'Edital Verticalizado', icon: ListOrdered },
        { id: 'planejamento', label: 'Planejamento', icon: Sliders },
        { id: 'desempenho', label: 'Desempenho', icon: BarChart3 }
    ];

    return (
        <aside
            className={`${isCollapsed ? 'w-20' : 'w-64'
                } bg-base-100 border-r border-base-300/80 flex flex-col justify-between transition-all duration-300 select-none z-10 shrink-0`}
        >
            <div>
                <div className="p-5 flex items-center justify-between">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center font-black text-primary-content text-xl shadow-md shadow-primary/20 shrink-0">
                            P
                        </div>
                        {!isCollapsed && (
                            <div className="leading-tight">
                                <h1 className="font-black text-lg text-base-content whitespace-nowrap tracking-tight">Papyrus</h1>
                                <p className="text-[10px] text-primary font-bold uppercase tracking-wider whitespace-nowrap">Estudos PRO</p>
                            </div>
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="btn btn-ghost btn-xs btn-circle border border-base-300 text-neutral-content hover:text-base-content cursor-pointer"
                    >
                        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                    </button>
                </div>

                <nav className="p-3 space-y-1.5">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0' : 'gap-3.5 px-4'
                                    } py-3 rounded-2xl font-semibold text-sm transition-all cursor-pointer ${isActive
                                        ? 'bg-primary text-primary-content font-bold shadow-sm'
                                        : 'text-neutral-content hover:text-base-content hover:bg-base-200'
                                    }`}
                            >
                                <Icon size={18} className="shrink-0" />
                                {!isCollapsed && <span className="whitespace-nowrap">{item.label}</span>}
                            </button>
                        );
                    })}
                </nav>
            </div>

            <div className="p-3 space-y-1 border-t border-base-300/60">
                <button
                    type="button"
                    className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0' : 'gap-3.5 px-4'
                        } py-2.5 rounded-2xl text-sm font-semibold text-neutral-content hover:text-base-content hover:bg-base-200 cursor-pointer transition-colors`}
                >
                    <User size={18} className="shrink-0" />
                    {!isCollapsed && <span>Perfil</span>}
                </button>
                <button
                    type="button"
                    className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0' : 'gap-3.5 px-4'
                        } py-2.5 rounded-2xl text-sm font-semibold text-neutral-content hover:text-base-content hover:bg-base-200 cursor-pointer transition-colors`}
                >
                    <Settings size={18} className="shrink-0" />
                    {!isCollapsed && <span>Configurações</span>}
                </button>
            </div>
        </aside>
    );
}