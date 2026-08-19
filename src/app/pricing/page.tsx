'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, Zap, ShieldCheck } from 'lucide-react';
import { LandingNav } from '@/components/navigation/LandingNav';

export default function PricingPage() {
  const plans = [
    {
      name: 'Starter Plant',
      price: '$299',
      period: '/month',
      description: 'Ideal for single manufacturing facilities starting with AI document ingestion & RAG.',
      features: [
        'Up to 50 Uploaded Factory Documents',
        'Supabase pgvector Cosine Search',
        'Google Gemini 3.6 Flash Integration',
        'English & Tamil & Hindi RAG',
        'Standard Email Support',
      ],
      popular: false,
      buttonText: 'Start Free Trial',
    },
    {
      name: 'Professional Plant',
      price: '$799',
      period: '/month',
      description: 'Complete industrial solution with Hands-Free Voice AI and Machine Inventory.',
      features: [
        'Up to 500 Factory Documents',
        'Hands-Free Voice AI (STT & TTS)',
        'Machine Inventory Management (/admin/machines)',
        'Deterministic Tabular CSV Math Engine',
        'EHS Safety Guardrail Enforcement',
        'Priority Technical Support',
      ],
      popular: true,
      buttonText: 'Get Started Now',
    },
    {
      name: 'Enterprise Industry',
      price: '$1,999',
      period: '/month',
      description: 'For multi-facility enterprises requiring custom SLA, dedicated vector stores, and SCADA hooks.',
      features: [
        'Unlimited Factory Documents & Files',
        'Dedicated Isolated Supabase Instance',
        'Custom Fine-Tuned Gemini Embedding Model',
        '24/7 Dedicated Industrial SLA Support',
        'Custom SCADA / PLC Data Integrations',
        'On-Premise Deployment Options',
      ],
      popular: false,
      buttonText: 'Contact Sales',
    },
  ];

  return (
    <div className="min-h-screen bg-industrial-950 text-industrial-100 flex flex-col font-sans bg-grid-pattern">
      <LandingNav />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 w-full">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-industrial-900 border border-gold-500/30 text-xs text-gold-500 font-mono">
            <span>TRANSPARENT PRICING</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Flexible Plans for <span className="text-gold-500">Every Plant Size</span>
          </h1>
          <p className="text-base sm:text-lg text-industrial-400">
            Transparent pricing with zero hidden fees. Scale your factory intelligence effortlessly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`p-8 rounded-2xl bg-industrial-900 border ${
                p.popular ? 'border-gold-500 gold-glow relative' : 'border-industrial-800'
              } space-y-6 flex flex-col justify-between shadow-2xl`}
            >
              {p.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gold-600 text-industrial-950 text-[10px] font-mono font-bold uppercase tracking-wider">
                  MOST POPULAR PLAN
                </span>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">{p.name}</h3>
                  <p className="text-xs text-industrial-400 mt-1">{p.description}</p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold font-mono text-white">{p.price}</span>
                  <span className="text-xs text-industrial-400 font-mono">{p.period}</span>
                </div>

                <div className="space-y-2 pt-4 border-t border-industrial-800 text-xs font-mono text-industrial-300">
                  {p.features.map((f) => (
                    <div key={f} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link href="/chat">
                <button
                  className={`w-full py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                    p.popular
                      ? 'bg-gold-600 hover:bg-gold-700 text-industrial-950 shadow-xl shadow-gold-600/25'
                      : 'bg-industrial-850 hover:bg-industrial-800 text-white border border-industrial-700'
                  }`}
                >
                  <span>{p.buttonText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
