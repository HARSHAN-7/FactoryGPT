'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { 
  Settings as SettingsIcon, Sliders, Globe, Moon, Sun, 
  Mic, Cpu, ArrowLeft, Save, CheckCircle2, ShieldCheck, Database, Volume2
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<'general' | 'language' | 'appearance' | 'voice' | 'ai'>('general');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form states
  const [factoryName, setFactoryName] = useState('Apex Automotive Plant #4');
  const [operatorRole, setOperatorRole] = useState('Lead Engineering Officer');
  const [language, setLanguage] = useState('en');
  const [density, setDensity] = useState<'comfortable' | 'compact'>('comfortable');

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="min-h-screen bg-industrial-950 text-industrial-100 flex flex-col font-sans selection:bg-accent-orange selection:text-white bg-grid-pattern">
      {/* Top Bar */}
      <header className="h-16 border-b border-industrial-800 bg-industrial-950/90 backdrop-blur px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <Link href="/chat">
            <Button variant="ghost" size="sm" icon={<ArrowLeft className="w-4 h-4" />}>
              Back to Chat
            </Button>
          </Link>
          <div className="h-4 w-px bg-industrial-800 hidden sm:block" />
          <div className="flex items-center gap-2">
            <SettingsIcon className="w-5 h-5 text-accent-orange" />
            <h1 className="font-mono font-bold text-base text-white tracking-wider">
              FACTORYGPT <span className="text-industrial-400 font-normal">/ System Settings</span>
            </h1>
          </div>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={handleSave}
          icon={savedSuccess ? <CheckCircle2 className="w-4 h-4 text-white" /> : <Save className="w-4 h-4" />}
        >
          {savedSuccess ? 'Settings Saved' : 'Save Changes'}
        </Button>
      </header>

      {/* Main Content Layout */}
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Settings Tab Navigation Sidebar */}
          <div className="space-y-1">
            <div className="px-3 py-2 text-[11px] font-mono uppercase text-industrial-400">
              Configuration Categories
            </div>
            {[
              { id: 'general', label: 'General', icon: <Sliders className="w-4 h-4" /> },
              { id: 'language', label: 'Language', icon: <Globe className="w-4 h-4" /> },
              { id: 'appearance', label: 'Appearance', icon: <Moon className="w-4 h-4" /> },
              { id: 'voice', label: 'Voice AI (Phase 3)', icon: <Mic className="w-4 h-4 text-accent-orange" /> },
              { id: 'ai', label: 'AI & RAG Engine (Phase 2)', icon: <Cpu className="w-4 h-4 text-emerald-400" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-xs font-mono transition-colors text-left ${
                  activeTab === tab.id
                    ? 'bg-industrial-850 text-white font-bold border border-industrial-700'
                    : 'text-industrial-400 hover:bg-industrial-900 hover:text-white'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Settings Panel Content */}
          <div className="md:col-span-3 space-y-6">
            {/* GENERAL SETTINGS */}
            {activeTab === 'general' && (
              <Card>
                <CardHeader>
                  <CardTitle>General Factory Settings</CardTitle>
                </CardHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-mono text-industrial-300 block mb-1.5">
                      Factory / Plant Name
                    </label>
                    <Input
                      value={factoryName}
                      onChange={(e) => setFactoryName(e.target.value)}
                      className="max-w-md"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-industrial-300 block mb-1.5">
                      Operator Designation & Role
                    </label>
                    <Input
                      value={operatorRole}
                      onChange={(e) => setOperatorRole(e.target.value)}
                      className="max-w-md"
                    />
                  </div>

                  <div className="pt-3 border-t border-industrial-800 space-y-2">
                    <label className="text-xs font-mono text-industrial-300 block">
                      Security & Audit Logging
                    </label>
                    <p className="text-xs text-industrial-400">
                      All query interactions are logged for OSHA and ISO compliance auditing.
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* LANGUAGE SETTINGS */}
            {activeTab === 'language' && (
              <Card>
                <CardHeader>
                  <CardTitle>Multilingual Assistant Preferences</CardTitle>
                </CardHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-mono text-industrial-300 block mb-1.5">
                      Primary Interface & Assistant Output Language
                    </label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="h-9 max-w-md w-full bg-industrial-950 border border-industrial-700 rounded px-3 text-xs font-mono text-white focus:outline-none focus:border-accent-orange"
                    >
                      <option value="en">English (US)</option>
                      <option value="es">Spanish (Español)</option>
                      <option value="de">German (Deutsch)</option>
                      <option value="ja">Japanese (日本語)</option>
                    </select>
                  </div>

                  <div className="pt-2 text-xs text-industrial-400 leading-relaxed font-mono">
                    • FactoryGPT translates equipment manuals on-the-fly during vector ingestion.<br/>
                    • Technical terms (e.g. LOTO, SOP-402, Bar/PSI) retain exact engineering units.
                  </div>
                </div>
              </Card>
            )}

            {/* APPEARANCE SETTINGS */}
            {activeTab === 'appearance' && (
              <Card>
                <CardHeader>
                  <CardTitle>Appearance & Theme Controls</CardTitle>
                </CardHeader>
                <div className="space-y-6">
                  <div>
                    <label className="text-xs font-mono text-industrial-300 block mb-3">
                      Interface Theme Mode
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { id: 'dark', label: 'Dark Industrial', icon: <Moon className="w-4 h-4 text-accent-orange" /> },
                        { id: 'light', label: 'Light Engineering', icon: <Sun className="w-4 h-4 text-amber-400" /> },
                        { id: 'system', label: 'System Default', icon: <Sliders className="w-4 h-4 text-industrial-400" /> },
                      ].map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setTheme(t.id)}
                          className={`flex items-center gap-2 px-4 py-2 rounded border text-xs font-mono transition-colors ${
                            theme === t.id
                              ? 'bg-industrial-800 border-accent-orange text-white font-bold'
                              : 'bg-industrial-950 border-industrial-700 text-industrial-400 hover:text-white'
                          }`}
                        >
                          {t.icon}
                          <span>{t.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-industrial-300 block mb-3">
                      Display Information Density
                    </label>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setDensity('comfortable')}
                        className={`px-4 py-2 rounded border text-xs font-mono ${
                          density === 'comfortable'
                            ? 'bg-industrial-800 border-accent-orange text-white'
                            : 'bg-industrial-950 border-industrial-700 text-industrial-400'
                        }`}
                      >
                        Comfortable (Standard Spacing)
                      </button>
                      <button
                        onClick={() => setDensity('compact')}
                        className={`px-4 py-2 rounded border text-xs font-mono ${
                          density === 'compact'
                            ? 'bg-industrial-800 border-accent-orange text-white'
                            : 'bg-industrial-950 border-industrial-700 text-industrial-400'
                        }`}
                      >
                        Compact (High Control Density)
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* VOICE AI SETTINGS PLACEHOLDER */}
            {activeTab === 'voice' && (
              <Card accentBorder>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mic className="w-4 h-4 text-accent-orange" />
                    Voice AI Controls (Phase 3 Placeholder)
                    <Badge variant="orange">PHASE 3</Badge>
                  </CardTitle>
                </CardHeader>
                <div className="space-y-4">
                  <p className="text-xs text-industrial-300 leading-relaxed">
                    Voice activation allows line technicians to ask questions while operating equipment without taking off protective gloves.
                  </p>

                  <div className="p-4 bg-industrial-950 rounded border border-industrial-800 space-y-3 opacity-75">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span>Hands-Free Wake Word ("Hey Factory")</span>
                      <Badge variant="slate">DISABLED IN PHASE 1</Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span>TTS Text-To-Speech Read Out Aloud</span>
                      <Badge variant="slate">DISABLED IN PHASE 1</Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span>Noise Suppression Level</span>
                      <span className="text-industrial-400">High (Plant Floor Profile)</span>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* AI & RAG ENGINE SETTINGS PLACEHOLDER */}
            {activeTab === 'ai' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-emerald-400" />
                    Gemini LLM & Supabase RAG Settings (Phase 2 Placeholder)
                    <Badge variant="indexed">PHASE 2</Badge>
                  </CardTitle>
                </CardHeader>
                <div className="space-y-4">
                  <p className="text-xs text-industrial-300 leading-relaxed">
                    Configure vector embedding chunking, similarity top-K parameters, and Google Gemini model tier bindings.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                    <div className="p-3 bg-industrial-950 rounded border border-industrial-800">
                      <div className="text-industrial-400">LLM Reasoning Provider</div>
                      <div className="text-white font-bold mt-1">Google Gemini 1.5 Pro</div>
                    </div>

                    <div className="p-3 bg-industrial-950 rounded border border-industrial-800">
                      <div className="text-industrial-400">Vector Search Engine</div>
                      <div className="text-emerald-400 font-bold mt-1">Supabase pgvector (Cos-Sim)</div>
                    </div>

                    <div className="p-3 bg-industrial-950 rounded border border-industrial-800">
                      <div className="text-industrial-400">Chunk Size / Overlap</div>
                      <div className="text-white font-bold mt-1">500 tokens / 50 tokens</div>
                    </div>

                    <div className="p-3 bg-industrial-950 rounded border border-industrial-800">
                      <div className="text-industrial-400">Temperature Parameter</div>
                      <div className="text-white font-bold mt-1">0.1 (Strict Precision)</div>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
