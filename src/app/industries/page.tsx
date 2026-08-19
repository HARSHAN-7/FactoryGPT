'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Cpu, Wrench, Zap, Layers, CheckCircle2, ArrowRight, ShieldCheck 
} from 'lucide-react';
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
    <div className="min-h-screen bg-industrial-950 text-industrial-100 flex flex-col font-sans bg-grid-pattern">
      <LandingNav />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 w-full">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-industrial-900 border border-gold-500/30 text-xs text-gold-500 font-mono">
            <span>INDUSTRIES SERVED</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Engineered for <span className="text-gold-500">Mission-Critical Manufacturing</span>
          </h1>
          <p className="text-base sm:text-lg text-industrial-400">
            FactoryGPT adapts to complex industrial engineering domains with domain-specific knowledge ingestion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((ind) => (
            <div key={ind.name} className="p-6 rounded-2xl bg-industrial-900 border border-industrial-800 space-y-4 hover:border-gold-500/40 transition-colors shadow-xl">
              <div className="text-4xl">{ind.icon}</div>
              <h3 className="text-xl font-bold text-white tracking-tight">{ind.name}</h3>
              <p className="text-xs text-industrial-400 leading-relaxed">{ind.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
