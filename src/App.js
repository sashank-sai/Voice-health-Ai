import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import {
  Activity, Phone, DollarSign, Users, Menu, Search, Bell, ChevronRight, Settings
} from 'lucide-react';

import { SearchOverlay, NotificationPanel, SettingsModal } from './components/SharedComponents';
import MissionControl from './components/MissionControl';
import LiveOperations from './components/LiveOperations';
import PatientRecords from './components/PatientRecords';
import DispatchUnits from './components/DispatchUnits';
import RevenueMetrics from './components/RevenueMetrics';

import { activeCalls as mockCalls, recentLogs as mockLogs, patients as mockPatients, ambulances as mockAmb, revenueData as mockRevenue, kpiData as mockKpi, notifications as mockNotifs, chartBars, weeklyBars } from './data/mockData';
import { fetchActiveCalls, fetchCallLogs, fetchPatients, fetchAmbulances, fetchRevenue, fetchKPIs } from './services/apiService';

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <div onClick={onClick} className={`flex items-center space-x-3 px-4 py-3.5 rounded-2xl cursor-pointer transition-all duration-200 group ${active ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}`}>
    <Icon size={20} className={active ? "animate-pulse" : "group-hover:scale-110 transition-transform"} />
    {label && <span className="font-semibold text-sm tracking-wide">{label}</span>}
  </div>
);

const pageTitles = {
  mission: { title: "System Overview", subtitle: "Good Morning, Doctor. Here is today's triage report.", breadcrumb: "Dashboard" },
  live: { title: "Live Operations", subtitle: "Monitor all active and recent calls in real-time.", breadcrumb: "Live Calls" },
  patients: { title: "Patient Records", subtitle: "Customers currently receiving treatment and monitoring.", breadcrumb: "Patients" },
  dispatch: { title: "Dispatch Units", subtitle: "Ambulance fleet status, locations, and dispatch history.", breadcrumb: "Ambulances" },
  revenue: { title: "Revenue Metrics", subtitle: "Financial performance and business analytics.", breadcrumb: "Revenue" },
};

export default function VoiceHealthAdmin() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [activePage, setActivePage] = useState('mission');
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Live data state (starts with mock, gets overwritten from API)
  const [calls, setCalls] = useState(mockCalls);
  const [logs, setLogs] = useState(mockLogs);
  const [patients, setPatients] = useState(mockPatients);
  const [ambulances, setAmbulances] = useState(mockAmb);
  const [revenue, setRevenue] = useState(mockRevenue);
  const [kpis, setKpis] = useState(mockKpi);

  // Clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch data from API (once on mount + every 30s)
  const loadData = useCallback(async () => {
    const [c, l, p, a, r, k] = await Promise.all([
      fetchActiveCalls(mockCalls), fetchCallLogs(mockLogs), fetchPatients(mockPatients),
      fetchAmbulances(mockAmb), fetchRevenue(mockRevenue), fetchKPIs(mockKpi),
    ]);
    setCalls(c); setLogs(l); setPatients(p); setAmbulances(a); setRevenue(r); setKpis(k);
  }, []);

  useEffect(() => { loadData(); const interval = setInterval(loadData, 30000); return () => clearInterval(interval); }, [loadData]);

  // Keyboard shortcut: Ctrl+K for search
  useEffect(() => {
    const handler = (e) => { if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); setShowSearch(true); } if (e.key === 'Escape') { setShowSearch(false); setShowNotifs(false); setShowSettings(false); } };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const pageInfo = pageTitles[activePage];
  const unreadNotifs = mockNotifs.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans text-slate-900 selection:bg-cyan-100">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-72' : 'w-24'} bg-white border-r border-slate-200 transition-all duration-500 ease-in-out flex flex-col fixed h-full z-50`}>
        <div className="p-8 flex items-center justify-between">
          {isSidebarOpen ? (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/30">V</div>
              <span className="font-black text-xl tracking-tight text-slate-800">VoiceHealth</span>
            </div>
          ) : (
            <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-lg mx-auto" />
          )}
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-slate-50 rounded-xl text-slate-400 hover:text-slate-600 transition-colors">
            <Menu size={20} />
          </button>
        </div>
        <nav className="flex-1 px-6 space-y-3 mt-4">
          <SidebarItem icon={Activity} label={isSidebarOpen ? "Mission Control" : ""} active={activePage === 'mission'} onClick={() => setActivePage('mission')} />
          <SidebarItem icon={Phone} label={isSidebarOpen ? "Live Operations" : ""} active={activePage === 'live'} onClick={() => setActivePage('live')} />
          <SidebarItem icon={Users} label={isSidebarOpen ? "Patient Records" : ""} active={activePage === 'patients'} onClick={() => setActivePage('patients')} />
          <SidebarItem icon={Activity} label={isSidebarOpen ? "Dispatch Units" : ""} active={activePage === 'dispatch'} onClick={() => setActivePage('dispatch')} />
          <SidebarItem icon={DollarSign} label={isSidebarOpen ? "Revenue Metrics" : ""} active={activePage === 'revenue'} onClick={() => setActivePage('revenue')} />
        </nav>
        <div className="p-6">
          <div className={`bg-slate-50 rounded-2xl p-4 flex items-center space-x-3 border border-slate-100 ${!isSidebarOpen && 'justify-center'}`}>
            <div className="relative">
              <img src="https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff" className="w-10 h-10 rounded-xl shadow-sm" alt="Admin" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
            </div>
            {isSidebarOpen && (
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-slate-700 truncate">Dr. S. Reddy</p>
                <p className="text-xs text-slate-400 truncate">Chief Medical Officer</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className={`flex-1 ${isSidebarOpen ? 'ml-72' : 'ml-24'} transition-all duration-500 p-8 lg:p-12`}>
        <header className="flex justify-between items-end mb-10">
          <div>
            <div className="flex items-center space-x-2 text-slate-400 text-sm font-medium mb-1">
              <span>Overview</span><ChevronRight size={14} /><span className="text-blue-600">{pageInfo.breadcrumb}</span>
            </div>
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">{pageInfo.title}</h2>
            <p className="text-slate-500 font-medium mt-1">{pageInfo.subtitle}</p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-right hidden md:block">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Local Time</p>
              <p className="text-xl font-mono font-bold text-slate-700">{currentTime}</p>
            </div>
            <div className="flex space-x-3 relative">
              <button onClick={() => setShowSearch(true)} className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm" title="Search (Ctrl+K)">
                <Search size={20} />
              </button>
              <button onClick={() => setShowNotifs(!showNotifs)} className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm relative">
                <Bell size={20} />
                {unreadNotifs > 0 && <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping"></span>}
              </button>
              <button onClick={() => setShowSettings(true)} className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm">
                <Settings size={20} />
              </button>
              <NotificationPanel isOpen={showNotifs} onClose={() => setShowNotifs(false)} notifications={mockNotifs} />
            </div>
          </div>
        </header>

        <div className="fade-in-up">
          {activePage === 'mission' && <MissionControl calls={calls} logs={logs} kpis={kpis} chartBars={chartBars} weeklyBars={weeklyBars} onNavigate={setActivePage} />}
          {activePage === 'live' && <LiveOperations calls={calls} logs={logs} />}
          {activePage === 'patients' && <PatientRecords patients={patients} kpis={kpis} />}
          {activePage === 'dispatch' && <DispatchUnits ambulances={ambulances} kpis={kpis} />}
          {activePage === 'revenue' && <RevenueMetrics revenue={revenue} />}
        </div>
      </main>

      {/* Overlays */}
      <SearchOverlay isOpen={showSearch} onClose={() => setShowSearch(false)} calls={logs} patients={patients} ambulances={ambulances} />
      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </div>
  );
}