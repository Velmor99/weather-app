import styles from './WeatherCard.module.css';

export const WeatherCard = ({
  imgSrc,
  temperature,
  date,
  time,
  humidity,
  windSpeed,
  pressure,
}: {
  imgSrc: string;
  temperature: number;
  date: string;
  time: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
}) => {
  return (
    <div className={styles.weatherCard}>
      <div>
        <div>
          <img src={imgSrc} alt="icon"></img>
        </div>
        <div className={styles.temperatureContainer}>
          <p className={styles.property}>Temperature: {temperature}°C</p>
          <p className={styles.property}>Humidity: {humidity}%</p>
          <p className={styles.property}>Wind Speed: {windSpeed} m/s</p>
          <p className={styles.property}>Pressure:{pressure} hPa</p>
        </div>
      </div>
      <div>{date}</div>
      <div>At {time}</div>
    </div>
  );
};
