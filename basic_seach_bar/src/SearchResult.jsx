export default function SearchResult({ results, loading, error }) {
    
  return (
    <div className="flex flex-col items-center mt-8 animate-fade-in">
      {loading && <div className="text-blue-500 animate-pulse">Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {!loading && !error && results && results.length === 0 && (
        <div className="text-gray-500">No results found.</div>
      )}
      {!loading && !error && results && results.length > 0 && (
        <ul className="w-full max-w-xl space-y-3">
          {results.map((item, idx) => (
            <li
              key={idx}
              className="bg-white rounded-lg shadow-md p-4 hover:bg-blue-50 transition-all duration-300 animate-slide-up"
            >
              {typeof item === "string" ? item : JSON.stringify(item)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
