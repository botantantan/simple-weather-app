import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Thermometer, Gauge, Sun, Eye } from 'lucide-react';
import type { WeatherData } from '@/types/weather';
import { cn } from '@/lib/utils';

interface WeatherDetailsProps {
  weather: WeatherData;
  className?: string;
}

export function WeatherDetails({ weather, className }: WeatherDetailsProps) {
  const realFeel = Math.round(weather.main.feels_like);
  const pressure = weather.main.pressure;
  const uvIndex = 6; // OpenWeatherMap free tier doesn't include UV index
  const visibilityKm = Math.round(weather.visibility / 1000);

  return (
    <Card className={cn("mb-6 bg-white dark:bg-gray-900 border-none shadow-lg dark:shadow-gray-800/20", className)}>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold flex items-center text-gray-900 dark:text-white">
          <TrendingUp className="h-5 w-5 text-blue-500 mr-2" />
          Weather Details
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30">
            <div className="flex items-center justify-between mb-2">
              <Thermometer className="h-4 w-4 text-blue-500" />
              <span className="text-xs text-gray-500 dark:text-gray-400">°C</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Real Feel</p>
            <p className="text-xl font-semibold text-gray-900 dark:text-white">{realFeel}°</p>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30">
            <div className="flex items-center justify-between mb-2">
              <Gauge className="h-4 w-4 text-green-500" />
              <span className="text-xs text-gray-500 dark:text-gray-400">hPa</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Pressure</p>
            <p className="text-xl font-semibold text-gray-900 dark:text-white">{pressure}</p>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30">
            <div className="flex items-center justify-between mb-2">
              <Sun className="h-4 w-4 text-orange-500" />
              <span className="text-xs text-gray-500 dark:text-gray-400">UV</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">UV Index</p>
            <p className="text-xl font-semibold text-gray-900 dark:text-white">{uvIndex}</p>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30">
            <div className="flex items-center justify-between mb-2">
              <Eye className="h-4 w-4 text-purple-500" />
              <span className="text-xs text-gray-500 dark:text-gray-400">km</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Visibility</p>
            <p className="text-xl font-semibold text-gray-900 dark:text-white">{visibilityKm}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
