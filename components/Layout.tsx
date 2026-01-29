
import React, { useState } from 'react';
import { 
  LayoutDashboard, Home, Users, Zap, BarChart3, Settings, 
  LogOut, Bell, Search, Menu, X, Plus, Sparkles, PlusCircle,
  FileText, Briefcase
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userPlan?: string;
  onLogout: () => void;
  onQuickViewProperties?: () => void;
  onQuickViewClients?: () => void;
  onQuickOpenReports?: () => void;
  onQuickOpenSettings?: () => void;
  onGoHome?: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  activeTab, 
  setActiveTab, 
  userPlan = 'Free', 
  onLogout,
  onQuickViewProperties,
  onQuickViewClients,
  onQuickOpenReports,
  onQuickOpenSettings,
  onGoHome
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isFabOpen, setIsFabOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'properties', label: 'Properties', icon: <Home size={20} /> },
    { id: 'clients', label: 'Clients & Leads', icon: <Users size={20} /> },
    { id: 'matching', label: 'Smart Matching', icon: <Zap size={20} /> },
    { id: 'reports', label: 'Reports', icon: <BarChart3 size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 text-slate-900 font-sans">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-72' : 'w-24'} transition-all duration-500 bg-indigo-950 text-white hidden lg:flex flex-col border-r border-indigo-900/50 shadow-2xl z-40`}>
        <div className="p-8 flex items-center gap-3">
          <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-500/20 transform rotate-3">
            <span className="text-white font-black text-2xl">P</span>
          </div>
          {isSidebarOpen && (
            <div className="animate-in fade-in slide-in-from-left duration-500">
              <span className="text-2xl font-black tracking-tight block">PropMate</span>
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Agent Workspace</span>
            </div>
          )}
        </div>

        {isSidebarOpen && (
          <div className="px-6 mb-8 animate-in fade-in zoom-in duration-500 delay-200">
            <div className="bg-gradient-to-br from-indigo-900/60 to-indigo-800/20 rounded-[2rem] p-5 border border-white/5 backdrop-blur-sm">
              <p className="text-[9px] font-black text-indigo-400 uppercase tracking-[0.25em] mb-4">Immediate Actions</p>
              <div className="space-y-3">
                <button 
                  onClick={onQuickViewProperties}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-xs font-bold transition-all shadow-lg shadow-indigo-600/20 group"
                >
                  <Home size={16} className="group-hover:scale-110 transition-transform" /> Properties
                </button>
                <button 
                  onClick={onQuickViewClients}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 text-white rounded-2xl text-xs font-bold transition-all border border-white/10 group"
                >
                  <Users size={16} className="text-indigo-400 group-hover:text-white transition-colors" /> Clients
                </button>
              </div>
            </div>
          </div>
        )}

        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map((item) => (
            <button 
              key={item.id} 
              onClick={() => setActiveTab(item.id)} 
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all relative group ${activeTab === item.id ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/30' : 'text-indigo-300/70 hover:bg-white/5 hover:text-white'}`}
            >
              <span className={`${activeTab === item.id ? 'scale-110' : 'group-hover:scale-110'} transition-transform`}>{item.icon}</span>
              {isSidebarOpen && <span className="font-bold text-sm">{item.label}</span>}
              {activeTab === item.id && <div className="absolute right-3 w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-white/5">
          <button onClick={onLogout} className="w-full flex items-center gap-4 px-5 py-4 text-indigo-400 hover:text-rose-400 transition-all rounded-2xl font-bold text-sm hover:bg-rose-500/5 group">
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            {isSidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <header className="h-24 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-10 sticky top-0 z-30">
          <div className="flex items-center gap-8 flex-1">
             <div className="relative max-w-lg w-full group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Search anything in your workspace..." 
                className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-transparent rounded-[1.5rem] text-sm text-black focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 focus:outline-none transition-all font-medium" 
              />
            </div>
            
            {/* Trial Banner */}
            <div className="hidden xl:flex items-center gap-3 px-5 py-2.5 bg-amber-50 border border-amber-100 rounded-2xl animate-pulse">
              <Sparkles size={16} className="text-amber-600" />
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-amber-700 uppercase tracking-widest">Trial Mode Active</span>
                <span className="text-[11px] text-amber-600 font-bold">All premium features unlocked for you</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={onGoHome}
              title="Home"
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-indigo-600 transition-all group"
            >
              <LayoutDashboard size={24} />
            </button>
            <button className="w-12 h-12 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-indigo-600 transition-all relative group">
              <Bell size={24} />
              <span className="absolute top-3 right-3 w-3 h-3 bg-rose-500 rounded-full border-[3px] border-white group-hover:scale-110 transition-transform"></span>
            </button>
            
            <div className="flex items-center gap-5 pl-8 border-l border-slate-100">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black text-slate-900">Agent Malhotra</p>
                <div className="flex items-center gap-1 justify-end">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Online</span>
                </div>
              </div>
              <div className="w-14 h-14 rounded-[1.25rem] bg-indigo-50 border-4 border-white shadow-xl overflow-hidden transform hover:rotate-3 transition-transform cursor-pointer">
                <img src="https://picsum.photos/seed/agent/100" className="w-full h-full object-cover" alt="Profile" />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-10 bg-[#f8fafc]/50 relative scroll-smooth">
          {children}
        </main>

        {/* Global Floating Action Button (FAB) */}
        <div className="fixed bottom-10 right-10 z-[100] flex flex-col items-end gap-4">
          {isFabOpen && (
            <div className="flex flex-col gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300 mb-2">
              <div className="flex items-center gap-3 group">
                <span className="bg-indigo-900 text-white text-[10px] font-black px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest shadow-xl">Settings</span>
                <button 
                  onClick={() => { onQuickOpenSettings?.(); setIsFabOpen(false); }}
                  className="w-14 h-14 bg-white text-indigo-600 rounded-2xl shadow-2xl flex items-center justify-center hover:bg-indigo-50 transition-all border border-slate-100"
                >
                  <Settings size={22} />
                </button>
              </div>
              <div className="flex items-center gap-3 group">
                <span className="bg-indigo-900 text-white text-[10px] font-black px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest shadow-xl">Reports</span>
                <button 
                  onClick={() => { onQuickOpenReports?.(); setIsFabOpen(false); }}
                  className="w-14 h-14 bg-white text-indigo-600 rounded-2xl shadow-2xl flex items-center justify-center hover:bg-indigo-50 transition-all border border-slate-100"
                >
                  <BarChart3 size={22} />
                </button>
              </div>
              <div className="flex items-center gap-3 group">
                <span className="bg-indigo-900 text-white text-[10px] font-black px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest shadow-xl">Clients</span>
                <button 
                  onClick={() => { onQuickViewClients?.(); setIsFabOpen(false); }}
                  className="w-14 h-14 bg-white text-indigo-600 rounded-2xl shadow-2xl flex items-center justify-center hover:bg-indigo-50 transition-all border border-slate-100"
                >
                  <Users size={24} />
                </button>
              </div>
              <div className="flex items-center gap-3 group">
                <span className="bg-indigo-900 text-white text-[10px] font-black px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest shadow-xl">Properties</span>
                <button 
                  onClick={() => { onQuickViewProperties?.(); setIsFabOpen(false); }}
                  className="w-14 h-14 bg-white text-indigo-600 rounded-2xl shadow-2xl flex items-center justify-center hover:bg-indigo-50 transition-all border border-slate-100"
                >
                  <Home size={24} />
                </button>
              </div>
            </div>
          )}
          <button 
            onClick={() => setIsFabOpen(!isFabOpen)}
            className={`w-18 h-18 rounded-[2rem] flex items-center justify-center text-white shadow-2xl transition-all duration-500 transform ${isFabOpen ? 'bg-rose-500 rotate-45 scale-90' : 'bg-indigo-600 hover:scale-110 hover:shadow-indigo-500/40'}`}
          >
            <Plus size={36} className="font-bold" />
          </button>
        </div>
      </div>
    </div>
  );
};
