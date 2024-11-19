export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  forecast: WeatherForecast[];
  conditions: string;
  uvIndex: number;
  visibility: number;
}

export interface WeatherForecast {
  date: Date;
  temperature: {
    min: number;
    max: number;
  };
  precipitation: number;
  conditions: string;
}
