import React, { useState } from 'react';
import { Activity, X, Heart, Droplet, Shield } from 'lucide-react';

export default function AddVitalModal({ isOpen, onClose, onAdd }) {
  const [type, setType] = useState('Heart Rate');
  const [value, setValue] = useState('');
  const [unit, setUnit] = useState('bpm');

  if (!isOpen) return null;

  const handleTypeChange = (e) => {
    const selected = e.target.value;
    setType(selected);
    if (selected === 'Heart Rate') setUnit('bpm');
    else if (selected === 'Blood Pressure') setUnit('mmHg');
    else if (selected === 'Blood Glucose') setUnit('mg/dL');
    else if (selected === 'Blood Oxygen (SpO2)') setUnit('%');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;

    let icon = 'Heart';
    if (type === 'Blood Pressure') icon = 'Activity';
    if (type === 'Blood Glucose') icon = 'Droplet';
    if (type === 'Blood Oxygen (SpO2)') icon = 'Shield';

    onAdd({
      id: Date.now(),
      label: type,
      value: value,
      unit: unit,
      status: 'normal',
      icon: icon,
      trend: 'Just logged',
    });

    setValue('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="glass-card w-full max-w-md rounded-3xl p-6 border border-slate-700/80 shadow-2xl relative space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-400" />
            <span>Log Biometric Vital</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">Record recent reading for patient record</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Vital Type</label>
            <select
              value={type}
              onChange={handleTypeChange}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="Heart Rate">Heart Rate (Pulse)</option>
              <option value="Blood Pressure">Blood Pressure</option>
              <option value="Blood Glucose">Blood Glucose</option>
              <option value="Blood Oxygen (SpO2)">Blood Oxygen (SpO2)</option>
            </select>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Measured Reading</label>
              <input
                type="text"
                placeholder={type === 'Blood Pressure' ? '120/80' : '72'}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-emerald-500 font-bold"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Unit</label>
              <input
                type="text"
                value={unit}
                readOnly
                className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-slate-400 font-mono text-center"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-lg shadow-emerald-500/20"
          >
            Save Vital Reading
          </button>
        </form>

      </div>
    </div>
  );
}
