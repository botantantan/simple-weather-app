import { 
  Sun, 
  Moon, 
  CloudSun, 
  Cloud, 
  CloudRain, 
  CloudLightning, 
  CloudSnow,
  CloudDrizzle,
  Eye
} from 'lucide-react';

export const getWeatherIcon = (iconCode: string, condition: string) => {
  const iconMap: Record<string, any> = {
    '01d': Sun, // clear sky day
    '01n': Moon, // clear sky night
    '02d': CloudSun, // few clouds day
    '02n': Cloud, // few clouds night
    '03d': Cloud, // scattered clouds
    '03n': Cloud,
    '04d': Cloud, // broken clouds
    '04n': Cloud,
    '09d': CloudDrizzle, // shower rain
    '09n': CloudDrizzle,
    '10d': CloudRain, // rain day
    '10n': CloudRain, // rain night
    '11d': CloudLightning, // thunderstorm
    '11n': CloudLightning,
    '13d': CloudSnow, // snow
    '13n': CloudSnow,
    '50d': Eye, // mist
    '50n': Eye,
  };

  return iconMap[iconCode] || Cloud;
};

export const getWeatherGradient = (condition: string) => {
  const gradientMap: Record<string, string> = {
    'clear': 'from-blue-400 to-blue-600',
    'clouds': 'from-gray-400 to-gray-600',
    'rain': 'from-blue-500 to-indigo-600',
    'thunderstorm': 'from-purple-500 to-indigo-700',
    'snow': 'from-blue-200 to-blue-400',
    'mist': 'from-gray-300 to-gray-500',
    'fog': 'from-gray-300 to-gray-500',
    'drizzle': 'from-blue-400 to-blue-500',
  };

  const normalizedCondition = condition.toLowerCase();
  for (const [key, gradient] of Object.entries(gradientMap)) {
    if (normalizedCondition.includes(key)) {
      return gradient;
    }
  }

  return 'from-blue-400 to-blue-600'; // default
};
