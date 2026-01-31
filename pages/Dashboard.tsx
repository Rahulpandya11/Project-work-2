
import React from 'react';
import { 
  Users, 
  Home, 
  TrendingUp, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  PlusCircle,
  Zap,
  Sparkles,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Property, Client, PropertyStatus, Reminder } from '../types';

interface DashboardProps {
  properties: Property[];
  clients: Client[];
  reminders?: Reminder[];
  onToggleReminder?: (id: string) => void;
}

const data = [
  { name: 'Mon', leads: 4, revenue: 2400 },
  { name: 'Tue', leads: 3, revenue: 1398 },
  { name: 'Wed', leads: 6, revenue: 9800 },
  { name: 'Thu', leads: 2, revenue: 3908 },
  { name: 'Fri', leads: 8, revenue: 4800 },
  { name: 'Sat', leads: 5, revenue: 3800 },
  { name: 'Sun', leads: 7, revenue: 4300 },
];

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444'];

export const Dashboard: React.FC<DashboardProps> = ({ properties, clients, reminders = [], onToggleReminder }) => {
  const availableCount = properties.filter(p => p.status === PropertyStatus.AVAILABLE).length;
  const soldCount = properties.filter(p => p.status === PropertyStatus.SOLD).length;
  const rentedCount = properties.filter(p => p.status === PropertyStatus.RENTED).length;

  const pieData = [
    { name: 'Available', value: availableCount },
    { name: 'Sold', value: soldCount },
    { name: 'Rented', value: rentedCount },
  ].filter(d => d.value > 0);

  const upcomingReminders = reminders
    .filter(r => !r.isCompleted)
    .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime())
    .slice(0, 3);

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Welcome, Agent Malhotra!</h1>
          <p className="text-slate-500 font-medium">Here's what's happening in your private trial workspace today.</p>
        </div>
        <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-2xl border border-slate-100 shadow-sm">
          <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-black text-slate-600 uppercase tracking-widest">Real-time sync active</span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Active Listings" 
          value={properties.length.toString()} 
          change="+2 new" 
          isPositive={true} 
          icon={<Home className="text-indigo-600" />} 
        />
        <StatCard 
          title="Lead Volume" 
          value={clients.length.toString()} 
          change="+5 new" 
          isPositive={true} 
          icon={<Users className="text-emerald-600" />} 
        />
        <StatCard 
          title="Smart Matches" 
          value="42" 
          change="+12%" 
          isPositive={true} 
          icon={<Zap className="text-rose-600" />} 
        />
        <StatCard 
          title="Upcoming Tasks" 
          value={reminders.filter(r => !r.isCompleted).length.toString()} 
          change="Urgent" 
          isPositive={true} 
          icon={<Calendar className="text-amber-600" />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activity Chart */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Activity Overview</h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Workspace performance over 7 days</p>
              </div>
            </div>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="8 8" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} dy={15} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} dx={-10} />
                  <Tooltip 
                    contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)', padding: '16px'}}
                  />
                  <Area type="monotone" dataKey="leads" stroke="#6366f1" fillOpacity={1} fill="url(#colorLeads)" strokeWidth={4} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Daily Schedule Widget */}
          <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Daily Schedule</h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Don't miss out on important meetings</p>
              </div>
              <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">View Full Calendar</button>
            </div>
            <div className="space-y-4">
              {upcomingReminders.length > 0 ? (
                upcomingReminders.map(rem => (
                  <div key={rem.id} className="flex items-center gap-6 p-6 bg-slate-50 rounded-[1.5rem] border border-slate-100 group hover:bg-white hover:shadow-xl hover:shadow-indigo-500/5 transition-all">
                    <div className="w-16 h-16 rounded-2xl bg-white flex flex-col items-center justify-center border border-slate-100 shadow-sm shrink-0">
                      <span className="text-[10px] font-black text-slate-400 uppercase">{new Date(rem.time).toLocaleDateString(undefined, { month: 'short' })}</span>
                      <span className="text-xl font-black text-slate-900 leading-none">{new Date(rem.time).getDate()}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 bg-indigo-100 text-indigo-600 rounded text-[8px] font-black uppercase tracking-widest">{rem.type}</span>
                        <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                          <Clock size={10}/> {new Date(rem.time).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 truncate">{rem.title}</h4>
                      <p className="text-xs text-slate-500 line-clamp-1">{rem.description}</p>
                    </div>
                    <button 
                      onClick={() => onToggleReminder?.(rem.id)}
                      className="w-12 h-12 rounded-xl border-2 border-slate-100 flex items-center justify-center text-slate-300 hover:border-emerald-500 hover:text-emerald-500 hover:bg-emerald-50 transition-all"
                    >
                      <CheckCircle2 size={24} />
                    </button>
                  </div>
                ))
              ) : (
                <div className="py-10 text-center text-slate-400">
                  <p className="text-sm font-medium">No pressing tasks for today!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Analytics */}
        <div className="space-y-8">
          <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col">
            <h3 className="text-xl font-black text-slate-900 tracking-tight mb-2">Inventory Mix</h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-8">Current listing status</p>
            <div className="h-64 w-full relative mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={8}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-4xl font-black text-slate-900">{properties.length}</span>
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Total Units</span>
              </div>
            </div>
            <div className="space-y-4 mt-auto">
              {pieData.map((item, i) => (
                <div key={item.name} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-slate-100 transition-colors cursor-default">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{backgroundColor: COLORS[i]}}></div>
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">{item.name}</span>
                  </div>
                  <span className="text-sm font-black text-slate-900">{item.value} units</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group shadow-2xl">
             <div className="relative z-10 space-y-4 text-center">
                <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto">
                   <Sparkles size={28} className="text-amber-400" />
                </div>
                <h3 className="text-lg font-bold">Premium Boost</h3>
                <p className="text-slate-400 text-xs leading-relaxed">Unlock advanced SMS reminders and AI-powered follow-up drafts.</p>
                <button className="w-full py-3 bg-white text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-50 transition-all">Explore Features</button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ title: string; value: string; change: string; isPositive: boolean; icon: React.ReactNode }> = ({ title, value, change, isPositive, icon }) => (
  <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all group">
    <div className="flex items-start justify-between">
      <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:scale-110 transition-transform">
        {React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<any>, { size: 24 }) : icon}
      </div>
      <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
        {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {change}
      </div>
    </div>
    <div className="mt-8">
      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{title}</h4>
      <p className="text-3xl font-black text-slate-900 mt-2 tracking-tight">{value}</p>
    </div>
  </div>
);
