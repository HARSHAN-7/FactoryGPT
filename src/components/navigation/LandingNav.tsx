'use client';

import * as React from 'react';
import Link from 'next/link';
import { Cpu, Menu, X, ArrowRight, Database } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function LandingNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-industrial-800 bg-industrial-900/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded bg-industrial-850 border border-industrial-700 flex items-center justify-center text-accent-orange group-hover:border-accent-orange transition-colors">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-industrial-100 tracking-wider font-mono">FACTORY<span className="text-accent-orange">GPT</span></span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-industrial-850 text-industrial-400 border border-industrial-700">PHASE 7</span>
            </div>
            <span className="text-[10px] text-industrial-500 block -mt-1 tracking-tight">Industrial AI Platform</span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-industrial-300">
          <a href="#capabilities" className="hover:text-industrial-100 transition-colors">Capabilities</a>
          <a href="#how-it-works" className="hover:text-industrial-100 transition-colors">How It Works</a>
          <a href="#use-cases" className="hover:text-industrial-100 transition-colors">Use Cases</a>
          <a href="#technology" className="hover:text-industrial-100 transition-colors">Tech Architecture</a>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/admin">
            <Button variant="outline" size="sm" icon={<Database className="w-4 h-4 text-industrial-500" />}>
              Admin
            </Button>
          </Link>
          <Link href="/chat">
            <Button variant="primary" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
              Open FactoryGPT
            </Button>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-industrial-500 hover:text-industrial-100"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-industrial-800 bg-industrial-900 px-4 pt-3 pb-6 space-y-4">
          <div className="flex flex-col space-y-3 text-sm font-medium text-industrial-300">
            <a href="#capabilities" onClick={() => setMobileMenuOpen(false)} className="hover:text-industrial-100 py-1">Capabilities</a>
            <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="hover:text-industrial-100 py-1">How It Works</a>
            <a href="#use-cases" onClick={() => setMobileMenuOpen(false)} className="hover:text-industrial-100 py-1">Use Cases</a>
            <a href="#technology" onClick={() => setMobileMenuOpen(false)} className="hover:text-industrial-100 py-1">Tech Architecture</a>
          </div>
          <div className="pt-4 border-t border-industrial-800 flex flex-col gap-2">
            <Link href="/chat" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" className="w-full justify-center">
                Open FactoryGPT
              </Button>
            </Link>
            <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full justify-center">
                Admin Dashboard
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
