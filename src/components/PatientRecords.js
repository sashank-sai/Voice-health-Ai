import React, { useState } from 'react';
import { Users, Activity, Search } from 'lucide-react';
import { StatCard, StatusBadge, ProgressBar, FilterButton } from './SharedComponents';

export default function PatientRecords({ patients, kpis }) {
    const [filter, setFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filters = ['All', 'Active', 'Recovered'];
    const filtered = patients.filter(p => {
        const matchFilter = filter === 'All' || p.status === filter;
        const q = searchQuery.toLowerCase();
        const matchSearch = !q || p.name.toLowerCase().includes(q) || p.condition.toLowerCase().includes(q) || p.hospital.toLowerCase().includes(q);
        return matchFilter && matchSearch;
    });

    return (
        <>
            {/* Patient KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <StatCard title="Patients in Treatment" value={kpis.treatmentActive.toString()} subtext="+14 this week" icon={Users} gradient="bg-gradient-to-br from-violet-400 to-violet-600" />
                <StatCard title="Treatment Completed" value={kpis.treatmentCompleted.toString()} subtext="+28 this month" icon={Activity} gradient="bg-gradient-to-br from-emerald-400 to-emerald-600" />
                <StatCard title="Active Users" value={kpis.activeUsers.toLocaleString()} subtext={`+${kpis.newUsersToday} today`} icon={Users} gradient="bg-gradient-to-br from-blue-400 to-blue-600" />
                <StatCard title="Avg Call Duration" value={kpis.avgCallDuration} subtext="Per consultation" icon={Activity} gradient="bg-gradient-to-br from-amber-400 to-amber-600" />
            </div>

            {/* Filter + Search */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex space-x-2">
                    {filters.map(f => (<FilterButton key={f} label={f} active={filter === f} onClick={() => setFilter(f)} />))}
                </div>
                <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
                    <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search patients..." className="pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 w-56" />
                </div>
            </div>

            {/* Patient Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
                {filtered.map((p) => (
                    <div key={p.id} className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">{p.name.charAt(0)}</div>
                            <StatusBadge status={p.status} />
                        </div>
                        <h4 className="font-bold text-slate-800 text-lg">{p.name}</h4>
                        <p className="text-xs text-slate-400 mb-3">{p.id} • {p.age}y • {p.gender}</p>
                        <div className="space-y-2 text-sm mb-4">
                            <div className="flex justify-between"><span className="text-slate-400">Condition</span><span className="font-semibold text-slate-700 text-right text-xs">{p.condition}</span></div>
                            <div className="flex justify-between"><span className="text-slate-400">Hospital</span><span className="font-semibold text-slate-700 text-right text-xs">{p.hospital}</span></div>
                            <div className="flex justify-between"><span className="text-slate-400">Visits</span><span className="font-semibold text-slate-700">{p.visits}</span></div>
                            <div className="flex justify-between"><span className="text-slate-400">Last Visit</span><span className="font-mono text-slate-500 text-xs">{p.lastVisit}</span></div>
                        </div>
                        <ProgressBar value={p.visits} max={15} color={p.status === 'Active' ? 'from-violet-400 to-violet-600' : 'from-emerald-400 to-emerald-600'} />
                        <p className="text-[10px] text-slate-400 mt-1 text-right">{p.visits}/15 follow-ups</p>
                    </div>
                ))}
                {filtered.length === 0 && <p className="text-slate-400 text-sm col-span-4 text-center py-8">No patients matching your search</p>}
            </div>

            {/* Patient Table */}
            <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-8 border-b border-slate-100">
                    <h3 className="text-xl font-bold text-slate-800">All Patient Records</h3>
                    <p className="text-sm text-slate-500 mt-1">{filtered.length} patients shown</p>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead><tr className="bg-slate-50/50 text-slate-400 text-xs font-bold uppercase tracking-wider">
                            <th className="p-6">ID</th><th className="p-6">Name</th><th className="p-6">Age</th><th className="p-6">Condition</th><th className="p-6">Hospital</th><th className="p-6">Visits</th><th className="p-6">Status</th>
                        </tr></thead>
                        <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-600">
                            {filtered.map((p) => (
                                <tr key={p.id} className="hover:bg-blue-50/30 transition-colors">
                                    <td className="p-6 font-mono text-slate-400">{p.id}</td>
                                    <td className="p-6 text-slate-800 font-bold">{p.name}</td>
                                    <td className="p-6">{p.age} / {p.gender}</td>
                                    <td className="p-6">{p.condition}</td>
                                    <td className="p-6 text-xs">{p.hospital}</td>
                                    <td className="p-6 font-bold">{p.visits}</td>
                                    <td className="p-6"><StatusBadge status={p.status} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
