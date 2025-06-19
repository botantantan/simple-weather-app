import React from 'react';
import { Button } from '@/components/ui/button';
import { CloudSun, Calendar, History, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  className?: string;
}

export function BottomNavigation({ activeTab, onTabChange, className }: BottomNavigationProps) {
  const tabs = [
    { id: 'weather', label: 'Weather', icon: CloudSun },
    { id: 'forecast', label: 'Forecast', icon: Calendar },
    { id: 'history', label: 'History', icon: History },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className={cn(
      "fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-t border-gray-200/30 dark:border-gray-700/30 z-40",
      className
    )}>
      <div className="max-w-md mx-auto px-4 py-2">
        <div className="flex items-center justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <Button
                key={tab.id}
                variant="ghost"
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "flex flex-col items-center py-2 px-3 h-auto",
                  isActive 
                    ? "text-blue-500 dark:text-blue-400" 
                    : "text-gray-500 dark:text-gray-400"
                )}
              >
                <Icon className="h-5 w-5 mb-1" />
                <span className={cn(
                  "text-xs",
                  isActive ? "font-medium" : "font-normal"
                )}>
                  {tab.label}
                </span>
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
