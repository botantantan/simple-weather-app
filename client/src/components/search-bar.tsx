import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onLocationRequest: () => void;
  className?: string;
  placeholder?: string;
}

export function SearchBar({ onSearch, onLocationRequest, className, placeholder = "Search for a city..." }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setQuery('');
    }
  };

  return (
    <div className={cn("py-4", className)}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center space-x-3 bg-gray-100/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200/20 dark:border-gray-700/20">
          <Search className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-transparent border-none outline-none text-base placeholder:text-gray-500 dark:placeholder:text-gray-400 focus-visible:ring-0 p-0 h-auto"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onLocationRequest}
            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 p-1 h-auto"
          >
            <MapPin className="h-5 w-5" />
          </Button>
        </div>
      </form>
    </div>
  );
}
