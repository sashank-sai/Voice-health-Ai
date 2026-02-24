import React, { useState } from 'react';
import { X, Search, AlertTriangle, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { getApiUrl, setApiUrl } from '../services/apiService';

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

// --- Filter Button ---
export const FilterButton = ({ label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${active ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50'
            }`}
    >
        {label}
    </button>
);

// ==========================================
// SEARCH OVERLAY
// ==========================================
export const SearchOverlay = ({ isOpen, onClose, calls, patients, ambulances }) => {
    const [query, setQuery] = useState('');
    if (!isOpen) return null;

    const q = query.toLowerCase();
    const matchedCalls = (calls || []).filter(c =>
        c.user?.toLowerCase().includes(q) || c.symptom?.toLowerCase().includes(q) || c.outcome?.toLowerCase().includes(q) ||
        c.region?.toLowerCase().includes(q) || c.caller?.toLowerCase().includes(q)
    );
    const matchedPatients = (patients || []).filter(p =>
        p.name?.toLowerCase().includes(q) || p.condition?.toLowerCase().includes(q) || p.hospital?.toLowerCase().includes(q)
    );
    const matchedAmb = (ambulances || []).filter(a =>
        a.driver?.toLowerCase().includes(q) || a.location?.toLowerCase().includes(q) || a.id?.toLowerCase().includes(q)
    );

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-start justify-center pt-24" onClick={onClose}>
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-100 overflow-hidden" onClick={e => e.stopPropagation()}>
                <div className="flex items-center border-b border-slate-100 px-6 py-4">
                    <Search size={20} className="text-slate-400 mr-3" />
                    <input
                        autoFocus
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="Search calls, patients, ambulances..."
                        className="flex-1 text-lg outline-none text-slate-800 placeholder-slate-300"
                    />
                    <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-lg text-slate-400">
                        <X size={18} />
                    </button>
                </div>
                <div className="max-h-96 overflow-y-auto p-4">
                    {!query && <p className="text-center text-slate-400 py-8">Start typing to search...</p>}
                    {query && matchedCalls.length === 0 && matchedPatients.length === 0 && matchedAmb.length === 0 && (
                        <p className="text-center text-slate-400 py-8">No results for "{query}"</p>
                    )}
                    {matchedCalls.length > 0 && (
                        <div className="mb-4">
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 px-2">Calls ({matchedCalls.length})</p>
                            {matchedCalls.slice(0, 5).map(c => (
                                <div key={c.id} className="px-3 py-2.5 rounded-xl hover:bg-blue-50 cursor-default flex justify-between items-center">
                                    <div><span className="font-semibold text-slate-800 text-sm">{c.user || c.caller}</span><span className="text-xs text-slate-400 ml-2">{c.symptom || c.type} • {c.outcome || c.status}</span></div>
                                    <StatusBadge status={c.status} />
                                </div>
                            ))}
                        </div>
                    )}
                    {matchedPatients.length > 0 && (
                        <div className="mb-4">
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 px-2">Patients ({matchedPatients.length})</p>
                            {matchedPatients.slice(0, 5).map(p => (
                                <div key={p.id} className="px-3 py-2.5 rounded-xl hover:bg-blue-50 cursor-default flex justify-between items-center">
                                    <div><span className="font-semibold text-slate-800 text-sm">{p.name}</span><span className="text-xs text-slate-400 ml-2">{p.condition} • {p.hospital}</span></div>
                                    <StatusBadge status={p.status} />
                                </div>
                            ))}
                        </div>
                    )}
                    {matchedAmb.length > 0 && (
                        <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 px-2">Ambulances ({matchedAmb.length})</p>
                            {matchedAmb.slice(0, 5).map(a => (
                                <div key={a.id} className="px-3 py-2.5 rounded-xl hover:bg-blue-50 cursor-default flex justify-between items-center">
                                    <div><span className="font-semibold text-slate-800 text-sm">{a.id}</span><span className="text-xs text-slate-400 ml-2">{a.driver} • {a.location}</span></div>
                                    <StatusBadge status={a.status} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// ==========================================
// NOTIFICATION PANEL
// ==========================================
export const NotificationPanel = ({ isOpen, onClose, notifications }) => {
    if (!isOpen) return null;

    const iconMap = {
        critical: <AlertCircle size={16} className="text-rose-500" />,
        warning: <AlertTriangle size={16} className="text-amber-500" />,
        success: <CheckCircle size={16} className="text-emerald-500" />,
        info: <Info size={16} className="text-blue-500" />,
    };
    const bgMap = {
        critical: 'bg-rose-50 border-rose-100',
        warning: 'bg-amber-50 border-amber-100',
        success: 'bg-emerald-50 border-emerald-100',
        info: 'bg-blue-50 border-blue-100',
    };
    const unread = (notifications || []).filter(n => !n.read).length;

    return (
        <>
            <div className="fixed inset-0 z-[90]" onClick={onClose} />
            <div className="absolute right-0 top-16 w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 z-[100] overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                    <div>
                        <h4 className="font-bold text-slate-800">Notifications</h4>
                        {unread > 0 && <p className="text-xs text-rose-500 font-semibold">{unread} unread</p>}
                    </div>
                    <button onClick={onClose} className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-400"><X size={16} /></button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                    {(notifications || []).map(n => (
                        <div key={n.id} className={`px-5 py-3.5 border-b border-slate-50 flex items-start space-x-3 ${!n.read ? 'bg-blue-50/30' : ''} hover:bg-slate-50 transition-colors`}>
                            <div className={`p-1.5 rounded-lg border ${bgMap[n.type]}`}>{iconMap[n.type]}</div>
                            <div className="flex-1 min-w-0">
                                <p className={`text-sm ${!n.read ? 'font-semibold text-slate-800' : 'text-slate-600'}`}>{n.message}</p>
                                <p className="text-xs text-slate-400 mt-0.5">{n.time}</p>
                            </div>
                            {!n.read && <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

// ==========================================
// SETTINGS MODAL
// ==========================================
export const SettingsModal = ({ isOpen, onClose }) => {
    const [url, setUrl] = useState(getApiUrl());

    if (!isOpen) return null;

    const handleSave = () => {
        setApiUrl(url); // This will reload the page
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center" onClick={onClose}>
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-100 overflow-hidden" onClick={e => e.stopPropagation()}>
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-slate-800">Settings</h3>
                    <button onClick={onClose} className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-400"><X size={18} /></button>
                </div>
                <div className="p-6 space-y-6">
                    {/* API URL */}
                    <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 block">Backend API URL</label>
                        <input
                            value={url}
                            onChange={e => setUrl(e.target.value)}
                            placeholder="e.g. http://localhost:5000"
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm text-slate-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                        />
                        <p className="text-xs text-slate-400 mt-2">Leave empty to use mock data. See <strong>API_DATA_GUIDE.md</strong> for endpoint specs.</p>
                    </div>

                    {/* Status */}
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Current Status</p>
                        <p className="text-sm font-semibold text-slate-700">
                            {getApiUrl() ? (
                                <><span className="inline-block w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>Connected to: {getApiUrl()}</>
                            ) : (
                                <><span className="inline-block w-2 h-2 bg-amber-500 rounded-full mr-2"></span>Using mock data (no API configured)</>
                            )}
                        </p>
                    </div>

                    {/* Save Button */}
                    <button
                        onClick={handleSave}
                        className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:scale-[1.02] transition-all"
                    >
                        Save & Reload
                    </button>
                </div>
            </div>
        </div>
    );
};
