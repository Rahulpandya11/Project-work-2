
import React, { useState, useRef, useEffect } from 'react';
import { 
  LayoutDashboard, Home, Users, Zap, BarChart3, Settings, 
  LogOut, Bell, Search, Menu, X, Plus, Sparkles, PlusCircle,
  FileText, Briefcase, Calendar, CheckCircle2, Clock, ShieldCheck
} from 'lucide-react';
import { Reminder } from '../types';

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
  reminders?: Reminder[];
  onToggleReminder?: (id: string) => void;
  userEmail?: string;
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
  onGoHome,
  reminders = [],
  onToggleReminder,
  userEmail = 'agent@propmate.ai'
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isFabOpen, setIsFabOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  const activeReminders = reminders.filter(r => !r.isCompleted);
  const dueReminders = activeReminders.filter(r => new Date(r.time) <= new Date());

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'properties', label: 'Properties', icon: <Home size={20} /> },
    { id: 'clients', label: 'Clients & Leads', icon: <Users size={20} /> },
    { id: 'reminders', label: 'Reminders', icon: <Calendar size={20} /> },
    { id: 'matching', label: 'Smart Matching', icon: <Zap size={20} /> },
    { id: 'reports', label: 'Reports', icon: <BarChart3 size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fabItems = [
    { id: 'settings', label: 'Settings', icon: <Settings size={18} />, action: onQuickOpenSettings },
    { id: 'reports', label: 'Reports', icon: <BarChart3 size={18} />, action: onQuickOpenReports },
    { id: 'matching', label: 'Matching', icon: <Zap size={18} />, action: () => setActiveTab('matching') },
    { id: 'reminders', label: 'Reminders', icon: <Calendar size={18} />, action: () => setActiveTab('reminders') },
    { id: 'clients', label: 'Clients', icon: <Users size={18} />, action: onQuickViewClients },
    { id: 'properties', label: 'Properties', icon: <Home size={18} />, action: onQuickViewProperties },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 text-slate-900 font-sans">
      <aside className={`${isSidebarOpen ? 'w-72' : 'w-24'} transition-all duration-500 bg-indigo-950 text-white hidden lg:flex flex-col border-r border-indigo-900/50 shadow-2xl z-40`}>
        <div className="p-8 flex items-center gap-3">
          <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-500/20 transform rotate-3">
            <span className="text-white font-black text-2xl">P</span>
          </div>
          {isSidebarOpen && (
            <div className="animate-in fade-in slide-in-from-left duration-500">
              <span className="text-2xl font-black tracking-tight block">PropMate</span>
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Isolated Workspace</span>
            </div>
          )}
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
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
          <div className={`mb-4 px-4 py-3 bg-white/5 rounded-2xl border border-white/5 ${!isSidebarOpen && 'hidden'}`}>
             <div className="flex items-center gap-2 mb-1">
                <ShieldCheck size={12} className="text-indigo-400" />
                <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Private Data Space</span>
             </div>
             <p className="text-[10px] font-bold text-indigo-200 truncate">{userEmail}</p>
          </div>
          <button onClick={onLogout} className="w-full flex items-center gap-4 px-5 py-4 text-indigo-400 hover:text-rose-400 transition-all rounded-2xl font-bold text-sm hover:bg-rose-500/5 group">
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            {isSidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <header className="h-24 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-10 sticky top-0 z-30">
          <div className="flex items-center gap-8 flex-1">
             <div className="relative max-w-lg w-full group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Search workspace..." 
                className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-transparent rounded-[1.5rem] text-sm text-black focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 focus:outline-none transition-all font-medium" 
              />
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

            <div className="relative" ref={notificationRef}>
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all relative group ${isNotificationsOpen ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400 hover:bg-slate-50 hover:text-indigo-600'}`}
              >
                <Bell size={24} />
                {dueReminders.length > 0 && (
                  <span className="absolute top-3 right-3 w-3 h-3 bg-rose-500 rounded-full border-[3px] border-white animate-bounce"></span>
                )}
              </button>

              {isNotificationsOpen && (
                <div className="absolute right-0 mt-4 w-96 bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden animate-in slide-in-from-top-2 duration-200 z-[100]">
                  <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Notifications</h3>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-lg text-[10px] font-black">{activeReminders.length} Pending</span>
                  </div>
                  <div className="max-h-[400px] overflow-y-auto">
                    {activeReminders.length > 0 ? (
                      activeReminders.map(rem => (
                        <div key={rem.id} className="p-5 border-b border-slate-50 flex items-start gap-4 hover:bg-slate-50 transition-all">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-slate-100 text-slate-400`}>
                             <Clock size={18} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-slate-900 truncate">{rem.title}</p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">
                              {new Date(rem.time).toLocaleString()}
                            </p>
                          </div>
                          <button onClick={() => onToggleReminder?.(rem.id)} className="p-2 text-slate-300 hover:text-emerald-500 transition-colors">
                            <CheckCircle2 size={20} />
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="py-12 text-center text-slate-400">
                        <Sparkles size={32} className="mx-auto mb-3 opacity-20" />
                        <p className="text-xs font-bold">No notifications</p>
                      </div>
                    )}
                  </div>
                  <button onClick={() => { setActiveTab('reminders'); setIsNotificationsOpen(false); }} className="w-full p-4 text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:bg-indigo-50 transition-all bg-slate-50/50">
                    View Schedule
                  </button>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-5 pl-8 border-l border-slate-100">
               <div className="text-right hidden sm:block">
                <p className="text-sm font-black text-slate-900">Workspace User</p>
                <div className="flex items-center gap-1 justify-end">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Session</span>
                </div>
              </div>
              <div className="w-14 h-14 rounded-[1.25rem] bg-indigo-50 border-4 border-white shadow-xl overflow-hidden transform hover:rotate-3 transition-transform cursor-pointer">
                <img src={`https://picsum.photos/seed/${userEmail}/100`} className="w-full h-full object-cover" alt="Profile" />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-10 bg-[#f8fafc]/50 relative scroll-smooth">
          {children}
        </main>

        <div className="fixed bottom-10 right-10 z-[100] flex flex-col items-end gap-4">
          {isFabOpen && (
            <div className="flex flex-col gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300 mb-2">
              {fabItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 group">
                  <span className="bg-indigo-900 text-white text-[10px] font-black px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest shadow-xl whitespace-nowrap">{item.label}</span>
                  <button 
                    onClick={() => { item.action?.(); setIsFabOpen(false); }}
                    className="w-14 h-14 bg-white text-indigo-600 rounded-2xl shadow-2xl flex items-center justify-center hover:bg-indigo-50 transition-all border border-slate-100"
                  >
                    {item.icon}
                  </button>
                </div>
              ))}
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
