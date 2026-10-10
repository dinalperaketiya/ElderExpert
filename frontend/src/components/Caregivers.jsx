import React, { useState } from 'react';
import { Star, CheckCircle, MapPin, Clock, Award, ShieldCheck, Filter, Search, Calendar } from 'lucide-react';

export default function Caregivers({ caregivers, onSelectCaregiver }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');

  const specialties = [
    'All',
    'Dementia & Alzheimer Care',
    'Post-Surgery & Mobility',
    'Daily Living & Companionship',
    '24/7 Intensive Monitoring'
  ];

  const filteredCaregivers = caregivers.filter((caregiver) => {
    const matchesSearch = caregiver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          caregiver.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'All' || caregiver.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <section className="py-12 bg-slate-950 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase mb-2">
              <Award className="w-3.5 h-3.5" />
              <span>Certified Healthcare Specialists</span>
            </div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Browse & Book Expert Caregivers
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              All caregivers undergo 7-step background verification, medical credential checks, and patient feedback reviews.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative min-w-[280px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-all"
            />
          </div>
        </div>

        {/* Specialty Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <Filter className="w-4 h-4 text-slate-400 flex-shrink-0 mr-1" />
          {specialties.map((spec) => (
            <button
              key={spec}
              onClick={() => setSelectedSpecialty(spec)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedSpecialty === spec
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              {spec}
            </button>
          ))}
        </div>

        {/* Caregiver Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredCaregivers.map((caregiver) => (
            <div
              key={caregiver.id}
              className="glass-card glass-card-hover rounded-3xl p-6 border border-slate-800 flex flex-col justify-between space-y-6 relative overflow-hidden"
            >
              
              {/* Top Row: Photo + Bio info */}
              <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                  <img
                    src={caregiver.avatar}
                    alt={caregiver.name}
                    className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-700"
                  />
                  {caregiver.verified && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-slate-950 shadow-md" title="Verified Specialist">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      {caregiver.name}
                    </h3>
                    <div className="flex items-center gap-1 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20 text-xs font-bold text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{caregiver.rating}</span>
                      <span className="text-slate-500">({caregiver.reviewsCount})</span>
                    </div>
                  </div>

                  <p className="text-xs font-semibold text-emerald-400">{caregiver.role}</p>

                  <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                    <span className="flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-slate-500" /> {caregiver.experienceYears} yrs exp
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" /> {caregiver.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Specialty Tag & Bio */}
              <div className="space-y-2">
                <div className="inline-block px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-semibold text-sky-400">
                  Specialty: {caregiver.specialty}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  "{caregiver.bio}"
                </p>
              </div>

              {/* Bottom Row: Rate + Book Button */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Hourly Rate</span>
                  <div className="text-xl font-extrabold text-white">
                    ${caregiver.hourlyRate} <span className="text-xs text-slate-400 font-normal">/ hr</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {caregiver.availableNow ? (
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Available Today
                    </span>
                  ) : (
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-400">
                      Next Slot Tomorrow
                    </span>
                  )}

                  <button
                    onClick={() => onSelectCaregiver(caregiver)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-md shadow-emerald-500/20"
                  >
                    <Calendar className="w-4 h-4 text-slate-950" />
                    <span>Book Caregiver</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
