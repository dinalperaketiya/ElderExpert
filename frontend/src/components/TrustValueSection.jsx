import React from 'react';
import { Award, Briefcase, GraduationCap, CheckCircle2 } from 'lucide-react';

export default function TrustValueSection({ onJoinExpert, onFindExperts }) {
  const values = [
    {
      id: 1,
      target: 'For Retired Experts',
      title: 'Share Experience & Earn Advisory Income',
      desc: 'Continue contributing your hard-earned knowledge on your own schedule. Set your consulting rates, mentor rising leaders, and remain actively engaged in the industries you shaped.',
      icon: Award,
      benefits: [
        'Set your own availability and hourly fees',
        'No long-term commitments or commutes',
        'Direct 1-on-1 calls, reviews, and board advisory'
      ],
      actionText: 'Join as an Expert',
      actionHandler: onJoinExpert,
      badgeColor: 'bg-blue-100 text-[#123B5D]'
    },
    {
      id: 2,
      target: 'For Companies & Startups',
      title: 'Access Proven Wisdom on Demand',
      desc: 'Bridge critical capability gaps without full-time executive recruiting costs. Engage veteran VPs and principal engineers for short-term reviews, due diligence, and specialized training.',
      icon: Briefcase,
      benefits: [
        'Vetted executives with 30+ years track records',
        'Pay per project, audit, or hourly advisory',
        'Instant NDA and confidentiality coverage'
      ],
      actionText: 'Find Industry Experts',
      actionHandler: onFindExperts,
      badgeColor: 'bg-emerald-100 text-[#0F766E]'
    },
    {
      id: 3,
      target: 'For Students & Emerging Leaders',
      title: 'Learn Directly from Industry Legends',
      desc: 'Accelerate your career through structured mentorship with retired executives who navigated identical challenges throughout four decades of industry transformation.',
      icon: GraduationCap,
      benefits: [
        'Personal career guidance & technical critique',
        'Real-world case studies and executive insights',
        'Supportive, patient intergenerational wisdom'
      ],
      actionText: 'Explore Mentorship',
      actionHandler: onFindExperts,
      badgeColor: 'bg-indigo-100 text-indigo-900'
    }
  ];

  return (
    <section className="py-18 bg-white border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] block">
            Why ElderExpert
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#123B5D]">
            Three Pathways of Meaningful Collaboration
          </h2>
          <p className="text-lg text-[#475569]">
            A dedicated ecosystem created to preserve institutional knowledge, support retired professionals, and empower organizations.
          </p>
        </div>

        {/* 3 Clear Benefit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="ee-card p-8 flex flex-col justify-between space-y-6 hover:border-[#2563EB] transition-all"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#EAF4FF] text-[#2563EB] flex items-center justify-center">
                      <Icon className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${item.badgeColor}`}>
                      {item.target}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#123B5D] leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-base text-[#334155] leading-relaxed">
                    {item.desc}
                  </p>

                  <ul className="space-y-2.5 pt-2 border-t border-slate-100">
                    {item.benefits.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-[#475569]">
                        <CheckCircle2 className="w-4 h-4 text-[#0F766E] flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4">
                  <button
                    onClick={item.actionHandler}
                    className="w-full py-3 rounded-xl text-base font-semibold text-[#123B5D] bg-[#EAF4FF] hover:bg-[#2563EB] hover:text-white transition-colors"
                  >
                    {item.actionText}
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
