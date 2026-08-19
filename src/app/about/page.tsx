'use client';

import React from 'react';
import Link from 'next/link';
import { Target, Eye } from 'lucide-react';
import { LandingNav } from '@/components/navigation/LandingNav';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans bg-grid-pattern">
      <LandingNav />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 w-full">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-amber-500/40 text-xs text-amber-800 font-mono shadow-sm">
            <span>ABOUT FACTORYGPT</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Smarter Factories. <span className="text-amber-600">Better Future.</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600">
            FactoryGPT is an industrial AI research initiative bridging advanced Retrieval-Augmented Generation (RAG) with manufacturing plant operations.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Our Mission</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              To empower industrial plant floor technicians and engineers with instant, accurate, hands-free voice and multilingual AI assistance, eliminating downtime and enforcing zero-incident safety standards.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Our Vision</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              A future where every manufacturing plant operates with zero unscheduled downtime, zero safety violations, and seamless data intelligence across all production equipment.
            </p>
          </div>
        </div>

        {/* Core Principles */}
        <div className="p-8 rounded-2xl bg-white border border-slate-200 space-y-6 shadow-xl gold-glow">
          <h2 className="text-2xl font-extrabold text-slate-900">Engineering Excellence Principles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs font-mono text-slate-700">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-amber-700 font-bold">1. Zero Hallucination</div>
              <div className="text-slate-600">Strict context grounding ensures technicians receive only verified engineering manual procedures.</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-amber-700 font-bold">2. Technical Precision</div>
              <div className="text-slate-600">Exact alphanumeric machine codes, voltage levels, pressure readings, and LOTO numbers are preserved.</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="text-amber-700 font-bold">3. Multilingual Accessibility</div>
              <div className="text-slate-600">Equipping plant operators to ask questions in English, Tamil, or Hindi effortlessly.</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
