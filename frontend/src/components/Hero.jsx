import React from 'react';
import { ShieldCheck, Heart, UserCheck, PhoneCall, Clock, Star, ArrowRight, Activity, CalendarCheck } from 'lucide-react';

export default function Hero({ onExploreCaregivers, onOpenVitals, onBookService }) {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24 bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950">
      
      {/* Background Decorative Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 blur-[140px] rounded-full pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-sky-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verified 24/7 Senior Care & Health Monitoring</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Compassionate <span className="gradient-text">Elder Care</span> Managed by Medical Experts.
            </h1>

            {/* Subheading */}
            <p className="text-lg text-slate-300 leading-relaxed max-w-2xl">
              ElderExpert connects families with top-rated certified caregivers, real-time vital sign tracking, personalized home care routines, and instant 24/7 medical emergency dispatch.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreCaregivers}
                className="flex items-center gap-2 px-6 py-4 rounded-xl font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all duration-200 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Find a Verified Caregiver</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={onOpenVitals}
                className="flex items-center gap-2 px-6 py-4 rounded-xl font-semibold bg-slate-800/80 hover:bg-slate-700 text-white border border-slate-700 hover:border-slate-600 transition-all duration-200"
              >
                <Activity className="w-5 h-5 text-sky-400" />
                <span>View Live Health Dashboard</span>
              </button>
            </div>

            {/* Key Statistics Grid */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-800">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">99.4%</div>
                <div className="text-xs sm:text-sm text-slate-400 font-medium">Family Satisfaction</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">1,500+</div>
                <div className="text-xs sm:text-sm text-slate-400 font-medium">Certified Caregivers</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-sky-400">&lt; 3 Mins</div>
                <div className="text-xs sm:text-sm text-slate-400 font-medium">Emergency Response</div>
              </div>
            </div>

          </div>

          {/* Hero Right Visual Feature Card */}
          <div className="lg:col-span-5 relative">
            <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6 border border-slate-700/60 shadow-2xl relative overflow-hidden">
              
              {/* Header inside card */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Heart className="w-5 h-5 fill-emerald-500/30" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Active Care Overview</h3>
                    <p className="text-xs text-slate-400">Patient: Eleanor Vance (Age 78)</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/30">
                  Protected
                </span>
              </div>

              {/* Patient Photo and Status */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/60 border border-slate-700/50">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150"
                  alt="Senior Patient"
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-500/40"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-white">Eleanor Vance</h4>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" /> 10m ago
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">Caregiver: Dr. Sarah Jenkins (Assigned)</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-emerald-400 font-semibold">
                    <span>❤️ HR: 72 bpm</span>
                    <span>🩸 BP: 120/80</span>
                  </div>
                </div>
              </div>

              {/* Live Medication Alert preview */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2">
                <div className="flex items-center justify-between text-xs text-amber-400 font-bold">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" /> Next Scheduled Medication
                  </span>
                  <span>06:00 PM Today</span>
                </div>
                <p className="text-sm font-semibold text-slate-200">Multivitamin & Calcium Supplement</p>
                <p className="text-xs text-slate-400">Dose: 1 Tablet after meal</p>
              </div>

              {/* Quick Action inside Card */}
              <button
                onClick={onBookService}
                className="w-full py-3.5 rounded-xl font-bold bg-gradient-to-r from-emerald-500 to-sky-500 text-slate-950 hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <CalendarCheck className="w-5 h-5 text-slate-950" />
                <span>Schedule Next Care Visit</span>
              </button>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
