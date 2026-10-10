import React from 'react';
import { BookOpen, Video, Award, Clock, ArrowRight, UserCheck, Sparkles, FileText } from 'lucide-react';

export default function KnowledgeHub({ onBookSession }) {
  const articles = [
    {
      id: 1,
      title: 'Lessons from 40 Years of Silicon Architecture: Avoiding Hardware Pitfalls',
      author: 'Dr. Arthur Pendelton',
      role: 'Former VP of Semiconductor Architecture @ Intel',
      readTime: '12 min read',
      category: 'Deep Tech & Hardware',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 2,
      title: 'Navigating FDA Path 510(k) vs PMA for Biotech & Medical Device Startups',
      author: 'Dr. Evelyn Sterling',
      role: 'Former Head of Regulatory Affairs @ Pfizer',
      readTime: '18 min read',
      category: 'Biotech & Compliance',
      image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 3,
      title: 'Structuring M&A Due Diligence: What Board Advisors Look For Before Series B',
      author: 'Margaret Vance, CFA',
      role: 'Former Senior Managing Director @ JPMorgan',
      readTime: '15 min read',
      category: 'Finance & Venture Capital',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400'
    }
  ];

  return (
    <section className="py-16 bg-slate-950 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase">
            <BookOpen className="w-4 h-4" />
            <span>Preserving Institutional Wisdom</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Knowledge Hub & Masterclasses
          </h2>
          <p className="text-slate-400 text-sm">
            Read exclusive teardowns, strategic playbooks, and case studies authored by veteran executives and principal scientists.
          </p>
        </div>

        {/* Featured Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art) => (
            <div
              key={art.id}
              className="glass-card glass-card-hover rounded-3xl overflow-hidden border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-48 object-cover border-b border-slate-800"
                />

                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between text-xs text-sky-400 font-bold">
                    <span>{art.category}</span>
                    <span className="text-slate-400 font-normal">{art.readTime}</span>
                  </div>

                  <h3 className="text-lg font-extrabold text-white leading-snug hover:text-sky-400 transition-colors cursor-pointer">
                    {art.title}
                  </h3>

                  <div className="pt-2 border-t border-slate-800/80">
                    <p className="text-xs font-bold text-white">{art.author}</p>
                    <p className="text-[11px] text-slate-400">{art.role}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={onBookSession}
                  className="w-full py-2.5 rounded-xl font-bold bg-slate-800 hover:bg-slate-700 text-white text-xs border border-slate-700 transition-all flex items-center justify-center gap-2"
                >
                  <FileText className="w-3.5 h-3.5 text-sky-400" />
                  <span>Read Full Masterclass</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
