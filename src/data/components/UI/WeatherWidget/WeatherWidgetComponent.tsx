
import React, { useState } from 'react';
import { Cloud, CloudRain, CloudSnow, Sun, Wind, Search, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type WeatherCondition = 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'windy';

interface WeatherData {
  city: string;
  temperature: number;
  condition: WeatherCondition;
  humidity: number;
  windSpeed: number;
  high: number;
  low: number;
  forecast: {
    day: string;
    condition: WeatherCondition;
    high: number;
    low: number;
  }[];
}

const mockWeatherData: Record<string, WeatherData> = {
  "New York": {
    city: "New York",
    temperature: 72,
    condition: "sunny",
    humidity: 65,
    windSpeed: 8,
    high: 75,
    low: 62,
    forecast: [
      { day: "Mon", condition: "sunny", high: 75, low: 62 },
      { day: "Tue", condition: "cloudy", high: 70, low: 60 },
      { day: "Wed", condition: "rainy", high: 65, low: 58 },
      { day: "Thu", condition: "cloudy", high: 68, low: 59 },
      { day: "Fri", condition: "sunny", high: 72, low: 61 }
    ]
  },
  "London": {
    city: "London",
    temperature: 60,
    condition: "rainy",
    humidity: 80,
    windSpeed: 12,
    high: 62,
    low: 55,
    forecast: [
      { day: "Mon", condition: "rainy", high: 62, low: 55 },
      { day: "Tue", condition: "cloudy", high: 64, low: 56 },
      { day: "Wed", condition: "cloudy", high: 63, low: 54 },
      { day: "Thu", condition: "rainy", high: 60, low: 52 },
      { day: "Fri", condition: "cloudy", high: 65, low: 57 }
    ]
  },
  "Tokyo": {
    city: "Tokyo",
    temperature: 82,
    condition: "cloudy",
    humidity: 70,
    windSpeed: 5,
    high: 85,
    low: 76,
    forecast: [
      { day: "Mon", condition: "cloudy", high: 85, low: 76 },
      { day: "Tue", condition: "rainy", high: 80, low: 75 },
      { day: "Wed", condition: "rainy", high: 78, low: 74 },
      { day: "Thu", condition: "cloudy", high: 82, low: 75 },
      { day: "Fri", condition: "sunny", high: 86, low: 77 }
    ]
  },
  "Paris": {
    city: "Paris",
    temperature: 68,
    condition: "cloudy",
    humidity: 72,
    windSpeed: 7,
    high: 70,
    low: 62,
    forecast: [
      { day: "Mon", condition: "cloudy", high: 70, low: 62 },
      { day: "Tue", condition: "sunny", high: 73, low: 64 },
      { day: "Wed", condition: "sunny", high: 75, low: 65 },
      { day: "Thu", condition: "cloudy", high: 72, low: 63 },
      { day: "Fri", condition: "rainy", high: 68, low: 60 }
    ]
  },
  "Sydney": {
    city: "Sydney",
    temperature: 75,
    condition: "sunny",
    humidity: 60,
    windSpeed: 10,
    high: 78,
    low: 68,
    forecast: [
      { day: "Mon", condition: "sunny", high: 78, low: 68 },
      { day: "Tue", condition: "sunny", high: 80, low: 70 },
      { day: "Wed", condition: "cloudy", high: 76, low: 67 },
      { day: "Thu", condition: "cloudy", high: 75, low: 66 },
      { day: "Fri", condition: "sunny", high: 79, low: 69 }
    ]
  }
};

const getWeatherIcon = (condition: WeatherCondition, size = 24) => {
  switch (condition) {
    case 'sunny':
      return <Sun size={size} className="text-yellow-400" />;
    case 'cloudy':
      return <Cloud size={size} className="text-gray-400" />;
    case 'rainy':
      return <CloudRain size={size} className="text-blue-400" />;
    case 'snowy':
      return <CloudSnow size={size} className="text-blue-200" />;
    case 'windy':
      return <Wind size={size} className="text-gray-500" />;
    default:
      return <Sun size={size} className="text-yellow-400" />;
  }
};

interface WeatherWidgetProps {
  defaultCity?: string;
  showSearch?: boolean;
  showForecast?: boolean;
  theme?: 'light' | 'dark' | 'glass';
  size?: 'sm' | 'md' | 'lg';
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({
  defaultCity = 'New York',
  showSearch = true,
  showForecast = true,
  theme = 'light',
  size = 'md',
}) => {
  const [city, setCity] = useState(defaultCity);
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const weatherData = mockWeatherData[city] || mockWeatherData['New York'];

  const handleSearch = () => {
    setLoading(true);
    setError(null);

    // Simulate API call
    setTimeout(() => {
      if (mockWeatherData[searchInput]) {
        setCity(searchInput);
        setLoading(false);
      } else {
        setError(`Could not find weather data for "${searchInput}"`);
        setLoading(false);
      }
    }, 1000);
  };

  const getBgClass = () => {
    if (theme === 'glass') return 'bg-white/20 backdrop-blur-lg border border-white/20';
    return theme === 'dark' ? 'bg-slate-800 text-white' : 'bg-white';
  };

  const getSizeClass = () => {
    switch (size) {
      case 'sm': return 'p-3 text-sm';
      case 'lg': return 'p-6 text-lg';
      default: return 'p-4';
    }
  };

  return (
    <div className={`rounded-lg shadow-lg ${getBgClass()} ${getSizeClass()}`}>
      {showSearch && (
        <div className="flex items-center gap-2 mb-4">
          <Input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search city..."
            className={theme === 'dark' ? 'bg-slate-700 border-slate-600' : ''}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button variant="outline" size="icon" onClick={handleSearch} disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          </Button>
        </div>
      )}

      {error && <p className="text-red-500 mb-3 text-sm">{error}</p>}

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">{weatherData.city}</h3>
          <p className={`text-${theme === 'dark' ? 'gray-300' : 'gray-500'}`}>
            Humidity: {weatherData.humidity}% | Wind: {weatherData.windSpeed} mph
          </p>
        </div>
        <div className="flex flex-col items-center">
          {getWeatherIcon(weatherData.condition, 36)}
          <span className="text-3xl font-bold">{weatherData.temperature}°</span>
          <span className={`text-${theme === 'dark' ? 'gray-300' : 'gray-500'} text-sm`}>
            H: {weatherData.high}° L: {weatherData.low}°
          </span>
        </div>
      </div>

      {showForecast && (
        <div className="mt-6 border-t pt-4 grid grid-cols-5 gap-2">
          {weatherData.forecast.map((day) => (
            <div key={day.day} className="flex flex-col items-center">
              <span className={`font-medium text-${theme === 'dark' ? 'gray-300' : 'gray-600'}`}>{day.day}</span>
              {getWeatherIcon(day.condition)}
              <div className="text-sm mt-1">
                <span className="font-medium">{day.high}°</span>
                <span className={`text-${theme === 'dark' ? 'gray-400' : 'gray-500'} ml-1`}>{day.low}°</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;
