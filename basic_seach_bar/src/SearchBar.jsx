import { useState, useEffect, useRef } from "react";
import 'remixicon/fonts/remixicon.css'

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    // Fetch suggestions from mockapi using Vite env variable
    fetch(import.meta.env.VITE_MOCK_API_CALL)
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(item =>
          item.name.toLowerCase().includes(query.toLowerCase())
        );
        setSuggestions(filtered.slice(0, 5));
      });
  }, [query]);

  const handleInputChange = e => {
    setQuery(e.target.value);
    setShowSuggestions(true);
    setHighlighted(-1);
  };

  const handleSuggestionClick = (name) => {
    setQuery(name);
    setShowSuggestions(false);
    onSearch(name);
  };

  const handleKeyDown = e => {
    if (e.key === "ArrowDown") {
      setHighlighted(h => Math.min(h + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      setHighlighted(h => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      if (highlighted >= 0 && suggestions[highlighted]) {
        handleSuggestionClick(suggestions[highlighted].name);
      } else {
        onSearch(query);
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  // Hide suggestions on blur
  const handleBlur = () => {
    setTimeout(() => setShowSuggestions(false), 100);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10 relative w-full max-w-md mx-auto">
      <div className="flex w-full">
        <input
          ref={inputRef}
          type="text"
          className="w-80 px-4 py-2 rounded-l-lg border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 shadow-md"
          placeholder="Search..."
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
          onBlur={handleBlur}
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg transition-all duration-300 shadow-md"
          onClick={() => onSearch(query)}
        >
          <i className="ri-search-2-line"></i>
        </button>
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 top-full left-0 w-80 bg-white border border-blue-200 rounded-b-lg shadow-lg animate-fade-in">
          {suggestions.map((item, idx) => (
            <li
              key={item.id}
              className={`px-4 py-2 cursor-pointer hover:bg-blue-100 transition-all duration-200 ${highlighted === idx ? "bg-blue-200" : ""}`}
              onMouseDown={() => handleSuggestionClick(item.name)}
              onMouseEnter={() => setHighlighted(idx)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
