import { apiRequest } from './queryClient';
import type { WeatherData, ForecastData, CitySearchResult, ProcessedForecastDay } from '@/types/weather';

export const weatherApi = {
  getCurrentWeatherByCoords: async (lat: number, lon: number): Promise<WeatherData> => {
    const response = await apiRequest('GET', `/api/weather/current/${lat}/${lon}`);
    return response.json();
  },

  getCurrentWeatherByCity: async (cityName: string): Promise<WeatherData> => {
    const response = await apiRequest('GET', `/api/weather/current/city/${encodeURIComponent(cityName)}`);
    return response.json();
  },

  getForecast: async (lat: number, lon: number): Promise<ForecastData> => {
    const response = await apiRequest('GET', `/api/weather/forecast/${lat}/${lon}`);
    return response.json();
  },

  searchCities: async (query: string): Promise<CitySearchResult[]> => {
    const response = await apiRequest('GET', `/api/weather/search/${encodeURIComponent(query)}`);
    return response.json();
  },
};

export const processForecastData = (forecastData: ForecastData): ProcessedForecastDay[] => {
  const dailyData = new Map<string, any>();

  forecastData.list.forEach(item => {
    const date = new Date(item.dt * 1000);
    const dateStr = date.toDateString();

    if (!dailyData.has(dateStr)) {
      dailyData.set(dateStr, {
        date: dateStr,
        dayName: date.toLocaleDateString('en-US', { weekday: 'long' }),
        high: item.main.temp_max,
        low: item.main.temp_min,
        condition: item.weather[0].description,
        icon: item.weather[0].icon,
        humidity: item.main.humidity,
        wind: item.wind.speed,
      });
    } else {
      const existing = dailyData.get(dateStr);
      existing.high = Math.max(existing.high, item.main.temp_max);
      existing.low = Math.min(existing.low, item.main.temp_min);
    }
  });

  return Array.from(dailyData.values()).slice(0, 5);
};

export const getCurrentPosition = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      resolve,
      reject,
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      }
    );
  });
};
