import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { History, MapPin, ChevronRight, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { SearchHistory } from '@shared/schema';

interface SearchHistoryProps {
  history: SearchHistory[];
  onCitySelect: (city: SearchHistory) => void;
  onClearHistory: () => void;
  className?: string;
}

export function SearchHistoryCard({ history, onCitySelect, onClearHistory, className }: SearchHistoryProps) {
  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString();
  };

  if (history.length === 0) {
    return (
      <Card className={cn("mb-6 bg-white dark:bg-gray-900 border-none shadow-lg dark:shadow-gray-800/20", className)}>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold flex items-center text-gray-900 dark:text-white">
            <History className="h-5 w-5 text-blue-500 mr-2" />
            Recent Searches
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <History className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400 text-sm">No recent searches</p>
            <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">Search for a city to see your history here</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("mb-6 bg-white dark:bg-gray-900 border-none shadow-lg dark:shadow-gray-800/20", className)}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center text-gray-900 dark:text-white">
            <History className="h-5 w-5 text-blue-500 mr-2" />
            Recent Searches
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearHistory}
            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium h-auto p-1"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Clear
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {history.map((city) => (
          <Button
            key={city.id}
            variant="ghost"
            onClick={() => onCitySelect(city)}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 h-auto"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center">
                <MapPin className="h-3 w-3 text-blue-500" />
              </div>
              <div className="text-left">
                <p className="font-medium text-sm text-gray-900 dark:text-white">
                  {city.cityName}
                  {city.country && (
                    <span className="text-gray-500 dark:text-gray-400 font-normal ml-1">
                      , {city.country}
                    </span>
                  )}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {formatTimeAgo(new Date(city.searchedAt))}
                </p>
              </div>
            </div>
            <div className="text-right flex items-center space-x-2">
              {city.temperature && (
                <p className="font-medium text-sm text-gray-900 dark:text-white">
                  {city.temperature}°
                </p>
              )}
              <ChevronRight className="h-4 w-4 text-gray-400 dark:text-gray-500" />
            </div>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
