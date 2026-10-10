import React, { useState } from 'react';
import { Star, ShieldCheck, MapPin, Award, Filter, Search, Calendar, Sparkles, Building, Briefcase, ChevronRight } from 'lucide-react';

export default function Caregivers({ experts, onSelectExpert, searchFilter }) {
  const [searchTerm, setSearchTerm] = useState(searchFilter || '');
  const [selectedDomain, setSelectedDomain] = useState('All');

  const domains = [
    'All',
    'Engineering & Hardware',
    'Finance & M&A',
    'Operations & Logistics',
    'Healthcare & Biotech'
  ];

  const filteredExperts = experts.filter((expert) => {
    const query = searchTerm.toLowerCase();
    const matchesSearch = expert.name.toLowerCase().includes(query) ||
                          expert.title.toLowerCase().includes(query) ||
                          expert.formerCompany.toLowerCase().includes(query) ||
                          expert.skills.some(s => s.toLowerCase().includes(query));
    const matchesDomain = selectedDomain === 'All' || expert.domain === selectedDomain;
    return matchesSearch && matchesDomain;
  });

  return (
    <section className="py-16 bg-slate-950 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase mb-2">
              <Award className="w-3.5 h-3.5" />
              <span>Verified Retired Industry Leaders</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Explore Senior Experts & Advisors
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Hire retired executives, veteran principal engineers, and domain authorities for short-term consulting and mentorship.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative min-w-[320px]">
            <Search className="w-4.5 h-4.5 text-sky-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter by skill, company, or domain..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-700/80 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-sky-500 transition-all"
            />
          </div>
        </div>

        {/* Domain Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <Filter className="w-4 h-4 text-slate-500 flex-shrink-0 mr-1" />
          {domains.map((dom) => (
            <button
              key={dom}
              onClick={() => setSelectedDomain(dom)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedDomain === dom
                  ? 'bg-gradient-to-r from-sky-500 to-emerald-400 text-slate-950 shadow-md shadow-sky-500/20 font-extrabold'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              {dom}
            </button>
          ))}
        </div>

        {/* Expert Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredExperts.map((expert) => (
            <div
              key={expert.id}
              className="glass-card glass-card-hover rounded-3xl p-6 sm:p-7 border border-slate-800 flex flex-col justify-between space-y-6 relative overflow-hidden"
            >
              
              {/* Top Header: Avatar + Match Score + Rating */}
              <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                  <img
                    src={expert.avatar}
                    alt={expert.name}
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-700"
                  />
                  {expert.verified && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-slate-950 shadow-md" title="Verified Senior Expert">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                      {expert.name}
                    </h3>
                    
                    {/* AI Score Badge */}
                    <div className="flex items-center gap-1.5 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20 text-xs font-bold text-sky-400">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{expert.aiMatchScore}% Match</span>
                    </div>
                  </div>

                  <p className="text-xs font-bold text-emerald-400">{expert.title}</p>

                  <div className="flex items-center gap-3 text-xs text-slate-400 pt-1">
                    <span className="flex items-center gap-1 font-medium text-slate-300">
                      <Building className="w-3.5 h-3.5 text-slate-500" /> {expert.formerCompany}
                    </span>
                    <span className="flex items-center gap-1 font-medium text-slate-300">
                      <Award className="w-3.5 h-3.5 text-slate-500" /> {expert.experienceYears} Yrs Exp
                    </span>
                  </div>
                </div>
              </div>

              {/* Bio & Skills Tags */}
              <div className="space-y-3">
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{expert.bio}"
                </p>

                <div className="flex flex-wrap items-center gap-1.5">
                  {expert.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-semibold text-sky-400"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pricing & Booking Action */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block font-semibold">Consulting Rate</span>
                  <div className="text-xl font-extrabold text-white">
                    ${expert.hourlyRate} <span className="text-xs text-slate-400 font-normal">/ hr</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex items-center gap-1 text-xs text-amber-400 font-bold bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{expert.rating}</span>
                  </div>

                  <button
                    onClick={() => onSelectExpert(expert)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all text-xs shadow-md shadow-emerald-500/20"
                  >
                    <Calendar className="w-4 h-4 text-slate-950" />
                    <span>Book Advisory Session</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
