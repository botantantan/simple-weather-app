import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Eye, Droplets, Wind } from 'lucide-react';
import { getWeatherIcon, getWeatherGradient } from '@/lib/weather-icons';
import type { WeatherData } from '@/types/weather';
import { cn } from '@/lib/utils';

interface WeatherCardProps {
  weather: WeatherData;
  className?: string;
}

export function WeatherCard({ weather, className }: WeatherCardProps) {
  const mainWeather = weather.weather[0];
  const temp = Math.round(weather.main.temp);
  const feelsLike = Math.round(weather.main.feels_like);
  const gradient = getWeatherGradient(mainWeather.main);
  
  const formatDate = () => {
    const date = new Date();
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    });
  };

  const visibilityKm = Math.round(weather.visibility / 1000);
  const windMps = Math.round(weather.wind.speed);

  return (
    <Card className={cn("mb-6 overflow-hidden border-none shadow-none", className)}>
      <CardContent className={`p-6 bg-gradient-to-br ${gradient} text-white relative overflow-hidden rounded-3xl`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 w-32 h-32 rounded-full bg-white/20"></div>
          <div className="absolute bottom-4 left-4 w-24 h-24 rounded-full bg-white/10"></div>
        </div>
        
        <div className="relative z-10">
          {/* Location and Date */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold">{weather.name}</h2>
              <p className="text-white/80 text-sm">{formatDate()}</p>
            </div>
            <Button variant="ghost" size="sm" className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>

          {/* Main Weather Info */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-5xl font-light mb-2">{temp}°</div>
              <p className="text-white/90 text-lg capitalize">{mainWeather.description}</p>
              <p className="text-white/70 text-sm">Feels like {feelsLike}°</p>
            </div>
            <div className="text-6xl opacity-80">
              {React.createElement(getWeatherIcon(mainWeather.icon, mainWeather.main), {
                className: "w-16 h-16"
              })}
            </div>
          </div>

          {/* Weather Details Grid */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-white/20">
            <div className="text-center">
              <Eye className="h-4 w-4 text-white/70 mb-1 mx-auto" />
              <p className="text-xs text-white/70">Visibility</p>
              <p className="text-sm font-medium">{visibilityKm} km</p>
            </div>
            <div className="text-center">
              <Droplets className="h-4 w-4 text-white/70 mb-1 mx-auto" />
              <p className="text-xs text-white/70">Humidity</p>
              <p className="text-sm font-medium">{weather.main.humidity}%</p>
            </div>
            <div className="text-center">
              <Wind className="h-4 w-4 text-white/70 mb-1 mx-auto" />
              <p className="text-xs text-white/70">Wind</p>
              <p className="text-sm font-medium">{windMps} mps</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
