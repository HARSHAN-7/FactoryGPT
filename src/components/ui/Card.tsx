import * as React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  accentBorder?: boolean;
}

export function Card({ className, accentBorder = false, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'bg-industrial-900 border border-industrial-800 rounded-lg p-5 transition-colors relative overflow-hidden',
        accentBorder && 'border-l-2 border-l-accent-orange',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex items-center justify-between pb-3 mb-4 border-b border-industrial-800/80', className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn('text-sm font-semibold text-industrial-100 tracking-wide flex items-center gap-2', className)} {...props}>
      {children}
    </h3>
  );
}
