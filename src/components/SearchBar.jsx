// src/components/SearchBar.jsx

import { IoSearch } from "react-icons/io5";
import { MdMyLocation } from "react-icons/md";

const SearchBar = ({ city, setCity, onSearch, onLocationClick }) => {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="flex items-center justify-center gap-4">
      {/* Input text */}
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Cari nama kota..."
        // Saya merapikan styling input sedikit agar lebih konsisten
        className="w-full bg-transparent border-b-2 border-white/50 focus:border-white placeholder-white/70 text-lg focus:outline-none transition-colors duration-300 p-1"
      />
      
      {/* Tombol Search (ICON SEARCH, FUNGSI ONSEARCH) */}
      <button onClick={onSearch} className="p-2 bg-white/30 hover:bg-white/50 rounded-full transition-colors duration-300">
        <IoSearch size={20} />
      </button>

      {/* Tombol Lokasi (ICON LOKASI, FUNGSI ONLOCATIONCLICK) */}
      <button onClick={onLocationClick} className="p-2 bg-white/30 hover:bg-white/50 rounded-full transition-colors duration-300">
        <MdMyLocation size={20} />
      </button>
    </div>
  );
};

export default SearchBar;