import React from 'react';
import { Cpu, TrendingUp, Truck, Activity, Compass, Shield, ChevronRight } from 'lucide-react';
import { professionalCategories } from '../services/api';

export default function ExpertCategories({ onSelectCategory }) {
  const getCategoryIcon = (id) => {
    switch (id) {
      case 'tech': return <Cpu className="w-6 h-6 text-[#2563EB]" />;
      case 'finance': return <TrendingUp className="w-6 h-6 text-[#0F766E]" />;
      case 'ops': return <Truck className="w-6 h-6 text-amber-700" />;
      case 'life': return <Activity className="w-6 h-6 text-rose-600" />;
      case 'strategy': return <Compass className="w-6 h-6 text-indigo-600" />;
      case 'legal': return <Shield className="w-6 h-6 text-[#123B5D]" />;
      default: return <Cpu className="w-6 h-6 text-[#2563EB]" />;
    }
  };

  // Exclude 'all' filter item
  const categories = professionalCategories.filter(c => c.id !== 'all');

  return (
    <section className="py-20 bg-[#EAF4FF] border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] block">
            Specialized Advisory Domains
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#123B5D]">
            Explore Supported Industries
          </h2>
          <p className="text-base sm:text-lg text-[#475569]">
            From deep-tech semiconductor validation to FDA regulatory approval pathways, connect with leaders who have done it before.
          </p>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.name)}
              className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs hover:border-[#2563EB] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                    {getCategoryIcon(cat.id)}
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                    {cat.count}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#123B5D]">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-[#475569] leading-relaxed mt-1">
                    {cat.desc}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-sm font-semibold text-[#2563EB]">
                <span>View Domain Experts</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
