import React from 'react';
import { Award, Search, Sparkles, Briefcase, BookOpen, UserCheck, Building2, ZoomIn, Sun } from 'lucide-react';

export default function Navbar({
  activeTab,
  setActiveTab,
  fontSize,
  setFontSize,
  onOpenLoginModal
}) {
  const navItems = [
    { id: 'experts', label: 'Discover Experts', icon: Search },
    { id: 'aimatch', label: 'AI Match Engine', icon: Sparkles },
    { id: 'services', label: 'Advisory Services', icon: Briefcase },
    { id: 'knowledge', label: 'Knowledge Hub', icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-22 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('experts')}>
          <div className="w-12 h-12 rounded-2xl bg-sky-600 flex items-center justify-center shadow-md shadow-sky-600/20 text-white">
            <Award className="w-7 h-7" />
          </div>
          <div>
            <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-1.5">
              Elder<span className="text-sky-600">Expert</span>
            </span>
            <span className="block text-xs font-extrabold text-emerald-700 tracking-wider uppercase">
              Senior Knowledge & Mentorship Platform
            </span>
          </div>
        </div>

        {/* Center Nav Tabs */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-extrabold transition-all ${
                  isActive
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-sky-600'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Accessibility & Separate Login Buttons */}
        <div className="flex items-center gap-3">
          
          {/* Senior Text Size Switcher */}
          <div className="hidden sm:flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200" title="Adjust Text Size for Easy Reading">
            <span className="text-xs font-bold text-slate-500 px-2 flex items-center gap-1">
              <ZoomIn className="w-3.5 h-3.5" /> Text Size:
            </span>
            {[
              { id: 'normal', label: 'A' },
              { id: 'large', label: 'A+' },
              { id: 'xlarge', label: 'A++' }
            ].map((size) => (
              <button
                key={size.id}
                onClick={() => setFontSize(size.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all ${
                  fontSize === size.id
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-300'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {size.label}
              </button>
            ))}
          </div>

          {/* Separate Login Buttons */}
          <button
            onClick={() => onOpenLoginModal('expert')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-sm transition-all shadow-md shadow-sky-600/20"
          >
            <UserCheck className="w-4 h-4" />
            <span className="hidden md:inline">Senior Expert Login</span>
            <span className="md:hidden">Expert Portal</span>
          </button>

          <button
            onClick={() => onOpenLoginModal('company')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm transition-all shadow-md shadow-emerald-600/20"
          >
            <Building2 className="w-4 h-4" />
            <span className="hidden md:inline">Company Login</span>
            <span className="md:hidden">Hirer Portal</span>
          </button>

        </div>

      </div>
    </header>
  );
}
