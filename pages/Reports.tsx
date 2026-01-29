
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, Cell, PieChart, Pie, AreaChart, Area
} from 'recharts';
import { Download, Share2, TrendingUp, DollarSign, Home, Users, BarChart3 } from 'lucide-react';
import { Property, Client, PropertyStatus } from '../types';

interface ReportsPageProps {
  properties: Property[];
  clients: Client[];
}

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const revenueData = [
  { month: 'Jan', revenue: 450000, commission: 90000 },
  { month: 'Feb', revenue: 520000, commission: 104000 },
  { month: 'Mar', revenue: 480000, commission: 96000 },
  { month: 'Apr', revenue: 610000, commission: 122000 },
  { month: 'May', revenue: 590000, commission: 118000 },
  { month: 'Jun', revenue: 750000, commission: 150000 },
];

export const ReportsPage: React.FC<ReportsPageProps> = ({ properties, clients }) => {
  const inventoryData = [
    { name: 'Available', value: properties.filter(p => p.status === PropertyStatus.AVAILABLE).length },
    { name: 'Rented', value: properties.filter(p => p.status === PropertyStatus.RENTED).length },
    { name: 'Sold', value: properties.filter(p => p.status === PropertyStatus.SOLD).length },
  ].filter(d => d.value > 0);

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Executive Analytics</h1>
          <p className="text-slate-500 font-medium">Data-driven insights for your private agency performance.</p>
        </div>
        <div className="flex gap-4">
           <button className="flex items-center gap-2 px-6 py-3.5 border-2 border-slate-100 bg-white text-slate-600 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all">
             <Share2 size={18} /> Share Workspace
           </button>
           <button className="flex items-center gap-2 px-6 py-3.5 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all">
             <Download size={18} /> Generate PDF
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ReportSummaryCard icon={<DollarSign/>} label="Estimated Revenue" value="₹4.2M" sub="This Quarter" color="bg-indigo-50 text-indigo-600" />
        <ReportSummaryCard icon={<TrendingUp/>} label="Conv. Rate" value="18.4%" sub="+2.1% growth" color="bg-emerald-50 text-emerald-600" />
        <ReportSummaryCard icon={<Home/>} label="Total Units" value={properties.length.toString()} sub="Private Inventory" color="bg-amber-50 text-amber-600" />
        <ReportSummaryCard icon={<Users/>} label="Active Leads" value={clients.length.toString()} sub="Private CRM" color="bg-rose-50 text-rose-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-xl font-black text-slate-900">Revenue Stream</h3>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1">Growth vs Commission</p>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="6 6" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 900}} dy={15} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 900}} dx={-10} />
                <Tooltip contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)'}} />
                <Area type="monotone" dataKey="revenue" stroke="#6366f1" fillOpacity={1} fill="url(#colorRev)" strokeWidth={4} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col">
          <h3 className="text-xl font-black text-slate-900">Inventory Health</h3>
          <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1 mb-10">Current listing status distribution</p>
          <div className="h-72 w-full mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={inventoryData} cx="50%" cy="50%" innerRadius={80} outerRadius={110} paddingAngle={8} dataKey="value" stroke="none">
                  {inventoryData.map((_, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-auto">
             {inventoryData.map((item, i) => (
               <div key={item.name} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full" style={{backgroundColor: COLORS[i]}}></div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.name}</span>
                  </div>
                  <p className="text-xl font-black text-slate-900">{item.value}</p>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ReportSummaryCard = ({ icon, label, value, sub, color }: any) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
    <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
      {React.cloneElement(icon, { size: 28 })}
    </div>
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{label}</p>
    <h3 className="text-3xl font-black text-slate-900 mt-2 tracking-tight">{value}</h3>
    <p className="text-xs font-bold text-slate-400 mt-1">{sub}</p>
    <div className={`absolute top-0 right-0 w-24 h-24 ${color.split(' ')[0]} rounded-full -mr-12 -mt-12 opacity-10 group-hover:scale-150 transition-transform duration-700`}></div>
  </div>
);
