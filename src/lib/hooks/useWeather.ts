'use client'

import { useState, useEffect } from 'react';
import { WeatherData } from '@/types/weather';
import { weatherService } from '../services/weatherService';

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadWeather = async () => {
    try {
      setLoading(true);
      const data = await weatherService.getCurrentWeather();
      setWeather(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar datos del clima');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeather();
    const interval = setInterval(loadWeather, 300000); // Actualizar cada 5 minutos
    return () => clearInterval(interval);
  }, []);

  return { weather, loading, error, refresh: loadWeather };
}
