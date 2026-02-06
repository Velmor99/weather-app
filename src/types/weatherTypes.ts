export type WeatherResponse = {
  list: ThreeHourWeather[];
  city: CityInfo;
};

export type ThreeHourWeather = {
  clouds: { all: number };
  dt: number;
  dt_txt: string;
  main: TemperatureInfo;
  pop: number;
  sys: { pod: 'd' | 'n' };
  visibility: number;
  weather: [WeatherInfo];
  wind: WindInfo;
};

export type WindInfo = {
  deg: number;
  gust: number;
  speed: number;
};

export type WeatherInfo = {
  id: number;
  description: string;
  icon: string;
  main:
    | 'Thunderstorm'
    | 'Drizzle'
    | 'Rain'
    | 'Snow'
    | 'Clear'
    | 'Clouds'
    | 'Mist'
    | 'Smoke'
    | 'Haze'
    | 'Dust'
    | 'Fog'
    | 'Sand'
    | 'Ash'
    | 'Squall'
    | 'Tornado';
};

export type TemperatureInfo = {
  feels_like: number;
  grnd_level: number;
  humidity: number;
  pressure: number;
  sea_level: number;
  temp: number;
  temp_kf: number;
  temp_max: number;
  temp_min: number;
};

export type CityInfo = {
  coord: { lat: number; lon: number };
  country: string;
  id: number;
  name: string;
  population: number;
  sunrise: number;
  sunset: number;
  timezone: number;
};
