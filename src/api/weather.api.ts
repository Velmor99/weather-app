const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY
const BASE_URL = "https://api.openweathermap.org/data/2.5"

export const getWeatherForFiveDays = async (lat: number, lon: number) => {
    const response = await fetch(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&cnt=40&appid=${API_KEY}`);
    const data = await response.json();
    return data;
}