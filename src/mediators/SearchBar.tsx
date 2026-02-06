import { useState, useRef, useEffect } from 'react';
import { UncontrolledTextInput } from '../components/UncontrolledTextInput/UncontrolledTextInput';
import { Hint } from '../components/Hint/Hint';
import { createCityWorker } from '../services/cityWorker.client';
import { useDebounce } from '../hooks/useDebounce';
import type { City } from '../types/cityWorkerTypes';
import styles from './SearchBar.module.css';

export default function SearchBar({
  fetchWeather,
}: {
  fetchWeather: (lat: number, lon: number) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const cityWorker = useRef<ReturnType<typeof createCityWorker> | null>(null);
  const [hints, setHints] = useState<City[]>([]);

  useEffect(() => {
    cityWorker.current = createCityWorker();

    return () => {
      cityWorker.current?.destroy();
      localStorage.removeItem('lastSearchedCity');
      localStorage.removeItem('timestamp');
    };
  }, []);

  const handleInput = async () => {
    const value = inputRef.current?.value;

    if (!value || value.length < 2) {
      setHints([]);
      return;
    }

    const result = await cityWorker.current?.filter(value);
    setHints(result ?? []);
  };

  // TODO: replace API delay logic to hook
  const handleHintClick = async (hint: City) => {
    if (
      localStorage.getItem('lastSearchedCity') === hint.name &&
      Number(localStorage.getItem('timestamp')) + 10 * 60 * 1000 > new Date().getTime()
    ) {
      console.log('same city, less than 10 minutes');
      return;
    } else {
      fetchWeather(hint.coord.lat, hint.coord.lon);
      setHints([]);
      localStorage.setItem('lastSearchedCity', hint.name);
      localStorage.setItem('timestamp', new Date().getTime().toString());
      inputRef.current!.value = '';
    }
  };

  const debouncedInput = useDebounce(handleInput, 300);

  return (
    <div className={styles.searchBarContainer}>
      <div className={styles.searchInputContainer}>
        <UncontrolledTextInput
          ref={inputRef as React.RefObject<HTMLInputElement>}
          onChange={debouncedInput}
        />
      </div>
      {hints.length > 0 && (
        <div className={styles.hintsContainer}>
          {hints.map((hint) => (
            <Hint key={hint.id} content={hint.name} onClick={() => handleHintClick(hint)} />
          ))}
        </div>
      )}
    </div>
  );
}
