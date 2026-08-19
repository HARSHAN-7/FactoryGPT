'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Construction, Target, Eye, Award, CheckCircle2, ArrowRight 
} from 'lucide-react';
import { LandingNav } from '@/components/navigation/LandingNav';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-industrial-950 text-industrial-100 flex flex-col font-sans bg-grid-pattern">
      <LandingNav />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 w-full">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-industrial-900 border border-gold-500/30 text-xs text-gold-500 font-mono">
            <span>ABOUT FACTORYGPT</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Smarter Factories. <span className="text-gold-500">Better Future.</span>
          </h1>
          <p className="text-base sm:text-lg text-industrial-400">
            FactoryGPT is an industrial AI research initiative bridging advanced Retrieval-Augmented Generation (RAG) with manufacturing plant operations.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-industrial-900 border border-industrial-800 space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-gold-600/10 border border-gold-500/30 flex items-center justify-center text-gold-500">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">Our Mission</h3>
            <p className="text-xs text-industrial-400 leading-relaxed">
              To empower industrial plant floor technicians and engineers with instant, accurate, hands-free voice and multilingual AI assistance, eliminating downtime and enforcing zero-incident safety standards.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-industrial-900 border border-industrial-800 space-y-4 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-gold-600/10 border border-gold-500/30 flex items-center justify-center text-gold-500">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">Our Vision</h3>
            <p className="text-xs text-industrial-400 leading-relaxed">
              A future where every manufacturing plant operates with zero unscheduled downtime, zero safety violations, and seamless data intelligence across all production equipment.
            </p>
          </div>
        </div>

        {/* Core Principles */}
        <div className="p-8 rounded-2xl bg-industrial-900 border border-industrial-800 space-y-6 shadow-2xl">
          <h2 className="text-2xl font-extrabold text-white">Engineering Excellence Principles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs font-mono text-industrial-300">
            <div className="p-4 rounded-xl bg-industrial-950 border border-industrial-800 space-y-2">
              <div className="text-gold-500 font-bold">1. Zero Hallucination</div>
              <div className="text-industrial-400">Strict context grounding ensures technicians receive only verified engineering manual procedures.</div>
            </div>
            <div className="p-4 rounded-xl bg-industrial-950 border border-industrial-800 space-y-2">
              <div className="text-gold-500 font-bold">2. Technical Precision</div>
              <div className="text-industrial-400">Exact alphanumeric machine codes, voltage levels, pressure readings, and LOTO numbers are preserved.</div>
            </div>
            <div className="p-4 rounded-xl bg-industrial-950 border border-industrial-800 space-y-2">
              <div className="text-gold-500 font-bold">3. Multilingual Accessibility</div>
              <div className="text-industrial-400">Equipping plant operators to ask questions in English, Tamil, or Hindi effortlessly.</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
