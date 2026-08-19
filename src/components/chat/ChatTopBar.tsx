'use client';

import React from 'react';
import Link from 'next/link';
import { Menu, Mic, Settings, Languages } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ChatTopBarProps {
  onOpenMobileSidebar: () => void;
  onOpenVoiceModal: () => void;
  selectedLanguage: string;
  onLanguageChange: (lang: string) => void;
}

export function ChatTopBar({
  onOpenMobileSidebar,
  onOpenVoiceModal,
  selectedLanguage,
  onLanguageChange
}: ChatTopBarProps) {
  return (
    <header className="h-14 border-b border-slate-200 bg-white px-4 flex items-center justify-between shrink-0 shadow-xs">
      {/* Left items: Mobile toggle & Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="md:hidden p-1.5 rounded text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          aria-label="Open Conversation History"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5">
          <h1 className="font-mono text-sm font-bold text-slate-900 tracking-wide flex items-center gap-2">
            <span>FACTORYGPT</span>
            <span className="hidden sm:inline-block text-slate-400">|</span>
          </h1>
          {/* Status Indicator */}
          <div className="hidden sm:flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-status-pulse" />
            <span className="text-[11px] font-mono text-emerald-700 font-bold">ONLINE - MULTILINGUAL RAG ENGINE</span>
          </div>
        </div>
      </div>

      {/* Right controls: Language, Voice, Settings */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Multilingual Selector */}
        <div className="relative flex items-center">
          <Languages className="w-3.5 h-3.5 text-amber-600 absolute left-2.5 pointer-events-none" />
          <select
            value={selectedLanguage}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="h-8 pl-8 pr-3 bg-slate-50 border border-slate-300 rounded-md text-xs font-mono text-slate-900 focus:outline-none focus:border-amber-600 cursor-pointer shadow-xs"
          >
            <option value="auto">Auto Detect (தானியங்கி / स्वचालित)</option>
            <option value="en">English (English)</option>
            <option value="ta">தமிழ் (Tamil)</option>
            <option value="hi">हिन्दी (Hindi)</option>
          </select>
        </div>

        {/* Voice button */}
        <Button
          variant="outline"
          size="sm"
          onClick={onOpenVoiceModal}
          icon={<Mic className="w-3.5 h-3.5 text-amber-600" />}
          className="hidden sm:flex text-xs font-mono text-slate-800"
        >
          Voice AI
        </Button>

        {/* Settings button */}
        <Link href="/settings">
          <Button
            variant="ghost"
            size="sm"
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            title="System Settings"
          >
            <Settings className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </header>
  );
}
