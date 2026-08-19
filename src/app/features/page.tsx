'use client';

import React from 'react';
import Link from 'next/link';
import { 
  BarChart3, Activity, Zap, Database, Mic, Languages, 
  ShieldAlert, Wrench, ArrowRight, Cpu, CheckCircle2, Layers 
} from 'lucide-react';
import { LandingNav } from '@/components/navigation/LandingNav';

export default function FeaturesPage() {
  const featureList = [
    {
      title: 'Supabase pgvector RAG Engine',
      icon: <Database className="w-6 h-6 text-amber-600" />,
      description: 'Parses PDF, DOCX, TXT, CSV, and XLSX plant documents into 500-token chunks with 768-D Gemini vector embeddings and cosine similarity search.',
      details: ['Multi-format document parser', 'Automatic 500-token chunking', 'Cosine similarity threshold (0.50)', 'Source citation mapping'],
    },
    {
      title: 'Multilingual Knowledge Retrieval',
      icon: <Languages className="w-6 h-6 text-amber-600" />,
      description: 'Query English machine manuals using English, Tamil (தமிழ்), or Hindi (हिन्दी) without duplicating vector stores.',
      details: ['Script range auto-detection', 'Technical identifier preservation', 'Single shared vector store', 'Native script response synthesis'],
    },
    {
      title: 'Hands-Free Voice AI Assistant',
      icon: <Mic className="w-6 h-6 text-amber-600" />,
      description: 'Speech-to-Text query transcription and Neural Text-to-Speech answer playback designed for plant operators wearing gloves.',
      details: ['Web Speech API integration', 'Pulsing mic state indicator', 'Mute/Unmute audio controls', 'En-US, Ta-IN, Hi-IN voices'],
    },
    {
      title: 'Deterministic Tabular CSV Math Engine',
      icon: <BarChart3 className="w-6 h-6 text-amber-600" />,
      description: 'Executes programmatic math calculations on spreadsheet production datasets to prevent numerical hallucinations.',
      details: ['Max downtime calculation', 'Line comparison metrics', 'Production output totals', 'Exact numerical precision'],
    },
    {
      title: 'EHS Safety Guardrails',
      icon: <ShieldAlert className="w-6 h-6 text-amber-600" />,
      description: 'Detects high-risk industrial keywords (high voltage, boiler pressure, LOTO) and appends mandatory EHS warning banners.',
      details: ['Hazard category classification', 'Lockout/Tagout enforcement', 'Mandatory PPE warnings', 'Ungrounded risk alerts'],
    },
    {
      title: 'Equipment & Machine Inventory',
      icon: <Wrench className="w-6 h-6 text-amber-600" />,
      description: 'Track plant equipment telemetry, operating parameters (RPM, Pressure, Voltage), maintenance intervals, and live status.',
      details: ['Machine status badges', 'Operating parameter tracking', 'Maintenance interval timers', 'Zone location mapping'],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans bg-grid-pattern">
      <LandingNav />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 w-full">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-amber-500/40 text-xs text-amber-800 font-mono shadow-sm">
            <span>PLATFORM CAPABILITIES</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Advanced AI Features for <span className="text-amber-600">Smart Factories</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600">
            Explore the industrial AI capabilities driving predictive maintenance, document search, and hands-free plant floor operations.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureList.map((item) => (
            <div key={item.title} className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-amber-500/60 transition-all space-y-4 flex flex-col justify-between shadow-sm hover:shadow-md">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2 text-xs font-mono text-slate-700">
                {item.details.map((d) => (
                  <div key={d} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="rounded-2xl bg-white border border-slate-200 p-8 sm:p-12 text-center space-y-6 shadow-xl gold-glow">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Ready to Deploy FactoryGPT to Your Production Line?</h2>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto">Connect your Supabase database and Gemini API key to start querying your plant documents in under 5 minutes.</p>
          <div className="flex justify-center gap-4">
            <Link href="/chat">
              <button className="px-8 py-3.5 rounded-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm transition-all flex items-center gap-2 shadow-lg shadow-amber-500/25">
                <span>Start Free Trial</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
