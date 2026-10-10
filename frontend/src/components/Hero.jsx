import React from 'react';
import { ShieldCheck, UserPlus, Search, CheckCircle2, ArrowRight } from 'lucide-react';

export default function Hero({ onJoinExpert, onFindExperts }) {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28 border-b border-[#E2E8F0]">
      
      {/* Full-width background using the user's provided office collaboration image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed pointer-events-none"
        style={{ backgroundImage: `url('/office-bg.jpg')` }}
        aria-hidden="true"
      ></div>
      
      {/* Subtle white & light-blue overlay for high contrast and readability */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/88 to-[#EAF4FF]/92 pointer-events-none"
        aria-hidden="true"
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl space-y-8">
          
          {/* Trust Badge Indicator */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-[#E2E8F0] shadow-xs text-sm font-semibold text-[#123B5D]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0F766E]" aria-hidden="true"></span>
            <span>A Verified Knowledge & Advisory Network</span>
          </div>

          {/* Main Hero Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#123B5D] tracking-tight leading-[1.15]">
            Experience Is Valuable. Make It Count.
          </h1>

          {/* Supporting Subheading */}
          <p className="text-xl sm:text-2xl text-[#334155] leading-relaxed font-normal">
            ElderExpert connects retired industry veterans with organizations, emerging startups, and young professionals who need trusted insight, technical reviews, and strategic guidance.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            
            {/* Primary CTA */}
            <button
              onClick={onJoinExpert}
              className="px-8 py-4 rounded-xl text-lg font-semibold bg-[#2563EB] hover:bg-blue-700 text-white shadow-sm transition-all flex items-center justify-center gap-2.5"
            >
              <UserPlus className="w-5 h-5" aria-hidden="true" />
              <span>Join as an Expert</span>
            </button>

            {/* Secondary CTA */}
            <button
              onClick={onFindExperts}
              className="px-8 py-4 rounded-xl text-lg font-semibold bg-white hover:bg-slate-50 text-[#123B5D] border-2 border-[#123B5D] shadow-xs transition-all flex items-center justify-center gap-2.5"
            >
              <Search className="w-5 h-5 text-[#2563EB]" aria-hidden="true" />
              <span>Find an Expert</span>
            </button>

          </div>

          {/* Compact Trust Message */}
          <div className="pt-6 border-t border-slate-300/60 flex flex-wrap items-center gap-y-3 gap-x-8 text-sm sm:text-base font-medium text-[#475569]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#0F766E] flex-shrink-0" aria-hidden="true" />
              <span>100% Verified Career History</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#0F766E] flex-shrink-0" aria-hidden="true" />
              <span>Flexible Advisory & Mentorship</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#0F766E] flex-shrink-0" aria-hidden="true" />
              <span>Confidential & Protected Engagement</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
