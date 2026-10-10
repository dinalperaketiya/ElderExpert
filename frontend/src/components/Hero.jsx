import React, { useState } from 'react';
import { Search, Sparkles, UserCheck, Building2, ShieldCheck, Award, HeartHandshake, ArrowRight } from 'lucide-react';

export default function Hero({ onSearchQuery, onOpenLoginModal }) {
  const [query, setQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query) onSearchQuery(query);
  };

  return (
    <section className="relative overflow-hidden py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
      
      {/* Background Image Layer: User's Uploaded Office Collaboration Photo */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 pointer-events-none"
        style={{ backgroundImage: `url('/office-bg.jpg')` }}
      ></div>
      
      {/* Light Overlay Gradient for high text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-slate-50/90 to-slate-100/95 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Top Announcement Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 border border-sky-200 text-sky-800 text-sm font-extrabold">
          <HeartHandshake className="w-5 h-5 text-sky-600" />
          <span>Bridging Generations — Senior Knowledge & Executive Advisory Platform</span>
        </div>

        {/* Hero Main Headline */}
        <div className="max-w-4xl space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-tight tracking-tight">
            Connecting Retired Industry Legends with <span className="text-sky-600">Companies & Mentees</span>.
          </h1>

          <p className="text-xl sm:text-2xl text-slate-700 leading-relaxed font-semibold">
            ElderExpert provides retired professionals an easy, rewarding way to share decades of wisdom, earn consulting income, and mentor the next generation.
          </p>
        </div>

        {/* Dual Portal Action Cards (Elder Experts vs Companies) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
          
          {/* Card 1: For Retired Senior Experts */}
          <div className="bg-white rounded-3xl p-8 border-2 border-sky-200 shadow-xl space-y-6 hover:border-sky-500 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-sky-600 text-white flex items-center justify-center shadow-md">
                <UserCheck className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-black text-sky-700 uppercase tracking-wider block">For Retired Professionals</span>
                <h3 className="text-2xl font-extrabold text-slate-900">Are You a Senior Expert?</h3>
              </div>
            </div>

            <p className="text-base text-slate-600 leading-relaxed font-medium">
              Share your industry expertise, set your own flexible hours, mentor young professionals, and earn advisory income.
            </p>

            <button
              onClick={() => onOpenLoginModal('expert')}
              className="w-full py-4 rounded-2xl font-extrabold bg-sky-600 hover:bg-sky-700 text-white text-base shadow-lg shadow-sky-600/20 flex items-center justify-center gap-3 transition-all"
            >
              <span>Join as Senior Expert / Mentor</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>

          {/* Card 2: For Companies & Hirers */}
          <div className="bg-white rounded-3xl p-8 border-2 border-emerald-200 shadow-xl space-y-6 hover:border-emerald-500 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                <Building2 className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-black text-emerald-700 uppercase tracking-wider block">For Organizations & Startups</span>
                <h3 className="text-2xl font-extrabold text-slate-900">Need Expert Guidance?</h3>
              </div>
            </div>

            <p className="text-base text-slate-600 leading-relaxed font-medium">
              Hire verified veteran executives for short-term projects, technical code/chip reviews, and board advisory seats.
            </p>

            <button
              onClick={() => onOpenLoginModal('company')}
              className="w-full py-4 rounded-2xl font-extrabold bg-emerald-600 hover:bg-emerald-700 text-white text-base shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-3 transition-all"
            >
              <span>Hire a Senior Industry Advisor</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>

        </div>

        {/* Easy Search Bar */}
        <div className="max-w-4xl bg-white p-4 rounded-3xl border-2 border-slate-200 shadow-lg space-y-3">
          <label className="block text-sm font-extrabold text-slate-900">
            🔍 Search Retired Experts by Skill or Industry
          </label>

          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-center gap-3">
            <input
              type="text"
              placeholder="E.g., Semiconductor VP, Clinical FDA Expert, M&A Finance Director..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-300 text-base font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-600 focus:bg-white"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl font-extrabold bg-slate-900 hover:bg-slate-800 text-white text-base transition-all shadow-md"
            >
              Find Experts Now
            </button>
          </form>
        </div>

        {/* Senior Trust Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-200 max-w-5xl">
          <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <ShieldCheck className="w-8 h-8 text-sky-600 flex-shrink-0" />
            <div>
              <div className="text-base font-extrabold text-slate-900">100% Verified Credentials</div>
              <div className="text-xs text-slate-600">Executive background checked</div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <Award className="w-8 h-8 text-emerald-600 flex-shrink-0" />
            <div>
              <div className="text-base font-extrabold text-slate-900">35+ Years Avg. Experience</div>
              <div className="text-xs text-slate-600">Battle-tested industry wisdom</div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <Sparkles className="w-8 h-8 text-indigo-600 flex-shrink-0" />
            <div>
              <div className="text-base font-extrabold text-slate-900">AI Match Guarantee</div>
              <div className="text-xs text-slate-600">Smart project recommendation</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
