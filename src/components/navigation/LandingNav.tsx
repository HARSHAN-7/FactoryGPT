'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function LandingNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Features', href: '/features' },
    { label: 'Solutions', href: '/solutions' },
    { label: 'Industries', href: '/industries' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Docs', href: '/docs' },
    { label: 'About Us', href: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-lg shadow-sm">
      <div className="max-w-[95%] xl:max-w-[96vw] mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-22 flex items-center justify-between">
        {/* Enlarged Official Logo + FactoryGPT Brand Text */}
        <Link href="/" className="flex items-center gap-3.5 group">
          <img
            src="/logo.png"
            alt="FactoryGPT Official Logo"
            className="h-12 sm:h-14 md:h-16 w-auto object-contain rounded-lg group-hover:scale-105 transition-transform"
          />
          <span className="font-extrabold text-xl sm:text-2xl md:text-3xl text-slate-900 tracking-tight font-sans">
            Factory<span className="text-amber-600">GPT</span>
          </span>
        </Link>

        {/* Center Nav Links with active route highlighting */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'transition-colors pb-0.5',
                  isActive
                    ? 'text-amber-600 font-bold border-b-2 border-amber-600'
                    : 'hover:text-slate-900'
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/chat">
            <button className="px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm transition-all flex items-center gap-1.5 shadow-md shadow-amber-500/20">
              <span>Get Started</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-600 hover:text-slate-900"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-4">
          <div className="flex flex-col space-y-3 text-sm font-medium text-slate-700">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'py-1 transition-colors',
                  pathname === link.href ? 'text-amber-600 font-bold' : 'hover:text-slate-900'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="pt-4 border-t border-slate-200">
            <Link href="/chat" onClick={() => setMobileMenuOpen(false)}>
              <button className="w-full py-2.5 rounded-full bg-amber-500 text-slate-950 font-bold text-sm flex items-center justify-center gap-1.5">
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
