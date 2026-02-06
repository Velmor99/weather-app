import { useState } from "react";
import { getWeatherForFiveDays } from "../api/weather.api";
import type { ThreeHourWeather, WeatherResponse } from "../types/weatherTypes";

export const useWeather = () => {
    const [weather, setWeather] = useState<WeatherResponse | null>(null);

    const fetchWeather = async (lat: number, lon: number) => {
        try {
            const weather = await getWeatherForFiveDays(lat, lon);
            weather.list = dailyWeather(weather.list);
            setWeather(weather);
            console.log(weather);
        } catch (error) {
            console.error(error);
        }
    }

    const dailyWeather = (weather: ThreeHourWeather[]) => {
        return weather.filter((_, index) => index % 8 === 0);
    }

    return {weather, fetchWeather}
}