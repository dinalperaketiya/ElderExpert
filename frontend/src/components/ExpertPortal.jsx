import React, { useState } from 'react';
import { 
  User, Briefcase, Calendar, MessageSquare, Star, FileText, CheckCircle2, 
  Clock, ShieldCheck, ChevronRight, DollarSign, Bell, ArrowLeft, Send
} from 'lucide-react';
import { initialExpertOpportunities, initialConsultationRequests, initialKnowledgeArticles } from '../services/api';

export default function ExpertPortal({ onReturnHome }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'opportunities', 'requests', 'articles', 'profile'
  const [consultations, setConsultations] = useState(initialConsultationRequests);
  const [isAvailable, setIsAvailable] = useState(true);

  const confirmRequest = (id) => {
    setConsultations(consultations.map(c => c.id === id ? { ...c, status: 'Confirmed' } : c));
  };

  const navItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: User },
    { id: 'opportunities', label: 'Recommended Projects', icon: Briefcase, badge: '3 New' },
    { id: 'requests', label: 'Consultation Requests', icon: Calendar, badge: '2 Pending' },
    { id: 'articles', label: 'My Articles & Wisdom', icon: FileText },
    { id: 'profile', label: 'Profile & Credentials', icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-[#334155] flex flex-col">
      
      {/* Portal Top Bar */}
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
            Senior Advisor Workspace
          </span>
        </div>

        {/* Advisor Profile snippet & status toggle */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600 hidden sm:inline">Advisory Status:</span>
            <button
              onClick={() => setIsAvailable(!isAvailable)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                isAvailable ? 'bg-emerald-100 text-[#0F766E]' : 'bg-slate-200 text-slate-700'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-[#0F766E]' : 'bg-slate-500'}`}></span>
              <span>{isAvailable ? 'Available for Consultations' : 'Temporarily Away'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150"
              alt="Dr. Arthur Pendelton"
              className="w-9 h-9 rounded-xl object-cover border border-slate-200"
            />
            <div className="hidden md:block text-left text-xs">
              <span className="font-bold text-[#123B5D] block">Dr. Arthur Pendelton</span>
              <span className="text-slate-500">VP Architecture (Retired)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Workspace Body */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Navigation Sidebar */}
        <aside className="lg:col-span-3 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-3 shadow-xs space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-[#123B5D] text-white shadow-xs'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-[#EAF4FF] text-[#2563EB]'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Help for Seniors */}
          <div className="p-5 bg-[#EAF4FF] rounded-2xl border border-blue-200 space-y-2">
            <h4 className="text-sm font-bold text-[#123B5D]">Need Assistance?</h4>
            <p className="text-xs text-[#334155] leading-relaxed">
              Our advisor concierge team is available to assist you with scheduling or payment questions.
            </p>
            <div className="text-xs font-bold text-[#2563EB] pt-1">
              📞 Call Concierge: 1-800-ELDER-HELP
            </div>
          </div>
        </aside>

        {/* Right Main Content */}
        <main className="lg:col-span-9 space-y-8">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Profile Completion Card */}
              <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#0F766E]" />
                    <h3 className="text-lg font-bold text-[#123B5D]">Profile 100% Verified</h3>
                  </div>
                  <p className="text-sm text-[#475569]">
                    Your 42-year engineering credentials at Intel and AMD have been verified by our executive committee.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-[#123B5D] bg-[#EAF4FF] px-4 py-2 rounded-xl">
                    Advisory Rate: $180/hr
                  </span>
                </div>
              </div>

              {/* High-Level Senior Summary Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                  <span className="text-xs font-bold text-slate-500 uppercase">Total Advisory Earnings</span>
                  <div className="text-3xl font-bold text-[#123B5D]">$4,860</div>
                  <span className="text-xs font-medium text-[#0F766E]">Direct deposit active</span>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                  <span className="text-xs font-bold text-slate-500 uppercase">Consultations Completed</span>
                  <div className="text-3xl font-bold text-[#2563EB]">27 Sessions</div>
                  <span className="text-xs font-medium text-slate-500">100% positive feedback</span>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                  <span className="text-xs font-bold text-slate-500 uppercase">Client Rating</span>
                  <div className="text-3xl font-bold text-amber-600 flex items-center gap-1">
                    <Star className="w-7 h-7 fill-amber-500 text-amber-500" />
                    <span>4.98</span>
                  </div>
                  <span className="text-xs font-medium text-slate-500">86 verified client reviews</span>
                </div>
              </div>

              {/* Pending Requests Preview */}
              <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-lg font-bold text-[#123B5D]">Recent Consultation Inquiries</h3>
                  <button
                    onClick={() => setActiveTab('requests')}
                    className="text-xs font-bold text-[#2563EB] hover:underline"
                  >
                    View All
                  </button>
                </div>

                <div className="space-y-3">
                  {consultations.map((req) => (
                    <div
                      key={req.id}
                      className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-bold text-[#123B5D]">{req.clientName}</h4>
                          <span className="text-xs text-slate-500">({req.company})</span>
                        </div>
                        <p className="text-sm text-[#334155] font-medium">{req.topic}</p>
                        <p className="text-xs text-slate-500">Requested: {req.requestedDate} • Fee: {req.fee}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        {req.status === 'Confirmed' ? (
                          <span className="px-3 py-1.5 rounded-lg bg-emerald-100 text-[#0F766E] text-xs font-bold">
                            ✓ Confirmed & Calendar Synced
                          </span>
                        ) : (
                          <button
                            onClick={() => confirmRequest(req.id)}
                            className="px-4 py-2 rounded-xl text-sm font-bold bg-[#2563EB] hover:bg-blue-700 text-white shadow-xs"
                          >
                            Accept Session
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: RECOMMENDED PROJECTS */}
          {activeTab === 'opportunities' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-[#123B5D]">Consulting & Advisory Opportunities</h3>
                <p className="text-sm text-[#475569] mt-1">
                  Projects specifically matching your VLSI, microprocessor architecture, and hardware validation experience.
                </p>
              </div>

              <div className="space-y-4">
                {initialExpertOpportunities.map((opp) => (
                  <div
                    key={opp.id}
                    className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div>
                        <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">{opp.domain}</span>
                        <h4 className="text-xl font-bold text-[#123B5D] mt-0.5">{opp.title}</h4>
                        <p className="text-sm font-semibold text-slate-600 mt-1">{opp.client} • Duration: {opp.duration}</p>
                      </div>
                      <div className="sm:text-right">
                        <span className="text-2xl font-bold text-[#123B5D] block">{opp.budget}</span>
                        <span className="text-xs font-bold text-[#0F766E] bg-emerald-50 px-2 py-0.5 rounded-md">
                          {opp.matchScore}% Match Score
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-[#334155] leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                      "{opp.description}"
                    </p>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-slate-500 font-medium">Criterion: {opp.requiredExp}</span>
                      <button
                        onClick={() => alert(`Proposal submitted for: ${opp.title}`)}
                        className="px-5 py-2.5 rounded-xl text-sm font-bold bg-[#123B5D] hover:bg-[#2563EB] text-white shadow-xs transition-colors"
                      >
                        Submit Proposal
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: CONSULTATION REQUESTS */}
          {activeTab === 'requests' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-[#123B5D]">Your Consultation Schedule</h3>
                <p className="text-sm text-[#475569] mt-1">
                  Manage upcoming 1-on-1 advisory appointments and review pending client inquiries.
                </p>
              </div>

              <div className="space-y-4">
                {consultations.map((req) => (
                  <div key={req.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs font-bold text-slate-500 uppercase">Consultation #{req.id}</span>
                        <h4 className="text-lg font-bold text-[#123B5D]">{req.topic}</h4>
                        <p className="text-sm text-[#334155] font-semibold mt-0.5">With: {req.clientName} ({req.company})</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        req.status === 'Confirmed' ? 'bg-emerald-100 text-[#0F766E]' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {req.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm text-[#475569] pt-2 border-t border-slate-100">
                      <div>
                        <span className="text-xs font-semibold text-slate-400 block">Date & Time</span>
                        <span className="font-bold text-slate-800">{req.requestedDate}</span>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-slate-400 block">Duration</span>
                        <span className="font-bold text-slate-800">{req.duration}</span>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-slate-400 block">Advisory Fee</span>
                        <span className="font-bold text-[#123B5D]">{req.fee}</span>
                      </div>
                    </div>

                    {req.status === 'Confirmed' ? (
                      <div className="p-3 bg-blue-50 rounded-xl text-xs font-bold text-[#2563EB] flex items-center justify-between">
                        <span>Video Room Link: https://meet.elderexpert.com/room-{req.id}</span>
                        <button className="underline">Copy Link</button>
                      </div>
                    ) : (
                      <button
                        onClick={() => confirmRequest(req.id)}
                        className="w-full py-3 rounded-xl text-sm font-bold bg-[#2563EB] text-white"
                      >
                        Confirm Appointment
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: ARTICLES */}
          {activeTab === 'articles' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-[#123B5D]">Published Knowledge & Wisdom</h3>
                  <p className="text-sm text-[#475569] mt-1">Share playbooks and guides to mentor the next generation.</p>
                </div>
                <button
                  onClick={() => alert('New article draft created.')}
                  className="px-4 py-2 rounded-xl text-sm font-bold bg-[#2563EB] text-white shadow-xs"
                >
                  + Write New Article
                </button>
              </div>

              <div className="space-y-4">
                {initialKnowledgeArticles.slice(0, 1).map((art) => (
                  <div key={art.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                    <span className="text-xs font-bold text-[#2563EB]">{art.category}</span>
                    <h4 className="text-lg font-bold text-[#123B5D]">{art.title}</h4>
                    <p className="text-sm text-[#475569] leading-relaxed">{art.summary}</p>
                    <div className="text-xs text-slate-500 pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span>Status: Published on Knowledge Hub</span>
                      <span className="font-bold text-slate-800">1,420 Reads • 18 Citations</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: PROFILE */}
          {activeTab === 'profile' && (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-[#123B5D]">My Senior Advisor Profile</h3>
                <p className="text-sm text-[#475569] mt-1">Review your executive history and public credentials.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Full Name</label>
                  <input
                    type="text"
                    defaultValue="Dr. Arthur Pendelton"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-base font-semibold text-[#123B5D]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Former Enterprise</label>
                  <input
                    type="text"
                    defaultValue="Intel Corporation & AMD (Retired)"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-base font-semibold text-[#123B5D]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Professional Career Summary</label>
                <textarea
                  rows={4}
                  defaultValue="Spent over four decades designing high-performance computing hardware. Now guiding hardware startups through silicon validation, tape-out readiness, and manufacturing scalability."
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-800 resize-none"
                />
              </div>

              <button
                onClick={() => alert('Profile credentials updated successfully.')}
                className="px-6 py-3 rounded-xl text-base font-bold bg-[#123B5D] text-white hover:bg-[#2563EB] transition-colors"
              >
                Save Profile Updates
              </button>
            </div>
          )}

        </main>

      </div>

    </div>
  );
}
