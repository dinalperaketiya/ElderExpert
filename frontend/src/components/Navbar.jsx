import React from 'react';
import { Sparkles, Award, Search, Users, BookOpen, Briefcase, PlusCircle, UserCheck } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenJoinModal, onOpenPostProject }) {
  const navItems = [
    { id: 'experts', label: 'Discover Experts', icon: Search },
    { id: 'aimatch', label: 'AI Match Engine', icon: Sparkles },
    { id: 'services', label: 'Advisory Services', icon: Briefcase },
    { id: 'knowledge', label: 'Knowledge Hub', icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-card border-b border-slate-800/80 bg-slate-900/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('experts')}>
          <div className="w-11 h-11 rounded-2xl gradient-bg flex items-center justify-center shadow-lg shadow-sky-500/20">
            <Award className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-2xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
              Elder<span className="gradient-text">Expert</span>
            </span>
            <span className="block text-[10px] font-bold text-sky-400 tracking-wider uppercase">
              AI-Powered Senior Advisory Network
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-800/60 p-1.5 rounded-2xl border border-slate-700/50">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-sky-500 to-emerald-400 text-slate-950 shadow-md shadow-sky-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/40'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-sky-400'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3">
          
          <button
            onClick={onOpenJoinModal}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-all"
          >
            <UserCheck className="w-4 h-4 text-emerald-400" />
            <span>Join as Veteran Expert</span>
          </button>

          <button
            onClick={onOpenPostProject}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs transition-all duration-200 shadow-lg shadow-emerald-500/20"
          >
            <PlusCircle className="w-4 h-4 text-slate-950" />
            <span>Post Advisory Request</span>
          </button>

        </div>
      </div>
    </header>
  );
}
