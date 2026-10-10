import React, { useState } from 'react';
import { Sparkles, BrainCircuit, CheckCircle2, ArrowRight, ShieldCheck, UserCheck, RefreshCw, Star } from 'lucide-react';
import { initialExperts } from '../services/api';

export default function AiMatchEngine({ onSelectExpert }) {
  const [projectGoal, setProjectGoal] = useState('Semiconductor VLSI Architecture Review for Series A Hardware Startup');
  const [industry, setIndustry] = useState('Engineering & Hardware');
  const [urgency, setUrgency] = useState('Within 48 Hours');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [matchedResults, setMatchedResults] = useState(initialExperts);

  const handleRunAiMatch = (e) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setTimeout(() => {
      const sorted = [...initialExperts].sort((a, b) => b.aiMatchScore - a.aiMatchScore);
      setMatchedResults(sorted);
      setIsAnalyzing(false);
    }, 1000);
  };

  return (
    <section className="py-16 bg-slate-50 text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 text-sky-800 text-sm font-extrabold">
            <BrainCircuit className="w-5 h-5 text-sky-600" />
            <span>AI Neural Recommendation Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            AI-Powered Expert Recommendation
          </h2>
          <p className="text-slate-700 text-base font-medium">
            Input your project scope or mentorship goal. Our AI system matches you with the ideal retired industry authority.
          </p>
        </div>

        {/* Interactive Query Form */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-xl max-w-4xl mx-auto space-y-6">
          <form onSubmit={handleRunAiMatch} className="space-y-6">
            
            <div>
              <label className="block text-sm font-extrabold text-slate-900 mb-2">
                Project Scope / Technical Challenge Description
              </label>
              <textarea
                rows={3}
                value={projectGoal}
                onChange={(e) => setProjectGoal(e.target.value)}
                placeholder="Describe your technical challenge, board advisory need, or mentorship goals..."
                className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-base text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:border-sky-600 focus:bg-white resize-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-extrabold text-slate-900 mb-2">
                  Target Domain / Industry
                </label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-base font-semibold text-slate-900 focus:outline-none focus:border-sky-600 focus:bg-white"
                >
                  <option value="Engineering & Hardware">Engineering & Hardware</option>
                  <option value="Finance & M&A">Finance & M&A</option>
                  <option value="Operations & Logistics">Operations & Logistics</option>
                  <option value="Healthcare & Biotech">Healthcare & Biotech</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-extrabold text-slate-900 mb-2">
                  Required Availability
                </label>
                <select
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-base font-semibold text-slate-900 focus:outline-none focus:border-sky-600 focus:bg-white"
                >
                  <option value="Within 48 Hours">Within 48 Hours (Urgent Call)</option>
                  <option value="This Week">This Week</option>
                  <option value="Monthly Retainer">Monthly Advisory Board Seat</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isAnalyzing}
              className="w-full py-4 rounded-2xl font-extrabold bg-sky-600 hover:bg-sky-700 text-white text-base transition-all flex items-center justify-center gap-2 shadow-lg shadow-sky-600/20"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin text-white" />
                  <span>AI Neural Engine Analyzing Profiles...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-white" />
                  <span>Calculate AI Expert Recommendations</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* AI Recommendations List */}
        <div className="space-y-6 max-w-5xl mx-auto">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-sky-600" />
              <span>Top AI Matched Veteran Experts ({matchedResults.length})</span>
            </h3>
            <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-3.5 py-1.5 rounded-full border border-emerald-200">
              High Match Confidence
            </span>
          </div>

          <div className="space-y-4">
            {matchedResults.map((expert, idx) => (
              <div
                key={expert.id}
                className="bg-white p-6 rounded-3xl border-2 border-slate-200 hover:border-sky-500 shadow-md transition-all flex flex-col md:flex-row items-center justify-between gap-6"
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={expert.avatar}
                      alt={expert.name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-sky-600"
                    />
                    <span className="absolute -top-2 -left-2 w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-black">
                      #{idx + 1}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h4 className="text-xl font-extrabold text-slate-900">{expert.name}</h4>
                      <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-black border border-sky-200">
                        {expert.aiMatchScore}% AI Match
                      </span>
                    </div>
                    <p className="text-sm font-extrabold text-sky-700">{expert.title} — {expert.formerCompany}</p>
                    <p className="text-xs font-bold text-slate-600">{expert.experienceYears} Years Experience • ${expert.hourlyRate}/hr</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                  <button
                    onClick={() => onSelectExpert(expert)}
                    className="w-full md:w-auto px-6 py-3.5 rounded-2xl font-extrabold bg-sky-600 hover:bg-sky-700 text-white text-sm transition-all shadow-md shadow-sky-600/20 flex items-center justify-center gap-2"
                  >
                    <span>Book Consultation</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
