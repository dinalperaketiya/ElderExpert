import React, { useState } from 'react';
import { X, ShieldCheck, Star, Award, Calendar, Clock, CheckCircle2, Building2, MapPin } from 'lucide-react';

export default function ExpertProfileModal({ isOpen, onClose, expert }) {
  const [requestedDate, setRequestedDate] = useState(new Date().toISOString().split('T')[0]);
  const [requestedTime, setRequestedTime] = useState('10:00');
  const [sessionTopic, setSessionTopic] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !expert) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in" role="dialog" aria-modal="true">
      <div className="bg-white w-full max-w-2xl rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors"
          aria-label="Close Profile Dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-8 space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#0F766E] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-[#123B5D]">Consultation Request Dispatched</h3>
              <p className="text-base text-slate-600">
                {expert.name} has received your consultation invitation for {requestedDate} at {requestedTime}.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-[#EAF4FF] text-xs font-semibold text-[#123B5D] max-w-md mx-auto">
              A calendar hold and prep agenda have been routed to your corporate email.
            </div>
            <button
              onClick={handleClose}
              className="px-6 py-3 rounded-xl text-base font-semibold bg-[#2563EB] text-white shadow-xs"
            >
              Close Window
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Header: Photo + Name + Verified Badge */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 border-b border-slate-200 pb-6">
              <img
                src={expert.avatar}
                alt={expert.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-200 shadow-xs"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold text-[#123B5D]">{expert.name}</h3>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#0F766E] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified Executive</span>
                  </span>
                </div>
                <p className="text-base font-semibold text-[#2563EB]">{expert.title}</p>
                <p className="text-xs font-bold text-slate-500">
                  {expert.formerCompany} • {expert.experienceYears} Years Industry Experience • {expert.location}
                </p>
              </div>
            </div>

            {/* Career History & Background */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                Career History & Credentials
              </h4>
              <p className="text-sm text-[#334155] leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                {expert.fullHistory}
              </p>
            </div>

            {/* Core Domain Skills */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                Core Advisory Specializations
              </h4>
              <div className="flex flex-wrap gap-2">
                {expert.skills.map((s, idx) => (
                  <span key={idx} className="px-3 py-1.5 rounded-lg bg-[#EAF4FF] text-xs font-bold text-[#123B5D]">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Booking Form */}
            <form onSubmit={handleSubmit} className="pt-4 border-t border-slate-200 space-y-4">
              <h4 className="text-base font-bold text-[#123B5D]">
                Request Consultation with {expert.name} (${expert.hourlyRate}/hr)
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Preferred Date</label>
                  <input
                    type="date"
                    value={requestedDate}
                    onChange={(e) => setRequestedDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium focus:outline-none focus:border-[#2563EB]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Start Time (EST)</label>
                  <input
                    type="time"
                    value={requestedTime}
                    onChange={(e) => setRequestedTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium focus:outline-none focus:border-[#2563EB]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Consultation Objective / Questions</label>
                <textarea
                  rows={2}
                  placeholder="Detail your engineering audit, valuation review, or career mentorship inquiry..."
                  value={sessionTopic}
                  onChange={(e) => setSessionTopic(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium focus:outline-none focus:border-[#2563EB] resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl text-base font-semibold bg-[#2563EB] hover:bg-blue-700 text-white shadow-xs transition-colors"
              >
                Send Consultation Request (${expert.hourlyRate}/hr)
              </button>
            </form>

          </div>
        )}

      </div>
    </div>
  );
}
