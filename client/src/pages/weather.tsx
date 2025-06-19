import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { SearchBar } from '@/components/search-bar';
import { WeatherCard } from '@/components/weather-card';
import { ForecastCard } from '@/components/forecast-card';
import { SearchHistoryCard } from '@/components/search-history';
import { WeatherDetails } from '@/components/weather-details';
import { BottomNavigation } from '@/components/bottom-navigation';
import { LoadingOverlay } from '@/components/loading-overlay';
import { SettingsPanel } from '@/components/settings-panel';
import { Skeleton } from '@/components/ui/skeleton';
import { weatherApi, processForecastData, getCurrentPosition } from '@/lib/weather-api';
import { apiRequest } from '@/lib/queryClient';
import type { WeatherData, ForecastData } from '@/types/weather';
import type { SearchHistory } from '@shared/schema';

export default function WeatherPage() {
  const [activeTab, setActiveTab] = useState('weather');
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Get current weather
  const { data: currentWeather, isLoading: isWeatherLoading, error: weatherError } = useQuery<WeatherData>({
    queryKey: ['/api/weather/current', currentLocation?.lat, currentLocation?.lon],
    queryFn: () => weatherApi.getCurrentWeatherByCoords(currentLocation!.lat, currentLocation!.lon),
    enabled: !!currentLocation,
  });

  // Get forecast
  const { data: forecastData, isLoading: isForecastLoading } = useQuery<ForecastData>({
    queryKey: ['/api/weather/forecast', currentLocation?.lat, currentLocation?.lon],
    queryFn: () => weatherApi.getForecast(currentLocation!.lat, currentLocation!.lon),
    enabled: !!currentLocation,
  });

  // Get search history
  const { data: searchHistory = [], isLoading: isHistoryLoading } = useQuery<SearchHistory[]>({
    queryKey: ['/api/search-history'],
  });

  // Add to search history mutation
  const addToHistoryMutation = useMutation({
    mutationFn: async (searchData: any) => {
      const response = await apiRequest('POST', '/api/search-history', searchData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/search-history'] });
    },
  });

  // Clear search history mutation
  const clearHistoryMutation = useMutation({
    mutationFn: async () => {
      await apiRequest('DELETE', '/api/search-history');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/search-history'] });
      toast({
        title: "History cleared",
        description: "Your search history has been cleared.",
      });
    },
  });

  // Request current location on mount
  useEffect(() => {
    handleLocationRequest();
  }, []);

  const handleLocationRequest = async () => {
    setIsGettingLocation(true);
    try {
      const position = await getCurrentPosition();
      const { latitude, longitude } = position.coords;
      setCurrentLocation({ lat: latitude, lon: longitude });
    } catch (error) {
      console.error('Error getting location:', error);
      toast({
        title: "Location access denied",
        description: "Please search for a city manually or enable location access.",
        variant: "destructive",
      });
    } finally {
      setIsGettingLocation(false);
    }
  };

  const handleCitySearch = async (cityName: string) => {
    try {
      const weatherData = await weatherApi.getCurrentWeatherByCity(cityName);
      
      // Update current location to the searched city
      setCurrentLocation({ lat: weatherData.coord.lat, lon: weatherData.coord.lon });
      
      // Add to search history
      addToHistoryMutation.mutate({
        cityName: weatherData.name,
        country: weatherData.sys.country,
        lat: weatherData.coord.lat.toString(),
        lon: weatherData.coord.lon.toString(),
        temperature: Math.round(weatherData.main.temp),
        weatherCondition: weatherData.weather[0].description,
      });
      
      toast({
        title: "Weather updated",
        description: `Showing weather for ${weatherData.name}`,
      });
    } catch (error) {
      console.error('Error searching for city:', error);
      toast({
        title: "City not found",
        description: "Please check the city name and try again.",
        variant: "destructive",
      });
    }
  };

  const handleHistorySelect = (city: SearchHistory) => {
    setCurrentLocation({ lat: parseFloat(city.lat), lon: parseFloat(city.lon) });
    toast({
      title: "Weather updated",
      description: `Showing weather for ${city.cityName}`,
    });
  };

  const handleClearHistory = () => {
    clearHistoryMutation.mutate();
  };

  const processedForecast = forecastData ? processForecastData(forecastData) : [];

  if (weatherError) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Weather data unavailable
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Unable to load weather information. Please check your internet connection.
          </p>
          <button
            onClick={handleLocationRequest}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'weather':
        return (
          <>
            <SearchBar
              onSearch={handleCitySearch}
              onLocationRequest={handleLocationRequest}
            />
            
            {isWeatherLoading ? (
              <div className="space-y-6">
                <Skeleton className="h-64 w-full rounded-3xl" />
                <Skeleton className="h-32 w-full rounded-3xl" />
              </div>
            ) : currentWeather ? (
              <>
                <WeatherCard weather={currentWeather} />
                <WeatherDetails weather={currentWeather} />
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                  Search for a city or enable location access to see weather data
                </p>
              </div>
            )}
          </>
        );
      
      case 'forecast':
        return (
          <>
            {isForecastLoading ? (
              <Skeleton className="h-96 w-full rounded-3xl" />
            ) : processedForecast.length > 0 ? (
              <ForecastCard forecast={processedForecast} />
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">
                  Forecast data will appear here after selecting a location
                </p>
              </div>
            )}
          </>
        );
      
      case 'history':
        return (
          <SearchHistoryCard
            history={searchHistory}
            onCitySelect={handleHistorySelect}
            onClearHistory={handleClearHistory}
          />
        );
      
      case 'settings':
        return <SettingsPanel />;
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <main className="max-w-md mx-auto px-4">
        {renderContent()}
      </main>
      
      <BottomNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      <LoadingOverlay 
        isVisible={isGettingLocation}
        message="Getting your location"
        submessage="Please allow location access to get local weather information."
      />
    </div>
  );
}
