
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, Cell, PieChart, Pie, AreaChart, Area
} from 'recharts';
import { Download, Share2, TrendingUp, DollarSign, Home, Users, BarChart3, UserCheck, UserX, Clock } from 'lucide-react';
import { Property, Client, PropertyStatus, Reminder, ReminderStatus } from '../types';

interface ReportsPageProps {
  properties: Property[];
  clients: Client[];
  reminders: Reminder[];
}

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export const ReportsPage: React.FC<ReportsPageProps> = ({ properties, clients, reminders }) => {
  const inventoryData = [
    { name: 'Available', value: properties.filter(p => p.status === PropertyStatus.AVAILABLE).length },
    { name: 'Rented', value: properties.filter(p => p.status === PropertyStatus.RENTED).length },
    { name: 'Sold', value: properties.filter(p => p.status === PropertyStatus.SOLD).length },
  ].filter(d => d.value > 0);

  const completedReminders = reminders.filter(r => r.status === ReminderStatus.COMPLETED);
  const clientPresence = completedReminders.filter(r => r.clientPresent).length;
  const clientAbsence = completedReminders.filter(r => r.clientPresent === false).length;
  
  const ownerPresence = completedReminders.filter(r => r.ownerPresent).length;
  const ownerAbsence = completedReminders.filter(r => r.ownerPresent === false).length;

  const attendanceData = [
    { name: 'Present', client: clientPresence, owner: ownerPresence },
    { name: 'No-Show', client: clientAbsence, owner: ownerAbsence },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Intelligence Reports</h1>
          <p className="text-slate-500 font-medium">Detailed tracking of your agency's productivity and outcomes.</p>
        </div>
        <div className="flex gap-4">
           <button className="flex items-center gap-2 px-6 py-3.5 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all">
             <Download size={18} /> Export Full Report
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ReportSummaryCard icon={<Users/>} label="Total Clients" value={clients.length.toString()} sub="CRM Database" color="bg-indigo-50 text-indigo-600" />
        <ReportSummaryCard icon={<BarChart3/>} label="Meetings Done" value={completedReminders.length.toString()} sub="Last 30 Days" color="bg-emerald-50 text-emerald-600" />
        <ReportSummaryCard icon={<UserX/>} label="No-Show Rate" value={`${Math.round((clientAbsence / (completedReminders.length || 1)) * 100)}%`} sub="Client Side" color="bg-rose-50 text-rose-600" />
        <ReportSummaryCard icon={<Clock/>} label="Avg Reschedule" value={reminders.reduce((acc, r) => acc + (r.rescheduleCount || 0), 0)} sub="Total Adjustments" color="bg-amber-50 text-amber-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
          <div className="mb-8">
            <h3 className="text-xl font-black text-slate-900">Meeting Attendance</h3>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1">Client vs Owner presence summary</p>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="6 6" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 900}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 900}} />
                <Tooltip cursor={{fill: '#f8fafc'}} />
                <Legend />
                <Bar dataKey="client" name="Client Presence" fill="#6366f1" radius={[8, 8, 0, 0]} />
                <Bar dataKey="owner" name="Owner Presence" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm flex flex-col">
          <div className="mb-8">
            <h3 className="text-xl font-black text-slate-900">Inventory Distribution</h3>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1">Listing health overview</p>
          </div>
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
  </div>
);
