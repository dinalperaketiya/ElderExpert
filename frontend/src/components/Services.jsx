import React from 'react';
import { PhoneCall, FileCode, Award, Users, CheckCircle2, ArrowRight, Briefcase } from 'lucide-react';

export default function Services({ onBookService }) {
  const serviceItems = [
    {
      id: 1,
      title: '1-on-1 Strategic Mentorship Call',
      duration: '60 Minute Live Video Session',
      desc: 'Direct consultation with a veteran executive to refine company strategy, resolve operational bottlenecks, and get candid career mentorship.',
      icon: PhoneCall,
      features: ['Direct 1-on-1 Video Session', 'Pre-Call Agenda Review', 'Post-Call Action Summary'],
      price: '$150 - $250 / hr'
    },
    {
      id: 2,
      title: 'Technical & Architecture Review',
      duration: 'Short-Term Audit Project',
      desc: 'Deep-dive review of system architecture, VLSI specs, biotech clinical protocols, or financial models with formal written feedback.',
      icon: FileCode,
      features: ['In-Depth Spec Audit', 'Security & Scalability Check', 'Written Recommendation Report'],
      price: '$500 - $1,500 / project'
    },
    {
      id: 3,
      title: 'Fractional Board Advisory Seat',
      duration: 'Ongoing Monthly Retainer',
      desc: 'Quarterly board participation, monthly strategic check-ins, high-level investor intros, and governance advice from retired leaders.',
      icon: Award,
      features: ['Quarterly Board Attendance', 'Monthly Strategy Syncs', 'Warm Executive Intros'],
      price: '$1,200 / month'
    },
    {
      id: 4,
      title: 'Team Workshop & Masterclass',
      duration: 'Half-Day Session',
      desc: 'Customized hands-on workshop for junior engineers, founders, or product teams led by a retired industry authority.',
      icon: Users,
      features: ['Interactive Team Training', 'Custom Curriculum Prep', 'Live Q&A & Case Studies'],
      price: '$800 - $2,000 / session'
    }
  ];

  return (
    <section className="py-16 bg-slate-100 text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 text-sky-800 text-sm font-extrabold">
            <Briefcase className="w-5 h-5 text-sky-600" />
            <span>Advisory Engagement Models</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            How Companies Hire Retired Experts
          </h2>
          <p className="text-slate-700 text-base font-medium">
            Flexible, high-impact engagement models designed for startups, corporate teams, and young professionals.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {serviceItems.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="bg-white p-8 rounded-3xl border-2 border-slate-200 shadow-lg space-y-6 flex flex-col justify-between hover:border-sky-500 transition-all"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-black px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {service.price}
                    </span>
                  </div>

                  <h3 className="text-2xl font-extrabold text-slate-900">{service.title}</h3>
                  <p className="text-xs font-black text-sky-700 uppercase tracking-wider">{service.duration}</p>
                  <p className="text-base text-slate-700 leading-relaxed font-medium">{service.desc}</p>

                  <div className="space-y-2 pt-2">
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm font-bold text-slate-800">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-200">
                  <button
                    onClick={() => onBookService(service)}
                    className="w-full py-4 rounded-2xl font-extrabold bg-sky-600 hover:bg-sky-700 text-white transition-all text-sm flex items-center justify-center gap-2 shadow-md shadow-sky-600/20"
                  >
                    <span>Request Engagement</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
