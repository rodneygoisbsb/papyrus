import React from 'react';
import { Sparkles, LayoutList } from 'lucide-react';

export default function StepOrganization() {
    return (
        <div className="flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="space-y-2 max-w-md">
                <p className="text-sm font-medium text-slate-500">
                    Como podemos te ajudar a <span className="font-bold text-slate-700">organizar seus estudos</span> hoje?
                </p>
            </div>

            {/* Illustration Placeholder - Using a stylized div to represent the illustration from the print */}
            <div className="w-full max-w-sm aspect-video bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
                <div className="relative flex gap-4">
                    <div className="w-16 h-24 bg-white shadow-sm rounded-xl border border-slate-200 flex flex-col gap-2 p-2">
                        <div className="w-full h-4 bg-slate-100 rounded"></div>
                        <div className="w-full h-8 bg-primary/20 rounded"></div>
                        <div className="w-full h-6 bg-orange-500/20 rounded"></div>
                    </div>
                    <div className="w-16 h-28 bg-white shadow-sm rounded-xl border border-slate-200 flex flex-col gap-2 p-2 -mt-4">
                        <div className="w-full h-4 bg-slate-100 rounded"></div>
                        <div className="w-full h-10 bg-emerald-500/20 rounded"></div>
                        <div className="w-full h-8 bg-primary/20 rounded"></div>
                    </div>
                    <div className="w-16 h-20 bg-white shadow-sm rounded-xl border border-slate-200 flex flex-col gap-2 p-2 mt-2">
                        <div className="w-full h-4 bg-slate-100 rounded"></div>
                        <div className="w-full h-6 bg-amber-500/20 rounded"></div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-3 w-full max-w-xs">
                <button className="btn btn-primary w-full rounded-xl font-bold gap-2">
                    <Sparkles size={18} />
                    Gerador Automático
                </button>
                <button className="btn btn-ghost w-full rounded-xl font-bold text-slate-500 hover:bg-slate-100 gap-2">
                    <LayoutList size={18} />
                    Criar de Forma Manual
                </button>
            </div>
        </div>
    );
}
