'use client';

import React from 'react';
import Link from 'next/link';
import { 
  FileText, Database, Cpu, Mic, Languages, ShieldAlert, 
  Terminal, Code2, ArrowRight, CheckCircle2 
} from 'lucide-react';
import { LandingNav } from '@/components/navigation/LandingNav';

export default function DocsPage() {
  const docsSections = [
    {
      title: '1. Quick Start & Setup',
      icon: <Terminal className="w-5 h-5 text-gold-500" />,
      content: 'Configure your environment variables in .env.local: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY, and GEMINI_API_KEY.',
    },
    {
      title: '2. Supabase Database & pgvector Setup',
      icon: <Database className="w-5 h-5 text-gold-500" />,
      content: 'Execute supabase/schema.sql in your Supabase SQL Editor. This initializes tables (documents, document_chunks, factory_machines) and creates the match_document_chunks RPC cosine similarity search function.',
    },
    {
      title: '3. Production RAG Architecture',
      icon: <Cpu className="w-5 h-5 text-gold-500" />,
      content: 'Multi-format parsers extract text from PDF, DOCX, TXT, CSV, and XLSX files. Text is chunked into 500-token blocks with 50-token overlap, vectorized via Gemini text-embedding-004 (768-D), and searched via Cosine Similarity.',
    },
    {
      title: '4. Multilingual RAG API (EN, TA, HI)',
      icon: <Languages className="w-5 h-5 text-gold-500" />,
      content: 'The POST /api/chat endpoint auto-detects English, Tamil (தமிழ்), and Hindi (हिन्दी) scripts while strictly preserving technical machine identifiers (Machine M-01, 220V, 50Hz, LOTO-#402).',
    },
    {
      title: '5. Hands-Free Voice Assistant Architecture',
      icon: <Mic className="w-5 h-5 text-gold-500" />,
      content: 'Web Speech API integration handles Speech-to-Text (STT) query transcription and Neural Text-to-Speech (TTS) audio playback in target dialects (en-US, ta-IN, hi-IN).',
    },
    {
      title: '6. EHS Safety & Tabular Math Engine',
      icon: <ShieldAlert className="w-5 h-5 text-gold-500" />,
      content: 'Detects high-risk hazard keywords (high voltage, boiler pressure, lockout tagout) and executes deterministic programmatic math calculations on CSV spreadsheets to prevent numerical hallucinations.',
    },
  ];

  return (
    <div className="min-h-screen bg-industrial-950 text-industrial-100 flex flex-col font-sans bg-grid-pattern">
      <LandingNav />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 w-full">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-industrial-900 border border-gold-500/30 text-xs text-gold-500 font-mono">
            <span>DOCUMENTATION & API GUIDE</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            FactoryGPT Technical <span className="text-gold-500">Documentation</span>
          </h1>
          <p className="text-base sm:text-lg text-industrial-400">
            Comprehensive developer reference for Supabase pgvector setup, RAG pipeline, Gemini AI integration, and Voice STT/TTS.
          </p>
        </div>

        <div className="space-y-6 max-w-4xl mx-auto">
          {docsSections.map((s) => (
            <div key={s.title} className="p-6 rounded-2xl bg-industrial-900 border border-industrial-800 space-y-3 shadow-xl hover:border-gold-500/40 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gold-600/10 border border-gold-500/30 flex items-center justify-center shrink-0">
                  {s.icon}
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">{s.title}</h3>
              </div>
              <p className="text-xs font-mono text-industrial-400 leading-relaxed pl-13">{s.content}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
