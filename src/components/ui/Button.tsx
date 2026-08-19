import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', icon, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-accent-orange focus:ring-offset-2 focus:ring-offset-industrial-950 disabled:opacity-50 disabled:cursor-not-allowed select-none';
    
    const variants = {
      primary: 'bg-accent-orange hover:bg-accent-orange-hover text-white shadow-sm hover:shadow-orange-500/20 active:translate-y-[0.5px]',
      secondary: 'bg-industrial-800 hover:bg-industrial-700 text-industrial-100 border border-industrial-700',
      outline: 'border border-industrial-700 hover:border-industrial-500 bg-transparent text-industrial-200 hover:text-white hover:bg-industrial-850',
      ghost: 'bg-transparent hover:bg-industrial-800/60 text-industrial-300 hover:text-white',
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
