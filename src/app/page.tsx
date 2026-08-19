'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Play } from 'lucide-react';
import { LandingNav } from '@/components/navigation/LandingNav';
import { PartnerLogos } from '@/components/ui/PartnerLogos';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between font-sans selection:bg-amber-500 selection:text-white bg-grid-pattern overflow-x-hidden">
      {/* Header Navigation matching white background */}
      <LandingNav />

      {/* Hero Section matching white background */}
      <main className="flex-1 flex items-center px-4 sm:px-6 lg:px-10 max-w-[95%] xl:max-w-[96vw] mx-auto w-full py-6 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
          
          {/* Left Column: Headline & Call-to-actions */}
          <div className="lg:col-span-5 text-left space-y-6">
            
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-amber-500/40 text-[11px] text-amber-700 font-mono shadow-sm">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-status-pulse" />
              <span>AI FOR SMARTER MANUFACTURING</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.08]">
              Run Your<br />
              Factory.<br />
              <span className="text-amber-600 font-extrabold">Smarter with AI.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-lg">
              FactoryGPT brings the power of AI to your production line. Optimize operations, predict issues, and make data-driven decisions in real-time.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center gap-4">
              <Link href="/chat">
                <button className="px-8 py-3.5 rounded-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm transition-all flex items-center gap-2 shadow-xl shadow-amber-500/20 hover:shadow-amber-500/30">
                  <span>Start Free Trial</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </Link>

              <Link href="/chat">
                <button className="px-8 py-3.5 rounded-full bg-white border border-slate-300 hover:border-amber-500 text-slate-800 font-semibold text-sm transition-all flex items-center gap-2 shadow-sm">
                  <span>Explore Demo</span>
                  <Play className="w-3.5 h-3.5 text-amber-600 fill-current" />
                </button>
              </Link>
            </div>

            {/* Trusted by Industry Leaders Footer */}
            <div className="pt-6 border-t border-slate-200 space-y-2">
              <div className="text-[10px] font-mono text-slate-500 tracking-wider uppercase font-semibold">
                TRUSTED BY INDUSTRY LEADERS
              </div>
              <PartnerLogos />
            </div>
          </div>

          {/* Right Column: High Resolution Smart Factory 3D Render Image */}
          <div className="lg:col-span-7 relative">
            <div className="relative mx-auto rounded-2xl bg-white border border-slate-200 p-2 sm:p-3 gold-glow overflow-hidden shadow-xl">
              <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-900">
                <img
                  src="/smart-factory-hero.png"
                  alt="FactoryGPT Smart Automated 3D Factory"
                  className="w-full h-auto object-cover rounded-xl shadow-lg"
                />
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 border-t border-slate-200 bg-white text-center text-[11px] font-mono text-slate-500">
        © 2026 FactoryGPT Industrial AI Platform. All Rights Reserved.
      </footer>
    </div>
  );
}
