import React, { useState, useEffect } from 'react';
import { AlertTriangle, Phone, ShieldCheck, CheckCircle2, X, Navigation, Radio } from 'lucide-react';

export default function EmergencyModal({ isOpen, onClose }) {
  const [stage, setStage] = useState('alerting'); // 'alerting', 'dispatched'
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (!isOpen) {
      setStage('alerting');
      setCountdown(5);
      return;
    }

    if (countdown > 0 && stage === 'alerting') {
      const timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (countdown === 0 && stage === 'alerting') {
      setStage('dispatched');
    }
  }, [isOpen, countdown, stage]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="glass-card w-full max-w-lg rounded-3xl p-6 sm:p-8 border-2 border-red-500/50 shadow-2xl relative space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {stage === 'alerting' ? (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-red-600/20 border-2 border-red-500 flex items-center justify-center mx-auto pulse-glow">
              <AlertTriangle className="w-10 h-10 text-red-500 animate-bounce" />
            </div>

            <div>
              <h3 className="text-2xl font-extrabold text-white">Emergency SOS Activated!</h3>
              <p className="text-sm text-slate-300 mt-2">
                Dispatching emergency response to patient's registered home address in:
              </p>
            </div>

            <div className="text-6xl font-black text-red-500 font-mono">
              00:0{countdown}
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 text-left text-xs space-y-2 text-slate-300">
              <div className="flex items-center gap-2 font-bold text-white">
                <Navigation className="w-4 h-4 text-emerald-400" />
                <span>GPS Location: 742 Evergreen Terrace, Springfield</span>
              </div>
              <p>• Notifying Assigned Caregiver: Dr. Sarah Jenkins</p>
              <p>• Dialing Emergency Contact: Family (Primary)</p>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3.5 rounded-xl font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
            >
              Cancel Alarm (False Alarm)
            </button>
          </div>
        ) : (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mx-auto">
              <Radio className="w-10 h-10 text-emerald-400 animate-pulse" />
            </div>

            <div>
              <h3 className="text-2xl font-extrabold text-white">Responder Unit Dispatched</h3>
              <p className="text-sm text-emerald-400 font-semibold mt-1">
                EMS & Care Team on route. Estimated ETA: 4 Minutes
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-left space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Emergency Dispatch ID:</span>
                <span className="font-mono text-white font-bold">#EMS-94821</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Caregiver Status:</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> En Route
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3.5 rounded-xl font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/20"
            >
              Acknowledge & Close Status
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
