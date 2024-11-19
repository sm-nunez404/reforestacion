'use client'

import { Sun, Cloud, Wind, Droplets } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function WeatherInfo() {
  const [weather, setWeather] = useState({
    temperatura: 25,
    humedad: 65,
    velocidadViento: 12,
    probabilidadLluvia: 30
  });

  useEffect(() => {
    // Aquí irían las llamadas a la API del clima
    const interval = setInterval(() => {
      // Simulación de actualización de datos
      setWeather(prev => ({
        ...prev,
        temperatura: prev.temperatura + (Math.random() - 0.5),
        humedad: Math.min(100, Math.max(0, prev.humedad + (Math.random() - 0.5) * 5)),
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4">Condiciones Climáticas</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-3">
          <Sun className="w-8 h-8 text-yellow-500" />
          <div>
            <p className="text-sm text-gray-500">Temperatura</p>
            <p className="text-xl font-semibold">{weather.temperatura.toFixed(1)}°C</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Droplets className="w-8 h-8 text-blue-500" />
          <div>
            <p className="text-sm text-gray-500">Humedad</p>
            <p className="text-xl font-semibold">{weather.humedad.toFixed(0)}%</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Wind className="w-8 h-8 text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Viento</p>
            <p className="text-xl font-semibold">{weather.velocidadViento} km/h</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Cloud className="w-8 h-8 text-sky-500" />
          <div>
            <p className="text-sm text-gray-500">Prob. Lluvia</p>
            <p className="text-xl font-semibold">{weather.probabilidadLluvia}%</p>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          Condiciones óptimas para operaciones de siembra
        </p>
      </div>
    </div>
  );
}
