import React, { useState, useEffect } from 'react';
import { Shield, HeartHandshake, PhoneCall, AlertTriangle, User, Activity, Calendar, Users, Home } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenEmergency, onOpenProfile }) {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'vitals', label: 'Health Vitals', icon: Activity },
    { id: 'caregivers', label: 'Caregivers', icon: Users },
    { id: 'services', label: 'Services', icon: HeartHandshake },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-card border-b border-slate-800/80 bg-slate-900/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <div>
            <span className="text-2xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
              Elder<span className="gradient-text">Expert</span>
            </span>
            <span className="block text-xs font-semibold text-emerald-400 tracking-wider uppercase">
              Elder Care & Monitoring
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-800/50 p-1.5 rounded-2xl border border-slate-700/50">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30 font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/40'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-3">
          
          {/* Live System Time */}
          <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 bg-slate-800/60 rounded-xl border border-slate-700/60 text-xs font-medium text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{time}</span>
          </div>

          {/* Emergency SOS Button */}
          <button
            onClick={onOpenEmergency}
            className="pulse-glow flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm transition-all duration-200 shadow-lg shadow-red-600/40 active:scale-95"
          >
            <AlertTriangle className="w-4 h-4 animate-bounce" />
            <span>SOS Emergency</span>
          </button>

          {/* User Profile */}
          <button
            onClick={onOpenProfile}
            className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-all"
            title="User Settings / Profile"
          >
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
