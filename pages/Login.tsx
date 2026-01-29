
import React, { useState } from 'react';
import { Lock, Mail, ArrowRight, ShieldCheck, Info } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export const LoginPage: React.FC<LoginProps> = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 800);
  };

  return (
    <div className="min-h-screen bg-indigo-950 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-400 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden">
          <div className="p-10 md:p-12">
            <div className="flex flex-col items-center mb-10 text-center">
              <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-200 mb-6">
                <span className="text-white font-bold text-3xl">P</span>
              </div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">PropMate Workspace</h1>
              <p className="text-slate-500 mt-2 text-sm">Sign in to your private agent portal</p>
            </div>

            <div className="mb-8 p-4 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-start gap-3">
              <Info className="text-indigo-600 shrink-0 mt-0.5" size={18} />
              <div className="space-y-1">
                <p className="text-xs font-bold text-indigo-900 uppercase tracking-wider">Demo Credentials</p>
                <p className="text-[11px] text-indigo-700">Email: <span className="font-mono font-bold">agent@propmate.ai</span></p>
                <p className="text-[11px] text-indigo-700">Pass: <span className="font-mono font-bold">password123</span></p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="email" 
                    required
                    defaultValue="agent@propmate.ai"
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm text-black focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="password" 
                    required
                    defaultValue="password123"
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm text-black focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all font-medium"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all active:scale-95"
              >
                Enter My Workspace
                <ArrowRight size={18} />
              </button>
            </form>
          </div>

          <div className="bg-slate-50 px-8 py-6 border-t border-slate-100 flex items-center justify-center gap-2">
             <ShieldCheck size={16} className="text-slate-400" />
             <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Isolated Tenant Data Access</span>
          </div>
        </div>
      </div>
    </div>
  );
};
