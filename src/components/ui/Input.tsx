import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        {icon && (
          <div className="absolute left-3 text-industrial-400 pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            'flex h-9 w-full rounded-md border border-industrial-700 bg-industrial-950 px-3 py-1 text-sm text-industrial-100 placeholder:text-industrial-500 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-orange focus-visible:border-accent-orange disabled:cursor-not-allowed disabled:opacity-50 font-sans',
            icon && 'pl-9',
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';
