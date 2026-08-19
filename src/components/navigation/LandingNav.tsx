'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Menu, X, LogIn } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/components/auth-provider';

export function LandingNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const { isAuthenticated, signOut } = useAuth();

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
    <header className="sticky top-0 z-50 w-full border-b border-industrial-800 bg-industrial-950/95 backdrop-blur-xl shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Crisp Official FactoryGPT Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <img
            src="/logo.png"
            alt="FactoryGPT Official Logo"
            className="h-11 sm:h-12 w-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform"
          />
        </Link>

        {/* Center Nav Links with active route highlighting & high-contrast text */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-industrial-300">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'transition-all pb-1 tracking-wide',
                  isActive
                    ? 'text-gold-500 font-bold border-b-2 border-gold-500'
                    : 'hover:text-white hover:border-b-2 hover:border-industrial-700'
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <button
              onClick={signOut}
              className="px-4 py-2 rounded-full border border-industrial-700 hover:border-gold-500 text-industrial-300 hover:text-white font-mono text-xs transition-all font-semibold"
            >
              Sign Out
            </button>
          ) : (
            <Link href="/auth/login">
              <button className="px-4.5 py-2 rounded-full border border-industrial-700 hover:border-gold-500 text-white font-mono text-xs font-semibold transition-all flex items-center gap-1.5 hover:bg-industrial-900">
                <LogIn className="w-3.5 h-3.5 text-gold-500" />
                <span>Log In</span>
              </button>
            </Link>
          )}

          <Link href="/chat">
            <button className="px-5 py-2.5 rounded-full bg-gold-600 hover:bg-gold-700 text-industrial-950 font-bold text-sm transition-all flex items-center gap-1.5 shadow-lg shadow-gold-600/25">
              <span>Get Started</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-industrial-300 hover:text-white"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-industrial-800 bg-industrial-900 px-4 pt-4 pb-6 space-y-4 shadow-2xl">
          <div className="flex flex-col space-y-3 text-sm font-semibold text-industrial-200">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'py-1.5 transition-colors',
                  pathname === link.href ? 'text-gold-500 font-bold' : 'hover:text-white'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="pt-4 border-t border-industrial-800 flex flex-col gap-2.5">
            <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
              <button className="w-full py-2.5 rounded-full border border-industrial-700 text-white font-mono text-xs font-semibold flex items-center justify-center gap-1.5">
                <LogIn className="w-4 h-4 text-gold-500" />
                <span>Log In / Sign Up</span>
              </button>
            </Link>
            <Link href="/chat" onClick={() => setMobileMenuOpen(false)}>
              <button className="w-full py-2.5 rounded-full bg-gold-600 text-industrial-950 font-bold text-sm flex items-center justify-center gap-1.5">
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
