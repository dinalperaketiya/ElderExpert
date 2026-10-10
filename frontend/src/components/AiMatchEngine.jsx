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
      // Simulate intelligent re-ranking
      const sorted = [...initialExperts].sort((a, b) => b.aiMatchScore - a.aiMatchScore);
      setMatchedResults(sorted);
      setIsAnalyzing(false);
    }, 1200);
  };

  return (
    <section className="py-16 bg-slate-900 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold uppercase">
            <BrainCircuit className="w-4 h-4 text-sky-400 animate-pulse" />
            <span>AI Neural Matching Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            AI-Powered Expert Recommendation
          </h2>
          <p className="text-slate-400 text-sm">
            Input your project requirements or mentorship goals. Our AI matches your exact technical needs with verified retired industry legends.
          </p>
        </div>

        {/* Interactive Query Form */}
        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 max-w-4xl mx-auto space-y-6">
          <form onSubmit={handleRunAiMatch} className="space-y-6">
            
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Project Scope / Mentorship Need
              </label>
              <textarea
                rows={3}
                value={projectGoal}
                onChange={(e) => setProjectGoal(e.target.value)}
                placeholder="Describe your technical challenge, board advisory need, or mentorship goals..."
                className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-all resize-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Target Domain / Industry
                </label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-sky-500"
                >
                  <option value="Engineering & Hardware">Engineering & Hardware</option>
                  <option value="Finance & M&A">Finance & M&A</option>
                  <option value="Operations & Logistics">Operations & Logistics</option>
                  <option value="Healthcare & Biotech">Healthcare & Biotech</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Required Availability
                </label>
                <select
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-sky-500"
                >
                  <option value="Within 48 Hours">Within 48 Hours (Urgent)</option>
                  <option value="This Week">This Week</option>
                  <option value="Monthly Retainer">Monthly Advisory Board Seat</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isAnalyzing}
              className="w-full py-4 rounded-2xl font-extrabold bg-gradient-to-r from-sky-500 to-emerald-400 text-slate-950 hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin text-slate-950" />
                  <span>AI Neural Engine Analyzing 10,000+ Profiles...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-slate-950" />
                  <span>Calculate AI Expert Recommendations</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* AI Recommendations List */}
        <div className="space-y-6 max-w-5xl mx-auto">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-sky-400" />
              <span>Top AI Matched Veteran Experts ({matchedResults.length})</span>
            </h3>
            <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              High Confidence Match
            </span>
          </div>

          <div className="space-y-4">
            {matchedResults.map((expert, idx) => (
              <div
                key={expert.id}
                className="glass-card p-6 rounded-3xl border border-slate-800 hover:border-sky-500/40 transition-all flex flex-col md:flex-row items-center justify-between gap-6"
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={expert.avatar}
                      alt={expert.name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-sky-400"
                    />
                    <span className="absolute -top-2 -left-2 w-7 h-7 rounded-full bg-slate-950 border border-sky-400 flex items-center justify-center text-xs font-black text-sky-400">
                      #{idx + 1}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h4 className="text-lg font-extrabold text-white">{expert.name}</h4>
                      <span className="px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-400 text-xs font-extrabold border border-sky-500/30">
                        {expert.aiMatchScore}% AI Match
                      </span>
                    </div>
                    <p className="text-xs text-emerald-400 font-semibold">{expert.title} — {expert.formerCompany}</p>
                    <p className="text-xs text-slate-400">{expert.experienceYears} Years Experience • ${expert.hourlyRate}/hr</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                  <button
                    onClick={() => onSelectExpert(expert)}
                    className="w-full md:w-auto px-5 py-3 rounded-xl font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs transition-all flex items-center justify-center gap-2 shadow-md"
                  >
                    <span>Book Expert Consultation</span>
                    <ArrowRight className="w-4 h-4 text-slate-950" />
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
