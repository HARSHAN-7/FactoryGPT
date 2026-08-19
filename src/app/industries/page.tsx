'use client';

import React from 'react';
import Link from 'next/link';
import { LandingNav } from '@/components/navigation/LandingNav';

export default function IndustriesPage() {
  const industries = [
    {
      name: 'Automotive & Heavy Assembly',
      icon: '🚗',
      description: 'Chassis stamping, 6-axis welding robot calibration, paint shop conveyor manuals, and torque spec lookup for vehicle assembly lines.',
    },
    {
      name: 'Metal Stamping & Machining',
      icon: '⚙️',
      description: 'CNC 5-axis milling machine alignment, hydraulic press oil refills, spindle thermal error codes, and precision die specifications.',
    },
    {
      name: 'Energy & Power Utilities',
      icon: '⚡',
      description: 'High-pressure steam boilers, turbine safety release valves, electrical switchgear isolation, and substation maintenance protocols.',
    },
    {
      name: 'Chemicals & Pharmaceuticals',
      icon: '🧪',
      description: 'Batch reactor vessel cleaning SOPs, pressure vessel inspection standards, hazardous chemical spill containment, and FDA audit compliance.',
    },
    {
      name: 'Electronics & Semiconductor',
      icon: '🔌',
      description: 'Cleanroom ESD protocols, SMT pick-and-place component placement alignment, reflow oven temperature profiles, and wafer handling.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans bg-grid-pattern">
      <LandingNav />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 w-full">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-amber-500/40 text-xs text-amber-800 font-mono shadow-sm">
            <span>INDUSTRIES SERVED</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Engineered for <span className="text-amber-600">Mission-Critical Manufacturing</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600">
            FactoryGPT adapts to complex industrial engineering domains with domain-specific knowledge ingestion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((ind) => (
            <div key={ind.name} className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4 hover:border-amber-500/60 transition-all shadow-sm hover:shadow-md">
              <div className="text-4xl">{ind.icon}</div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">{ind.name}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{ind.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
