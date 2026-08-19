import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'indexed' | 'processing' | 'failed' | 'orange' | 'outline' | 'slate';
  dot?: boolean;
}

export function Badge({ className, variant = 'slate', dot = false, children, ...props }: BadgeProps) {
  const variants = {
    indexed: 'bg-emerald-50 text-emerald-800 border-emerald-300',
    processing: 'bg-blue-50 text-blue-800 border-blue-300',
    failed: 'bg-red-50 text-red-800 border-red-300',
    orange: 'bg-amber-50 text-amber-800 border-amber-300',
    outline: 'bg-white text-slate-700 border-slate-300',
    slate: 'bg-slate-100 text-slate-800 border-slate-300',
  };

  const dotColors = {
    indexed: 'bg-emerald-600',
    processing: 'bg-blue-600 animate-pulse',
    failed: 'bg-red-600',
    orange: 'bg-amber-600',
    outline: 'bg-slate-500',
    slate: 'bg-slate-500',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono font-medium border uppercase tracking-wider',
        variants[variant],
        className
      )}
      {...props}
    >
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', dotColors[variant])} />}
      {children}
    </span>
  );
}
