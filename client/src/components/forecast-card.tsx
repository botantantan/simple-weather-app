import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { getWeatherIcon } from '@/lib/weather-icons';
import type { ProcessedForecastDay } from '@/types/weather';
import { cn } from '@/lib/utils';

interface ForecastCardProps {
  forecast: ProcessedForecastDay[];
  className?: string;
}

export function ForecastCard({ forecast, className }: ForecastCardProps) {
  const getGradientColor = (condition: string) => {
    const normalizedCondition = condition.toLowerCase();
    if (normalizedCondition.includes('sun') || normalizedCondition.includes('clear')) {
      return 'from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30';
    }
    if (normalizedCondition.includes('rain')) {
      return 'from-blue-100 to-indigo-200 dark:from-blue-900/30 dark:to-indigo-800/30';
    }
    if (normalizedCondition.includes('cloud')) {
      return 'from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600';
    }
    return 'from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30';
  };

  return (
    <Card className={cn("mb-6 bg-white dark:bg-gray-900 border-none shadow-lg dark:shadow-gray-800/20", className)}>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold flex items-center text-gray-900 dark:text-white">
          <Calendar className="h-5 w-5 text-blue-500 mr-2" />
          5-Day Forecast
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {forecast.map((day, index) => (
          <div 
            key={index}
            className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
          >
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getGradientColor(day.condition)} flex items-center justify-center`}>
                {React.createElement(getWeatherIcon(day.icon, day.condition), {
                  className: "w-5 h-5 text-gray-700 dark:text-gray-200"
                })}
              </div>
              <div>
                <p className="font-medium text-sm text-gray-900 dark:text-white">
                  {index === 0 ? 'Today' : day.dayName}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{day.condition}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-900 dark:text-white">{Math.round(day.high)}°</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{Math.round(day.low)}°</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
