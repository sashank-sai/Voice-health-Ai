import React from 'react';
import { Phone, Wifi, Activity } from 'lucide-react';
import { StatusBadge } from './SharedComponents';
import { activeCalls, recentLogs } from '../data/mockData';

export default function LiveOperations() {
    return (
        <>
            {/* Active Calls */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden mb-10">
                <div className="p-8 border-b border-slate-100">
                    <div className="flex items-center space-x-3">
                        <span className="w-3 h-3 bg-rose-500 rounded-full animate-ping"></span>
                        <h3 className="text-xl font-bold text-slate-800">Active Calls — Live Now</h3>
                    </div>
                    <p className="text-sm text-slate-500 mt-1">{activeCalls.length} lines currently active</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-8">
                    {activeCalls.map((call) => (
                        <div key={call.id} className="relative group p-6 rounded-2xl border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-white to-slate-50">
                            <div className="absolute top-4 right-4">
                                <span className={`px-2 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider ${call.status === 'Live' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                                        call.status === 'Redirecting' ? 'bg-rose-50 text-rose-600 border border-rose-100 animate-pulse' :
                                            'bg-amber-50 text-amber-600 border border-amber-100'
                                    }`}>{call.status}</span>
                            </div>
                            <div className="flex items-center space-x-3 mb-4">
                                <div className={`p-2.5 rounded-xl shadow-lg ${call.status === 'Redirecting' ? 'bg-gradient-to-br from-rose-400 to-rose-600' : 'bg-gradient-to-br from-blue-400 to-blue-600'
                                    } text-white`}>
                                    <Phone size={18} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800">{call.region}</h4>
                                    <p className="text-xs text-slate-400">{call.caller}</p>
                                </div>
                            </div>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between"><span className="text-slate-400">Type</span><span className="font-semibold text-slate-700">{call.type}</span></div>
                                <div className="flex justify-between"><span className="text-slate-400">Language</span><span className="font-semibold text-slate-700">{call.language}</span></div>
                                <div className="flex justify-between"><span className="text-slate-400">Duration</span><span className="font-mono font-semibold text-slate-700">{call.duration}</span></div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400">Signal</span>
                                    <div className="flex items-center space-x-1">
                                        <Wifi size={14} className={call.signal > 50 ? "text-emerald-500" : "text-amber-500"} />
                                        <span className="font-semibold text-slate-700">{call.signal}%</span>
                                    </div>
                                </div>
                            </div>
                            {call.status === "Redirecting" && (
                                <div className="mt-4 p-3 rounded-xl bg-rose-50 border border-rose-100 flex items-center text-rose-600 text-xs font-bold animate-pulse">
                                    <Activity size={14} className="mr-2" /> AMBULANCE BEING DISPATCHED
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Full Call Logs */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-8 border-b border-slate-100">
                    <h3 className="text-xl font-bold text-slate-800">Complete Call Logs</h3>
                    <p className="text-sm text-slate-500 mt-1">All consultations handled by AI Voice Agent today</p>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 text-slate-400 text-xs font-bold uppercase tracking-wider">
                                <th className="p-6">Time</th><th className="p-6">Caller</th><th className="p-6">Symptom</th>
                                <th className="p-6">Action</th><th className="p-6">Duration</th><th className="p-6">Revenue</th><th className="p-6">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-600">
                            {recentLogs.map((log) => (
                                <tr key={log.id} className="hover:bg-blue-50/30 transition-colors">
                                    <td className="p-6 font-mono text-slate-400">{log.time}</td>
                                    <td className="p-6 text-slate-800 font-bold">{log.user}</td>
                                    <td className="p-6"><div className="flex items-center"><Activity size={14} className="mr-2 text-slate-400" />{log.symptom}</div></td>
                                    <td className="p-6">{log.outcome}</td>
                                    <td className="p-6 font-mono">{log.duration}</td>
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
