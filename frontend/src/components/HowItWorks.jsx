import React from 'react';
import { UserCheck, Search, PhoneCall, TrendingUp } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      step: '1',
      title: 'Create a Profile',
      desc: 'Experts detail their career history, former roles, and availability. Organizations submit project needs or advisory topics.',
      icon: UserCheck
    },
    {
      step: '2',
      title: 'Discover Opportunities',
      desc: 'Our transparent recommendation matching pairs verified veteran experience with specific project requirements and domains.',
      icon: Search
    },
    {
      step: '3',
      title: 'Connect & Collaborate',
      desc: 'Schedule a secure 1-on-1 video advisory consultation, technical review, or monthly board meeting through structured calendars.',
      icon: PhoneCall
    },
    {
      step: '4',
      title: 'Share Knowledge & Grow',
      desc: 'Organizations solve critical bottlenecks while retired leaders earn consulting compensation and mentor emerging industry talent.',
      icon: TrendingUp
    }
  ];

  return (
    <section id="public-how" className="py-20 bg-[#EAF4FF] border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] block">
            Simple 4-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#123B5D]">
            How ElderExpert Works
          </h2>
          <p className="text-base sm:text-lg text-[#475569]">
            Designed to be completely intuitive and stress-free for both senior professionals and busy hiring managers.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs relative flex flex-col justify-between space-y-6"
              >
                {/* Step badge & icon */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#EAF4FF] text-[#2563EB] flex items-center justify-center font-bold text-lg">
                    <Icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <span className="w-9 h-9 rounded-full bg-[#123B5D] text-white flex items-center justify-center text-sm font-bold shadow-xs">
                    {item.step}
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-[#123B5D]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#475569] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
