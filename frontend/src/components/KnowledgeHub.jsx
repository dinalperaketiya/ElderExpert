import React from 'react';
import { BookOpen, FileText, ArrowRight, Award } from 'lucide-react';

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
    <section className="py-16 bg-slate-50 text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 text-sky-800 text-sm font-extrabold">
            <BookOpen className="w-5 h-5 text-sky-600" />
            <span>Preserving Institutional Wisdom</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Knowledge Hub & Veteran Masterclasses
          </h2>
          <p className="text-slate-700 text-base font-medium">
            Read technical playbooks, case studies, and strategic advisory notes published by retired industry leaders.
          </p>
        </div>

        {/* Featured Masterclasses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art) => (
            <div
              key={art.id}
              className="bg-white rounded-3xl overflow-hidden border-2 border-slate-200 shadow-lg hover:border-sky-500 transition-all flex flex-col justify-between"
            >
              <div>
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-48 object-cover border-b border-slate-200"
                />

                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between text-xs font-black text-sky-700 uppercase">
                    <span>{art.category}</span>
                    <span className="text-slate-500 font-bold">{art.readTime}</span>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900 leading-snug hover:text-sky-600 transition-colors cursor-pointer">
                    {art.title}
                  </h3>

                  <div className="pt-3 border-t border-slate-200">
                    <p className="text-sm font-extrabold text-slate-900">{art.author}</p>
                    <p className="text-xs font-semibold text-slate-600">{art.role}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={onBookSession}
                  className="w-full py-3 rounded-2xl font-extrabold bg-slate-100 hover:bg-sky-600 hover:text-white text-slate-800 text-sm border border-slate-200 transition-all flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4 text-sky-600" />
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
