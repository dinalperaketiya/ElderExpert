import React from 'react';
import { PhoneCall, FileCode, Award, Users, CheckCircle2, ArrowRight, ShieldCheck, Briefcase } from 'lucide-react';

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
    <section className="py-16 bg-slate-900 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold uppercase">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Advisory Engagement Models</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How Organizations Hire Elder Experts
          </h2>
          <p className="text-slate-400 text-sm">
            Flexible, high-impact engagement models tailored for startups, corporations, and young professionals.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {serviceItems.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="glass-card glass-card-hover p-8 rounded-3xl border border-slate-800 space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-slate-800 text-emerald-400 border border-slate-700">
                      {service.price}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white">{service.title}</h3>
                  <p className="text-xs font-semibold text-sky-400">{service.duration}</p>
                  <p className="text-sm text-slate-300 leading-relaxed">{service.desc}</p>

                  <div className="space-y-2 pt-2">
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-800">
                  <button
                    onClick={() => onBookService(service)}
                    className="w-full py-3.5 rounded-xl font-bold bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-white border border-slate-700 hover:border-emerald-500 transition-all duration-200 flex items-center justify-center gap-2 text-xs"
                  >
                    <span>Request Engagement</span>
                    <ArrowRight className="w-4 h-4" />
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
