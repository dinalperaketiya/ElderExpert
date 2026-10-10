import React from 'react';
import { Shield, Phone, Mail, MapPin, Heart, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center text-slate-950">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-extrabold text-white">
                Elder<span className="gradient-text">Expert</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering seniors and reassuring families through certified caregiver matching, real-time health telemetry, and 24/7 medical response.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Services</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#nursing" className="hover:text-emerald-400 transition-colors">Registered Nursing</a></li>
              <li><a href="#memory" className="hover:text-emerald-400 transition-colors">Dementia Memory Care</a></li>
              <li><a href="#companion" className="hover:text-emerald-400 transition-colors">Companion Visits</a></li>
              <li><a href="#transport" className="hover:text-emerald-400 transition-colors">Medical Transport</a></li>
            </ul>
          </div>

          {/* Emergency Hotline */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">24/7 Hotline</h4>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-red-400 text-xs font-bold">
                <Phone className="w-4 h-4 animate-pulse" />
                <span>Emergency Dispatch:</span>
              </div>
              <div className="text-lg font-black text-white">1-800-ELDER-HELP</div>
              <p className="text-[11px] text-slate-500">Available 365 days a year</p>
            </div>
          </div>

          {/* Verification Badges */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Certifications</h4>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>HIPAA Compliant Health Telemetry</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-400"></span>
                <span>State Licensed Care Coordinators</span>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ElderExpert Inc. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <a href="#privacy" className="hover:text-slate-400">Privacy Policy</a>
            <a href="#terms" className="hover:text-slate-400">Terms of Service</a>
            <a href="#contact" className="hover:text-slate-400">Contact Support</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
