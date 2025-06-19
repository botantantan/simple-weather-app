import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  Sun, 
  Moon, 
  Monitor, 
  Palette, 
  Info,
  Thermometer,
  Globe,
  Smartphone
} from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { cn } from '@/lib/utils';

interface SettingsPanelProps {
  className?: string;
}

export function SettingsPanel({ className }: SettingsPanelProps) {
  const { theme, setTheme, actualTheme } = useTheme();

  const themeOptions = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor },
  ] as const;

  return (
    <div className={cn("space-y-6", className)}>
      {/* Theme Settings */}
      <Card className="bg-white dark:bg-gray-900 border-none shadow-lg dark:shadow-gray-800/20">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold flex items-center text-gray-900 dark:text-white">
            <Palette className="h-5 w-5 text-blue-500 mr-2" />
            Appearance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Choose your preferred theme
            </p>
            <div className="grid grid-cols-3 gap-2">
              {themeOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = theme === option.value;
                
                return (
                  <Button
                    key={option.value}
                    variant={isSelected ? "default" : "outline"}
                    onClick={() => setTheme(option.value)}
                    className={cn(
                      "flex flex-col items-center py-4 h-auto space-y-2",
                      isSelected 
                        ? "bg-blue-500 text-white dark:bg-blue-600" 
                        : "bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-xs font-medium">{option.label}</span>
                  </Button>
                );
              })}
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Current theme:
              </span>
              <Badge variant="secondary" className="text-xs">
                {actualTheme === 'light' ? 'Light' : 'Dark'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weather Units */}
      <Card className="bg-white dark:bg-gray-900 border-none shadow-lg dark:shadow-gray-800/20">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold flex items-center text-gray-900 dark:text-white">
            <Thermometer className="h-5 w-5 text-blue-500 mr-2" />
            Units
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Temperature</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Celcius (°C)</p>
            </div>
            <Switch defaultChecked disabled />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Wind Speed</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Meters per second (mps)</p>
            </div>
            <Switch defaultChecked disabled />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Pressure</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Hectopascals (hPa)</p>
            </div>
            <Switch defaultChecked disabled />
          </div>
        </CardContent>
      </Card>

      {/* Location Settings */}
      <Card className="bg-white dark:bg-gray-900 border-none shadow-lg dark:shadow-gray-800/20">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold flex items-center text-gray-900 dark:text-white">
            <Globe className="h-5 w-5 text-blue-500 mr-2" />
            Location
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Auto-detect location</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Use device GPS for current weather</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* App Info */}
      <Card className="bg-white dark:bg-gray-900 border-none shadow-lg dark:shadow-gray-800/20">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold flex items-center text-gray-900 dark:text-white">
            <Info className="h-5 w-5 text-blue-500 mr-2" />
            About
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <Smartphone className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">Weather App</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Version 0.1.0</p>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              Weather data provided by OpenWeatherMap
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}