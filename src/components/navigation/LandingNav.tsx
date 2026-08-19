'use client';

import * as React from 'react';
import Link from 'next/link';
import { Construction, ArrowUpRight, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function LandingNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-industrial-800/80 bg-industrial-950/85 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo matching template image */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-lg bg-gold-600/10 border border-gold-500/30 flex items-center justify-center text-gold-500 group-hover:scale-105 transition-transform">
            <Construction className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl text-white tracking-tight font-sans">
            Factory<span className="text-gold-500">GPT</span>
          </span>
        </Link>

        {/* Center Nav Links matching template image */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-industrial-400">
          <Link href="/" className="text-gold-500 font-semibold border-b-2 border-gold-500 pb-0.5">
            Home
          </Link>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#solutions" className="hover:text-white transition-colors">Solutions</a>
          <a href="#industries" className="hover:text-white transition-colors">Industries</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#docs" className="hover:text-white transition-colors">Docs</a>
          <a href="#about" className="hover:text-white transition-colors">About Us</a>
        </nav>

        {/* Action Button matching template image */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/chat">
            <button className="px-5 py-2.5 rounded-full bg-gold-600 hover:bg-gold-700 text-industrial-950 font-semibold text-sm transition-all flex items-center gap-1.5 shadow-lg shadow-gold-600/20 hover:shadow-gold-600/30">
              <span>Get Started</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-industrial-400 hover:text-white"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-industrial-800 bg-industrial-900 px-4 pt-3 pb-6 space-y-4">
          <div className="flex flex-col space-y-3 text-sm font-medium text-industrial-300">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-gold-500 font-bold">Home</Link>
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="hover:text-white py-1">Features</a>
            <a href="#solutions" onClick={() => setMobileMenuOpen(false)} className="hover:text-white py-1">Solutions</a>
            <a href="#industries" onClick={() => setMobileMenuOpen(false)} className="hover:text-white py-1">Industries</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="hover:text-white py-1">Pricing</a>
            <a href="#docs" onClick={() => setMobileMenuOpen(false)} className="hover:text-white py-1">Docs</a>
          </div>
          <div className="pt-4 border-t border-industrial-800">
            <Link href="/chat" onClick={() => setMobileMenuOpen(false)}>
              <button className="w-full py-2.5 rounded-full bg-gold-600 text-industrial-950 font-semibold text-sm flex items-center justify-center gap-1.5">
                <span>Get Started</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
