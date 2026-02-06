import styles from './WeatherMainInfo.module.css';

export const WeatherMainInfo = ({
  imgSrc,
  temperature,
  humidity,
  windSpeed,
  pressure,
  clouds,
}: {
  imgSrc: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
  clouds: string;
}) => {
  return (
    <div>
      <h2>Current Weather: {clouds}</h2>
      <div>
        <div>
          <img src={imgSrc} alt="icon"></img>
        </div>
        <div className={styles.weatherInfoContainer}>
          <p className={styles.property}>Temperature: {temperature}°C</p>
          <p className={styles.property}>Humidity: {humidity}%</p>
          <p className={styles.property}>Wind Speed: {windSpeed} m/s</p>
          <p className={styles.property}>Pressure:{pressure} hPa</p>
        </div>
      </div>
    </div>
  );
};
