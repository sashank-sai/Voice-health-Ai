import React from 'react';
import { Activity, Phone } from 'lucide-react';
import { StatCard, StatusBadge, ProgressBar } from './SharedComponents';
import { ambulances, kpiData } from '../data/mockData';

export default function DispatchUnits() {
    const activeAmbs = ambulances.filter(a => a.status === 'Dispatched' || a.status === 'En Route');
    const availableAmbs = ambulances.filter(a => a.status === 'Available');

    return (
        <>
            {/* Ambulance KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <StatCard title="Total Ambulances" value={kpiData.ambulancesTotal.toString()} subtext="Registered fleet" icon={Activity} gradient="bg-gradient-to-br from-rose-400 to-rose-600" />
                <StatCard title="Currently Active" value={activeAmbs.length.toString()} subtext="On dispatch" icon={Activity} gradient="bg-gradient-to-br from-amber-400 to-amber-600" />
                <StatCard title="Available" value={availableAmbs.length.toString()} subtext="Ready for dispatch" icon={Activity} gradient="bg-gradient-to-br from-emerald-400 to-emerald-600" />
                <StatCard title="Avg Response Time" value={kpiData.avgResponseTime} subtext="-2 min this week" icon={Phone} gradient="bg-gradient-to-br from-blue-400 to-blue-600" />
            </div>

            {/* Ambulance Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
                {ambulances.map((amb) => (
                    <div key={amb.id} className={`bg-white rounded-2xl border p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${amb.status === 'Dispatched' || amb.status === 'En Route' ? 'border-rose-100 bg-gradient-to-br from-white to-rose-50/30' : 'border-slate-100'
                        }`}>
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl shadow-lg text-white ${amb.status === 'Dispatched' ? 'bg-gradient-to-br from-amber-400 to-amber-600' :
                                    amb.status === 'En Route' ? 'bg-gradient-to-br from-rose-400 to-rose-600' :
                                        amb.status === 'Available' ? 'bg-gradient-to-br from-emerald-400 to-emerald-600' :
                                            amb.status === 'Returning' ? 'bg-gradient-to-br from-blue-400 to-blue-600' :
                                                'bg-gradient-to-br from-slate-400 to-slate-600'
                                }`}>
                                <Activity size={20} />
                            </div>
                            <StatusBadge status={amb.status} />
                        </div>
                        <h4 className="font-bold text-slate-800 text-lg">{amb.id}</h4>
                        <p className="text-xs text-slate-400 mb-3">{amb.vehicle}</p>
                        <div className="space-y-2 text-sm mb-4">
                            <div className="flex justify-between"><span className="text-slate-400">Driver</span><span className="font-semibold text-slate-700">{amb.driver}</span></div>
                            <div className="flex justify-between"><span className="text-slate-400">Location</span><span className="font-semibold text-slate-700">{amb.location}</span></div>
                            {amb.patient !== "-" && <div className="flex justify-between"><span className="text-slate-400">Patient</span><span className="font-semibold text-rose-600">{amb.patient}</span></div>}
                            {amb.hospital !== "-" && <div className="flex justify-between"><span className="text-slate-400">Hospital</span><span className="font-semibold text-slate-700 text-xs text-right">{amb.hospital}</span></div>}
                            {amb.eta !== "-" && <div className="flex justify-between"><span className="text-slate-400">ETA</span><span className="font-bold text-amber-600">{amb.eta}</span></div>}
                        </div>
                        <div>
                            <div className="flex justify-between text-xs mb-1"><span className="text-slate-400">Fuel Level</span><span className="font-bold text-slate-600">{amb.fuel}%</span></div>
                            <ProgressBar value={amb.fuel} max={100} color={amb.fuel > 50 ? 'from-emerald-400 to-emerald-600' : amb.fuel > 25 ? 'from-amber-400 to-amber-600' : 'from-rose-400 to-rose-600'} />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
