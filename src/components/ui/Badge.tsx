import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'indexed' | 'processing' | 'failed' | 'orange' | 'outline' | 'slate';
  dot?: boolean;
}

export function Badge({ className, variant = 'slate', dot = false, children, ...props }: BadgeProps) {
  const variants = {
    indexed: 'bg-emerald-950/80 text-emerald-400 border-emerald-800/60',
    processing: 'bg-blue-950/80 text-blue-400 border-blue-800/60',
    failed: 'bg-red-950/80 text-red-400 border-red-800/60',
    orange: 'bg-orange-950/80 text-orange-400 border-orange-800/60',
    outline: 'bg-industrial-900 text-industrial-300 border-industrial-700',
    slate: 'bg-industrial-800 text-industrial-200 border-industrial-700',
  };

  const dotColors = {
    indexed: 'bg-emerald-400',
    processing: 'bg-blue-400 animate-pulse',
    failed: 'bg-red-400',
    orange: 'bg-orange-400',
    outline: 'bg-industrial-400',
    slate: 'bg-industrial-400',
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
