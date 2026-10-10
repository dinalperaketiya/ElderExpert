import React, { useState } from 'react';
import { Search, ShieldCheck, Star, Award, Calendar, ChevronRight, User, Filter } from 'lucide-react';

export default function FeaturedExperts({ experts, onSelectExpert, onRequestConsultation }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All');

  const domains = [
    'All',
    'Technology & Hardware',
    'Finance & M&A',
    'Operations & Supply Chain',
    'Life Sciences & Healthcare',
    'Legal & Regulatory',
    'Business Strategy & Governance'
  ];

  const filteredExperts = experts.filter((expert) => {
    const q = searchTerm.toLowerCase();
    const matchesSearch = expert.name.toLowerCase().includes(q) ||
                          expert.title.toLowerCase().includes(q) ||
                          expert.formerCompany.toLowerCase().includes(q) ||
                          expert.skills.some(s => s.toLowerCase().includes(q));
    const matchesDomain = selectedDomain === 'All' || expert.domain === selectedDomain;
    return matchesSearch && matchesDomain;
  });

  return (
    <section id="public-experts" className="py-20 bg-white border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] block">
              Verified Industry Advisors
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#123B5D]">
              Featured Senior Experts
            </h2>
            <p className="text-base sm:text-lg text-[#475569]">
              Explore retired leaders, principal architects, and senior directors available for consulting, technical reviews, and mentorship.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative min-w-[280px] sm:min-w-[340px]">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" aria-hidden="true" />
            <input
              type="text"
              placeholder="Search by name, former role, or skill..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-base text-[#334155] placeholder-slate-400 focus:outline-none focus:border-[#2563EB] focus:bg-white"
              aria-label="Search experts directory"
            />
          </div>
        </div>

        {/* Domain Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none" role="tablist" aria-label="Filter by industry">
          <Filter className="w-4 h-4 text-slate-400 flex-shrink-0 mr-1" aria-hidden="true" />
          {domains.map((dom) => (
            <button
              key={dom}
              role="tab"
              aria-selected={selectedDomain === dom}
              onClick={() => setSelectedDomain(dom)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors ${
                selectedDomain === dom
                  ? 'bg-[#123B5D] text-white shadow-xs'
                  : 'bg-slate-100 text-[#475569] hover:bg-slate-200'
              }`}
            >
              {dom}
            </button>
          ))}
        </div>

        {/* Experts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredExperts.map((expert) => (
            <div
              key={expert.id}
              className="ee-card p-7 flex flex-col justify-between space-y-6 ee-card-hover"
            >
              
              {/* Top: Avatar/Initials + Verification + Rating */}
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    {expert.avatar ? (
                      <img
                        src={expert.avatar}
                        alt={expert.name}
                        className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-100 shadow-xs"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-2xl bg-[#EAF4FF] text-[#123B5D] font-bold text-xl flex items-center justify-center border-2 border-blue-200">
                        {expert.initials}
                      </div>
                    )}

                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-lg font-bold text-[#123B5D]">
                          {expert.name}
                        </h3>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-[#0F766E] bg-emerald-50 px-2 py-0.5 rounded-md mt-0.5">
                        <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Verified Career</span>
                      </span>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <span className="text-xs font-semibold text-slate-500 block">Rate</span>
                    <span className="text-lg font-bold text-[#123B5D]">${expert.hourlyRate}/hr</span>
                  </div>
                </div>

                {/* Title & Former Enterprise */}
                <div>
                  <h4 className="text-sm font-bold text-[#2563EB] leading-snug">
                    {expert.title}
                  </h4>
                  <p className="text-xs font-semibold text-slate-500 mt-0.5">
                    {expert.formerCompany} • {expert.experienceYears} Yrs Exp
                  </p>
                </div>

                {/* Short Bio */}
                <p className="text-sm text-[#334155] leading-relaxed line-clamp-3">
                  {expert.bio}
                </p>

                {/* Key Skills Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {expert.skills.slice(0, 3).map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 text-xs font-medium text-slate-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Availability info */}
                <div className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 pt-2 border-t border-slate-100">
                  <Calendar className="w-3.5 h-3.5 text-[#2563EB]" aria-hidden="true" />
                  <span>{expert.availability}</span>
                </div>
              </div>

              {/* Bottom Card Actions: View Profile & Request Consultation */}
              <div className="pt-2 grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => onSelectExpert(expert)}
                  className="py-2.5 px-3 rounded-xl text-sm font-semibold text-[#123B5D] bg-slate-100 hover:bg-slate-200 transition-colors text-center"
                >
                  View Profile
                </button>
                <button
                  onClick={() => onRequestConsultation(expert)}
                  className="py-2.5 px-3 rounded-xl text-sm font-semibold bg-[#2563EB] hover:bg-blue-700 text-white shadow-xs transition-colors text-center"
                >
                  Consult
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
