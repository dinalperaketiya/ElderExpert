import React, { useState } from 'react';
import { Calendar, Clock, User, CheckCircle2, X, Sparkles, Building, Briefcase } from 'lucide-react';

export default function BookingModal({ isOpen, onClose, selectedExpert, selectedService }) {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('10:00');
  const [sessionType, setSessionType] = useState('60-Min 1-on-1 Mentorship');
  const [projectBrief, setProjectBrief] = useState('');
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

  const title = selectedExpert
    ? `Book Advisory Session: ${selectedExpert.name}`
    : selectedService
    ? `Book Service: ${selectedService.title}`
    : 'Schedule Senior Expert Consultation';

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
              <h3 className="text-2xl font-extrabold text-white">Consultation Request Submitted!</h3>
              <p className="text-sm text-slate-300">
                Your request has been routed to the expert via AI matching assistant. Calendar invite and preparation agenda will be sent to your email.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-left text-xs space-y-2 text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Scheduled Date:</span>
                <span className="font-bold text-white">{date} at {time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Engagement Type:</span>
                <span className="font-bold text-sky-400">{sessionType}</span>
              </div>
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
              <h3 className="text-xl font-extrabold text-white">{title}</h3>
              {selectedExpert && (
                <p className="text-xs text-emerald-400 font-bold mt-1">
                  {selectedExpert.title} — {selectedExpert.formerCompany} (${selectedExpert.hourlyRate}/hr)
                </p>
              )}
            </div>

            {/* Date & Time Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-sky-400" /> Preferred Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-sky-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-sky-400" /> Start Time
                </label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-sky-500"
                  required
                />
              </div>
            </div>

            {/* Engagement Type selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Engagement Format</label>
              <select
                value={sessionType}
                onChange={(e) => setSessionType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-sky-500"
              >
                <option value="60-Min 1-on-1 Mentorship">60-Min 1-on-1 Mentorship Call</option>
                <option value="Technical Architecture Audit">Technical Architecture / Code Audit</option>
                <option value="Strategy & M&A Pitch Review">Strategy & Investor Pitch Review</option>
                <option value="Fractional Advisory Board Retainer">Fractional Board Seat Retainer</option>
              </select>
            </div>

            {/* Brief notes */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Project Brief / Questions for Expert</label>
              <textarea
                rows={3}
                placeholder="Detail your company goal, technical specs, or specific advice needed from this veteran expert..."
                value={projectBrief}
                onChange={(e) => setProjectBrief(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-sky-500 resize-none"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-extrabold bg-gradient-to-r from-sky-500 to-emerald-400 text-slate-950 transition-all shadow-lg shadow-sky-500/20"
            >
              Send Advisory Consultation Request
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
