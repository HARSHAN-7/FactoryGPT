'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Wrench, FileText, Database, 
  BarChart3, Settings, ArrowLeft, MessageSquare 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Machine Inventory', href: '/admin/machines', icon: <Wrench className="w-4 h-4" /> },
    { label: 'Document Storage', href: '/admin/documents', icon: <FileText className="w-4 h-4" /> },
    { label: 'Knowledge Base Health', href: '/admin/knowledge-base', icon: <Database className="w-4 h-4" /> },
    { label: 'AI Analytics', href: '/admin/analytics', icon: <BarChart3 className="w-4 h-4" /> },
    { label: 'Settings', href: '/settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 text-slate-900 h-screen sticky top-0 flex flex-col justify-between shrink-0 font-sans shadow-sm">
      <div>
        {/* Brand Header with Official Logo */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-white">
          <Link href="/" className="flex items-center gap-2.5 group">
            <img
              src="/logo.png"
              alt="FactoryGPT Official Logo"
              className="h-9 w-auto object-contain rounded"
            />
            <span className="font-extrabold text-base text-slate-900 tracking-tight font-sans">
              Factory<span className="text-amber-600">GPT</span>
            </span>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1">
          <div className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
            Plant Administration
          </div>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-md text-xs font-mono transition-colors',
                  isActive
                    ? 'bg-amber-50 text-amber-900 font-bold border border-amber-300'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                )}
              >
                <span className={isActive ? 'text-amber-600' : ''}>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Controls */}
      <div className="p-3 border-t border-slate-200 space-y-2 bg-white">
        <Link href="/chat">
          <Button variant="primary" size="sm" className="w-full justify-start font-mono text-xs bg-amber-500 text-slate-950 font-bold" icon={<MessageSquare className="w-4 h-4" />}>
            Open Assistant Chat
          </Button>
        </Link>
        <Link href="/">
          <Button variant="ghost" size="sm" className="w-full justify-start font-mono text-xs text-slate-500 hover:text-slate-900 hover:bg-slate-100" icon={<ArrowLeft className="w-4 h-4" />}>
            Return to Landing
          </Button>
        </Link>
      </div>
    </aside>
  );
}
