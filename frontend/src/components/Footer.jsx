import React from 'react';
import { Award, Mail, Phone, ShieldCheck, Heart, ArrowRight } from 'lucide-react';

export default function Footer({ onJoinExpert, onFindExperts }) {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 text-[#334155]">
      
      {/* Welcoming Pre-Footer Call to Action Banner */}
      <div className="bg-[#123B5D] text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Ready to Connect Experience with Opportunity?
            </h3>
            <p className="text-blue-100 text-base max-w-xl">
              Join thousands of retired industry leaders and organizations building the future together.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={onJoinExpert}
              className="px-6 py-3.5 rounded-xl text-base font-semibold bg-[#2563EB] hover:bg-blue-600 text-white shadow-sm transition-colors"
            >
              Join as an Expert
            </button>
            <button
              onClick={onFindExperts}
              className="px-6 py-3.5 rounded-xl text-base font-semibold bg-white hover:bg-slate-100 text-[#123B5D] transition-colors"
            >
              Discover Experts
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#123B5D] flex items-center justify-center text-white">
                <Award className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold text-[#123B5D]">
                Elder<span className="text-[#2563EB]">Expert</span>
              </span>
            </div>
            <p className="text-sm text-[#475569] leading-relaxed">
              Empowering retired senior professionals to share their life's work, preserve valuable industry knowledge, and mentor the next generation.
            </p>
            <div className="pt-1 flex items-center gap-2 text-xs font-bold text-[#0F766E]">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Executive Directory</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#123B5D]">Platform</h4>
            <ul className="space-y-2 text-sm text-[#475569]">
              <li><a href="#public-experts" className="hover:text-[#2563EB]">Find Senior Experts</a></li>
              <li><a href="#public-how" className="hover:text-[#2563EB]">How the Platform Works</a></li>
              <li><a href="#public-mentorship" className="hover:text-[#2563EB]">Mentorship Programs</a></li>
              <li><a href="#public-knowledge" className="hover:text-[#2563EB]">Knowledge Hub Playbooks</a></li>
            </ul>
          </div>

          {/* Support for Seniors & Companies */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#123B5D]">Advisor Concierge</h4>
            <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 text-xs text-[#334155] shadow-xs">
              <span className="font-bold text-[#123B5D] block text-sm">Dedicated Senior Support</span>
              <p className="text-slate-500">Need help scheduling or creating an account? Our concierge team is ready to talk.</p>
              <div className="font-bold text-[#2563EB] text-sm pt-1">
                📞 1-800-ELDER-HELP
              </div>
              <div className="text-slate-600 font-medium">
                ✉️ support@elderexpert.com
              </div>
            </div>
          </div>

          {/* Security & Accessibility */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#123B5D]">Accessibility & Trust</h4>
            <ul className="space-y-2 text-xs text-[#475569]">
              <li>✓ High-contrast senior accessibility design</li>
              <li>✓ Strict enterprise NDA coverage</li>
              <li>✓ Independent career credential verification</li>
              <li>✓ Flexible payments & secure direct deposit</li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-[#475569] gap-4">
          <p>© {new Date().getFullYear()} ElderExpert Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:underline">Privacy Policy</a>
            <a href="#terms" className="hover:underline">Terms of Service</a>
            <a href="#accessibility" className="hover:underline">Accessibility Statement</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
