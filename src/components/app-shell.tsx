import React from 'react';
import { cn } from '@/lib/utils';

interface AppShellProps {
  children: React.ReactNode;
  className?: string;
}

export function AppShell({ children, className }: AppShellProps) {
  return (
    <div className={cn(
      "min-h-screen bg-bg",
      "max-w-lg mx-auto px-4",
      "flex flex-col",
      className
    )}>
      <header className="py-6 border-b border-border/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">L</span>
            </div>
            <h1 className="text-display text-primary">Legalo</h1>
          </div>
          <p className="text-sm text-muted-foreground">Your Pocket Rights Navigator</p>
        </div>
      </header>
      
      <main className="flex-1 py-6">
        {children}
      </main>
      
      <footer className="py-4 border-t border-border/10">
        <p className="text-xs text-muted-foreground text-center">
          Legal information for educational purposes only. Not legal advice.
        </p>
      </footer>
    </div>
  );
}
