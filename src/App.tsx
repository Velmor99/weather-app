import { useWeather } from "./hooks/useWeather";
import SearchBar from "./mediators/SearchBar"

function App() {
  const { fetchWeather, weather } = useWeather();
  return (
    <SearchBar fetchWeather={fetchWeather} />
  )
}

export default App
