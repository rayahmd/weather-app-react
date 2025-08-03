// src/components/WeatherDisplay.jsx
import { WiHumidity, WiStrongWind } from "react-icons/wi";

const WeatherDisplay = ({ data }) => {
  if (!data) {
    return <p className="text-center mt-6">Silakan cari kota untuk melihat cuaca.</p>;
  }

  const date = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="mt-6 text-center">
      {/* Lokasi dan Tanggal */}
      <h2 className="text-3xl font-semibold">{data.name}, {data.sys.country}</h2>
      <p className="text-sm opacity-80">{date}</p>

      {/* Ikon dan Temperatur Utama */}
      <div className="flex items-center justify-center my-4">
        <img 
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} 
          alt={data.weather[0].description}
          className="w-24 h-24"
        />
        <div className="text-left ml-4"> {/* Menambahkan sedikit margin kiri untuk spasi */}
          <p className="text-6xl font-bold">{Math.round(data.main.temp)}°C</p>
          <p className="capitalize">{data.weather[0].description}</p>
        </div>
      </div>

      {/* Detail Tambahan */}
      <div className="flex justify-around items-center mt-6 bg-white/10 p-4 rounded-lg">
        <div className="text-center">
          <p className="font-semibold">{Math.round(data.main.feels_like)}°C</p>
          <p className="text-xs opacity-80">Feels Like</p>
        </div>
        <div className="text-center">
          <p className="font-semibold flex items-center gap-1"><WiHumidity size={24} />{data.main.humidity}%</p>
          <p className="text-xs opacity-80">Humidity</p>
        </div>
        <div className="text-center">
          <p className="font-semibold flex items-center gap-1"><WiStrongWind size={24} />{data.wind.speed} m/s</p>
          <p className="text-xs opacity-80">Wind Speed</p>
        </div>
      </div>
    </div>
  );
};

// PASTIKAN BARIS INI ADA DAN TIDAK ADA TYPO
export default WeatherDisplay;