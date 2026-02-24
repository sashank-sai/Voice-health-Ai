import React, { useState } from 'react';
import { Phone, DollarSign, Users, Activity, Wifi } from 'lucide-react';
import { StatCard, StatusBadge, CssWaveChart } from './SharedComponents';

let AmbulanceIcon;
try { AmbulanceIcon = require('lucide-react').Ambulance; } catch { AmbulanceIcon = Activity; }

export default function MissionControl({ calls, logs, kpis, chartBars, weeklyBars, onNavigate }) {
    const [chartMode, setChartMode] = useState('daily');

    return (
        <>
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <StatCard title="Total Revenue" value={`$${kpis.totalCalls > 0 ? '1,240.50' : '0'}`} subtext="+12.5% today" icon={DollarSign} gradient="bg-gradient-to-br from-emerald-400 to-emerald-600" />
                <StatCard title="Active Lines" value={calls.length.toString()} subtext={`${calls.filter(c => c.status === 'Redirecting').length} Critical Cases`} icon={Phone} gradient="bg-gradient-to-br from-blue-400 to-blue-600" />
                <StatCard title="Active Users" value={kpis.activeUsers.toLocaleString()} subtext={`+${kpis.newUsersToday} today`} icon={Users} gradient="bg-gradient-to-br from-violet-400 to-violet-600" />
                <StatCard title="Ambulances Active" value={`${kpis.ambulancesActive}/${kpis.ambulancesTotal}`} subtext={`Avg ETA: ${kpis.avgResponseTime}`} icon={AmbulanceIcon || Activity} gradient="bg-gradient-to-br from-rose-400 to-rose-600" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <StatCard title="Patients in Treatment" value={kpis.treatmentActive.toString()} subtext={`${kpis.treatmentCompleted} completed`} icon={Activity} gradient="bg-gradient-to-br from-amber-400 to-amber-600" />
                <StatCard title="Total Calls" value={kpis.totalCalls.toLocaleString()} subtext={`${kpis.callsToday} today`} icon={Phone} gradient="bg-gradient-to-br from-cyan-400 to-cyan-600" />
                <StatCard title="Success Rate" value={`${kpis.successRate}%`} subtext="+2.1% this week" icon={Activity} gradient="bg-gradient-to-br from-indigo-400 to-indigo-600" />
                <StatCard title="Hospitals Connected" value={kpis.hospitalsConnected.toString()} subtext="Across Telangana" icon={Users} gradient="bg-gradient-to-br from-pink-400 to-pink-600" />
            </div>

            {/* Chart + Live Feed */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-10">
                <div className="xl:col-span-2 bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50"></div>
                    <div className="flex justify-between items-center mb-8 relative z-10">
                        <div>
                            <h3 className="text-xl font-bold text-slate-800">Call Volume Analytics</h3>
                            <p className="text-sm text-slate-500">Real-time frequency of incoming triage requests</p>
                        </div>
                        <div className="flex space-x-2">
                            <button onClick={() => setChartMode('daily')} className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${chartMode === 'daily' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white border border-slate-200 text-slate-400 hover:bg-slate-50'}`}>Daily</button>
                            <button onClick={() => setChartMode('weekly')} className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${chartMode === 'weekly' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white border border-slate-200 text-slate-400 hover:bg-slate-50'}`}>Weekly</button>
                        </div>
                    </div>
                    <CssWaveChart bars={chartMode === 'daily' ? chartBars : weeklyBars} />
                </div>

                <div className="bg-slate-900 text-white rounded-[2rem] p-8 shadow-xl shadow-slate-200 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-[80px] opacity-20"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500 rounded-full blur-[80px] opacity-20"></div>
                    <div className="flex justify-between items-center mb-6 relative z-10">
                        <h3 className="font-bold text-lg flex items-center"><span className="w-2 h-2 bg-rose-500 rounded-full mr-3 animate-ping"></span>Live Feed</h3>
                        <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-1 rounded">NET: 4G LTE</span>
                    </div>
                    <div className="space-y-4 relative z-10">
                        {calls.slice(0, 4).map((call) => (
                            <div key={call.id} className="group p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center space-x-2">
                                        <div className={`w-1.5 h-1.5 rounded-full ${call.status === 'Redirecting' ? 'bg-rose-500' : 'bg-emerald-500'}`}></div>
                                        <span className="font-bold text-sm">{call.region}</span>
                                    </div>
                                    <span className="text-[10px] uppercase tracking-wider text-slate-400">{call.duration}</span>
                                </div>
                                <div className="flex justify-between items-end">
                                    <div>
                                        <div className="text-xs text-slate-300 mb-1">{call.type} • {call.language}</div>
                                        {call.status === "Redirecting" && (<div className="flex items-center text-rose-400 text-xs font-bold animate-pulse"><Phone size={12} className="mr-1" /> CRITICAL DISPATCH</div>)}
                                    </div>
                                    <div className="flex items-center space-x-1"><Wifi size={12} className={call.signal > 50 ? "text-emerald-400" : "text-amber-400"} /><span className="text-[10px] font-mono text-slate-500">{call.signal}%</span></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Activity Table */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                    <div><h3 className="text-xl font-bold text-slate-800">Recent Consultations</h3><p className="text-sm text-slate-500 mt-1">Automated logs from AI Voice Agent</p></div>
                    <button onClick={() => onNavigate('live')} className="text-blue-600 font-bold text-sm hover:underline">View All Logs →</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead><tr className="bg-slate-50/50 text-slate-400 text-xs font-bold uppercase tracking-wider">
                            <th className="p-6">Timestamp</th><th className="p-6">Caller ID</th><th className="p-6">AI Diagnosis</th><th className="p-6">Action Taken</th><th className="p-6">Revenue</th><th className="p-6">Status</th>
                        </tr></thead>
                        <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-600">
                            {logs.slice(0, 5).map((log) => (
                                <tr key={log.id} className="hover:bg-blue-50/30 transition-colors">
                                    <td className="p-6 font-mono text-slate-400">{log.time}</td>
                                    <td className="p-6 text-slate-800">{log.user}</td>
                                    <td className="p-6"><div className="flex items-center"><Activity size={14} className="mr-2 text-slate-400" />{log.symptom}</div></td>
                                    <td className="p-6">{log.outcome}</td>
                                    <td className="p-6 text-emerald-600 font-bold">${log.revenue.toFixed(2)}</td>
                                    <td className="p-6"><StatusBadge status={log.status} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
