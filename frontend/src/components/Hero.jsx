import React, { useState } from 'react';
import { Sparkles, Award, ArrowRight, Search, ShieldCheck, CheckCircle2, Building, BrainCircuit, Users } from 'lucide-react';

export default function Hero({ onSearchQuery, onExploreClick, onPostProjectClick }) {
  const [query, setQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query) onSearchQuery(query);
  };

  return (
    <section className="relative overflow-hidden py-16 lg:py-24 bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950">
      
      {/* Glow Backdrops */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-sky-500/10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Text & Search */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* AI Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold uppercase tracking-wider">
              <BrainCircuit className="w-4 h-4 text-sky-400 animate-pulse" />
              <span>AI-Powered Intergenerational Knowledge Marketplace</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Unlock Decades of Experience. <span className="gradient-text">Hire Veteran Experts</span> On Demand.
            </h1>

            {/* Subtext */}
            <p className="text-lg text-slate-300 leading-relaxed max-w-2xl">
              ElderExpert connects companies, startups, and young professionals with retired senior executives, lead engineers, and domain specialists for short-term consulting, mentorship, and technical reviews.
            </p>

            {/* Interactive AI Search bar */}
            <form onSubmit={handleSearchSubmit} className="p-2 rounded-2xl glass-card border border-slate-700/80 shadow-2xl flex flex-col sm:flex-row items-center gap-2">
              <div className="flex-1 flex items-center gap-3 px-3 w-full">
                <Search className="w-5 h-5 text-sky-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Describe your need (e.g., Retired Chip Architect for semiconductor review)..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent border-none text-sm text-white placeholder-slate-400 focus:outline-none py-2"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold bg-gradient-to-r from-sky-500 to-emerald-400 text-slate-950 hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>AI Match Expert</span>
              </button>
            </form>

            {/* Quick search tags */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
              <span className="font-semibold text-slate-300">Popular Queries:</span>
              {['Semiconductor Architecture', 'FDA Regulatory Audit', 'Series A Pitch Review', 'Supply Chain Optimization'].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => { setQuery(tag); onSearchQuery(tag); }}
                  className="px-3 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/50 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-800">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">10,000+</div>
                <div className="text-xs sm:text-sm text-slate-400 font-medium">Verified Veteran Experts</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">38+ Yrs</div>
                <div className="text-xs sm:text-sm text-slate-400 font-medium">Average Industry Experience</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-sky-400">98.6%</div>
                <div className="text-xs sm:text-sm text-slate-400 font-medium">AI Match Accuracy</div>
              </div>
            </div>

          </div>

          {/* Hero Right Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6 border border-slate-700/80 shadow-2xl relative overflow-hidden">
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>AI Matching Highlight</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                  98% Match Score
                </span>
              </div>

              {/* Expert Preview inside Card */}
              <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-4">
                <div className="flex items-center gap-4">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150"
                    alt="Dr. Arthur Pendelton"
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-400"
                  />
                  <div>
                    <h4 className="font-bold text-white text-base">Dr. Arthur Pendelton</h4>
                    <p className="text-xs text-sky-400 font-semibold">Former VP of Semiconductor Architecture</p>
                    <p className="text-xs text-slate-400">42 Years Exp | Intel & AMD (Retired)</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/90 text-xs text-slate-300 border border-slate-800 space-y-1">
                  <span className="text-emerald-400 font-bold block">Why AI Matched This Expert:</span>
                  <p>"Top 0.1% authority in microarchitecture design, holding 14 patents in CPU execution units."</p>
                </div>
              </div>

              {/* Action buttons inside card */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={onExploreClick}
                  className="py-3 rounded-xl font-bold bg-slate-800 hover:bg-slate-700 text-white text-xs border border-slate-700 flex items-center justify-center gap-1.5"
                >
                  <Users className="w-4 h-4 text-sky-400" />
                  <span>Browse Directory</span>
                </button>

                <button
                  onClick={onPostProjectClick}
                  className="py-3 rounded-xl font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs transition-all flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/20"
                >
                  <Building className="w-4 h-4 text-slate-950" />
                  <span>Post Project Need</span>
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
