import React from 'react';
import { Award, Mail, Phone, ExternalLink, ShieldCheck, Heart, BrainCircuit } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center text-slate-950">
                <Award className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-extrabold text-white">
                Elder<span className="gradient-text">Expert</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Preserving valuable professional knowledge, encouraging intergenerational mentorship, and bridging the gap between retired leaders and high-growth organizations.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Expert Marketplace</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#experts" className="hover:text-sky-400 transition-colors">Discover Experts</a></li>
              <li><a href="#aimatch" className="hover:text-sky-400 transition-colors">AI Match Engine</a></li>
              <li><a href="#advisory" className="hover:text-sky-400 transition-colors">Advisory Board Seats</a></li>
              <li><a href="#knowledge" className="hover:text-sky-400 transition-colors">Knowledge Hub & Playbooks</a></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Enterprise Concierge</h4>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-sky-400 font-bold">
                <BrainCircuit className="w-4 h-4" />
                <span>AI Matching Support:</span>
              </div>
              <div className="text-sm font-bold text-white">concierge@elderexpert.ai</div>
              <p className="text-[11px] text-slate-500">Dedicated assistance for corporate advisory requests</p>
            </div>
          </div>

          {/* Verification Badges */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Platform Security</h4>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>7-Step Executive Background Verification</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                <span>Secure NDA & IP Protection Standard</span>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ElderExpert Network. Bridging Generations through Knowledge.</p>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <a href="#privacy" className="hover:text-slate-400">Privacy Policy</a>
            <a href="#terms" className="hover:text-slate-400">Terms of Service</a>
            <a href="#code" className="hover:text-slate-400">Code of Ethics</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
