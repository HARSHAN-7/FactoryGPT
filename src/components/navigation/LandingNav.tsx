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
    <header className="sticky top-0 z-50 w-full border-b border-industrial-800/80 bg-industrial-950/85 backdrop-blur-lg">
      <div className="max-w-[95%] xl:max-w-[96vw] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Official FactoryGPT Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <img
            src="/logo.png"
            alt="FactoryGPT Official Logo"
            className="h-10 w-auto object-contain rounded-lg group-hover:scale-105 transition-transform"
          />
        </Link>

        {/* Center Nav Links with active route highlighting */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-industrial-400">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'transition-colors pb-0.5',
                  isActive
                    ? 'text-gold-500 font-semibold border-b-2 border-gold-500'
                    : 'hover:text-white'
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
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'py-1 transition-colors',
                  pathname === link.href ? 'text-gold-500 font-bold' : 'hover:text-white'
                )}
              >
                {link.label}
              </Link>
            ))}
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
