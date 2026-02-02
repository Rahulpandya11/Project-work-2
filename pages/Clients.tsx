
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Users as UsersIcon, Search, Filter, Plus, Mail, Phone, MessageSquare, 
  MoreVertical, Calendar, Tag, X, MapPin, Briefcase, Heart, 
  Target, TrendingUp, Sparkles, Zap, Star, Trash2, CheckCircle2,
  ChevronRight, Building, User as UserIcon, Home, Layers
} from 'lucide-react';
import { Client, LeadStage, TransactionType, FurnishingStatus } from '../types';

interface ClientsPageProps {
  clients: Client[];
  onAdd: (client: Client) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onAutoMatch?: (client: Client) => void;
  triggerModal?: number;
}

export const ClientsPage: React.FC<ClientsPageProps> = ({ clients, onAdd, onDelete, onToggleFavorite, onAutoMatch, triggerModal }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStage, setSelectedStage] = useState<LeadStage | 'All'>('All');

  useEffect(() => {
    if (triggerModal && triggerModal > 0) {
      setShowAddModal(true);
    }
  }, [triggerModal]);

  const filtered = useMemo(() => {
    return [...clients]
      .sort((a, b) => (a.isFavorite === b.isFavorite) ? 0 : a.isFavorite ? -1 : 1)
      .filter(c => {
        const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.phone.includes(searchQuery);
        const matchesStage = selectedStage === 'All' || c.leadStage === selectedStage;
        return matchesSearch && matchesStage;
      });
  }, [clients, searchQuery, selectedStage]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Client Hub</h1>
          <p className="text-slate-500 text-sm font-medium">Manage leads and their requirements pipeline.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all"
        >
          <Plus size={20} /> Add Client
        </button>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-50/30">
          <div className="relative flex-1">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, phone, or email..." 
              className="w-full pl-14 pr-6 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-black text-black focus:ring-4 focus:ring-indigo-500/10 outline-none"
            />
          </div>
          <select 
            className="px-6 py-4 bg-white border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest cursor-pointer text-black"
            onChange={(e) => setSelectedStage(e.target.value as any)}
          >
            <option value="All">All Lead Stages</option>
            {Object.values(LeadStage).map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Lead Profile</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Favorite</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Lead Stage</th>
                <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((client) => (
                <tr key={client.id} className="hover:bg-slate-50 transition-all group">
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-black text-xl shadow-sm">
                        {client.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-black text-black">{client.name}</p>
                        <p className="text-[10px] text-slate-900 font-bold mt-1 line-clamp-1 max-w-xs tracking-tight italic">"{client.description}"</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8 text-center">
                    <button 
                      onClick={() => onToggleFavorite(client.id)}
                      className="p-3 rounded-xl hover:bg-white hover:shadow-sm transition-all"
                    >
                      <Star size={20} className={client.isFavorite ? 'text-amber-400 fill-amber-400' : 'text-slate-300'} />
                    </button>
                  </td>
                  <td className="px-10 py-8">
                    <span className="px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-600">
                      {client.leadStage}
                    </span>
                  </td>
                  <td className="px-10 py-8 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button 
                        onClick={() => setSelectedClient(client)}
                        className="px-6 py-2.5 bg-indigo-50 text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all"
                      >
                        Profile
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); if(confirm("Delete this lead permanently?")) onDelete(client.id); }}
                        className="p-3 text-slate-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && <AddClientModal onClose={() => setShowAddModal(false)} onAdd={onAdd} />}
      {selectedClient && (
        <ClientProfileModal 
          client={selectedClient} 
          onClose={() => setSelectedClient(null)} 
          onAutoMatch={onAutoMatch} 
          onToggleFavorite={onToggleFavorite}
        />
      )}
    </div>
  );
};

const ClientProfileModal: React.FC<{ client: Client; onClose: () => void; onAutoMatch?: (c: Client) => void; onToggleFavorite: (id: string) => void }> = ({ client, onClose, onAutoMatch, onToggleFavorite }) => {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-[#f8fafc] w-full max-w-6xl rounded-[3.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 flex flex-col max-h-[95vh]">
        <div className="bg-indigo-950 p-12 text-white flex items-center justify-between relative overflow-hidden">
          <div className="relative z-10 flex items-center gap-10">
            <div className="w-28 h-28 rounded-[2.5rem] bg-indigo-500 flex items-center justify-center text-4xl font-black shadow-2xl border-4 border-indigo-400/50">
              {client.name[0]}
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <h2 className="text-5xl font-black tracking-tight">{client.name}</h2>
                <button 
                  onClick={() => onToggleFavorite(client.id)}
                  className="p-3 bg-white/10 rounded-2xl hover:bg-white/20 transition-all border border-white/10"
                >
                  <Star size={24} className={client.isFavorite ? 'fill-amber-400 text-amber-400' : ''} />
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-1.5 bg-emerald-500/20 text-emerald-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">{client.leadStage}</span>
                <span className="px-4 py-1.5 bg-indigo-500/20 text-indigo-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-500/20">{client.requirement} Requirement</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl text-white transition-all z-20">
            <X size={32} />
          </button>
          <Sparkles className="absolute -right-20 -bottom-20 w-80 h-80 text-white/5 opacity-50" />
        </div>

        <div className="flex-1 overflow-y-auto p-12 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-10">
              <section className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                <div>
                   <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-4">Core Preferences</h4>
                   <div className="grid grid-cols-2 gap-y-8 gap-x-12">
                      <DetailItem icon={<Building size={18}/>} label="Requirement" value={client.requirement} />
                      <DetailItem icon={<TrendingUp size={18}/>} label="Budget Range" value={`₹${client.budgetMin.toLocaleString()} - ₹${client.budgetMax.toLocaleString()}`} />
                      <DetailItem icon={<MapPin size={18}/>} label="Areas" value={client.preferredAreas.join(', ')} />
                      <DetailItem icon={<Briefcase size={18}/>} label="Profession" value={client.profession || 'Not Specified'} />
                   </div>
                </div>

                <div className="pt-8 border-t border-slate-50">
                   <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-4">Detailed Specifications</h4>
                   <div className="grid grid-cols-2 gap-y-8 gap-x-12">
                      <DetailItem icon={<Home size={18}/>} label="BHK Preference" value={client.bhkPreference.join('/')} />
                      <DetailItem icon={<Layers size={18}/>} label="Furnishing" value={client.furnishingPreference.join('/')} />
                      <DetailItem icon={<UsersIcon size={18}/>} label="Family Size" value={`${client.familySize} Members`} />
                      <DetailItem icon={<Calendar size={18}/>} label="Move-In Target" value={client.moveInDate} />
                   </div>
                </div>

                <div className="pt-8 border-t border-slate-50 space-y-4">
                   <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Requirement Narrative</h4>
                   <p className="text-black text-lg font-bold leading-relaxed italic">"{client.description}"</p>
                </div>
              </section>
            </div>

            <aside className="lg:col-span-4 space-y-8">
               <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-indigo-200">
                  <h4 className="text-[10px] font-black text-indigo-200 uppercase tracking-widest mb-4">Quick Actions</h4>
                  <div className="space-y-3">
                     <button 
                        onClick={() => onAutoMatch?.(client)}
                        className="w-full flex items-center justify-center gap-3 p-5 bg-white text-indigo-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all shadow-lg"
                     >
                        <Zap size={18} /> Auto-Match Properties
                     </button>
                     <button className="w-full p-5 bg-indigo-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-400 transition-all">
                        Schedule Site Visit
                     </button>
                  </div>
               </div>

               <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Meta Information</h4>
                  <div className="space-y-4">
                     <div>
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Lead Tags</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                           {client.tags.map(t => <span key={t} className="px-3 py-1 bg-slate-100 text-slate-900 rounded-lg text-[10px] font-black">{t}</span>)}
                        </div>
                     </div>
                  </div>
               </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ icon, label, value }: { icon: any, label: string, value: string }) => (
  <div className="flex items-start gap-4">
    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-indigo-500 shrink-0 border border-slate-50">
      {icon}
    </div>
    <div>
      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
      <p className="text-sm font-black text-black mt-1">{value}</p>
    </div>
  </div>
);

const AddClientModal: React.FC<{ onClose: () => void; onAdd: (c: Client) => void }> = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState<Partial<Client>>({
    name: '',
    phone: '',
    email: '',
    description: '',
    profession: '',
    maritalStatus: 'Bachelor',
    familySize: 1,
    requirement: TransactionType.RENT,
    preferredAreas: [],
    preferredCity: 'Mumbai',
    bhkPreference: [],
    furnishingPreference: [],
    budgetMin: 0,
    budgetMax: 0,
    moveInDate: new Date().toISOString().split('T')[0],
    leadStage: LeadStage.NEW,
    tags: [],
    isFavorite: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newClient: Client = {
      ...(formData as Client),
      id: `c${Date.now()}`,
      tenantId: 'workspace-user',
      createdAt: new Date().toISOString(),
    };
    onAdd(newClient);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 border border-white/20">
        <div className="px-10 py-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-2xl font-black text-slate-900">Add New Lead</h2>
            <p className="text-sm text-slate-500 font-medium">Record a new client requirement in your workspace.</p>
          </div>
          <button onClick={onClose} className="p-4 hover:bg-slate-200 rounded-2xl transition-colors text-slate-400">
            <X size={28} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-10 space-y-10 max-h-[75vh] overflow-y-auto scrollbar-hide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <section className="space-y-4">
                 <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest border-b border-indigo-50 pb-2">Client Identity</h4>
                 <input required className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-black text-black" placeholder="Full Name" onChange={e => setFormData({...formData, name: e.target.value})} />
                 <div className="grid grid-cols-2 gap-4">
                   <input required className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-black text-black" placeholder="Phone Number" onChange={e => setFormData({...formData, phone: e.target.value})} />
                   <input className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-black text-black" placeholder="Email (Optional)" onChange={e => setFormData({...formData, email: e.target.value})} />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                   <input className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-black text-black" placeholder="Profession" onChange={e => setFormData({...formData, profession: e.target.value})} />
                   <select className="px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-black text-black" onChange={e => setFormData({...formData, maritalStatus: e.target.value as any})}>
                      <option value="Bachelor">Bachelor</option>
                      <option value="Married">Married</option>
                   </select>
                 </div>
              </section>

              <section className="space-y-4">
                 <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest border-b border-indigo-50 pb-2">Narrative</h4>
                 <textarea required className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-black text-black min-h-[150px]" placeholder="Briefly describe the client's search goals and vibe..." onChange={e => setFormData({...formData, description: e.target.value})} />
              </section>
            </div>

            <div className="space-y-8">
              <section className="space-y-4">
                 <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest border-b border-indigo-50 pb-2">Housing Requirements</h4>
                 <div className="grid grid-cols-2 gap-4">
                    <select className="px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-black text-black" onChange={e => setFormData({...formData, requirement: e.target.value as any})}>
                       <option value={TransactionType.RENT}>Looking for Rent</option>
                       <option value={TransactionType.SALE}>Looking for Sale</option>
                    </select>
                    <input type="number" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-black text-black" placeholder="Family Size" onChange={e => setFormData({...formData, familySize: Number(e.target.value)})} />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <input required type="number" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-black text-black" placeholder="Budget Min (₹)" onChange={e => setFormData({...formData, budgetMin: Number(e.target.value)})} />
                    <input required type="number" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-black text-black" placeholder="Budget Max (₹)" onChange={e => setFormData({...formData, budgetMax: Number(e.target.value)})} />
                 </div>
                 <input required className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-black text-black" placeholder="Preferred Areas (Comma separated)" onChange={e => setFormData({...formData, preferredAreas: e.target.value.split(',').map(s => s.trim())})} />
                 <div className="grid grid-cols-2 gap-4">
                    <input required className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-black text-black" placeholder="Preferred BHKs (1BHK, 2BHK...)" onChange={e => setFormData({...formData, bhkPreference: e.target.value.split(',').map(s => s.trim())})} />
                    <input type="date" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-black text-black" onChange={e => setFormData({...formData, moveInDate: e.target.value})} />
                 </div>
              </section>

              <section className="space-y-4">
                 <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest border-b border-indigo-50 pb-2">Status & Tags</h4>
                 <select className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-black text-black" onChange={e => setFormData({...formData, leadStage: e.target.value as any})}>
                   {Object.values(LeadStage).map(s => <option key={s} value={s}>{s} Stage</option>)}
                 </select>
                 <input className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-black text-black" placeholder="Internal Tags (e.g. VIP, Urgent, Investor)" onChange={e => setFormData({...formData, tags: e.target.value.split(',').map(s => s.trim())})} />
              </section>
            </div>
          </div>
          
          <div className="flex gap-4 pt-6">
            <button type="button" onClick={onClose} className="flex-1 py-5 bg-slate-100 text-slate-600 rounded-[1.5rem] font-black uppercase tracking-widest text-xs">Cancel</button>
            <button type="submit" className="flex-[2] py-5 bg-indigo-600 text-white rounded-[1.5rem] font-black uppercase tracking-widest text-xs shadow-2xl shadow-indigo-200">Register Client</button>
          </div>
        </form>
      </div>
    </div>
  );
};
