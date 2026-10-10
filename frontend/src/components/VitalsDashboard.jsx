import React, { useState } from 'react';
import { Heart, Activity, Droplet, Shield, Plus, CheckCircle2, Clock, AlertCircle, RefreshCw, Sparkles } from 'lucide-react';

export default function VitalsDashboard({ vitals, setVitals, medications, setMedications, onAddVital }) {
  const [selectedPeriod, setSelectedPeriod] = useState('Today');

  const toggleMedication = (id) => {
    setMedications(medications.map(med => 
      med.id === id ? { ...med, taken: !med.taken } : med
    ));
  };

  const getVitalIcon = (iconName) => {
    switch (iconName) {
      case 'Heart': return <Heart className="w-6 h-6 text-rose-400" />;
      case 'Activity': return <Activity className="w-6 h-6 text-sky-400" />;
      case 'Droplet': return <Droplet className="w-6 h-6 text-blue-400" />;
      default: return <Shield className="w-6 h-6 text-emerald-400" />;
    }
  };

  return (
    <section className="py-12 bg-slate-900 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real-Time Biometric Monitoring</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Patient Health Vitals & Medication Tracker
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Live updates synchronized from connected smart monitors and caregiver check-ins.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-800 p-1 rounded-xl flex items-center border border-slate-700/60">
              {['Today', '7 Days', '30 Days'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedPeriod === period
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>

            <button
              onClick={onAddVital}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-md shadow-emerald-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>Log Vital Sign</span>
            </button>
          </div>
        </div>

        {/* Vital Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {vitals.map((vital) => (
            <div
              key={vital.id}
              className="glass-card glass-card-hover p-6 rounded-2xl border border-slate-800 space-y-4 relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                  {getVitalIcon(vital.icon)}
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {vital.status}
                </span>
              </div>

              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                  {vital.label}
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-extrabold text-white tracking-tight">{vital.value}</span>
                  <span className="text-sm font-bold text-slate-400">{vital.unit}</span>
                </div>
              </div>

              <div className="text-xs font-medium text-emerald-400 flex items-center gap-1.5 pt-2 border-t border-slate-800">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-500" />
                <span>{vital.trend}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Dashboard Lower Section: Simulated Chart + Medication Tracker */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Heart Rate / Vitals Trend Graph Simulation */}
          <div className="lg:col-span-7 glass-card p-6 rounded-3xl border border-slate-800 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-emerald-400" />
                  <span>24-Hour Heart Rate & Oxygen Curve</span>
                </h3>
                <p className="text-xs text-slate-400">Average: 71 bpm | SpO2: 98%</p>
              </div>
              <span className="text-xs text-slate-400 font-semibold bg-slate-800 px-3 py-1 rounded-lg">
                Continuous Telemetry
              </span>
            </div>

            {/* Visual SVG Chart graph */}
            <div className="h-56 w-full flex items-end justify-between gap-2 pt-6 px-2">
              {[68, 72, 70, 75, 73, 71, 74, 72, 76, 70, 69, 72, 74, 71, 73].map((val, idx) => {
                const heightPercent = ((val - 60) / 25) * 100;
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="w-full bg-slate-800 rounded-t-lg relative overflow-hidden h-40 flex items-end">
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className="w-full bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-lg transition-all duration-500 group-hover:from-emerald-400 group-hover:to-sky-400"
                      ></div>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {idx * 2}h
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Medication Tracker Checklist */}
          <div className="lg:col-span-5 glass-card p-6 rounded-3xl border border-slate-800 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-400" />
                  <span>Medication Schedule</span>
                </h3>
                <p className="text-xs text-slate-400">Mark medications as administered</p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/20">
                4 Doses Today
              </span>
            </div>

            <div className="space-y-3">
              {medications.map((med) => (
                <div
                  key={med.id}
                  onClick={() => toggleMedication(med.id)}
                  className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between ${
                    med.taken
                      ? 'bg-emerald-950/20 border-emerald-500/30 text-slate-300'
                      : 'bg-slate-800/60 border-slate-700/60 hover:border-slate-600 text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                      med.taken ? 'bg-emerald-500 text-slate-950' : 'border-2 border-slate-600'
                    }`}>
                      {med.taken && <CheckCircle2 className="w-4 h-4 text-slate-950" />}
                    </button>
                    <div>
                      <h4 className={`text-sm font-bold ${med.taken ? 'line-through text-slate-400' : 'text-white'}`}>
                        {med.name}
                      </h4>
                      <p className="text-xs text-slate-400">Dose: {med.dose}</p>
                    </div>
                  </div>

                  <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                    {med.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
