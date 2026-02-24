import React from 'react';

// --- Stat Card ---
export const StatCard = ({ title, value, subtext, icon: Icon, gradient }) => (
    <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">{title}</p>
                <h3 className="text-3xl font-black text-slate-800 tracking-tight">{value}</h3>
            </div>
            <div className={`p-3 rounded-2xl ${gradient} text-white shadow-lg group-hover:scale-110 transition-transform`}>
                <Icon size={24} />
            </div>
        </div>
        <div className="mt-4 flex items-center">
            <div className={`text-xs font-bold px-2 py-1 rounded-full ${subtext.includes('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-500'}`}>
                {subtext}
            </div>
        </div>
    </div>
);

// --- Status Badge ---
export const StatusBadge = ({ status }) => {
    const styles = {
        'Critical': 'bg-rose-50 text-rose-600 border-rose-100',
        'Resolved': 'bg-emerald-50 text-emerald-600 border-emerald-100',
        'Referral': 'bg-blue-50 text-blue-600 border-blue-100',
        'Failed': 'bg-slate-50 text-slate-500 border-slate-100',
        'Active': 'bg-emerald-50 text-emerald-600 border-emerald-100',
        'Recovered': 'bg-blue-50 text-blue-600 border-blue-100',
        'Dispatched': 'bg-amber-50 text-amber-600 border-amber-100',
        'En Route': 'bg-rose-50 text-rose-600 border-rose-100',
        'Available': 'bg-emerald-50 text-emerald-600 border-emerald-100',
        'Returning': 'bg-blue-50 text-blue-600 border-blue-100',
        'Maintenance': 'bg-slate-50 text-slate-500 border-slate-100',
    };
    return (
        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${styles[status] || 'bg-slate-50 text-slate-500 border-slate-100'}`}>
            {status}
        </span>
    );
};

// --- CSS Wave Chart ---
export const CssWaveChart = ({ bars, height = "h-48", label = "calls" }) => (
    <div className={`${height} w-full flex items-end justify-between space-x-1 px-2 pt-8`}>
        {bars.map((h, i) => (
            <div key={i} className="w-full flex flex-col items-center group relative">
                <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-[10px] px-2 py-1 rounded z-10">
                    {h} {label}
                </div>
                <div
                    className="w-full bg-gradient-to-t from-cyan-500 to-blue-500 rounded-t-md opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 shadow-lg shadow-cyan-500/20"
                    style={{ height: `${h}%` }}
                />
            </div>
        ))}
    </div>
);

// --- Progress Bar ---
export const ProgressBar = ({ value, max, color = "from-blue-400 to-blue-600" }) => (
    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
        <div
            className={`bg-gradient-to-r ${color} h-2.5 rounded-full transition-all duration-500`}
            style={{ width: `${(value / max) * 100}%` }}
        />
    </div>
);
