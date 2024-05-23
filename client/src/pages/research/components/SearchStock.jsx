import { useState } from 'react';
import StockInfo from './StockInfo';

const SearchStock = () => {
  const [query, setQuery] = useState('');
  const [stockInfo, setStockInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/news`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ symbol: query }),
    });
    const data = await response.json();
    setStockInfo(data.message);
    setLoading(false);
  };

  const handleChange = (e) => {
    if (e.target.value.length <= 5) {
      setQuery(e.target.value);
    }
  };

  return (
    <div className="flex flex-col items-center my-4">
      <div className="flex w-full max-w-md">
        <input
          type="text"
          placeholder="Search for a stock..."
          value={query}
          onChange={handleChange}
          className="flex-1 p-2 border border-gray-300 rounded-l bg-black text-white placeholder-gray-400 focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
        >
          Search
        </button>
      </div>
      {loading ? (
        <div className="flex justify-center items-center mt-4">
          <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
        </div>
      ) : (
        stockInfo && <StockInfo info={stockInfo} />
      )}
    </div>
  );
};

export default SearchStock;
