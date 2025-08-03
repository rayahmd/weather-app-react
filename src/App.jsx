import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherDisplay from "./components/WeatherDisplay"; 
import ErrorMessage from "./assets/message/not-found.png";
import SearchImg from "./assets/message/search-city.png";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

function App() {
  // State didefinisikan di sini
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeatherData = async (query) => {
    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${API_KEY}&lang=id`;
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);
      } else {
        setError(data.message || 'Kota tidak ditemukan.');
      }
    } catch (err) {
      setError('Gagal mengambil data. Periksa koneksi internet Anda.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}&lang=id`;
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);
      } else {
        setError(data.message || 'Gagal mengambil data lokasi.');
      }
    } catch (err) {
      setError('Gagal mengambil data. Periksa koneksi internet Anda.');
    } finally {
      setLoading(false);
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoords(latitude, longitude);
        },
        (err) => {
          setError('Tidak dapat mengakses lokasi. Izinkan akses lokasi di browser Anda.');
          console.error(err);
        }
      );
    } else {
      setError('Geolocation tidak didukung oleh browser ini.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-600 p-4">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-md rounded-xl shadow-lg p-6 text-white">
        <SearchBar
          city={city}
          setCity={setCity}
          onSearch={() => fetchWeatherData(city)}
          onLocationClick={handleLocationClick}
        />
        {!loading && !error && !weatherData && (
          <div className="flex flex-col items-center gap-4 mt-6 text-center">
            <img src={SearchImg} alt="Search Image" className="w-40" />
            <h4 className="font-bold text-xl">Search City</h4>
          </div>
        )}

        <div className="mt-6">
          {loading && <p className="text-center text-xl">Loading...</p>}
          {error && (<div className="text-center flex flex-col items-center gap-4">
          <img src={ErrorMessage} alt="Not Found" className="w-40" />
          <p className="text-red-400 bg-red-900/50 p-3 rounded-lg">{error}</p>
          </div>)}
          {weatherData && !error && <WeatherDisplay data={weatherData} />}
        </div>
      </div>
    </div>
  );
}

export default App;