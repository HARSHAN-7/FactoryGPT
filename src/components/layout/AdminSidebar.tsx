'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Wrench, FileText, Database, 
  BarChart3, Settings, Cpu, ArrowLeft, MessageSquare 
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
    <aside className="w-64 bg-industrial-950 border-r border-industrial-800 text-industrial-200 h-screen sticky top-0 flex flex-col justify-between shrink-0 font-sans">
      <div>
        {/* Brand Header */}
        <div className="p-4 border-b border-industrial-800 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded bg-industrial-900 border border-industrial-700 flex items-center justify-center text-accent-orange group-hover:border-accent-orange">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-base text-white tracking-wider font-mono">FACTORY<span className="text-accent-orange">GPT</span></span>
              <span className="text-[10px] text-industrial-400 block -mt-1 font-mono">Admin Portal</span>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1">
          <div className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-industrial-400">
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
                    ? 'bg-industrial-850 text-white font-bold border border-industrial-700'
                    : 'text-industrial-400 hover:bg-industrial-900 hover:text-white'
                )}
              >
                <span className={isActive ? 'text-accent-orange' : ''}>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Controls */}
      <div className="p-3 border-t border-industrial-800 space-y-2">
        <Link href="/chat">
          <Button variant="primary" size="sm" className="w-full justify-start font-mono text-xs" icon={<MessageSquare className="w-4 h-4" />}>
            Open Assistant Chat
          </Button>
        </Link>
        <Link href="/">
          <Button variant="ghost" size="sm" className="w-full justify-start font-mono text-xs text-industrial-400 hover:text-white" icon={<ArrowLeft className="w-4 h-4" />}>
            Return to Landing
          </Button>
        </Link>
      </div>
    </aside>
  );
}
