
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Users, Search, Filter, Plus, Mail, Phone, MessageSquare, 
  MoreVertical, Calendar, Tag, X, MapPin, Briefcase, Heart, 
  Target, TrendingUp, Sparkles, Zap
} from 'lucide-react';
import { Client, LeadStage, TransactionType, FurnishingStatus } from '../types';

interface ClientsPageProps {
  clients: Client[];
  onAdd: (client: Client) => void;
  onAutoMatch?: (client: Client) => void;
  triggerModal?: number;
}

export const ClientsPage: React.FC<ClientsPageProps> = ({ clients, onAdd, onAutoMatch, triggerModal }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filters
  const [minBudget, setMinBudget] = useState<number>(0);
  const [maxBudget, setMaxBudget] = useState<number>(1000000000);
  const [selectedStage, setSelectedStage] = useState<LeadStage | 'All'>('All');

  useEffect(() => {
    if (triggerModal && triggerModal > 0) {
      setShowAddModal(true);
    }
  }, [triggerModal]);

  const filteredClients = useMemo(() => {
    return clients.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.phone.includes(searchQuery) ||
                          c.preferredAreas.some(a => a.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesBudget = c.budgetMax >= minBudget && c.budgetMax <= maxBudget;
      const matchesStage = selectedStage === 'All' || c.leadStage === selectedStage;
      return matchesSearch && matchesBudget && matchesStage;
    });
  }, [clients, searchQuery, minBudget, maxBudget, selectedStage]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Client CRM</h1>
          <p className="text-slate-500 text-sm">Managing your private leads pipeline.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all"
          >
            <Plus size={20} />
            <span>Add Client</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/30">
          <div className="relative flex-1 min-w-[250px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search leads..." 
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Max Budget (₹):</span>
              <input 
                type="number" 
                placeholder="Limit" 
                className="w-32 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold"
                onChange={(e) => setMaxBudget(Number(e.target.value) || 1000000000)}
              />
            </div>
            <select 
              className="px-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs font-black uppercase tracking-widest cursor-pointer"
              onChange={(e) => setSelectedStage(e.target.value as any)}
            >
              <option value="All">All Stages</option>
              {Object.values(LeadStage).map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Client Profile</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Target Location</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Lead Stage</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Budget Cap</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-slate-50/80 transition-all group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-black text-lg shadow-sm border border-white">
                        {client.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{client.name}</p>
                        <p className="text-[10px] text-slate-400 font-medium italic line-clamp-1">"{client.description}"</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-xs font-bold text-slate-700 mb-1">{client.preferredCity}</p>
                    <div className="flex flex-wrap gap-1">
                      {client.preferredAreas.map(area => (
                        <span key={area} className="text-[9px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1">
                          <MapPin size={10} /> {area}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                      client.leadStage === LeadStage.CLOSED ? 'bg-emerald-50 text-emerald-600' : 
                      client.leadStage === LeadStage.NEW ? 'bg-indigo-50 text-indigo-600' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {client.leadStage}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-sm font-black text-slate-900">₹{(client.budgetMax / 100000).toFixed(1)}L</span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button 
                      onClick={() => setSelectedClient(client)}
                      className="text-[10px] font-black text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-xl uppercase tracking-wider transition-all"
                    >
                      Open Profile
                    </button>
                  </td>
                </tr>
              ))}
              {filteredClients.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-24 text-center">
                    <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                      <Users className="text-slate-300" size={32} />
                    </div>
                    <p className="text-slate-500 font-bold">No matching leads found.</p>
                    <p className="text-slate-400 text-xs mt-1">Try refining your search or add a new client.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && <AddClientModal onClose={() => setShowAddModal(false)} onAdd={onAdd} />}
      {selectedClient && <ClientProfileModal client={selectedClient} onClose={() => setSelectedClient(null)} onAutoMatch={onAutoMatch} />}
    </div>
  );
};

const ClientProfileModal: React.FC<{ client: Client; onClose: () => void; onAutoMatch?: (c: Client) => void }> = ({ client, onClose, onAutoMatch }) => {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-[#f8fafc] w-full max-w-5xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 flex flex-col max-h-[95vh]">
        <div className="bg-indigo-950 p-10 text-white flex items-center justify-between relative overflow-hidden">
          <div className="relative z-10 flex items-center gap-8">
            <div className="w-24 h-24 rounded-3xl bg-indigo-500 flex items-center justify-center text-4xl font-black shadow-2xl border-4 border-indigo-400/50 transform -rotate-3">
              {client.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">Active Client</span>
                <span className="px-3 py-1 bg-emerald-500 text-white rounded-full text-[10px] font-black uppercase tracking-widest">{client.leadStage}</span>
              </div>
              <h2 className="text-4xl font-black tracking-tight">{client.name}</h2>
              <p className="text-indigo-300 text-sm mt-1 flex items-center gap-4">
                <span className="flex items-center gap-2"><Phone size={14}/> {client.phone}</span>
                <span className="flex items-center gap-2"><Mail size={14}/> {client.email}</span>
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl text-white transition-all z-20">
            <X size={28} />
          </button>
          <Sparkles className="absolute right-0 bottom-0 w-64 h-64 text-white/5 transform translate-x-1/4 translate-y-1/4" />
        </div>

        <div className="flex-1 overflow-y-auto p-12 space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm space-y-4">
                <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.25em] flex items-center gap-2">
                  <Target size={16}/> Requirement Overview
                </h4>
                <p className="text-slate-600 leading-relaxed font-medium italic">"{client.description}"</p>
                <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-50">
                   <DetailItem label="Requirement" value={client.requirement} />
                   <DetailItem label="Target City" value={client.preferredCity} />
                   <DetailItem label="BHK Choice" value={client.bhkPreference.join(', ')} />
                   <DetailItem label="Max Budget" value={`₹${client.budgetMax.toLocaleString()}`} />
                </div>
              </section>

              <section className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.25em]">Lead Pipeline History</h4>
                  <TrendingUp size={16} className="text-slate-400" />
                </div>
                <div className="flex items-center gap-4 relative">
                   <StageBubble active={client.leadStage === LeadStage.NEW} label="New" />
                   <div className="h-0.5 bg-slate-100 flex-1"></div>
                   <StageBubble active={client.leadStage === LeadStage.CONTACTED} label="Talk" />
                   <div className="h-0.5 bg-slate-100 flex-1"></div>
                   <StageBubble active={client.leadStage === LeadStage.SITE_VISIT} label="Visit" />
                   <div className="h-0.5 bg-slate-100 flex-1"></div>
                   <StageBubble active={client.leadStage === LeadStage.CLOSED} label="Deal" />
                </div>
              </section>
            </div>

            <aside className="space-y-6">
               <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm space-y-4">
                 <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.25em]">Preferred Areas</h4>
                 <div className="space-y-3">
                   {client.preferredAreas.map(area => (
                     <div key={area} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <span className="text-xs font-bold text-slate-700">{area}</span>
                        <MapPin size={14} className="text-indigo-500" />
                     </div>
                   ))}
                 </div>
               </div>

               <button 
                  onClick={() => onAutoMatch?.(client)}
                  className="w-full flex items-center justify-center gap-3 p-5 bg-indigo-600 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all"
               >
                  <Zap size={16} /> Auto-Match Properties
               </button>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ label, value }: { label: string, value: string }) => (
  <div>
    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
    <p className="text-sm font-bold text-slate-900 mt-1">{value}</p>
  </div>
);

const StageBubble = ({ active, label }: { active: boolean, label: string }) => (
  <div className="flex flex-col items-center gap-2">
    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-black shadow-lg transition-all ${active ? 'bg-indigo-600 text-white scale-110 ring-4 ring-indigo-100' : 'bg-slate-100 text-slate-400 border border-slate-200'}`}>
      {label[0]}
    </div>
    <span className={`text-[9px] font-black uppercase tracking-widest ${active ? 'text-indigo-600' : 'text-slate-400'}`}>{label}</span>
  </div>
);

const AddClientModal: React.FC<{ onClose: () => void; onAdd: (c: Client) => void }> = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState<Partial<Client>>({
    name: '',
    phone: '',
    description: '',
    requirement: TransactionType.RENT,
    budgetMin: 0,
    budgetMax: 0,
    leadStage: LeadStage.NEW,
    preferredAreas: [],
    preferredCity: 'Mumbai'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newClient: Client = {
      ...(formData as Client),
      id: `c${Date.now()}`,
      tenantId: 't1',
      email: `${formData.name?.toLowerCase().replace(/\s+/g, '.')}@propmate.ai`,
      bhkPreference: ['2BHK', '3BHK'],
      furnishingPreference: [FurnishingStatus.SEMI],
      maritalStatus: 'Bachelor',
      familySize: 1,
      moveInDate: new Date().toISOString().split('T')[0],
      tags: ['New Lead'],
      createdAt: new Date().toISOString().split('T')[0],
    };
    onAdd(newClient);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-white/20">
        <div className="px-10 py-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Add New Lead</h2>
            <p className="text-sm text-slate-500 mt-1">Capture requirements for a new client.</p>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-slate-200/50 rounded-2xl transition-colors text-slate-400 hover:text-slate-900">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-10 space-y-8 max-h-[80vh] overflow-y-auto">
          <div className="space-y-6">
            <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] pb-2 border-b border-indigo-50">Basic Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Client Full Name</label>
                <input 
                  required 
                  onChange={e => setFormData({...formData, name: e.target.value})} 
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-black font-semibold focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all" 
                  placeholder="e.g. Rahul Mehta" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Primary Phone</label>
                <input 
                  required 
                  onChange={e => setFormData({...formData, phone: e.target.value})} 
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-black font-semibold focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all" 
                  placeholder="+91 99887 76655" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Client Notes / Description</label>
              <textarea 
                required 
                onChange={e => setFormData({...formData, description: e.target.value})} 
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-black font-semibold focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all min-h-[100px]" 
                placeholder="What exactly is the client looking for? Mention specific needs like 'garden facing' or 'quiet area'..." 
              />
            </div>

            <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] pb-2 border-b border-indigo-50 pt-4">Target Location & Area</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Preferred City</label>
                <input 
                  required 
                  onChange={e => setFormData({...formData, preferredCity: e.target.value})} 
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-black font-semibold focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all" 
                  placeholder="e.g. Mumbai" 
                  defaultValue="Mumbai"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Target Localities (Area)</label>
                <input 
                  required 
                  onChange={e => setFormData({...formData, preferredAreas: e.target.value.split(',').map(s => s.trim())})} 
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-black font-semibold focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all" 
                  placeholder="e.g. Bandra, Juhu, Khar" 
                />
              </div>
            </div>

            <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] pb-2 border-b border-indigo-50 pt-4">Budget & Requirement</h4>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Requirement</label>
                <select 
                  onChange={e => setFormData({...formData, requirement: e.target.value as any})} 
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-black font-semibold focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all appearance-none"
                >
                  <option value={TransactionType.RENT}>Rent</option>
                  <option value={TransactionType.SALE}>Buy</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Max Budget (₹)</label>
                <input 
                  required 
                  type="number" 
                  onChange={e => setFormData({...formData, budgetMax: Number(e.target.value)})} 
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-black font-semibold focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all" 
                  placeholder="e.g. 15000000" 
                />
              </div>
            </div>
          </div>
          
          <div className="flex gap-4 pt-4">
            <button type="button" onClick={onClose} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all">
              Cancel
            </button>
            <button type="submit" className="flex-[2] py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 hover:scale-[1.02] active:scale-[0.98] transition-all">
              Register Lead
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
