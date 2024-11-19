'use client'

import { useWeather } from '@/lib/hooks/useWeather';
import { Card } from '@/components/ui/Card';
import { Sun, Cloud, Wind, Droplets, Eye, Sun as UVIcon } from 'lucide-react';
import LoadingSpinner from '../ui/LoadingSpinner';

export default function WeatherCard() {
  const { weather, loading, error } = useWeather();

  if (loading) return <LoadingSpinner />;
  if (error || !weather) return null;

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Estado del Clima</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="flex items-center space-x-3">
          <Sun className="w-8 h-8 text-yellow-500" />
          <div>
            <p className="text-sm text-gray-500">Temperatura</p>
            <p className="text-xl font-semibold">{weather.temperature}°C</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Droplets className="w-8 h-8 text-blue-500" />
          <div>
            <p className="text-sm text-gray-500">Humedad</p>
            <p className="text-xl font-semibold">{weather.humidity}%</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Wind className="w-8 h-8 text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Viento</p>
            <p className="text-xl font-semibold">{weather.windSpeed} km/h</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Cloud className="w-8 h-8 text-sky-500" />
          <div>
            <p className="text-sm text-gray-500">Precipitación</p>
            <p className="text-xl font-semibold">{weather.precipitation}%</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <UVIcon className="w-8 h-8 text-orange-500" />
          <div>
            <p className="text-sm text-gray-500">Índice UV</p>
            <p className="text-xl font-semibold">{weather.uvIndex}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Eye className="w-8 h-8 text-purple-500" />
          <div>
            <p className="text-sm text-gray-500">Visibilidad</p>
            <p className="text-xl font-semibold">{weather.visibility} km</p>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        {weather.forecast.map((day, index) => (
          <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">
              {new Date(day.date).toLocaleDateString('es', { weekday: 'short' })}
            </p>
            <p className="font-medium">{day.conditions}</p>
            <p className="text-sm">
              {day.temperature.min}° / {day.temperature.max}°
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}
