import { useState } from 'react';
import StockInfo from './StockInfo';

const SearchStock = () => {
  const [query, setQuery] = useState('');
  const [stockInfo, setStockInfo] = useState(null);

  const handleSearch = async () => {
    // Placeholder for API call
    const response = await fetch(`API_URL/search?query=${query}`);
    const data = await response.json();
    setStockInfo(data);
  };

  return (
    <>
      <div className="flex justify-center my-4">
        <input
          type="text"
          placeholder="Search for a stock..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="text-lg p-2 border border-gray-300 rounded-l bg-black text-white placeholder-gray-400 focus:outline-none"
          style={{ height: '38px', marginRight: '-1px' }}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
          style={{ height: '38px' }}
        >
          Search
        </button>
      </div>
      {stockInfo && <StockInfo info={stockInfo} />}
    </>
  );
};

export default SearchStock;
