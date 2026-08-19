'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Play } from 'lucide-react';
import { LandingNav } from '@/components/navigation/LandingNav';
import { PartnerLogos } from '@/components/ui/PartnerLogos';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-industrial-950 text-industrial-100 flex flex-col justify-between font-sans selection:bg-gold-600 selection:text-white bg-grid-pattern overflow-x-hidden">
      {/* Header Navigation matching full screen width */}
      <LandingNav />

      {/* Hero Section matching full screen fit */}
      <main className="flex-1 flex items-center px-4 sm:px-6 lg:px-10 max-w-[95%] xl:max-w-[96vw] mx-auto w-full py-6 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
          
          {/* Left Column: Headline & Call-to-actions */}
          <div className="lg:col-span-5 text-left space-y-6">
            
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-industrial-900 border border-gold-500/40 text-[11px] text-gold-500 font-mono">
              <span className="w-2 h-2 rounded-full bg-gold-500 animate-status-pulse" />
              <span>AI FOR SMARTER MANUFACTURING</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
              Run Your<br />
              Factory.<br />
              <span className="text-gold-500 font-extrabold">Smarter with AI.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-industrial-400 font-normal leading-relaxed max-w-lg">
              FactoryGPT brings the power of AI to your production line. Optimize operations, predict issues, and make data-driven decisions in real-time.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center gap-4">
              <Link href="/chat">
                <button className="px-8 py-3.5 rounded-full bg-gold-600 hover:bg-gold-700 text-industrial-950 font-bold text-sm transition-all flex items-center gap-2 shadow-xl shadow-gold-600/30 hover:shadow-gold-600/40">
                  <span>Start Free Trial</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </Link>

              <Link href="/chat">
                <button className="px-8 py-3.5 rounded-full bg-industrial-900 border border-industrial-700 hover:border-gold-500/50 text-white font-semibold text-sm transition-all flex items-center gap-2">
                  <span>Explore Demo</span>
                  <Play className="w-3.5 h-3.5 text-gold-500 fill-current" />
                </button>
              </Link>
            </div>

            {/* Trusted by Industry Leaders Footer with Original Vector Logos */}
            <div className="pt-6 border-t border-industrial-800/60 space-y-2">
              <div className="text-[10px] font-mono text-industrial-500 tracking-wider uppercase font-semibold">
                TRUSTED BY INDUSTRY LEADERS
              </div>
              <PartnerLogos />
            </div>
          </div>

          {/* Right Column: High Resolution Smart Factory 3D Render Image */}
          <div className="lg:col-span-7 relative">
            <div className="relative mx-auto rounded-2xl bg-industrial-900 border border-industrial-800 p-2 sm:p-3 gold-glow overflow-hidden shadow-2xl">
              <div className="relative rounded-xl overflow-hidden border border-industrial-800/80 bg-industrial-950">
                <img
                  src="/smart-factory-hero.png"
                  alt="FactoryGPT Smart Automated 3D Factory"
                  className="w-full h-auto object-cover rounded-xl shadow-2xl"
                />
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 border-t border-industrial-800/60 bg-industrial-950 text-center text-[11px] font-mono text-industrial-500">
        © 2026 FactoryGPT Industrial AI Platform. All Rights Reserved.
      </footer>
    </div>
  );
}
