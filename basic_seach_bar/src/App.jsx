import { useState } from "react";
import SearchBar from "./SearchBar";
import SearchResult from "./SearchResult";
import dotenv from 'dotenv'

async function mockApiCall(query) {
  const res = await fetch(import.meta.env.VITE_MOCK_API_CALL);
  const data = await res.json();
  // Optionally filter results by query
  if (!query) return data;
  return data.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );
}

export default function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (query) => {
    setLoading(true);
    setError("");
    setResults([]);
    try {
      const res = await mockApiCall(query);
      setResults(res);
    } catch (e) {
      setError("Failed to fetch results.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-blue-200 min-h-screen w-full flex flex-col items-center justify-start animate-fade-in">
      <h1 className="text-3xl font-bold mt-8 mb-2 text-blue-700 animate-fade-in">Search Bar Demo</h1>
      <SearchBar onSearch={handleSearch} />
      <SearchResult results={results} loading={loading} error={error} />
    </div>
  );
}