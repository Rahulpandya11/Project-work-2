
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
  ArrowRight
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
import { Property, Client, PropertyStatus } from '../types';

interface DashboardProps {
  properties: Property[];
  clients: Client[];
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

export const Dashboard: React.FC<DashboardProps> = ({ properties, clients }) => {
  const availableCount = properties.filter(p => p.status === PropertyStatus.AVAILABLE).length;
  const soldCount = properties.filter(p => p.status === PropertyStatus.SOLD).length;
  const rentedCount = properties.filter(p => p.status === PropertyStatus.RENTED).length;

  const pieData = [
    { name: 'Available', value: availableCount },
    { name: 'Sold', value: soldCount },
    { name: 'Rented', value: rentedCount },
  ].filter(d => d.value > 0);

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

      {/* Quick Start Section - HIGH VISIBILITY */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-indigo-600 rounded-[2.5rem] p-10 text-white relative overflow-hidden group shadow-2xl shadow-indigo-200">
           <div className="relative z-10 space-y-6">
             <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                <Home size={28} className="text-white" />
             </div>
             <div>
               <h3 className="text-2xl font-bold">Register New Property</h3>
               <p className="text-indigo-100 mt-2 text-sm leading-relaxed max-w-xs">Start building your private inventory. Add flats, villas, or commercial spaces to your tenant-isolated database.</p>
             </div>
             <button className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] bg-white text-indigo-600 px-6 py-3.5 rounded-xl hover:bg-indigo-50 transition-all transform group-hover:translate-x-2">
                Launch Wizard <ArrowRight size={16} />
             </button>
           </div>
           <Home className="absolute -right-10 -bottom-10 w-64 h-64 text-white/5 transform rotate-12" />
        </div>

        <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden group shadow-2xl shadow-slate-200">
           <div className="relative z-10 space-y-6">
             <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center">
                <Users size={28} className="text-white" />
             </div>
             <div>
               <h3 className="text-2xl font-bold">Onboard New Client</h3>
               <p className="text-slate-400 mt-2 text-sm leading-relaxed max-w-xs">Track leads, record requirements, and manage your pipeline without any data leaks.</p>
             </div>
             <button className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] bg-indigo-600 text-white px-6 py-3.5 rounded-xl hover:bg-indigo-500 transition-all transform group-hover:translate-x-2">
                Open CRM <ArrowRight size={16} />
             </button>
           </div>
           <Users className="absolute -right-10 -bottom-10 w-64 h-64 text-white/5 transform -rotate-12" />
        </div>
      </section>

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
          title="Trial Balance" 
          value="∞" 
          change="Full Access" 
          isPositive={true} 
          icon={<Sparkles className="text-amber-600" />} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Activity Overview</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Workspace performance over 7 days</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-indigo-500 rounded-full"></span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Leads Flow</span>
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
      </div>
    </div>
  );
};

const StatCard: React.FC<{ title: string; value: string; change: string; isPositive: boolean; icon: React.ReactNode }> = ({ title, value, change, isPositive, icon }) => (
  <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all group">
    <div className="flex items-start justify-between">
      <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:scale-110 transition-transform">
        {/* Fix: use React.isValidElement and cast to ReactElement with any props to safely clone and inject 'size' prop */}
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
