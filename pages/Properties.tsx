
import React, { useState, useEffect } from 'react';
import { 
  Plus, Search, MapPin, X, Home, LayoutGrid, List as ListIcon, 
  Bed, Maximize2, Building, Layers, Compass, CheckCircle2,
  Info, Calendar, Car, ShieldCheck, Wind
} from 'lucide-react';
import { Property, PropertyStatus, TransactionType, PropertyType, FurnishingStatus } from '../types';

interface PropertiesPageProps {
  properties: Property[];
  onAdd: (prop: Property) => void;
  triggerModal?: number;
}

export const PropertiesPage: React.FC<PropertiesPageProps> = ({ properties, onAdd, triggerModal }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filters
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(500000000);
  const [selectedType, setSelectedType] = useState<PropertyType | 'All'>('All');

  useEffect(() => {
    if (triggerModal && triggerModal > 0) {
      setShowAddModal(true);
    }
  }, [triggerModal]);

  const filtered = properties.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.location.area.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = p.price >= minPrice && p.price <= maxPrice;
    const matchesType = selectedType === 'All' || p.type === selectedType;
    return matchesSearch && matchesPrice && matchesType;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Properties</h1>
          <p className="text-slate-500 text-sm">Managing {properties.length} exclusive listings in your private workspace.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all"
        >
          <Plus size={20} />
          Add Property
        </button>
      </div>

      <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200 space-y-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[250px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search listings..." 
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-black focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Price Range:</span>
            <input 
              type="number" 
              placeholder="Min" 
              className="w-24 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold"
              onChange={(e) => setMinPrice(Number(e.target.value) || 0)}
            />
            <span className="text-slate-300">-</span>
            <input 
              type="number" 
              placeholder="Max" 
              className="w-32 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold"
              onChange={(e) => setMaxPrice(Number(e.target.value) || 500000000)}
            />
          </div>

          <select 
            className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold appearance-none cursor-pointer hover:bg-slate-100 transition-colors"
            onChange={(e) => setSelectedType(e.target.value as any)}
          >
            <option value="All">All Types</option>
            {Object.values(PropertyType).map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((prop) => (
          <div 
            key={prop.id} 
            onClick={() => setSelectedProperty(prop)}
            className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-sm group hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1"
          >
            <div className="h-56 bg-slate-100 relative overflow-hidden">
              <img src={prop.photos[0]} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" alt="" />
              <div className="absolute top-5 left-5">
                <span className="px-4 py-1.5 bg-white/95 backdrop-blur-md rounded-full text-[10px] font-black text-indigo-600 uppercase tracking-[0.15em] shadow-lg">
                  {prop.transactionType}
                </span>
              </div>
            </div>
            <div className="p-7 space-y-4">
              <h3 className="font-bold text-slate-900 line-clamp-1 group-hover:text-indigo-600 transition-colors text-lg">{prop.title}</h3>
              <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                <MapPin size={16} className="text-indigo-600" /> {prop.location.area}, {prop.location.city}
              </div>
              <p className="text-xs text-slate-500 line-clamp-2 italic leading-relaxed">"{prop.description}"</p>
              
              <div className="flex items-center gap-6 pt-2">
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <Bed size={16} className="text-indigo-500" /> {prop.bhk}
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <Maximize2 size={16} className="text-indigo-500" /> {prop.carpetArea} SQFT
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <span className="text-xl font-black text-slate-900 tracking-tight">₹{prop.price.toLocaleString()}</span>
                <span className={`text-[9px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest ${prop.status === PropertyStatus.AVAILABLE ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                  {prop.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && <AddPropertyModal onClose={() => setShowAddModal(false)} onAdd={onAdd} />}
      {selectedProperty && <PropertyDetailModal property={selectedProperty} onClose={() => setSelectedProperty(null)} />}
    </div>
  );
};

const PropertyDetailModal: React.FC<{ property: Property; onClose: () => void }> = ({ property, onClose }) => {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-6xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 flex flex-col md:flex-row max-h-[90vh]">
        <div className="w-full md:w-1/2 relative bg-slate-100">
          <img src={property.photos[0]} className="w-full h-full object-cover" alt="" />
          <button 
            onClick={onClose} 
            className="absolute top-8 left-8 p-4 bg-white/20 backdrop-blur-xl hover:bg-white text-white hover:text-slate-900 rounded-2xl transition-all shadow-2xl"
          >
            <X size={24} />
          </button>
        </div>
        <div className="w-full md:w-1/2 p-12 overflow-y-auto space-y-8 bg-white">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest">{property.type}</span>
              <span className="px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest">{property.status}</span>
            </div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">{property.title}</h2>
            <div className="flex items-center gap-2 text-slate-500 font-bold">
              <MapPin size={20} className="text-indigo-600" /> {property.location.address}, {property.location.area}, {property.location.city}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Market Price</p>
              <p className="text-2xl font-black text-slate-900 mt-1">₹{property.price.toLocaleString()}</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Carpet Area</p>
              <p className="text-2xl font-black text-slate-900 mt-1">{property.carpetArea} sqft</p>
            </div>
          </div>

          <div className="space-y-4">
             <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] border-b border-indigo-50 pb-2">Description</h4>
             <p className="text-slate-600 leading-relaxed font-medium">{property.description}</p>
          </div>

          <div className="space-y-4 pt-4">
             <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] border-b border-indigo-50 pb-2">Amenities & Details</h4>
             <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                <AmenityItem icon={<Bed size={16}/>} label="Configuration" value={property.bhk} />
                <AmenityItem icon={<Building size={16}/>} label="Furnishing" value={property.furnishing} />
                <AmenityItem icon={<Layers size={16}/>} label="Floor" value={`${property.floorNumber}/${property.totalFloors}`} />
                <AmenityItem icon={<Compass size={16}/>} label="Facing" value={property.facing} />
                <AmenityItem icon={<Car size={16}/>} label="Parking" value={property.parking ? 'Available' : 'No'} />
                <AmenityItem icon={<Wind size={16}/>} label="Power Backup" value={property.powerBackup ? '100%' : 'No'} />
             </div>
          </div>

          <div className="pt-8 flex gap-4">
             <button className="flex-1 py-5 bg-indigo-600 text-white rounded-[1.5rem] font-black text-sm shadow-2xl shadow-indigo-200 hover:bg-indigo-700 hover:scale-[1.02] transition-all">
                Pitch Listing
             </button>
             <button className="px-8 py-5 border-2 border-slate-100 rounded-[1.5rem] font-black text-slate-400 hover:bg-slate-50 transition-all">
                Download Brochure
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AmenityItem = ({ icon, label, value }: { icon: any, label: string, value: string }) => (
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-indigo-500 shrink-0 border border-slate-100">
      {icon}
    </div>
    <div>
      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
      <p className="text-xs font-bold text-slate-900">{value}</p>
    </div>
  </div>
);

const AddPropertyModal: React.FC<{ onClose: () => void; onAdd: (p: Property) => void }> = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState<Partial<Property>>({
    title: '',
    description: '',
    transactionType: TransactionType.RENT,
    type: PropertyType.FLAT,
    price: 0,
    carpetArea: 0,
    bhk: '2BHK',
    furnishing: FurnishingStatus.UNFURNISHED,
    location: { area: '', city: 'Mumbai', address: '' },
    status: PropertyStatus.AVAILABLE
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProp: Property = {
      ...(formData as Property),
      id: `p-${Date.now()}`,
      tenantId: 't1',
      photos: ['https://picsum.photos/seed/' + Date.now() + '/800/600'],
      createdAt: new Date().toISOString(),
      negotiable: true,
      builtUpArea: Number(formData.carpetArea) * 1.2,
      floorNumber: 5,
      totalFloors: 10,
      buildingName: 'Workspace Listing',
      facing: 'East',
      ageOfBuilding: 2,
      parking: true,
      liftAvailable: true,
      powerBackup: true,
      petsAllowed: true,
      bachelorsAllowed: true,
      availabilityDate: new Date().toISOString()
    };
    onAdd(newProp);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-white/20">
        <div className="px-10 py-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Add New Listing</h2>
            <p className="text-sm text-slate-500 mt-1">Fill in the details for your new property inventory.</p>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-slate-200/50 rounded-2xl transition-colors text-slate-400 hover:text-slate-900">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-10 space-y-8 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-6">
              <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] pb-2 border-b border-indigo-50">Property Details</h4>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Listing Title</label>
                <input 
                  required 
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-black font-semibold focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all" 
                  placeholder="e.g. Modern 3BHK in Bandra West"
                  onChange={e => setFormData({...formData, title: e.target.value})} 
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Description</label>
                <textarea 
                  required 
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-black font-semibold focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all min-h-[100px]" 
                  placeholder="Describe the unique features of this property..."
                  onChange={e => setFormData({...formData, description: e.target.value})} 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Type</label>
                  <select className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-black font-semibold focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all appearance-none"
                    onChange={e => setFormData({...formData, type: e.target.value as any})}>
                    {Object.values(PropertyType).map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Transaction</label>
                  <select className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-black font-semibold focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all appearance-none"
                    onChange={e => setFormData({...formData, transactionType: e.target.value as any})}>
                    {Object.values(TransactionType).map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] pb-2 border-b border-indigo-50">Pricing & Specs</h4>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Price (₹)</label>
                <input 
                  required 
                  type="number" 
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-black font-semibold focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all" 
                  placeholder="e.g. 50000"
                  onChange={e => setFormData({...formData, price: Number(e.target.value)})} 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Carpet Area (sqft)</label>
                  <input 
                    required 
                    type="number" 
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-black font-semibold focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all" 
                    placeholder="e.g. 1200"
                    onChange={e => setFormData({...formData, carpetArea: Number(e.target.value)})} 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">BHK</label>
                  <select className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-black font-semibold focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all appearance-none"
                    onChange={e => setFormData({...formData, bhk: e.target.value})}>
                    {['1RK', '1BHK', '2BHK', '3BHK', '4+BHK'].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 space-y-6 pt-6 border-t border-slate-100">
               <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] pb-2 border-b border-indigo-50">Location Information</h4>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                   <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Area / Locality</label>
                   <input 
                    placeholder="e.g. Bandra West" 
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-black font-semibold focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all" 
                    onChange={e => setFormData({...formData, location: {...formData.location!, area: e.target.value}})} 
                   />
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">City</label>
                   <input 
                    placeholder="e.g. Mumbai" 
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-black font-semibold focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all" 
                    onChange={e => setFormData({...formData, location: {...formData.location!, city: e.target.value}})} 
                   />
                 </div>
               </div>
            </div>
          </div>
          
          <div className="flex gap-4 pt-4">
            <button type="button" onClick={onClose} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all">
              Cancel
            </button>
            <button type="submit" className="flex-[2] py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 hover:scale-[1.02] active:scale-[0.98] transition-all">
              Add Property to Inventory
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
