import { WeatherData } from '@/types/weather';

export const weatherService = {
  async getCurrentWeather(): Promise<WeatherData> {
    // Simulación de datos del clima
    return {
      temperature: 23,
      humidity: 65,
      windSpeed: 12,
      precipitation: 20,
      conditions: 'Parcialmente nublado',
      uvIndex: 6,
      visibility: 10,
      forecast: [
        {
          date: new Date(),
          temperature: { min: 18, max: 25 },
          precipitation: 20,
          conditions: 'Parcialmente nublado'
        },
        {
          date: new Date(Date.now() + 86400000),
          temperature: { min: 17, max: 24 },
          precipitation: 30,
          conditions: 'Lluvia ligera'
        },
        {
          date: new Date(Date.now() + 172800000),
          temperature: { min: 19, max: 26 },
          precipitation: 10,
          conditions: 'Soleado'
        }
      ]
    };
  }
};
