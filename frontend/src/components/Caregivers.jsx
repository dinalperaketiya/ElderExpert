import React, { useState } from 'react';
import { Star, ShieldCheck, MapPin, Award, Filter, Search, Calendar, Sparkles, Building2, Briefcase, ArrowRight } from 'lucide-react';

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
    <section className="py-16 bg-slate-100 text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-300 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-extrabold uppercase mb-2">
              <Award className="w-4 h-4 text-sky-600" />
              <span>Verified Senior Industry Leaders</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Directory of Veteran Experts
            </h2>
            <p className="text-slate-700 text-base font-semibold mt-1">
              Connect with retired executives and senior principal engineers for short-term advisory and mentorship.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative min-w-[320px]">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by skill, company, or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border-2 border-slate-300 text-base font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-600 shadow-sm"
            />
          </div>
        </div>

        {/* Domain Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <Filter className="w-5 h-5 text-slate-500 flex-shrink-0 mr-1" />
          {domains.map((dom) => (
            <button
              key={dom}
              onClick={() => setSelectedDomain(dom)}
              className={`px-5 py-3 rounded-2xl text-sm font-extrabold whitespace-nowrap transition-all ${
                selectedDomain === dom
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
                  : 'bg-white border-2 border-slate-200 text-slate-700 hover:border-slate-300'
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
              className="bg-white rounded-3xl p-7 border-2 border-slate-200 shadow-lg space-y-6 hover:border-sky-500 transition-all flex flex-col justify-between"
            >
              
              {/* Top Header: Photo + Title + AI Score */}
              <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                  <img
                    src={expert.avatar}
                    alt={expert.name}
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-sky-600"
                  />
                  {expert.verified && (
                    <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center text-white shadow-md" title="Verified Senior Expert">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-extrabold text-slate-900">
                      {expert.name}
                    </h3>
                    
                    <div className="flex items-center gap-1.5 bg-sky-100 px-3 py-1 rounded-full text-xs font-black text-sky-800 border border-sky-200">
                      <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                      <span>{expert.aiMatchScore}% Match</span>
                    </div>
                  </div>

                  <p className="text-sm font-extrabold text-sky-700">{expert.title}</p>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-600 pt-1">
                    <span className="flex items-center gap-1 text-slate-800">
                      <Building2 className="w-4 h-4 text-slate-500" /> {expert.formerCompany}
                    </span>
                    <span className="flex items-center gap-1 text-slate-800">
                      <Award className="w-4 h-4 text-slate-500" /> {expert.experienceYears} Yrs Exp
                    </span>
                  </div>
                </div>
              </div>

              {/* Bio & Skill Tags */}
              <div className="space-y-3">
                <p className="text-sm text-slate-700 leading-relaxed font-medium italic bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  "{expert.bio}"
                </p>

                <div className="flex flex-wrap items-center gap-2">
                  {expert.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-extrabold text-slate-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pricing & Booking Button */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase block">Consulting Rate</span>
                  <div className="text-2xl font-black text-slate-900">
                    ${expert.hourlyRate} <span className="text-xs font-bold text-slate-500">/ hr</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex items-center gap-1 text-xs font-extrabold text-amber-800 bg-amber-100 px-3 py-1 rounded-xl border border-amber-200">
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                    <span>{expert.rating}</span>
                  </div>

                  <button
                    onClick={() => onSelectExpert(expert)}
                    className="flex items-center gap-2 px-6 py-3 rounded-2xl font-extrabold bg-sky-600 hover:bg-sky-700 text-white text-sm transition-all shadow-md shadow-sky-600/20"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Advisory Call</span>
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
