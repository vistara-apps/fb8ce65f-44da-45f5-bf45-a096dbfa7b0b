import React from 'react';
import { Scale, Home, Search, FileText, Bookmark, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppShellProps {
  children: React.ReactNode;
  currentPage?: 'home' | 'search' | 'templates' | 'saved' | 'profile';
  onNavigate?: (page: string) => void;
  className?: string;
}

export function AppShell({
  children,
  currentPage = 'home',
  onNavigate,
  className,
}: AppShellProps) {
  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'templates', label: 'Templates', icon: FileText },
    { id: 'saved', label: 'Saved', icon: Bookmark },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const handleNavigation = (pageId: string) => {
    if (onNavigate) {
      onNavigate(pageId);
    }
  };

  return (
    <div className={cn("min-h-screen bg-background", className)}>
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-lg mx-auto px-4 flex h-14 items-center">
          <div className="flex items-center space-x-2">
            <Scale className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg">Legalo</span>
          </div>
          <div className="flex-1" />
          <p className="text-sm text-muted-foreground hidden sm:block">
            Your Pocket Rights Navigator
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-lg mx-auto px-4 py-6 pb-20">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t">
        <div className="container max-w-lg mx-auto px-4">
          <div className="flex items-center justify-around py-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className={cn(
                    "flex flex-col items-center justify-center p-2 rounded-lg transition-colors min-w-[60px]",
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  <Icon className="h-5 w-5 mb-1" />
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}
