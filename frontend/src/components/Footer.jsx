import React from 'react';
import { Award, Mail, Phone, ExternalLink, ShieldCheck, Heart, BrainCircuit } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center text-white font-black">
                <Award className="w-6 h-6" />
              </div>
              <span className="text-2xl font-black text-white">
                Elder<span className="text-sky-400">Expert</span>
              </span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed font-medium">
              Preserving valuable professional knowledge, encouraging intergenerational mentorship, and bridging the gap between retired leaders and high-growth organizations.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">Expert Marketplace</h4>
            <ul className="space-y-2 text-sm font-semibold text-slate-300">
              <li><a href="#experts" className="hover:text-sky-400 transition-colors">Discover Senior Experts</a></li>
              <li><a href="#aimatch" className="hover:text-sky-400 transition-colors">AI Recommendation Engine</a></li>
              <li><a href="#advisory" className="hover:text-sky-400 transition-colors">Advisory Board Seats</a></li>
              <li><a href="#knowledge" className="hover:text-sky-400 transition-colors">Knowledge Hub Playbooks</a></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">Enterprise Concierge</h4>
            <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-sky-400 font-extrabold text-sm">
                <BrainCircuit className="w-4 h-4" />
                <span>AI Advisory Support:</span>
              </div>
              <div className="text-base font-extrabold text-white">concierge@elderexpert.ai</div>
              <p className="text-xs text-slate-400 font-medium">Dedicated support for senior experts & hiring managers</p>
            </div>
          </div>

          {/* Verification Badges */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">Platform Security</h4>
            <div className="space-y-2 text-xs font-bold text-slate-300">
              <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span>7-Step Executive Verification</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-sky-400 flex-shrink-0" />
                <span>Confidential NDA & IP Protection</span>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 font-medium">
          <p>© {new Date().getFullYear()} ElderExpert Network. Bridging Generations through Knowledge.</p>
          <div className="flex items-center gap-4 mt-4 sm:mt-0 font-bold">
            <a href="#privacy" className="hover:text-white">Privacy Policy</a>
            <a href="#terms" className="hover:text-white">Terms of Service</a>
            <a href="#ethics" className="hover:text-white">Code of Ethics</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
