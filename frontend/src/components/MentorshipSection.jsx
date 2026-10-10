import React from 'react';
import { BookOpen, Users, GraduationCap, ArrowRight, FileText } from 'lucide-react';
import { initialKnowledgeArticles } from '../services/api';

export default function MentorshipSection({ onOpenArticle, onExploreMentorship }) {
  return (
    <section id="public-mentorship" className="py-20 bg-white border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Top Feature: Intergenerational Knowledge Transfer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] block">
              Intergenerational Learning
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#123B5D] leading-tight">
              Mentorship That Bridges Generational Experience
            </h2>
            <p className="text-base sm:text-lg text-[#334155] leading-relaxed">
              When experienced professionals retire, invaluable tacit wisdom is often lost. ElderExpert pairs aspiring students, junior engineers, and first-time founders directly with veterans who spent decades solving the exact hurdles they face today.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#EAF4FF] border border-blue-200">
                <span className="text-2xl font-bold text-[#123B5D] block">1-on-1</span>
                <span className="text-sm font-semibold text-slate-700">Dedicated career & technical guidance sessions</span>
              </div>
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                <span className="text-2xl font-bold text-[#0F766E] block">40+ Yrs</span>
                <span className="text-sm font-semibold text-slate-700">Decades of practical wisdom per mentor</span>
              </div>
            </div>

            <button
              onClick={onExploreMentorship}
              className="px-6 py-3.5 rounded-xl text-base font-semibold bg-[#123B5D] hover:bg-[#2563EB] text-white shadow-xs transition-colors flex items-center gap-2"
            >
              <span>Schedule Mentorship Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="lg:col-span-6">
            <div className="ee-card p-8 bg-[#EAF4FF]/40 border-2 border-blue-200 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#123B5D] text-white flex items-center justify-center font-bold">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#123B5D]">The Senior Mentorship Promise</h3>
                  <p className="text-xs text-slate-500 font-semibold">Structured, supportive, and dignified</p>
                </div>
              </div>

              <blockquote className="text-base text-[#334155] italic leading-relaxed bg-white p-5 rounded-xl border border-slate-200">
                "Having Dr. Pendelton review our semiconductor layout in 3 calls prevented a potential $250,000 fabrication delay. His calm, experienced feedback was worth months of trial and error."
              </blockquote>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 font-bold text-sm">
                  DW
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#123B5D]">David Wu</h4>
                  <p className="text-xs text-slate-500">CTO & Co-founder, SiliconEdge AI</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Knowledge Hub Articles Header & Grid */}
        <div id="public-knowledge" className="space-y-8 pt-8 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] block">
                Preserving Industry Wisdom
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#123B5D]">
                Knowledge Hub & Veteran Playbooks
              </h3>
            </div>
            <p className="text-sm text-slate-500 max-w-md">
              Articles and teardowns authored by retired executives and senior scientists to share practical frameworks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {initialKnowledgeArticles.map((article) => (
              <div
                key={article.id}
                className="ee-card overflow-hidden flex flex-col justify-between hover:border-[#2563EB] transition-all"
              >
                <div>
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-44 object-cover border-b border-slate-200"
                  />
                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold text-[#2563EB]">
                      <span>{article.category}</span>
                      <span className="text-slate-500">{article.readTime}</span>
                    </div>

                    <h4 className="text-lg font-bold text-[#123B5D] leading-snug">
                      {article.title}
                    </h4>

                    <p className="text-sm text-[#475569] leading-relaxed line-clamp-3">
                      {article.summary}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-xs">
                    <span className="font-bold text-[#123B5D] block">{article.author}</span>
                    <span className="text-slate-500 block truncate max-w-[180px]">{article.role}</span>
                  </div>

                  <button
                    onClick={() => onOpenArticle(article)}
                    className="p-2.5 rounded-lg text-[#2563EB] hover:bg-[#EAF4FF] transition-colors"
                    title="Read article"
                    aria-label={`Read ${article.title}`}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
