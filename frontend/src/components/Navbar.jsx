import React, { useState } from 'react';
import { Award, Search, HelpCircle, Users, BookOpen, LogIn, UserPlus, Building2, ZoomIn, Menu, X } from 'lucide-react';

export default function Navbar({
  currentView,
  setCurrentView,
  fontSize,
  setFontSize,
  onOpenLogin,
  onOpenJoinExpert
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'public-experts', label: 'Experts', icon: Search },
    { id: 'public-how', label: 'How It Works', icon: HelpCircle },
    { id: 'public-mentorship', label: 'Mentorship', icon: Users },
    { id: 'public-knowledge', label: 'Knowledge', icon: BookOpen },
  ];

  const handleNavClick = (viewId) => {
    setCurrentView('landing');
    setMobileMenuOpen(false);
    const targetElement = document.getElementById(viewId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/98 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sleek, narrow navigation bar height: h-16 (64px) */}
        <div className="h-16 flex items-center justify-between gap-3">
          
          {/* Brand Logo & Compact Tagline */}
          <button
            onClick={() => { setCurrentView('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-2.5 text-left focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg group"
            aria-label="ElderExpert Home"
          >
            <div className="w-9 h-9 rounded-lg bg-[#123B5D] flex items-center justify-center text-white shadow-xs flex-shrink-0 group-hover:bg-[#2563EB] transition-colors">
              <Award className="w-5 h-5" aria-hidden="true" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold tracking-tight text-[#123B5D]">
                Elder<span className="text-[#2563EB]">Expert</span>
              </span>
              <span className="hidden xl:inline text-[11px] font-semibold text-slate-500">
                — Experience with Opportunity
              </span>
            </div>
          </button>

          {/* Compact Nav Links */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className="px-2.5 py-1.5 rounded-lg text-sm font-semibold text-slate-700 hover:text-[#123B5D] hover:bg-slate-100 transition-colors flex items-center gap-1.5"
                >
                  <Icon className="w-4 h-4 text-slate-400" aria-hidden="true" />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Area - Narrow & Compact */}
          <div className="hidden sm:flex items-center gap-2">
            
            {/* Compact Senior Text Size Toggle */}
            <div 
              className="flex items-center bg-[#EAF4FF] p-0.5 rounded-lg border border-blue-200"
              role="group"
              aria-label="Adjust font size"
            >
              {[
                { id: 'normal', label: 'A', title: 'Default font size' },
                { id: 'large', label: 'A+', title: 'Large font size' },
                { id: 'xlarge', label: 'A++', title: 'Extra-large font size' }
              ].map((size) => (
                <button
                  key={size.id}
                  onClick={() => setFontSize(size.id)}
                  title={size.title}
                  aria-pressed={fontSize === size.id}
                  className={`w-7 h-7 rounded-md text-xs font-bold flex items-center justify-center transition-all ${
                    fontSize === size.id
                      ? 'bg-[#123B5D] text-white shadow-xs'
                      : 'text-slate-700 hover:bg-white/80'
                  }`}
                >
                  {size.label}
                </button>
              ))}
            </div>

            {/* Portal Switcher Buttons */}
            {currentView !== 'expert-portal' && (
              <button
                onClick={() => setCurrentView('expert-portal')}
                className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-700 hover:text-[#123B5D] hover:bg-slate-100 border border-slate-200 transition-colors"
                title="Switch to Senior Expert Dashboard"
              >
                Expert Portal
              </button>
            )}

            {currentView !== 'company-portal' && (
              <button
                onClick={() => setCurrentView('company-portal')}
                className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-700 hover:text-[#123B5D] hover:bg-slate-100 border border-slate-200 transition-colors"
                title="Switch to Company Dashboard"
              >
                Companies
              </button>
            )}

            {/* Compact Login Button */}
            <button
              onClick={() => onOpenLogin('expert')}
              className="px-3 py-1.5 rounded-lg text-sm font-semibold text-slate-700 hover:text-[#123B5D] hover:bg-slate-100 transition-colors flex items-center gap-1.5"
            >
              <LogIn className="w-4 h-4 text-slate-400" aria-hidden="true" />
              <span>Log In</span>
            </button>

            {/* Compact Primary CTA: Join as Expert */}
            <button
              onClick={onOpenJoinExpert}
              className="px-3.5 py-1.5 rounded-lg text-sm font-bold bg-[#2563EB] hover:bg-blue-700 text-white shadow-xs transition-all flex items-center gap-1.5"
            >
              <UserPlus className="w-4 h-4" aria-hidden="true" />
              <span>Join as Expert</span>
            </button>

          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="sm:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
            aria-label="Toggle navigation"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-slate-700" />}
          </button>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-5 space-y-3">
          <div className="flex items-center justify-between p-2.5 bg-[#EAF4FF] rounded-xl border border-blue-200">
            <span className="text-xs font-bold text-[#123B5D] flex items-center gap-1.5">
              <ZoomIn className="w-4 h-4" /> Text Size
            </span>
            <div className="flex items-center gap-1">
              {[
                { id: 'normal', label: 'A' },
                { id: 'large', label: 'A+' },
                { id: 'xlarge', label: 'A++' }
              ].map((size) => (
                <button
                  key={size.id}
                  onClick={() => setFontSize(size.id)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold flex items-center justify-center ${
                    fontSize === size.id ? 'bg-[#123B5D] text-white' : 'text-slate-700 bg-white'
                  }`}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-200 grid grid-cols-2 gap-2">
            <button
              onClick={() => { setCurrentView('expert-portal'); setMobileMenuOpen(false); }}
              className="py-2.5 rounded-lg text-xs font-bold text-[#123B5D] bg-slate-100 text-center"
            >
              Expert Portal
            </button>
            <button
              onClick={() => { setCurrentView('company-portal'); setMobileMenuOpen(false); }}
              className="py-2.5 rounded-lg text-xs font-bold text-slate-700 bg-slate-100 text-center"
            >
              Company Portal
            </button>
            <button
              onClick={() => { onOpenLogin('expert'); setMobileMenuOpen(false); }}
              className="py-2.5 rounded-lg text-sm font-semibold text-slate-700 border border-slate-300 text-center"
            >
              Log In
            </button>
            <button
              onClick={() => { onOpenJoinExpert(); setMobileMenuOpen(false); }}
              className="py-2.5 rounded-lg text-sm font-bold bg-[#2563EB] text-white text-center"
            >
              Join as Expert
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
