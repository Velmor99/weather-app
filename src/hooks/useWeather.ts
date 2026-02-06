import { useState } from 'react';
import { getWeatherForFiveDays } from '../api/weather.api';
import type { WeatherResponse } from '../types/weatherTypes';

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);

  const fetchWeather = async (lat: number, lon: number) => {
    try {
      const weather = await getWeatherForFiveDays(lat, lon);
      setWeather(weather);
      console.log(weather);
    } catch (error) {
      console.error(error);
    }
  };

  return { weather, fetchWeather };
};
