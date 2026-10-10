import React, { useState } from 'react';
import { 
  Building2, Search, Briefcase, Sparkles, Bookmark, Calendar, ArrowLeft, 
  ShieldCheck, Star, ChevronRight, UserCheck, Plus, CheckCircle2
} from 'lucide-react';
import { initialExperts } from '../services/api';

export default function CompanyPortal({ onReturnHome, onSelectExpert }) {
  const [activeTab, setActiveTab] = useState('discover'); // 'overview', 'discover', 'projects', 'saved'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('All');
  const [savedExperts, setSavedExperts] = useState([1, 2]);

  const toggleSave = (id) => {
    if (savedExperts.includes(id)) {
      setSavedExperts(savedExperts.filter(e => e !== id));
    } else {
      setSavedExperts([...savedExperts, id]);
    }
  };

  const domains = [
    'All',
    'Technology & Hardware',
    'Finance & M&A',
    'Operations & Supply Chain',
    'Life Sciences & Healthcare'
  ];

  const filtered = initialExperts.filter((exp) => {
    const q = searchTerm.toLowerCase();
    const matchQ = exp.name.toLowerCase().includes(q) || exp.title.toLowerCase().includes(q) || exp.skills.some(s => s.toLowerCase().includes(q));
    const matchD = selectedDomain === 'All' || exp.domain === selectedDomain;
    return matchQ && matchD;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-[#334155] flex flex-col">
      
      {/* Top Navbar */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onReturnHome}
            className="p-2 rounded-xl text-slate-600 hover:text-[#123B5D] hover:bg-slate-100 flex items-center gap-1.5 text-sm font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to ElderExpert Home</span>
          </button>
          <div className="h-5 w-px bg-slate-300 hidden sm:block"></div>
          <span className="text-sm font-bold text-[#123B5D] hidden sm:block">
            Enterprise Hirer Workspace
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-[#0F766E] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Corporate Account: AcroTech Dynamics Inc.
          </span>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Navigation */}
        <aside className="lg:col-span-3 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-3 shadow-xs space-y-1">
            {[
              { id: 'discover', label: 'Discover Experts', icon: Search },
              { id: 'overview', label: 'Overview & Matches', icon: Sparkles, badge: 'High Match' },
              { id: 'projects', label: 'My Posted Needs', icon: Briefcase },
              { id: 'saved', label: 'Saved Advisors', icon: Bookmark, badge: savedExperts.length.toString() },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-semibold transition-colors ${
                    isActive ? 'bg-[#123B5D] text-white shadow-xs' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge && (
                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-[#EAF4FF] text-[#2563EB]'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="bg-[#EAF4FF] p-5 rounded-2xl border border-blue-200 space-y-2">
            <h4 className="text-sm font-bold text-[#123B5D]">Post a Project Need</h4>
            <p className="text-xs text-[#334155] leading-relaxed">
              Describe your engineering audit, valuation review, or board seat need. Our concierge will shortlist top matching veterans.
            </p>
            <button
              onClick={() => alert('Post Project Wizard opened.')}
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#2563EB] text-white shadow-xs mt-2"
            >
              + Post New Requirement
            </button>
          </div>
        </aside>

        {/* Right Content */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* TAB: DISCOVER EXPERTS */}
          {activeTab === 'discover' && (
            <div className="space-y-6">
              
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-[#123B5D]">Discover Senior Advisors</h3>
                  <p className="text-sm text-[#475569]">Search verified retired professionals with deep specialized credentials.</p>
                </div>

                <div className="relative min-w-[280px]">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by skill, company, or role..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-300 text-sm text-[#334155] focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
              </div>

              {/* Domain filters */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {domains.map((dom) => (
                  <button
                    key={dom}
                    onClick={() => setSelectedDomain(dom)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                      selectedDomain === dom
                        ? 'bg-[#123B5D] text-white'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {dom}
                  </button>
                ))}
              </div>

              {/* Experts List */}
              <div className="space-y-4">
                {filtered.map((exp) => (
                  <div
                    key={exp.id}
                    className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-[#2563EB] transition-all space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <img
                          src={exp.avatar}
                          alt={exp.name}
                          className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-100"
                        />
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="text-lg font-bold text-[#123B5D]">{exp.name}</h4>
                            <span className="text-xs font-bold text-[#0F766E] bg-emerald-50 px-2 py-0.5 rounded-md">
                              Verified
                            </span>
                          </div>
                          <p className="text-sm font-semibold text-[#2563EB]">{exp.title}</p>
                          <p className="text-xs text-slate-500">{exp.formerCompany} • {exp.experienceYears} Years Exp</p>
                        </div>
                      </div>

                      <div className="sm:text-right flex sm:flex-col items-center sm:items-end justify-between gap-2">
                        <span className="text-xl font-bold text-[#123B5D]">${exp.hourlyRate}/hr</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleSave(exp.id)}
                            className={`p-2 rounded-xl text-xs font-bold border transition-colors ${
                              savedExperts.includes(exp.id)
                                ? 'bg-blue-50 border-blue-200 text-[#2563EB]'
                                : 'border-slate-200 text-slate-500 hover:bg-slate-100'
                            }`}
                            title="Save expert"
                          >
                            <Bookmark className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onSelectExpert(exp)}
                            className="px-4 py-2 rounded-xl text-xs font-bold bg-[#2563EB] text-white hover:bg-blue-700 shadow-xs"
                          >
                            View & Consult
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Transparent AI Match Reason */}
                    <div className="p-3 bg-[#EAF4FF] rounded-xl border border-blue-100 text-xs text-[#123B5D] space-y-0.5">
                      <div className="flex items-center gap-1.5 font-bold text-[#2563EB]">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Why ElderExpert Recommends This Advisor ({exp.aiMatchScore}% Compatibility):</span>
                      </div>
                      <p className="text-slate-700 font-medium pl-5">
                        {exp.matchReason}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {exp.skills.map((s, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-md bg-slate-100 text-xs text-slate-700 font-medium">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB: OVERVIEW & MATCHES */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-[#123B5D]">Compatibility shortlists for AcroTech Dynamics</h3>
                <p className="text-sm text-[#475569] mt-1">Experts identified based on your ongoing hardware accelerator project specs.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {initialExperts.slice(0, 2).map((exp) => (
                  <div key={exp.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                    <div className="flex items-center gap-3">
                      <img src={exp.avatar} alt={exp.name} className="w-14 h-14 rounded-xl object-cover" />
                      <div>
                        <h4 className="font-bold text-[#123B5D]">{exp.name}</h4>
                        <span className="text-xs font-bold text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded-md">
                          {exp.aiMatchScore}% Compatibility
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-[#334155] leading-relaxed font-medium bg-slate-50 p-3 rounded-xl border border-slate-200">
                      "{exp.matchReason}"
                    </p>
                    <button
                      onClick={() => onSelectExpert(exp)}
                      className="w-full py-2.5 rounded-xl text-xs font-bold bg-[#123B5D] hover:bg-[#2563EB] text-white transition-colors"
                    >
                      Schedule Advisory Session
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: POSTED PROJECTS */}
          {activeTab === 'projects' && (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-xl font-bold text-[#123B5D]">Your Posted Project Needs</h3>
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-[#123B5D]">VLSI Architecture & Tape-Out Audit</h4>
                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-[#0F766E] text-xs font-bold">Active</span>
                </div>
                <p className="text-xs text-slate-600">Budget: $5,400 • 3 Proposals Received from Verified Retired Architects</p>
                <button
                  onClick={() => setActiveTab('discover')}
                  className="text-xs font-bold text-[#2563EB] underline"
                >
                  View Received Expert Submissions
                </button>
              </div>
            </div>
          )}

          {/* TAB: SAVED */}
          {activeTab === 'saved' && (
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-[#123B5D]">Bookmarked Senior Advisors ({savedExperts.length})</h3>
              <div className="space-y-3">
                {initialExperts.filter(e => savedExperts.includes(e.id)).map(e => (
                  <div key={e.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={e.avatar} alt={e.name} className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <h4 className="font-bold text-[#123B5D]">{e.name}</h4>
                        <p className="text-xs text-slate-500">{e.title} • ${e.hourlyRate}/hr</p>
                      </div>
                    </div>
                    <button
                      onClick={() => onSelectExpert(e)}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-[#2563EB] text-white"
                    >
                      Book Call
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>

      </div>

    </div>
  );
}
