import React from 'react';
import { DollarSign, Activity } from 'lucide-react';
import { StatCard, CssWaveChart, ProgressBar } from './SharedComponents';

export default function RevenueMetrics({ revenue }) {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <StatCard title="Today's Revenue" value={`$${revenue.today.toLocaleString()}`} subtext={`+$${(revenue.today - revenue.yesterday).toFixed(2)} vs yesterday`} icon={DollarSign} gradient="bg-gradient-to-br from-emerald-400 to-emerald-600" />
                <StatCard title="This Week" value={`$${revenue.thisWeek.toLocaleString()}`} subtext="+18.3% growth" icon={DollarSign} gradient="bg-gradient-to-br from-blue-400 to-blue-600" />
                <StatCard title="This Month" value={`$${revenue.thisMonth.toLocaleString()}`} subtext={`+$${(revenue.thisMonth - revenue.lastMonth).toFixed(0)} vs last month`} icon={DollarSign} gradient="bg-gradient-to-br from-violet-400 to-violet-600" />
                <StatCard title="Avg Per Call" value={`$${revenue.perCallAvg}`} subtext="+$0.15 this week" icon={Activity} gradient="bg-gradient-to-br from-amber-400 to-amber-600" />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-10">
                <div className="xl:col-span-2 bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50"></div>
                    <div className="relative z-10">
                        <h3 className="text-xl font-bold text-slate-800 mb-1">Monthly Revenue Trend</h3>
                        <p className="text-sm text-slate-500 mb-8">Last 6 months performance</p>
                    </div>
                    <CssWaveChart bars={revenue.monthly.map(m => (m.amount / 350))} height="h-56" label="USD" />
                    <div className="flex justify-between mt-4 px-2 text-xs text-slate-400 font-medium">
                        {revenue.monthly.map(m => <span key={m.month}>{m.month}</span>)}
                    </div>
                </div>

                <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Revenue Sources</h3>
                    <p className="text-sm text-slate-500 mb-6">Where your income comes from</p>
                    <div className="space-y-5">
                        {revenue.sources.map((s, i) => {
                            const colors = ['from-blue-400 to-blue-600', 'from-rose-400 to-rose-600', 'from-violet-400 to-violet-600', 'from-amber-400 to-amber-600'];
                            return (
                                <div key={i}>
                                    <div className="flex justify-between mb-1.5">
                                        <span className="text-sm font-semibold text-slate-700">{s.name}</span>
                                        <span className="text-sm font-bold text-slate-800">${s.amount.toLocaleString()}</span>
                                    </div>
                                    <ProgressBar value={s.percent} max={100} color={colors[i]} />
                                    <p className="text-[10px] text-slate-400 text-right mt-0.5">{s.percent}%</p>
                                </div>
                            );
                        })}
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-100">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Total This Month</span>
                            <span className="text-xl font-black text-slate-800">${revenue.thisMonth.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
