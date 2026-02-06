import { WeatherCard } from './components/WeatherCard/WeatherCard';
import { WeatherMainInfo } from './components/WeatherMainInfo/WeatherMainInfo';
import { useWeather } from './hooks/useWeather';
import SearchBar from './mediators/SearchBar';
import styles from './App.module.css';
import { useEffect, useMemo } from 'react';

function App() {
  const { fetchWeather, weather } = useWeather();
  const currentWeather = weather?.list[0];
  const clouds = useMemo(() => weather?.list[0]?.weather[0]?.main ?? '', [weather]);

  useEffect(() => {
    switch (clouds) {
      case 'Clear':
        document.body.style.backgroundImage = 'url(/sunny_weather.jpg)';
        break;
      case 'Clouds':
        document.body.style.backgroundImage = 'url(/cloudy_weather.jpg)';
        break;
      case 'Rain':
        document.body.style.backgroundImage = 'url(/rainy_weather.jpg)';
        break;
      case 'Snow':
        document.body.style.backgroundImage = 'url(/snowy_weather.jpg)';
        break;
      default:
        document.body.style.backgroundImage = 'url(/sunny_weather.jpg)';
        break;
    }
  }, [clouds]);

  return (
    <div>
      <SearchBar fetchWeather={fetchWeather} />
      {weather && currentWeather && (
        <WeatherMainInfo
          imgSrc={`https://openweathermap.org/img/wn/${currentWeather?.weather[0].icon}.png`}
          temperature={currentWeather?.main.temp}
          humidity={currentWeather?.main.humidity}
          windSpeed={currentWeather?.wind.speed}
          pressure={currentWeather?.main.pressure}
          clouds={clouds}
        />
      )}
      {weather && (
        <ul className={styles.weatherList}>
          {weather.list.map((weatherPoint) => (
            <li key={weatherPoint.dt}>
              <WeatherCard
                imgSrc={`https://openweathermap.org/img/wn/${weatherPoint.weather[0].icon}.png`}
                temperature={weatherPoint.main.temp}
                date={weatherPoint.dt_txt.split(' ')[0]}
                time={weatherPoint.dt_txt.split(' ')[1]}
                humidity={weatherPoint.main.humidity}
                windSpeed={weatherPoint.wind.speed}
                pressure={weatherPoint.main.pressure}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
