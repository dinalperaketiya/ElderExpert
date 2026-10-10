import React from 'react';
import { HeartHandshake, Shield, UserCheck, PhoneCall, Truck, Activity, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Services({ onBookService }) {
  const serviceItems = [
    {
      id: 1,
      title: '24/7 Registered Nursing Care',
      desc: 'In-home skilled medical care including IV therapy, wound dressing, vitals monitoring, and physician updates.',
      icon: Shield,
      features: ['Licensed Registered Nurses', 'Daily Physician Sync', 'Medical Equipment Setup'],
      price: 'From $45/hr'
    },
    {
      id: 2,
      title: 'Memory Care & Dementia Support',
      desc: 'Specialized cognitive exercises, safety monitoring, and familiar routine management tailored for Alzheimer patients.',
      icon: UserCheck,
      features: ['Certified Memory Caregivers', 'Wandering Protection', 'Cognitive Stimulation'],
      price: 'From $35/hr'
    },
    {
      id: 3,
      title: 'Companion Care & Daily Living',
      desc: 'Friendly companionship, meal preparation, light housekeeping, medication reminders, and social activities.',
      icon: HeartHandshake,
      features: ['Personal Assistance', 'Nutritional Meal Prep', 'Social & Outdoor Walks'],
      price: 'From $28/hr'
    },
    {
      id: 4,
      title: 'Medical Transport & Errands',
      desc: 'Wheelchair-accessible transport to doctor appointments, pharmacy pickups, grocery shopping, and therapy visits.',
      icon: Truck,
      features: ['Wheelchair Ramp Vehicles', 'Caregiver Accompaniment', 'Door-to-Door Escort'],
      price: 'From $30/trip'
    }
  ];

  return (
    <section className="py-16 bg-slate-900 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold uppercase">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Comprehensive Elder Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Tailored Home Care Solutions for Every Need
          </h2>
          <p className="text-slate-400 text-sm">
            Whether your loved one needs full-time medical nursing or gentle daily companionship, ElderExpert delivers personalized, dignified home care.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {serviceItems.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="glass-card glass-card-hover p-8 rounded-3xl border border-slate-800 space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-slate-800 text-sky-400 border border-slate-700">
                      {service.price}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white">{service.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">{service.desc}</p>

                  <div className="space-y-2 pt-2">
                    {service.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-800">
                  <button
                    onClick={() => onBookService(service)}
                    className="w-full py-3 rounded-xl font-bold bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-white border border-slate-700 hover:border-emerald-500 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <span>Request Care Plan</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
