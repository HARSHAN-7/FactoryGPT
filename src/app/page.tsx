import React from 'react';
import Link from 'next/link';
import { 
  Cpu, FileText, Activity, ShieldAlert, Languages, Mic, 
  Layers, ArrowRight, CheckCircle2, BarChart3, Database, 
  Search, Lock, Terminal, Wrench, HardHat, Gauge
} from 'lucide-react';
import { LandingNav } from '@/components/navigation/LandingNav';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-industrial-950 text-industrial-100 flex flex-col font-sans selection:bg-accent-orange selection:text-white bg-grid-pattern">
      {/* Top Header */}
      <LandingNav />

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full text-center">
        {/* Status ticker pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-industrial-900 border border-industrial-700 text-xs text-industrial-300 mb-8 shadow-inner">
          <span className="w-2 h-2 rounded-full bg-accent-orange animate-status-pulse" />
          <span className="font-mono text-[11px]">INDUSTRIAL ENGINE V1.0</span>
          <span className="text-industrial-600">|</span>
          <span className="text-industrial-400">Phase 1 Control System</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
          AI Intelligence for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-orange via-orange-400 to-amber-500 font-mono">Modern Factory</span>
        </h1>

        {/* Supporting Text */}
        <p className="mt-6 text-lg sm:text-xl text-industrial-300 max-w-3xl mx-auto font-normal leading-relaxed">
          Ask questions, understand factory knowledge, analyze operational data, and access machine intelligence through one AI assistant.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/chat" className="w-full sm:w-auto">
            <Button variant="primary" size="lg" className="w-full font-semibold shadow-lg shadow-orange-500/10" icon={<ArrowRight className="w-5 h-5" />}>
              Open FactoryGPT
            </Button>
          </Link>
          <a href="#capabilities" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full">
              Explore Capabilities
            </Button>
          </a>
        </div>

        {/* Engineering Control Panel Preview Mockup */}
        <div className="mt-14 max-w-5xl mx-auto rounded-xl border border-industrial-700 bg-industrial-900 shadow-2xl p-2 sm:p-4 relative overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 border-b border-industrial-800 bg-industrial-950 rounded-t-lg">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="text-xs font-mono text-industrial-400 ml-2">factorygpt://control-panel/live</span>
            </div>
            <Badge variant="indexed" dot>SYSTEM NORMAL</Badge>
          </div>
          <div className="p-4 sm:p-6 bg-industrial-950/80 text-left font-mono text-xs text-industrial-300 space-y-3 rounded-b-lg border border-industrial-800/60 mt-1">
            <div className="flex items-center gap-2 text-accent-orange font-bold">
              <Terminal className="w-4 h-4" />
              <span>[FACTORYGPT INTELLIGENCE ENGINE ACTIVE]</span>
            </div>
            <div className="text-industrial-400">
              &gt; Ingesting SOPs: <span className="text-emerald-400">24 Indexed</span> | Hydraulics, Electrics, OSHA Safety
            </div>
            <div className="p-3 bg-industrial-900 rounded border border-industrial-800 text-industrial-200">
              <span className="text-industrial-400 font-sans">User Query:</span> "What is the emergency lockout procedure for Hydraulic Pump HP4000?"
            </div>
            <div className="p-3 bg-industrial-900/60 rounded border border-industrial-800/80 text-industrial-300 font-sans leading-relaxed">
              <span className="text-accent-orange font-mono font-bold block mb-1">FactoryGPT Analysis & Citation:</span>
              1. Turn main breaker **CB-04** to OFF position.<br/>
              2. Attach red padlock **LOTO-#809** to breaker door mechanism.<br/>
              <span className="inline-block mt-2 text-xs font-mono text-emerald-400 border border-emerald-800/60 bg-emerald-950/40 px-2 py-0.5 rounded">
                Source: Hydraulic_Pump_HP4000_Maintenance_Manual.pdf (Page 45)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 bg-industrial-900/60 border-y border-industrial-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-xs font-mono text-accent-orange uppercase tracking-widest mb-2">Industrial Assistant</div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Designed for Engineering Rigor & Factory Operations
              </h2>
              <p className="mt-4 text-industrial-300 text-base leading-relaxed">
                Factories operate under tight deadlines, strict compliance regulations, and complex machinery manuals. FactoryGPT bridges the gap between field engineers, plant managers, and massive technical documentation.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'Instant retrieval of machine manuals and operating procedures (SOPs)',
                  'Data-backed source citations eliminating hallucinated procedures',
                  'Support for engineering tables, sensor logs, and maintenance CSV datasets',
                  'Enterprise safety compliance tracking and audit preparation'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-sm text-industrial-200">
                    <CheckCircle2 className="w-5 h-5 text-accent-orange shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Metric grid */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-industrial-900/90">
                <Gauge className="w-8 h-8 text-accent-orange mb-3" />
                <div className="text-2xl font-bold font-mono text-white">&lt; 2 Sec</div>
                <div className="text-xs text-industrial-400 mt-1">Manual Query Response</div>
              </Card>
              <Card className="bg-industrial-900/90">
                <FileText className="w-8 h-8 text-emerald-400 mb-3" />
                <div className="text-2xl font-bold font-mono text-white">PDF/CSV/XLSX</div>
                <div className="text-xs text-industrial-400 mt-1">Multi-format Parsing</div>
              </Card>
              <Card className="bg-industrial-900/90">
                <ShieldAlert className="w-8 h-8 text-amber-400 mb-3" />
                <div className="text-2xl font-bold font-mono text-white">OSHA LOTO</div>
                <div className="text-xs text-industrial-400 mt-1">Safety Compliant Guidance</div>
              </Card>
              <Card className="bg-industrial-900/90">
                <Languages className="w-8 h-8 text-blue-400 mb-3" />
                <div className="text-2xl font-bold font-mono text-white">Multilingual</div>
                <div className="text-xs text-industrial-400 mt-1">Cross-shift Communication</div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section id="capabilities" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-mono text-accent-orange uppercase tracking-widest mb-2">Core Features</div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Factory Intelligence Capabilities</h2>
          <p className="text-industrial-300 mt-3 text-base">
            Turn static factory documents into conversational intelligence with precise engineering context.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card accentBorder>
            <FileText className="w-7 h-7 text-accent-orange mb-4" />
            <CardTitle>SOP & Manual Ingestion</CardTitle>
            <p className="text-sm text-industrial-300 mt-2 leading-relaxed">
              Upload PDF operating guides, equipment manuals, and electrical schematics. Indexing makes every page searchable.
            </p>
          </Card>

          <Card accentBorder>
            <Search className="w-7 h-7 text-accent-orange mb-4" />
            <CardTitle>Exact Source Citations</CardTitle>
            <p className="text-sm text-industrial-300 mt-2 leading-relaxed">
              Every answer highlights the exact document name, chapter, and page number so operators can verify steps immediately.
            </p>
          </Card>

          <Card accentBorder>
            <BarChart3 className="w-7 h-7 text-accent-orange mb-4" />
            <CardTitle>Production Data Analysis</CardTitle>
            <p className="text-sm text-industrial-300 mt-2 leading-relaxed">
              Analyze CSV and XLSX spreadsheets containing hourly unit counts, breakdown logs, and component wear stats.
            </p>
          </Card>

          <Card accentBorder>
            <ShieldAlert className="w-7 h-7 text-accent-orange mb-4" />
            <CardTitle>Safety & EHS Guidelines</CardTitle>
            <p className="text-sm text-industrial-300 mt-2 leading-relaxed">
              Instant retrieval of Lockout/Tagout (LOTO) requirements, hazardous material sheets (MSDS), and emergency steps.
            </p>
          </Card>

          <Card accentBorder>
            <Languages className="w-7 h-7 text-accent-orange mb-4" />
            <CardTitle>Multilingual Workforce</CardTitle>
            <p className="text-sm text-industrial-300 mt-2 leading-relaxed">
              Query English manuals and receive explanations in Spanish, German, Japanese, or regional languages.
            </p>
          </Card>

          <Card accentBorder>
            <Mic className="w-7 h-7 text-accent-orange mb-4" />
            <CardTitle>Hands-free Voice AI (Phase 3)</CardTitle>
            <p className="text-sm text-industrial-300 mt-2 leading-relaxed">
              Voice command interface allowing line technicians wearing gloves to query manuals without typing.
            </p>
          </Card>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-20 bg-industrial-900/40 border-t border-industrial-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-xs font-mono text-accent-orange uppercase tracking-widest mb-2">Workflow</div>
            <h2 className="text-3xl font-bold text-white tracking-tight">How FactoryGPT Works</h2>
            <p className="text-industrial-300 mt-3 text-base">
              A 4-step pipeline designed for speed, safety, and privacy in manufacturing environments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Upload & Parsing', desc: 'Drag and drop PDFs, DOCX, and CSV maintenance logs into the Admin Portal.' },
              { step: '02', title: 'Vector Indexing', desc: 'Text is chunked and embedded into Supabase pgvector database for semantic search.' },
              { step: '03', title: 'Context Retrieval', desc: 'When an operator asks a question, relevant manual sections are fetched instantly.' },
              { step: '04', title: 'Grounded Answer', desc: 'Gemini LLM synthesizes a precise response backed by step-by-step citations.' },
            ].map((item, idx) => (
              <div key={idx} className="bg-industrial-900 border border-industrial-800 p-6 rounded-lg relative">
                <div className="text-3xl font-bold font-mono text-industrial-600 mb-3">{item.step}</div>
                <h3 className="text-base font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-xs text-industrial-300 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industrial Use Cases */}
      <section id="use-cases" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-mono text-accent-orange uppercase tracking-widest mb-2">Applications</div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Built for Every Role on the Plant Floor</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg bg-industrial-900 border border-industrial-800">
            <Wrench className="w-8 h-8 text-accent-orange mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Maintenance Engineers</h3>
            <p className="text-sm text-industrial-300 leading-relaxed">
              Quickly troubleshoot error codes (e.g. "Error E-402 on CNC Machine") without flipping through 300-page paper binders.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-industrial-900 border border-industrial-800">
            <HardHat className="w-8 h-8 text-amber-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Safety & EHS Officers</h3>
            <p className="text-sm text-industrial-300 leading-relaxed">
              Ensure shift workers adhere to up-to-date compliance procedures, chemical handling protocols, and protective gear requirements.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-industrial-900 border border-industrial-800">
            <BarChart3 className="w-8 h-8 text-emerald-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Plant Managers</h3>
            <p className="text-sm text-industrial-300 leading-relaxed">
              Query daily production logs to detect recurring bottleneck machines, track shift efficiency, and optimize maintenance schedules.
            </p>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="py-16 bg-industrial-900/60 border-y border-industrial-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="text-xs font-mono text-accent-orange uppercase tracking-widest mb-2">Architecture</div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Engineering Tech Stack</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-industrial-950 border border-industrial-800 rounded">
              <div className="font-mono text-accent-orange font-bold">Next.js 14</div>
              <div className="text-xs text-industrial-400 mt-1">App Router & Server Actions</div>
            </div>
            <div className="p-4 bg-industrial-950 border border-industrial-800 rounded">
              <div className="font-mono text-emerald-400 font-bold">Supabase pgvector</div>
              <div className="text-xs text-industrial-400 mt-1">PostgreSQL Vector DB</div>
            </div>
            <div className="p-4 bg-industrial-950 border border-industrial-800 rounded">
              <div className="font-mono text-blue-400 font-bold">Google Gemini API</div>
              <div className="text-xs text-industrial-400 mt-1">Multimodal LLM Reasoning</div>
            </div>
            <div className="p-4 bg-industrial-950 border border-industrial-800 rounded">
              <div className="font-mono text-amber-400 font-bold">TypeScript Strict</div>
              <div className="text-xs text-industrial-400 mt-1">Production Type Safety</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        <div className="p-10 rounded-2xl bg-gradient-to-b from-industrial-900 to-industrial-950 border border-industrial-700 shadow-2xl relative overflow-hidden">
          <h2 className="text-3xl font-bold text-white tracking-tight">Ready to test FactoryGPT Phase 1?</h2>
          <p className="mt-3 text-industrial-300 max-w-xl mx-auto text-sm">
            Access the chat assistant interface or manage machine manuals through the admin dashboard.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/chat">
              <Button variant="primary" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
                Launch Chat Interface
              </Button>
            </Link>
            <Link href="/admin">
              <Button variant="outline" size="lg" icon={<Database className="w-5 h-5" />}>
                Open Admin Portal
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-industrial-800 bg-industrial-950 py-8 text-xs text-industrial-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-accent-orange" />
            <span className="font-mono text-white font-bold">FACTORYGPT</span>
            <span>— Final Year Engineering Project (Phase 1)</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/chat" className="hover:text-white">Chat</Link>
            <Link href="/admin" className="hover:text-white">Admin</Link>
            <Link href="/settings" className="hover:text-white">Settings</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
