'use client';

import React from 'react';
import { Cpu, Wrench, ShieldAlert, FileText, BarChart3, ArrowUpRight } from 'lucide-react';

interface SuggestedPromptsProps {
  onSelectPrompt: (promptText: string) => void;
}

export function SuggestedPrompts({ onSelectPrompt }: SuggestedPromptsProps) {
  const prompts = [
    {
      icon: <Wrench className="w-4 h-4 text-accent-orange" />,
      text: "Explain the maintenance procedure for Machine M-01",
      category: "Maintenance Engineering",
    },
    {
      icon: <ShieldAlert className="w-4 h-4 text-amber-400" />,
      text: "What are the safety requirements for this machine?",
      category: "EHS & Safety Protocol",
    },
    {
      icon: <FileText className="w-4 h-4 text-emerald-400" />,
      text: "Show me the relevant SOP",
      category: "Factory Documentation",
    },
    {
      icon: <BarChart3 className="w-4 h-4 text-blue-400" />,
      text: "Analyze today's production data",
      category: "Operational Telemetry",
    },
  ];

  return (
    <div className="max-w-2xl mx-auto text-center py-12 px-4 space-y-8 animate-in fade-in duration-300">
      {/* Icon Branding */}
      <div className="mx-auto w-14 h-14 rounded-xl bg-industrial-900 border border-industrial-700 flex items-center justify-center text-accent-orange shadow-lg">
        <Cpu className="w-7 h-7" />
      </div>

      <div className="space-y-2">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          How can I help with your factory?
        </h2>
        <p className="text-xs sm:text-sm text-industrial-400 max-w-md mx-auto">
          Query indexed equipment manuals, safety procedures, or production CSV metrics.
        </p>
      </div>

      {/* Suggested Prompt Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
        {prompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => onSelectPrompt(p.text)}
            className="p-4 rounded-lg bg-industrial-900 border border-industrial-800 hover:border-industrial-700 hover:bg-industrial-850 text-left transition-all duration-150 group relative flex flex-col justify-between h-full"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="p-1.5 rounded bg-industrial-950 border border-industrial-800">
                  {p.icon}
                </span>
                <span className="text-[10px] font-mono text-industrial-500 uppercase tracking-wider">{p.category}</span>
              </div>
              <p className="text-xs font-medium text-industrial-200 group-hover:text-white leading-relaxed">
                "{p.text}"
              </p>
            </div>
            <div className="mt-3 flex items-center text-[10px] font-mono text-accent-orange opacity-0 group-hover:opacity-100 transition-opacity">
              <span>Run Query</span>
              <ArrowUpRight className="w-3 h-3 ml-1" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
