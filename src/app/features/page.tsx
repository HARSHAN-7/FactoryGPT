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
      icon: <Database className="w-6 h-6 text-gold-500" />,
      description: 'Parses PDF, DOCX, TXT, CSV, and XLSX plant documents into 500-token chunks with 768-D Gemini vector embeddings and cosine similarity search.',
      details: ['Multi-format document parser', 'Automatic 500-token chunking', 'Cosine similarity threshold (0.50)', 'Source citation mapping'],
    },
    {
      title: 'Multilingual Knowledge Retrieval',
      icon: <Languages className="w-6 h-6 text-gold-500" />,
      description: 'Query English machine manuals using English, Tamil (தமிழ்), or Hindi (हिन्दी) without duplicating vector stores.',
      details: ['Script range auto-detection', 'Technical identifier preservation', 'Single shared vector store', 'Native script response synthesis'],
    },
    {
      title: 'Hands-Free Voice AI Assistant',
      icon: <Mic className="w-6 h-6 text-gold-500" />,
      description: 'Speech-to-Text query transcription and Neural Text-to-Speech answer playback designed for plant operators wearing gloves.',
      details: ['Web Speech API integration', 'Pulsing mic state indicator', 'Mute/Unmute audio controls', 'En-US, Ta-IN, Hi-IN voices'],
    },
    {
      title: 'Deterministic Tabular CSV Math Engine',
      icon: <BarChart3 className="w-6 h-6 text-gold-500" />,
      description: 'Executes programmatic math calculations on spreadsheet production datasets to prevent numerical hallucinations.',
      details: ['Max downtime calculation', 'Line comparison metrics', 'Production output totals', 'Exact numerical precision'],
    },
    {
      title: 'EHS Safety Guardrails',
      icon: <ShieldAlert className="w-6 h-6 text-gold-500" />,
      description: 'Detects high-risk industrial keywords (high voltage, boiler pressure, LOTO) and appends mandatory EHS warning banners.',
      details: ['Hazard category classification', 'Lockout/Tagout enforcement', 'Mandatory PPE warnings', 'Ungrounded risk alerts'],
    },
    {
      title: 'Equipment & Machine Inventory',
      icon: <Wrench className="w-6 h-6 text-gold-500" />,
      description: 'Track plant equipment telemetry, operating parameters (RPM, Pressure, Voltage), maintenance intervals, and live status.',
      details: ['Machine status badges', 'Operating parameter tracking', 'Maintenance interval timers', 'Zone location mapping'],
    },
  ];

  return (
    <div className="min-h-screen bg-industrial-950 text-industrial-100 flex flex-col font-sans bg-grid-pattern">
      <LandingNav />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 w-full">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-industrial-900 border border-gold-500/30 text-xs text-gold-500 font-mono">
            <span>PLATFORM CAPABILITIES</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Advanced AI Features for <span className="text-gold-500">Smart Factories</span>
          </h1>
          <p className="text-base sm:text-lg text-industrial-400">
            Explore the industrial AI capabilities driving predictive maintenance, document search, and hands-free plant floor operations.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureList.map((item) => (
            <div key={item.title} className="p-6 rounded-2xl bg-industrial-900 border border-industrial-800 hover:border-gold-500/40 transition-colors space-y-4 flex flex-col justify-between shadow-xl">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-gold-600/10 border border-gold-500/30 flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">{item.title}</h3>
                <p className="text-xs text-industrial-400 leading-relaxed">{item.description}</p>
              </div>

              <div className="pt-4 border-t border-industrial-800 space-y-2 text-xs font-mono text-industrial-300">
                {item.details.map((d) => (
                  <div key={d} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                    <span>{d}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="rounded-2xl bg-industrial-900 border border-industrial-800 p-8 sm:p-12 text-center space-y-6 shadow-2xl gold-glow">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Ready to Deploy FactoryGPT to Your Production Line?</h2>
          <p className="text-sm text-industrial-400 max-w-2xl mx-auto">Connect your Supabase database and Gemini API key to start querying your plant documents in under 5 minutes.</p>
          <div className="flex justify-center gap-4">
            <Link href="/chat">
              <button className="px-8 py-3.5 rounded-full bg-gold-600 hover:bg-gold-700 text-industrial-950 font-bold text-sm transition-all flex items-center gap-2 shadow-xl shadow-gold-600/25">
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
