import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', icon, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-white disabled:opacity-50 disabled:cursor-not-allowed select-none';
    
    const variants = {
      primary: 'bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold shadow-sm hover:shadow-amber-500/20 active:translate-y-[0.5px]',
      secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300',
      outline: 'border border-slate-300 hover:border-amber-500 bg-white text-slate-800 hover:text-slate-950 hover:bg-slate-50',
      ghost: 'bg-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-900',
      danger: 'bg-red-600 hover:bg-red-700 text-white shadow-sm',
    };

    const sizes = {
      sm: 'text-xs px-2.5 py-1.5 gap-1.5',
      md: 'text-sm px-3.5 py-2 gap-2',
      lg: 'text-base px-5 py-2.5 gap-2.5',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
