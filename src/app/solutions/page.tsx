'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Wrench, ShieldAlert, BarChart3, Package, Cpu, 
  ArrowRight, CheckCircle2, Factory, Zap 
} from 'lucide-react';
import { LandingNav } from '@/components/navigation/LandingNav';

export default function SolutionsPage() {
  const solutions = [
    {
      id: 'maintenance',
      title: 'Predictive Equipment Maintenance',
      category: 'OPERATIONS & REPAIRS',
      icon: <Wrench className="w-6 h-6 text-amber-600" />,
      description: 'Instant SOP lookup for technician work orders. Access machine pressure specs, oil refill quantities, and torque limits in seconds.',
      benefits: ['Reduce unscheduled equipment downtime by up to 24%', 'Eliminate manual searching through 500-page paper binders', 'Standardize shift handover maintenance logs'],
    },
    {
      id: 'ehs',
      title: 'EHS Safety & Lockout/Tagout (LOTO)',
      category: 'COMPLIANCE & RISK',
      icon: <ShieldAlert className="w-6 h-6 text-amber-600" />,
      description: 'Ensure 100% OSHA safety compliance with high-risk hazard warnings, electrical breaker isolation guides, and chemical handling procedures.',
      benefits: ['Zero-accident workplace safety enforcement', 'Instant LOTO padlock procedure verification', 'Automated PPE requirement prompts'],
    },
    {
      id: 'telemetry',
      title: 'Data Analytics & Downtime Reduction',
      category: 'DATA & ANALYTICS',
      icon: <BarChart3 className="w-6 h-6 text-amber-600" />,
      description: 'Query CSV & XLSX production logs with deterministic math processing to isolate bottlenecked conveyor lines and downtime root causes.',
      benefits: ['Programmatic calculation for downtime trends', 'Compare Line 1 vs Line 2 scrap rates instantly', 'Increase plant OEE efficiency by up to +32%'],
    },
    {
      id: 'inventory',
      title: 'Spare Parts & Inventory Tracking',
      category: 'SUPPLY CHAIN',
      icon: <Package className="w-6 h-6 text-amber-600" />,
      description: 'Cross-reference replacement part numbers, hydraulic fluid specifications, and spare motor stock quantities directly from stored datasets.',
      benefits: ['Instant part number cross-referencing', 'Prevent production line halts from missing spares', 'Track maintenance refill intervals'],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans bg-grid-pattern">
      <LandingNav />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 w-full">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-amber-500/40 text-xs text-amber-800 font-mono shadow-sm">
            <span>INDUSTRIAL SOLUTIONS</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Tailored AI Solutions for Every <span className="text-amber-600">Factory Department</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600">
            From maintenance technicians on the plant floor to EHS safety directors and operations executives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {solutions.map((s) => (
            <div key={s.id} className="p-8 rounded-2xl bg-white border border-slate-200 space-y-6 hover:border-amber-500/60 transition-all shadow-sm hover:shadow-md">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center">
                  {s.icon}
                </div>
                <span className="text-[10px] font-mono text-amber-800 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 uppercase tracking-wider font-bold">
                  {s.category}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{s.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{s.description}</p>
              </div>

              <div className="space-y-2 pt-4 border-t border-slate-100">
                <div className="text-xs font-mono text-slate-500 uppercase font-bold">Key Business Outcomes:</div>
                {s.benefits.map((b) => (
                  <div key={b} className="flex items-center gap-2 text-xs font-mono text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
