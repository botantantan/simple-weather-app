import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingOverlayProps {
  isVisible: boolean;
  message?: string;
  submessage?: string;
  className?: string;
}

export function LoadingOverlay({ 
  isVisible, 
  message = "Getting your location", 
  submessage = "Please allow location access to get local weather information.",
  className 
}: LoadingOverlayProps) {
  if (!isVisible) return null;

  return (
    <div className={cn(
      "fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center",
      className
    )}>
      <Card className="m-4 max-w-sm w-full border-none shadow-xl">
        <CardContent className="p-8 text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center">
            <MapPin className="h-6 w-6 text-blue-500 animate-pulse" />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
            {message}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {submessage}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
