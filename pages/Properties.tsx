
import React, { useState, useEffect } from 'react';
import { 
  Plus, Search, MapPin, X, Home, LayoutGrid, List as ListIcon, 
  Bed, Maximize2, Building, Layers, Compass, CheckCircle2,
  Info, Calendar, Car, ShieldCheck, Wind, Star, Trash2, User,
  Power, Dog, Users as UsersIcon, ChevronRight
} from 'lucide-react';
import { Property, PropertyStatus, TransactionType, PropertyType, FurnishingStatus, ListingSource } from '../types';

interface PropertiesPageProps {
  properties: Property[];
  onAdd: (prop: Property) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  triggerModal?: number;
}

export const PropertiesPage: React.FC<PropertiesPageProps> = ({ properties, onAdd, onDelete, onToggleFavorite, triggerModal }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<PropertyType | 'All'>('All');

  useEffect(() => {
    if (triggerModal && triggerModal > 0) {
      setShowAddModal(true);
    }
  }, [triggerModal]);

  const filtered = properties
    .sort((a, b) => (a.isFavorite === b.isFavorite) ? 0 : a.isFavorite ? -1 : 1)
    .filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.location.area.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === 'All' || p.type === selectedType;
      return matchesSearch && matchesType;
    });

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Listing Inventory</h1>
          <p className="text-slate-500 text-sm font-medium">Manage your private real estate database.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all"
        >
          <Plus size={20} /> Add Property
        </button>
      </div>

      <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search location, title, or building..." 
            className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-black text-black focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select 
          className="px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-black uppercase tracking-widest cursor-pointer text-black"
          onChange={(e) => setSelectedType(e.target.value as any)}
        >
          <option value="All">All Property Types</option>
          {Object.values(PropertyType).map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((prop) => (
          <div key={prop.id} className="bg-white rounded-[3rem] overflow-hidden border border-slate-200 shadow-sm group hover:shadow-2xl transition-all relative transform hover:-translate-y-1">
            <div className="h-64 bg-slate-100 relative overflow-hidden" onClick={() => setSelectedProperty(prop)}>
              <img src={prop.photos[0]} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" alt="" />
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-xl text-[9px] font-black text-indigo-600 uppercase tracking-widest shadow-lg">
                  {prop.transactionType}
                </span>
                <span className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg ${prop.listingSource === ListingSource.DIRECT ? 'bg-emerald-500 text-white' : 'bg-blue-500 text-white'}`}>
                  {prop.listingSource}
                </span>
              </div>
            </div>
            
            <button 
              onClick={(e) => { e.stopPropagation(); onToggleFavorite(prop.id); }}
              className="absolute top-6 right-6 w-12 h-12 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 transition-all z-10"
            >
              <Star size={20} className={prop.isFavorite ? 'text-amber-400 fill-amber-400' : 'text-slate-300'} />
            </button>

            <div className="p-8 space-y-5">
              <div className="flex justify-between items-start gap-4">
                <h3 className="font-black text-black text-xl tracking-tight line-clamp-1 group-hover:text-indigo-600 transition-colors cursor-pointer" onClick={() => setSelectedProperty(prop)}>{prop.title}</h3>
                <button 
                  onClick={(e) => { e.stopPropagation(); if(confirm("Delete this listing?")) onDelete(prop.id); }}
                  className="text-slate-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={20} />
                </button>
              </div>
              
              <div className="flex items-center gap-2 text-slate-900 text-sm font-black">
                <MapPin size={16} className="text-indigo-600" /> {prop.location.area}, {prop.location.city}
              </div>

              <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-50">
                 <div className="flex items-center gap-2">
                    <Bed size={14} className="text-indigo-600" />
                    <span className="text-xs font-black text-black">{prop.bhk}</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <Maximize2 size={14} className="text-indigo-600" />
                    <span className="text-xs font-black text-black">{prop.carpetArea} sqft</span>
                 </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Pricing</p>
                  <span className="text-2xl font-black text-black tracking-tight">₹{prop.price.toLocaleString()}</span>
                </div>
                <span className={`text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest ${prop.status === PropertyStatus.AVAILABLE ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                  {prop.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && <AddPropertyModal onClose={() => setShowAddModal(false)} onAdd={onAdd} />}
      {selectedProperty && <PropertyDetailModal property={selectedProperty} onClose={() => setSelectedProperty(null)} onToggleFavorite={onToggleFavorite} />}
    </div>
  );
};

const PropertyDetailModal: React.FC<{ property: Property; onClose: () => void; onToggleFavorite: (id: string) => void }> = ({ property, onClose, onToggleFavorite }) => {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-6xl rounded-[3.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 flex flex-col md:flex-row max-h-[95vh]">
        <div className="w-full md:w-1/2 relative bg-slate-100">
          <img src={property.photos[0]} className="w-full h-full object-cover" alt="" />
          <div className="absolute top-10 left-10 flex gap-4">
            <button onClick={onClose} className="p-4 bg-white/20 backdrop-blur-xl hover:bg-white text-white hover:text-slate-900 rounded-2xl transition-all shadow-2xl">
              <X size={28} />
            </button>
            <button onClick={() => onToggleFavorite(property.id)} className="p-4 bg-white/20 backdrop-blur-xl hover:bg-white text-white hover:text-amber-500 rounded-2xl transition-all shadow-2xl">
              <Star size={28} className={property.isFavorite ? 'fill-amber-500 text-amber-500' : ''} />
            </button>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 p-12 overflow-y-auto space-y-10 bg-white">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <span className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest">{property.type}</span>
              <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${property.listingSource === ListingSource.DIRECT ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                {property.listingSource} {property.listingSource === ListingSource.BROKER && `• Broker: ${property.brokerName}`}
              </span>
            </div>
            <h2 className="text-4xl font-black text-black tracking-tight leading-tight">{property.title}</h2>
            <div className="flex items-center gap-2 text-slate-900 text-sm font-black"><MapPin size={18} className="text-indigo-600"/> {property.location.address}</div>
          </div>

          <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 space-y-4">
             <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Listing Description</h4>
             <p className="text-black text-lg font-bold leading-relaxed">{property.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Asking Price</p>
              <p className="text-3xl font-black text-black">₹{property.price.toLocaleString()}</p>
            </div>
            <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Carpet Area</p>
              <p className="text-3xl font-black text-black">{property.carpetArea} <span className="text-sm font-black text-slate-400">SQFT</span></p>
            </div>
          </div>

          <div className="space-y-6 pt-6 border-t border-slate-100">
             <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Building Specifications</h4>
             <div className="grid grid-cols-2 gap-y-6 gap-x-12">
                <SpecItem icon={<Compass size={18}/>} label="Facing" value={property.facing} />
                <SpecItem icon={<Building size={18}/>} label="Age" value={`${property.ageOfBuilding} Years`} />
                <SpecItem icon={<Layers size={18}/>} label="Floor" value={`${property.floorNumber} of ${property.totalFloors}`} />
                <SpecItem icon={<Building size={18}/>} label="Furnishing" value={property.furnishing} />
             </div>
          </div>

          <div className="space-y-6 pt-6 border-t border-slate-100">
             <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Amenities & Rules</h4>
             <div className="grid grid-cols-3 gap-6">
                <AmenityToggle active={property.parking} icon={<Car size={18}/>} label="Parking" />
                <AmenityToggle active={property.liftAvailable} icon={<Layers size={18}/>} label="Lift" />
                <AmenityToggle active={property.powerBackup} icon={<Power size={18}/>} label="Backup" />
                <AmenityToggle active={property.petsAllowed} icon={<Dog size={18}/>} label="Pets" />
                <AmenityToggle active={property.bachelorsAllowed} icon={<UsersIcon size={18}/>} label="Bachelors" />
             </div>
          </div>

          <div className="pt-10 flex gap-4">
             <button className="flex-1 py-6 bg-indigo-600 text-white rounded-[1.5rem] font-black text-sm uppercase tracking-widest shadow-2xl shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center justify-center gap-3">
                Send to Client <ChevronRight size={20}/>
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SpecItem = ({ icon, label, value }: { icon: any, label: string, value: string }) => (
  <div className="flex items-center gap-4">
    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-indigo-500 shrink-0 border border-slate-100">
      {icon}
    </div>
    <div>
      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
      <p className="text-sm font-black text-black">{value}</p>
    </div>
  </div>
);

const AmenityToggle = ({ active, icon, label }: { active: boolean, icon: any, label: string }) => (
  <div className={`flex flex-col items-center gap-3 p-4 rounded-3xl border ${active ? 'bg-indigo-50 border-indigo-100 text-indigo-600' : 'bg-slate-50 border-slate-100 text-slate-300 opacity-50'}`}>
    {icon}
    <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
  </div>
);

const AddPropertyModal: React.FC<{ onClose: () => void; onAdd: (p: Property) => void }> = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState<Partial<Property>>({
    title: '',
    description: '',
    transactionType: TransactionType.RENT,
    type: PropertyType.FLAT,
    price: 0,
    negotiable: true,
    carpetArea: 0,
    builtUpArea: 0,
    bhk: '2BHK',
    floorNumber: 1,
    totalFloors: 10,
    buildingName: '',
    facing: 'East',
    ageOfBuilding: 0,
    furnishing: FurnishingStatus.UNFURNISHED,
    parking: true,
    liftAvailable: true,
    powerBackup: true,
    petsAllowed: true,
    bachelorsAllowed: true,
    location: { area: '', city: 'Mumbai', address: '' },
    status: PropertyStatus.AVAILABLE,
    listingSource: ListingSource.DIRECT,
    brokerName: '',
    isFavorite: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProp: Property = {
      ...(formData as Property),
      id: `p-${Date.now()}`,
      tenantId: 'workspace-user',
      photos: ['https://picsum.photos/seed/' + Date.now() + '/800/600'],
      createdAt: new Date().toISOString(),
      availabilityDate: new Date().toISOString()
    };
    onAdd(newProp);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-5xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 border border-white/20">
        <div className="px-10 py-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-2xl font-black text-slate-900">Register New Listing</h2>
            <p className="text-sm text-slate-500 font-medium">Add a new property to your isolated workspace inventory.</p>
          </div>
          <button onClick={onClose} className="p-4 hover:bg-slate-200 rounded-2xl transition-colors text-slate-400">
            <X size={28} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-10 space-y-10 max-h-[75vh] overflow-y-auto scrollbar-hide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <section className="space-y-4">
                 <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest border-b border-indigo-50 pb-2">Core Info</h4>
                 <input required className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-black text-black" placeholder="Property Title (e.g. Modern 2BHK in Bandra)" onChange={e => setFormData({...formData, title: e.target.value})} />
                 <textarea required className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-black text-black min-h-[120px]" placeholder="Detailed Description..." onChange={e => setFormData({...formData, description: e.target.value})} />
                 <div className="grid grid-cols-2 gap-4">
                   <select className="px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-black text-black" onChange={e => setFormData({...formData, transactionType: e.target.value as any})}>
                      {Object.values(TransactionType).map(t => <option key={t} value={t}>{t}</option>)}
                   </select>
                   <select className="px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-black text-black" onChange={e => setFormData({...formData, type: e.target.value as any})}>
                      {Object.values(PropertyType).map(t => <option key={t} value={t}>{t}</option>)}
                   </select>
                 </div>
              </section>

              <section className="space-y-4">
                 <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest border-b border-indigo-50 pb-2">Location & Source</h4>
                 <div className="grid grid-cols-2 gap-4">
                    <input required className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-black text-black" placeholder="Area / Locality" onChange={e => setFormData({...formData, location: {...formData.location!, area: e.target.value}})} />
                    <input required className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-black text-black" placeholder="Building Name" onChange={e => setFormData({...formData, buildingName: e.target.value})} />
                 </div>
                 <input required className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-black text-black" placeholder="Full Address" onChange={e => setFormData({...formData, location: {...formData.location!, address: e.target.value}})} />
                 
                 <div className="grid grid-cols-2 gap-4">
                    <select className="px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-black text-black" onChange={e => setFormData({...formData, listingSource: e.target.value as any})}>
                       <option value={ListingSource.DIRECT}>Direct (Owner)</option>
                       <option value={ListingSource.BROKER}>Via Broker</option>
                    </select>
                    {formData.listingSource === ListingSource.BROKER && (
                      <input required className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-black text-black animate-in slide-in-from-left-2" placeholder="Broker/Co-Agent Name" onChange={e => setFormData({...formData, brokerName: e.target.value})} />
                    )}
                 </div>
              </section>
            </div>

            <div className="space-y-8">
              <section className="space-y-4">
                 <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest border-b border-indigo-50 pb-2">Specifications & Pricing</h4>
                 <div className="grid grid-cols-2 gap-4">
                   <input required type="number" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-black text-black" placeholder="Price (₹)" onChange={e => setFormData({...formData, price: Number(e.target.value)})} />
                   <input required type="number" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-black text-black" placeholder="Carpet Area (sqft)" onChange={e => setFormData({...formData, carpetArea: Number(e.target.value)})} />
                 </div>
                 <div className="grid grid-cols-3 gap-4">
                    <select className="px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-black text-black" onChange={e => setFormData({...formData, bhk: e.target.value})}>
                      {['1RK', '1BHK', '2BHK', '3BHK', '4BHK', '5BHK+'].map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <select className="px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-black text-black" onChange={e => setFormData({...formData, facing: e.target.value as any})}>
                      {['East', 'West', 'North', 'South', 'Other'].map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <input type="number" className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-black text-black" placeholder="Bldg Age (Yrs)" onChange={e => setFormData({...formData, ageOfBuilding: Number(e.target.value)})} />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <input type="number" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-black text-black" placeholder="Floor Number" onChange={e => setFormData({...formData, floorNumber: Number(e.target.value)})} />
                    <input type="number" className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-black text-black" placeholder="Total Floors" onChange={e => setFormData({...formData, totalFloors: Number(e.target.value)})} />
                 </div>
              </section>

              <section className="space-y-4">
                 <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest border-b border-indigo-50 pb-2">Amenities & Details</h4>
                 <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                    <AmenityCheckbox label="Parking Available" checked={formData.parking || false} onChange={v => setFormData({...formData, parking: v})} />
                    <AmenityCheckbox label="Lift Service" checked={formData.liftAvailable || false} onChange={v => setFormData({...formData, liftAvailable: v})} />
                    <AmenityCheckbox label="Power Backup" checked={formData.powerBackup || false} onChange={v => setFormData({...formData, powerBackup: v})} />
                    <AmenityCheckbox label="Pets Allowed" checked={formData.petsAllowed || false} onChange={v => setFormData({...formData, petsAllowed: v})} />
                    <AmenityCheckbox label="Bachelors Allowed" checked={formData.bachelorsAllowed || false} onChange={v => setFormData({...formData, bachelorsAllowed: v})} />
                    <AmenityCheckbox label="Negotiable Price" checked={formData.negotiable || false} onChange={v => setFormData({...formData, negotiable: v})} />
                 </div>
                 <select className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-black text-black" onChange={e => setFormData({...formData, furnishing: e.target.value as any})}>
                   {Object.values(FurnishingStatus).map(s => <option key={s} value={s}>{s} Furnishing</option>)}
                 </select>
              </section>
            </div>
          </div>
          
          <div className="flex gap-4 pt-6">
            <button type="button" onClick={onClose} className="flex-1 py-5 bg-slate-100 text-slate-600 rounded-[1.5rem] font-black uppercase tracking-widest text-xs">Cancel</button>
            <button type="submit" className="flex-[2] py-5 bg-indigo-600 text-white rounded-[1.5rem] font-black uppercase tracking-widest text-xs shadow-2xl shadow-indigo-200">Add Property</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AmenityCheckbox = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: (v: boolean) => void }) => (
  <label className="flex items-center gap-3 cursor-pointer group">
    <div 
      onClick={() => onChange(!checked)}
      className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${checked ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-slate-200 group-hover:border-indigo-300'}`}
    >
      {checked && <CheckCircle2 size={14} className="text-white" />}
    </div>
    <span className="text-xs font-black text-slate-900">{label}</span>
  </label>
);
