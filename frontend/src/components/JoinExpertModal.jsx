import React, { useState } from 'react';
import { Award, UserCheck, X, CheckCircle2, ShieldCheck, Briefcase } from 'lucide-react';

export default function JoinExpertModal({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [formerTitle, setFormerTitle] = useState('');
  const [company, setCompany] = useState('');
  const [years, setYears] = useState('30');
  const [domain, setDomain] = useState('Engineering & Hardware');
  const [hourlyRate, setHourlyRate] = useState('150');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  const handleReset = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="glass-card w-full max-w-lg rounded-3xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl relative space-y-6">
        
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center space-y-6 py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-white">Application Received!</h3>
              <p className="text-sm text-slate-300">
                Thank you for applying to share your institutional wisdom. Our verification team will review your executive career credentials within 24 hours.
              </p>
            </div>

            <button
              onClick={handleReset}
              className="w-full py-3.5 rounded-xl font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20"
            >
              Done & Return
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold uppercase mb-2">
                <UserCheck className="w-3.5 h-3.5" />
                <span>Join Veteran Network</span>
              </div>
              <h3 className="text-xl font-extrabold text-white">Share Your Expertise & Earn Income</h3>
              <p className="text-xs text-slate-400 mt-1">Preserve institutional knowledge and mentor the next generation of industry leaders.</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                placeholder="Dr. Arthur Pendelton"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-sky-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Former Position / Title</label>
                <input
                  type="text"
                  placeholder="VP of Engineering"
                  value={formerTitle}
                  onChange={(e) => setFormerTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-sky-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Former Enterprise / Company</label>
                <input
                  type="text"
                  placeholder="Intel Corporation (Retired)"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-sky-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Total Yrs Exp</label>
                <input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-sky-500"
                  required
                />
              </div>

              <div className="col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1">Desired Consulting Rate ($/hr)</label>
                <input
                  type="number"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white font-bold focus:outline-none focus:border-sky-500"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-extrabold bg-gradient-to-r from-sky-500 to-emerald-400 text-slate-950 transition-all shadow-lg shadow-sky-500/20"
            >
              Submit Expert Verification Profile
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
