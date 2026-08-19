'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Construction, ArrowUpRight, Play, TrendingUp, Cpu, 
  CheckCircle2, Activity, ShieldAlert, BarChart3, Database, 
  Layers, Search, Sliders, Zap, Wrench, RefreshCw, ChevronDown
} from 'lucide-react';
import { LandingNav } from '@/components/navigation/LandingNav';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-industrial-950 text-industrial-100 flex flex-col font-sans selection:bg-gold-600 selection:text-white bg-grid-pattern">
      {/* Header Navigation matching template */}
      <LandingNav />

      {/* Hero Section */}
      <section className="relative pt-10 pb-16 md:pt-16 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Call-to-actions */}
          <div className="lg:col-span-5 text-left space-y-6">
            
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-industrial-900 border border-gold-500/30 text-xs text-gold-500 font-mono">
              <span className="w-2 h-2 rounded-full bg-gold-500 animate-status-pulse" />
              <span>AI FOR SMARTER MANUFACTURING</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Run Your Factory.<br />
              <span className="text-gold-500 font-extrabold">Smarter with AI.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-industrial-400 font-normal leading-relaxed">
              FactoryGPT brings the power of AI to your production line. Optimize operations, predict issues, and make data-driven decisions in real-time.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <Link href="/chat" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gold-600 hover:bg-gold-700 text-industrial-950 font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-xl shadow-gold-600/25">
                  <span>Start Free Trial</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </Link>

              <Link href="/chat" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-industrial-900 border border-industrial-700 hover:border-gold-500/50 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2">
                  <span>Explore Demo</span>
                  <Play className="w-4 h-4 text-gold-500 fill-current" />
                </button>
              </Link>
            </div>

            {/* Trusted by Industry Leaders */}
            <div className="pt-8 border-t border-industrial-800/80 space-y-3">
              <div className="text-[11px] font-mono text-industrial-500 tracking-wider uppercase font-semibold">
                TRUSTED BY INDUSTRY LEADERS
              </div>
              <div className="flex flex-wrap items-center gap-6 text-industrial-400 font-mono font-bold text-sm">
                <span className="hover:text-white transition-colors">SIEMENS</span>
                <span className="hover:text-white transition-colors">ABB</span>
                <span className="hover:text-white transition-colors">TATA</span>
                <span className="hover:text-white transition-colors">Honeywell</span>
                <span className="hover:text-white transition-colors">Schneider</span>
              </div>
            </div>
          </div>

          {/* Right Column: Futuristic 3D Factory Visual & HUD Overlays */}
          <div className="lg:col-span-7 relative">
            <div className="relative mx-auto rounded-2xl bg-industrial-900 border border-industrial-800 p-3 sm:p-5 gold-glow overflow-hidden">
              
              {/* Graphic Factory Render Representation */}
              <div className="relative h-[380px] sm:h-[440px] w-full rounded-xl bg-industrial-950 overflow-hidden flex items-center justify-center border border-industrial-800/60">
                {/* Visual Grid & Isometric Factory Lines */}
                <div className="absolute inset-0 bg-industrial-grid opacity-30" />
                
                {/* 3D Model Schematic Representation */}
                <div className="relative z-10 text-center space-y-4">
                  <div className="w-24 h-24 mx-auto rounded-2xl bg-industrial-900 border-2 border-gold-500/40 flex items-center justify-center text-gold-500 shadow-2xl animate-pulse">
                    <Construction className="w-12 h-12" />
                  </div>
                  <div className="text-sm font-mono text-white font-bold tracking-wider">
                    SMART FACTORY AUTOMATION HUB
                  </div>
                  <div className="text-xs font-mono text-gold-500 bg-gold-600/10 px-3 py-1 rounded-full border border-gold-500/20 inline-block">
                    ● REAL-TIME AI TELEMETRY CONNECTED
                  </div>
                </div>

                {/* HUD Overlay Card 1: Production Overview */}
                <div className="absolute top-4 left-4 p-3 rounded-lg bg-industrial-900/90 border border-industrial-700/80 backdrop-blur-md text-left shadow-lg w-44">
                  <div className="text-[10px] font-mono text-industrial-400">Production Overview</div>
                  <div className="text-xl font-bold font-mono text-white mt-1">98.6%</div>
                  <div className="text-[10px] text-emerald-400 font-mono">Efficiency ↑ 12.5%</div>
                </div>

                {/* HUD Overlay Card 2: Predictive Maintenance */}
                <div className="absolute top-6 right-4 p-3 rounded-lg bg-industrial-900/90 border border-industrial-700/80 backdrop-blur-md text-left shadow-lg w-48">
                  <div className="text-[10px] font-mono text-industrial-400">Predictive Maintenance</div>
                  <div className="flex items-center justify-between mt-1">
                    <div>
                      <div className="text-[10px] text-industrial-400">Risk Level</div>
                      <div className="text-sm font-bold font-mono text-emerald-400">Low</div>
                    </div>
                    <Wrench className="w-5 h-5 text-gold-500" />
                  </div>
                </div>

                {/* HUD Overlay Card 3: Energy Consumption */}
                <div className="absolute bottom-4 right-4 p-3 rounded-lg bg-industrial-900/90 border border-industrial-700/80 backdrop-blur-md text-left shadow-lg w-48">
                  <div className="text-[10px] font-mono text-industrial-400">Energy Consumption</div>
                  <div className="text-lg font-bold font-mono text-emerald-400 mt-1">-18.4%</div>
                  <div className="text-[10px] text-industrial-400 font-mono">vs last month</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Feature Highlights Bar (Middle Strip matching template image) */}
      <section className="border-y border-industrial-800 bg-industrial-900/60 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-4 rounded-xl bg-industrial-900 border border-industrial-800 flex items-start gap-4 hover:border-gold-500/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-gold-600/10 border border-gold-500/30 flex items-center justify-center text-gold-500 shrink-0">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-white text-sm">Real-time Analytics</div>
              <div className="text-xs text-industrial-400 mt-1">Monitor every machine and process in real-time.</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-industrial-900 border border-industrial-800 flex items-start gap-4 hover:border-gold-500/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-gold-600/10 border border-gold-500/30 flex items-center justify-center text-gold-500 shrink-0">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-white text-sm">Predictive Maintenance</div>
              <div className="text-xs text-industrial-400 mt-1">AI predicts failures before they happen.</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-industrial-900 border border-industrial-800 flex items-start gap-4 hover:border-gold-500/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-gold-600/10 border border-gold-500/30 flex items-center justify-center text-gold-500 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-white text-sm">Process Optimization</div>
              <div className="text-xs text-industrial-400 mt-1">Optimize workflows and increase productivity.</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-industrial-900 border border-industrial-800 flex items-start gap-4 hover:border-gold-500/40 transition-colors">
            <div className="w-10 h-10 rounded-lg bg-gold-600/10 border border-gold-500/30 flex items-center justify-center text-gold-500 shrink-0">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-white text-sm">Seamless Integration</div>
              <div className="text-xs text-industrial-400 mt-1">Works with your existing systems and sensors.</div>
            </div>
          </div>

        </div>
      </section>

      {/* Section 2: Powerful Insights & Real-Time Dashboard Preview matching template image */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-12">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-6 space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-gold-500">
              <span>⦿ POWERFUL INSIGHTS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Data. AI. Results.
            </h2>
            <p className="text-base text-industrial-400">
              FactoryGPT turns your factory data into actionable insights that drive real results.
            </p>
          </div>

          {/* 4 Key Stat Counters matching template */}
          <div className="lg:col-span-6 grid grid-cols-4 gap-4 text-center">
            <div className="p-3 rounded-lg bg-industrial-900 border border-industrial-800">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-gold-500">+32%</div>
              <div className="text-[11px] text-industrial-400 mt-1">Productivity</div>
            </div>
            <div className="p-3 rounded-lg bg-industrial-900 border border-industrial-800">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-gold-500">-24%</div>
              <div className="text-[11px] text-industrial-400 mt-1">Downtime</div>
            </div>
            <div className="p-3 rounded-lg bg-industrial-900 border border-industrial-800">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-gold-500">+18%</div>
              <div className="text-[11px] text-industrial-400 mt-1">Quality</div>
            </div>
            <div className="p-3 rounded-lg bg-industrial-900 border border-industrial-800">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-gold-500">-21%</div>
              <div className="text-[11px] text-industrial-400 mt-1">Energy Cost</div>
            </div>
          </div>
        </div>

        {/* Real-time Dashboard Interface Preview Mockup matching template image */}
        <div className="rounded-2xl border border-industrial-800 bg-industrial-900 p-4 sm:p-6 shadow-2xl space-y-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Mock Dashboard Sidebar */}
            <div className="lg:col-span-3 bg-industrial-950 p-4 rounded-xl border border-industrial-800 space-y-2 text-xs font-mono">
              <div className="flex items-center gap-2 pb-3 mb-2 border-b border-industrial-800 text-white font-bold">
                <Construction className="w-4 h-4 text-gold-500" />
                <span>FactoryGPT</span>
              </div>
              <div className="px-3 py-2 rounded-lg bg-gold-600/15 border border-gold-500/40 text-gold-500 font-bold flex items-center gap-2">
                <span>Overview</span>
              </div>
              <div className="px-3 py-2 text-industrial-400 hover:text-white cursor-pointer">Production</div>
              <div className="px-3 py-2 text-industrial-400 hover:text-white cursor-pointer">Machines</div>
              <div className="px-3 py-2 text-industrial-400 hover:text-white cursor-pointer">Analytics</div>
              <div className="px-3 py-2 text-industrial-400 hover:text-white cursor-pointer">Alerts</div>
              <div className="px-3 py-2 text-industrial-400 hover:text-white cursor-pointer">Reports</div>
              <div className="px-3 py-2 text-industrial-400 hover:text-white cursor-pointer">Settings</div>
            </div>

            {/* Mock Main Metrics Grid */}
            <div className="lg:col-span-9 space-y-6">
              
              {/* 4 Summary Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-industrial-950 border border-industrial-800 space-y-1 text-left">
                  <div className="text-[10px] font-mono text-industrial-400">Production Efficiency</div>
                  <div className="text-2xl font-bold font-mono text-white">98.6%</div>
                  <div className="text-[10px] text-emerald-400 font-mono">↑ 12.5%</div>
                </div>

                <div className="p-4 rounded-xl bg-industrial-950 border border-industrial-800 space-y-1 text-left">
                  <div className="text-[10px] font-mono text-industrial-400">Total Output</div>
                  <div className="text-2xl font-bold font-mono text-white">24.5K</div>
                  <div className="text-[10px] text-emerald-400 font-mono">↑ 8.4%</div>
                </div>

                <div className="p-4 rounded-xl bg-industrial-950 border border-industrial-800 space-y-1 text-left">
                  <div className="text-[10px] font-mono text-industrial-400">Active Machines</div>
                  <div className="text-2xl font-bold font-mono text-white">128</div>
                  <div className="text-[10px] text-emerald-400 font-mono">↑ 3.7%</div>
                </div>

                <div className="p-4 rounded-xl bg-industrial-950 border border-industrial-800 space-y-1 text-left">
                  <div className="text-[10px] font-mono text-industrial-400">Alerts</div>
                  <div className="text-2xl font-bold font-mono text-white">3</div>
                  <div className="text-[10px] text-red-400 font-mono">↓ 25%</div>
                </div>
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Production Trend Line Chart */}
                <div className="md:col-span-2 p-4 rounded-xl bg-industrial-950 border border-industrial-800 space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-white font-bold">Production Trend</span>
                    <span className="text-industrial-400 flex items-center gap-1 border border-industrial-700 px-2 py-0.5 rounded">This Week <ChevronDown className="w-3 h-3" /></span>
                  </div>
                  {/* SVG Wave Sparkline Chart */}
                  <div className="h-36 w-full flex items-end">
                    <svg className="w-full h-full text-gold-500" viewBox="0 0 400 100" fill="none">
                      <path d="M0 80 Q 50 20, 100 60 T 200 40 T 300 70 T 400 20" stroke="currentColor" strokeWidth="3" fill="none" />
                    </svg>
                  </div>
                </div>

                {/* Machine Status Donut Chart */}
                <div className="p-4 rounded-xl bg-industrial-950 border border-industrial-800 space-y-4">
                  <div className="text-xs font-mono text-white font-bold text-left">Machine Status</div>
                  <div className="flex items-center justify-center relative py-2">
                    <div className="w-24 h-24 rounded-full border-8 border-gold-500 flex items-center justify-center text-center">
                      <div>
                        <div className="text-lg font-bold font-mono text-white">128</div>
                        <div className="text-[9px] text-industrial-400">Total</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1 text-[11px] font-mono text-industrial-400 text-left">
                    <div className="flex justify-between"><span>● Running</span><span className="text-white">90</span></div>
                    <div className="flex justify-between"><span>● Idle</span><span className="text-white">21</span></div>
                    <div className="flex justify-between"><span>● Maintenance</span><span className="text-white">12</span></div>
                    <div className="flex justify-between"><span>● Offline</span><span className="text-white">5</span></div>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Footer */}
      <footer className="border-t border-industrial-800 bg-industrial-950 py-8 px-4 text-center text-xs font-mono text-industrial-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>© 2026 FactoryGPT Industrial AI Platform. All Rights Reserved.</div>
          <div className="flex items-center gap-6">
            <Link href="/chat" className="hover:text-gold-500">Open Assistant</Link>
            <Link href="/admin" className="hover:text-gold-500">Admin Portal</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
