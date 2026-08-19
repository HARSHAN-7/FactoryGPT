'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Plus, MessageSquare, Search, Settings, Cpu, User, 
  ChevronRight, Database, LayoutDashboard, X, Wrench, ShieldAlert, BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ChatConversation } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ChatSidebarProps {
  conversations: ChatConversation[];
  activeConvId: string;
  onSelectConv: (id: string) => void;
  onNewChat: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export function ChatSidebar({
  conversations,
  activeConvId,
  onSelectConv,
  onNewChat,
  isMobileOpen = false,
  onCloseMobile
}: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = conversations.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Maintenance': return <Wrench className="w-3.5 h-3.5 text-accent-orange" />;
      case 'Safety': return <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />;
      case 'Data Analytics': return <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />;
      default: return <MessageSquare className="w-3.5 h-3.5 text-industrial-400" />;
    }
  };

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between bg-industrial-950 border-r border-industrial-800 text-industrial-200">
      {/* Top Header & Brand */}
      <div>
        <div className="p-4 border-b border-industrial-800 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded bg-industrial-900 border border-industrial-700 flex items-center justify-center text-accent-orange group-hover:border-accent-orange">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-base text-white tracking-wider font-mono">FACTORY<span className="text-accent-orange">GPT</span></span>
              <span className="text-[10px] text-industrial-400 block -mt-1 font-mono">Control Assistant</span>
            </div>
          </Link>
          {onCloseMobile && (
            <button onClick={onCloseMobile} className="md:hidden text-industrial-400 hover:text-white p-1">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* New Chat Button */}
        <div className="p-4 space-y-3">
          <Button 
            variant="primary" 
            className="w-full justify-start font-mono text-xs uppercase tracking-wider" 
            icon={<Plus className="w-4 h-4" />}
            onClick={() => {
              onNewChat();
              if (onCloseMobile) onCloseMobile();
            }}
          >
            New Conversation
          </Button>

          {/* Search Box */}
          <Input 
            placeholder="Search threads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search className="w-3.5 h-3.5" />}
            className="text-xs bg-industrial-900 border-industrial-800"
          />
        </div>

        {/* Conversation List */}
        <div className="px-3 space-y-1 max-h-[calc(100vh-280px)] overflow-y-auto">
          <div className="px-2 py-1.5 text-[11px] font-mono uppercase tracking-wider text-industrial-400">
            Recent Factory Queries ({filteredConversations.length})
          </div>
          {filteredConversations.length === 0 ? (
            <div className="p-4 text-center text-xs text-industrial-500 font-mono">
              No threads found
            </div>
          ) : (
            filteredConversations.map((conv) => {
              const isActive = conv.id === activeConvId;
              return (
                <button
                  key={conv.id}
                  onClick={() => {
                    onSelectConv(conv.id);
                    if (onCloseMobile) onCloseMobile();
                  }}
                  className={cn(
                    'w-full text-left px-3 py-2.5 rounded-md flex items-start gap-2.5 text-xs transition-colors group relative',
                    isActive 
                      ? 'bg-industrial-850 text-white font-medium border border-industrial-700' 
                      : 'hover:bg-industrial-900 text-industrial-300 hover:text-industrial-100'
                  )}
                >
                  <span className="mt-0.5 shrink-0">
                    {getCategoryIcon(conv.category)}
                  </span>
                  <div className="flex-1 truncate">
                    <div className="truncate font-sans leading-tight">{conv.title}</div>
                    <div className="text-[10px] text-industrial-500 font-mono mt-0.5 flex items-center justify-between">
                      <span>{conv.category}</span>
                      <span>{conv.updatedAt}</span>
                    </div>
                  </div>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-accent-orange absolute right-2 top-3" />}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Footer Controls & User Profile */}
      <div className="p-3 border-t border-industrial-800 space-y-2 bg-industrial-950">
        <Link href="/admin">
          <Button variant="ghost" size="sm" className="w-full justify-start text-xs font-mono text-industrial-300 hover:text-white" icon={<Database className="w-4 h-4 text-emerald-400" />}>
            Admin Knowledge Base
          </Button>
        </Link>
        <Link href="/settings">
          <Button variant="ghost" size="sm" className="w-full justify-start text-xs font-mono text-industrial-300 hover:text-white" icon={<Settings className="w-4 h-4" />}>
            System Settings
          </Button>
        </Link>

        {/* User Card */}
        <div className="pt-2 border-t border-industrial-850 flex items-center gap-3 px-2 py-1.5 rounded bg-industrial-900/60">
          <div className="w-7 h-7 rounded-full bg-accent-orange/20 border border-accent-orange/40 flex items-center justify-center text-accent-orange text-xs font-bold font-mono">
            SJ
          </div>
          <div className="flex-1 truncate">
            <div className="text-xs font-semibold text-white truncate">Eng. Sarah Jenkins</div>
            <div className="text-[10px] text-industrial-400 truncate font-mono">Lead Operations Officer</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Permanent Sidebar */}
      <aside className="hidden md:block w-72 shrink-0 h-screen sticky top-0">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onCloseMobile} />
          <div className="relative w-80 max-w-[85vw] h-full z-10">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
