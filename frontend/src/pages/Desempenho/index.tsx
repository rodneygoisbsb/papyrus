import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Target, Flame, Clock, Award, BookOpen, ListChecks, RefreshCw } from 'lucide-react';

// MOCK DATA PARA DIFERENTES PERÍODOS
const MOCK_DB = {
    hoje: {
        kpis: { hours: '3.5h', accuracy: '82%', streak: '12🔥', edital: '45%', questions: '45', revisions: '2' },
        performance: [
            { label: '8h', acertos: 70, erradas: 30 },
            { label: '10h', acertos: 85, erradas: 15 },
            { label: '14h', acertos: 80, erradas: 20 },
            { label: '18h', acertos: 90, erradas: 10 },
        ],
        hoursData: [
            { day: 'Manhã', hours: 1.5 },
            { day: 'Tarde', hours: 1.0 },
            { day: 'Noite', hours: 1.0 },
        ],
        questionsDist: [
            { name: 'Certas', value: 37, color: '#10b981' },
            { name: 'Erradas', value: 8, color: '#f43f5e' },
            { name: 'Brancas', value: 0, color: '#94a3b8' },
        ],
        disciplines: [
            { name: 'Direito Constitucional', progress: 85, accuracy: 85, time: '2h', color: 'bg-primary', icon: 'bg-primary/10 text-primary' },
            { name: 'Raciocínio Lógico', progress: 95, accuracy: 78, time: '1.5h', color: 'bg-info', icon: 'bg-info/10 text-info' },
        ]
    },
    semana: {
        kpis: { hours: '24h', accuracy: '85%', streak: '12🔥', edital: '45%', questions: '340', revisions: '15' },
        performance: [
            { label: 'Seg', acertos: 75, erradas: 25 },
            { label: 'Ter', acertos: 80, erradas: 20 },
            { label: 'Qua', acertos: 85, erradas: 15 },
            { label: 'Qui', acertos: 82, erradas: 18 },
            { label: 'Sex', acertos: 88, erradas: 12 },
            { label: 'Sáb', acertos: 90, erradas: 10 },
            { label: 'Dom', acertos: 95, erradas: 5 },
        ],
        hoursData: [
            { day: 'Seg', hours: 3.5 },
            { day: 'Ter', hours: 4.0 },
            { day: 'Qua', hours: 3.0 },
            { day: 'Qui', hours: 4.5 },
            { day: 'Sex', hours: 5.0 },
            { day: 'Sáb', hours: 6.0 },
            { day: 'Dom', hours: 2.0 },
        ],
        questionsDist: [
            { name: 'Certas', value: 289, color: '#10b981' },
            { name: 'Erradas', value: 51, color: '#f43f5e' },
            { name: 'Brancas', value: 0, color: '#94a3b8' },
        ],
        disciplines: [
            { name: 'Direito Constitucional', progress: 85, accuracy: 88, time: '8h', color: 'bg-primary', icon: 'bg-primary/10 text-primary' },
            { name: 'Direito Administrativo', progress: 60, accuracy: 75, time: '6h', color: 'bg-tertiary', icon: 'bg-tertiary/10 text-tertiary' },
            { name: 'Língua Portuguesa', progress: 40, accuracy: 65, time: '5h', color: 'bg-accent', icon: 'bg-accent/10 text-accent' },
            { name: 'Raciocínio Lógico', progress: 95, accuracy: 92, time: '5h', color: 'bg-info', icon: 'bg-info/10 text-info' },
        ]
    },
    mes: {
        kpis: { hours: '89h', accuracy: '83%', streak: '12🔥', edital: '45%', questions: '1050', revisions: '45' },
        performance: [
            { label: 'Sem 1', acertos: 65, erradas: 35 },
            { label: 'Sem 2', acertos: 68, erradas: 32 },
            { label: 'Sem 3', acertos: 74, erradas: 26 },
            { label: 'Sem 4', acertos: 83, erradas: 17 },
        ],
        hoursData: [
            { day: 'Sem 1', hours: 20 },
            { day: 'Sem 2', hours: 22 },
            { day: 'Sem 3', hours: 23 },
            { day: 'Sem 4', hours: 24 },
        ],
        questionsDist: [
            { name: 'Certas', value: 850, color: '#10b981' },
            { name: 'Erradas', value: 150, color: '#f43f5e' },
            { name: 'Brancas', value: 50, color: '#94a3b8' },
        ],
        disciplines: [
            { name: 'Direito Constitucional', progress: 85, accuracy: 85, time: '24h', color: 'bg-primary', icon: 'bg-primary/10 text-primary' },
            { name: 'Direito Administrativo', progress: 60, accuracy: 72, time: '18h', color: 'bg-tertiary', icon: 'bg-tertiary/10 text-tertiary' },
            { name: 'Língua Portuguesa', progress: 40, accuracy: 60, time: '12h', color: 'bg-accent', icon: 'bg-accent/10 text-accent' },
            { name: 'Raciocínio Lógico', progress: 95, accuracy: 89, time: '30h', color: 'bg-info', icon: 'bg-info/10 text-info' },
            { name: 'Noções de Informática', progress: 20, accuracy: 55, time: '5h', color: 'bg-secondary', icon: 'bg-secondary/10 text-secondary' },
        ]
    },
    geral: {
        kpis: { hours: '350h', accuracy: '78%', streak: '12🔥', edital: '45%', questions: '4200', revisions: '120' },
        performance: [
            { label: 'Jan', acertos: 60, erradas: 40 },
            { label: 'Fev', acertos: 65, erradas: 35 },
            { label: 'Mar', acertos: 70, erradas: 30 },
            { label: 'Abr', acertos: 75, erradas: 25 },
            { label: 'Mai', acertos: 80, erradas: 20 },
            { label: 'Jun', acertos: 83, erradas: 17 },
        ],
        hoursData: [
            { day: 'Jan', hours: 60 },
            { day: 'Fev', hours: 55 },
            { day: 'Mar', hours: 65 },
            { day: 'Abr', hours: 70 },
            { day: 'Mai', hours: 80 },
            { day: 'Jun', hours: 89 },
        ],
        questionsDist: [
            { name: 'Certas', value: 3276, color: '#10b981' },
            { name: 'Erradas', value: 800, color: '#f43f5e' },
            { name: 'Brancas', value: 124, color: '#94a3b8' },
        ],
        disciplines: [
            { name: 'Direito Constitucional', progress: 85, accuracy: 82, time: '90h', color: 'bg-primary', icon: 'bg-primary/10 text-primary' },
            { name: 'Direito Administrativo', progress: 60, accuracy: 70, time: '80h', color: 'bg-tertiary', icon: 'bg-tertiary/10 text-tertiary' },
            { name: 'Língua Portuguesa', progress: 40, accuracy: 55, time: '50h', color: 'bg-accent', icon: 'bg-accent/10 text-accent' },
            { name: 'Raciocínio Lógico', progress: 95, accuracy: 88, time: '100h', color: 'bg-info', icon: 'bg-info/10 text-info' },
            { name: 'Noções de Informática', progress: 20, accuracy: 50, time: '30h', color: 'bg-secondary', icon: 'bg-secondary/10 text-secondary' },
        ]
    }
};

export default function DesempenhoTab() {
    const [timeRange, setTimeRange] = useState<'hoje' | 'semana' | 'mes' | 'geral'>('semana');

    // Recupera os dados do período selecionado
    const data = useMemo(() => MOCK_DB[timeRange], [timeRange]);

    return (
        <div className="space-y-6 animate-in fade-in duration-300 font-['Plus_Jakarta_Sans'] pb-12">
            
            {/* Header / Titulo & Filtros */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-2">
                <div>
                    <h1 className="text-2xl font-black text-slate-800 tracking-tight">Painel de Desempenho</h1>
                    <p className="text-sm font-medium text-slate-500 mt-1">Acompanhe sua evolução e métricas de estudo.</p>
                </div>

                {/* Range Picker */}
                <div className="bg-slate-100 p-1 rounded-xl inline-flex shadow-sm">
                    {['hoje', 'semana', 'mes', 'geral'].map((range) => (
                        <button
                            key={range}
                            onClick={() => setTimeRange(range as any)}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition-all duration-300 ${
                                timeRange === range 
                                ? 'bg-white text-slate-800 shadow-sm' 
                                : 'text-slate-400 hover:text-slate-600'
                            }`}
                        >
                            {range}
                        </button>
                    ))}
                </div>
            </div>

            {/* KPI Cards (4 principais) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center items-center text-center sm:flex-row sm:text-left sm:justify-start gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                        <Clock size={24} />
                    </div>
                    <div className="flex-1">
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Tempo Estudado</p>
                        <div className="flex items-center gap-2">
                            <p className="text-xl font-black text-slate-800">{data.kpis.hours}</p>
                            <span className="text-[10px] font-bold bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded-md">+15%</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center items-center text-center sm:flex-row sm:text-left sm:justify-start gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
                        <Target size={24} />
                    </div>
                    <div className="flex-1">
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Aproveitamento</p>
                        <div className="flex items-center gap-2">
                            <p className="text-xl font-black text-slate-800">{data.kpis.accuracy}</p>
                            <span className="text-[10px] font-bold bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded-md">+2%</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center items-center text-center sm:flex-row sm:text-left sm:justify-start gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                    <div className="w-12 h-12 rounded-xl bg-pink-50 text-pink-500 flex items-center justify-center shrink-0">
                        <ListChecks size={24} />
                    </div>
                    <div className="flex-1">
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Questões (Resolvidas)</p>
                        <div className="flex items-center gap-2">
                            <p className="text-xl font-black text-slate-800">{data.kpis.questions}</p>
                            <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded-md">Pico Máx</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center items-center text-center sm:flex-row sm:text-left sm:justify-start gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center shrink-0">
                        <RefreshCw size={24} />
                    </div>
                    <div className="flex-1">
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Revisões</p>
                        <div className="flex items-center gap-2">
                            <p className="text-xl font-black text-slate-800">{data.kpis.revisions}</p>
                            <span className="text-[10px] font-bold bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded-md">No Prazo</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Gráfico de Evolução (Linha) */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm lg:col-span-2">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="font-bold text-slate-800">Evolução de Acertos</h3>
                            <p className="text-xs font-medium text-slate-400">Progresso histórico do período</p>
                        </div>
                        <span className="text-xs font-bold bg-slate-100 text-slate-500 px-3 py-1 rounded-full uppercase">{timeRange}</span>
                    </div>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data.performance} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorAcertos" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                                <CartesianGrid vertical={false} stroke="#e2e8f0" strokeDasharray="4 4" />
                                <RechartsTooltip 
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    itemStyle={{ fontWeight: 'bold' }}
                                    formatter={(value) => [`${value}%`, 'Acertos']}
                                />
                                <Area type="monotone" dataKey="acertos" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorAcertos)" animationDuration={1000} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Gráfico de Pizza (Certas vs Erradas) */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center">
                    <div className="w-full flex justify-between items-center mb-2">
                        <div>
                            <h3 className="font-bold text-slate-800">Balanço de Questões</h3>
                            <p className="text-xs font-medium text-slate-400">{data.kpis.questions} questões resolvidas</p>
                        </div>
                    </div>
                    <div className="h-48 w-full flex-1 relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data.questionsDist}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                    animationDuration={1000}
                                >
                                    {data.questionsDist.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <RechartsTooltip 
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    itemStyle={{ fontWeight: 'bold', color: '#333' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        {/* Texto no meio do Donut */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-2xl font-black text-slate-800">{data.kpis.accuracy}</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase">Acerto</span>
                        </div>
                    </div>
                    <div className="flex gap-4 mt-2">
                        {data.questionsDist.map((item) => (
                            <div key={item.name} className="flex items-center gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                                <span className="text-xs font-bold text-slate-600">{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tempo de Estudo + Disciplinas */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                
                {/* Raio-X das Disciplinas */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm xl:col-span-2 overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                        <div>
                            <h3 className="font-bold text-slate-800">Raio-X das Disciplinas</h3>
                            <p className="text-xs font-medium text-slate-400">Progresso e eficiência do período</p>
                        </div>
                    </div>
                    <div className="flex-1 p-0 overflow-x-auto">
                        <table className="w-full text-left text-sm min-w-[500px]">
                            <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold text-xs uppercase tracking-wider">
                                <tr>
                                    <th className="p-4">Disciplina</th>
                                    <th className="p-4 text-center">Edital</th>
                                    <th className="p-4 text-center">Aproveitamento</th>
                                    <th className="p-4 text-center">Tempo</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {data.disciplines.map((disc, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${disc.icon}`}>
                                                    <BookOpen size={16} />
                                                </div>
                                                <span className="font-bold text-slate-700">{disc.name}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2 justify-center">
                                                <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                    <div className={`h-full ${disc.color} transition-all duration-1000`} style={{ width: `${disc.progress}%` }}></div>
                                                </div>
                                                <span className="text-xs font-bold text-slate-500 w-8">{disc.progress}%</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-center">
                                            <span className={`inline-flex items-center justify-center px-2 py-1 rounded-md text-xs font-bold transition-colors ${
                                                disc.accuracy >= 80 ? 'bg-emerald-50 text-emerald-600' :
                                                disc.accuracy >= 60 ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'
                                            }`}>
                                                {disc.accuracy}%
                                            </span>
                                        </td>
                                        <td className="p-4 text-center font-bold text-slate-500">
                                            {disc.time}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="flex flex-col space-y-6">
                    {/* Tempo de Estudo da Semana (Bar) */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col flex-1">
                        <div className="mb-6">
                            <h3 className="font-bold text-slate-800">Distribuição do Tempo</h3>
                            <p className="text-xs font-medium text-slate-400">Horas divididas no período</p>
                        </div>
                        <div className="h-48 flex-1">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data.hoursData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                                    <CartesianGrid vertical={false} stroke="#e2e8f0" strokeDasharray="4 4" />
                                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                                    <RechartsTooltip 
                                        cursor={{fill: '#f8fafc'}}
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        formatter={(value) => [`${value}h`, 'Estudadas']}
                                    />
                                    <Bar dataKey="hours" fill="#3b82f6" radius={[4, 4, 0, 0]} animationDuration={1000} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Card de Edital realocado */}
                    <div className="grid grid-cols-1 gap-4">
                        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex justify-start items-center hover:-translate-y-1 transition-transform">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center shrink-0">
                                    <Award size={24} />
                                </div>
                                <div className="text-left">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Edital Visto</p>
                                    <p className="text-2xl font-black text-slate-800">{data.kpis.edital}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}