
import React, { useState } from 'react';
import { Lock, Mail, ArrowRight, ShieldCheck, Info } from 'lucide-react';

interface LoginProps {
  onLogin: (email: string) => void;
}

export const LoginPage: React.FC<LoginProps> = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('agent@propmate.ai');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');

  const validUsers = [
    { email: 'agent@propmate.ai', password: 'password123' },
    { email: 'agent+1@propmate.ai', password: 'password123' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      const user = validUsers.find(u => u.email === email && u.password === password);
      if (user) {
        onLogin(email);
      } else {
        setError('Invalid credentials. Access restricted to authorized agent accounts.');
        setIsLoading(false);
      }
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
              <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-200 mb-6 transform hover:rotate-6 transition-transform">
                <span className="text-white font-bold text-3xl">P</span>
              </div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">PropMate Portal</h1>
              <p className="text-slate-500 mt-2 text-sm font-medium">Secure Real Estate Workspace</p>
            </div>

            <div className="mb-8 p-5 bg-indigo-50 border border-indigo-100 rounded-[1.5rem] space-y-4">
              <div className="flex items-start gap-3">
                <Info className="text-indigo-600 shrink-0 mt-0.5" size={18} />
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-indigo-900 uppercase tracking-widest">Workspace Isolation</p>
                  <p className="text-[11px] text-indigo-700 leading-relaxed">Select an account below to enter your private environment. Data is not shared between accounts.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                <button 
                  type="button"
                  onClick={() => { setEmail('agent@propmate.ai'); setPassword('password123'); }}
                  className="text-left px-4 py-3 bg-white border border-indigo-100 rounded-xl hover:border-indigo-400 transition-all"
                >
                  <p className="text-xs font-bold text-slate-700">agent@propmate.ai</p>
                  <p className="text-[9px] text-slate-400 uppercase tracking-widest">Environment A</p>
                </button>
                <button 
                  type="button"
                  onClick={() => { setEmail('agent+1@propmate.ai'); setPassword('password123'); }}
                  className="text-left px-4 py-3 bg-white border border-indigo-100 rounded-xl hover:border-indigo-400 transition-all"
                >
                  <p className="text-xs font-bold text-slate-700">agent+1@propmate.ai</p>
                  <p className="text-[9px] text-slate-400 uppercase tracking-widest">Environment B</p>
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
                <div className="relative">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-14 pr-6 py-4.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-black focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-14 pr-6 py-4.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-black focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-indigo-700 shadow-xl transition-all active:scale-95"
              >
                {isLoading ? 'Loading Workspace...' : 'Sign In'}
                {!isLoading && <ArrowRight size={18} />}
              </button>
            </form>
          </div>

          <div className="bg-slate-50 px-8 py-6 border-t border-slate-100 flex items-center justify-center gap-3">
             <ShieldCheck size={18} className="text-indigo-600" />
             <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Encrypted Local Data Isolation</span>
          </div>
        </div>
      </div>
    </div>
  );
};
