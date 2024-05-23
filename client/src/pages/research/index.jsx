import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ProtectedRoute from '../../components/ProtectedRoute';
import Layout from '../layout';
import StockInfo from './components/StockInfo';
import Graph from './components/Graphs';
import Stats from './components/Stats';
import Popup from './components/Popup';
import 'chart.js/auto';
import { Session } from 'next-auth';
const Research = () => {
  const router = useRouter();
  const { query } = router.query;

  const [stockInfo, setStockInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (query) {
      handleSearch(query);
    }
  }, [query]);

  const handleSearch = async (searchQuery) => {
    setLoading(true);
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/news`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ symbol: searchQuery }),
    });
    const data = await response.json();
    setStockInfo(data.message);
    setLoading(false);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Stock Price',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  // Sample data for stock stats
  const stats = {
    Open: '$130',
    High: '$135',
    Low: '$128',
    Volume: '1.2M'
  };

  return (
    <ProtectedRoute>
      <Layout>
        <div className="container mx-auto p-4">
          {loading ? (
            <div className="flex justify-center items-center mt-4">
              <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
            </div>
          ) : (
            stockInfo && (
              <div>
                <StockInfo info={stockInfo} />
                <div className="mt-4">
                  <Graph data={data} />
                </div>
                <div className="mt-4 flex justify-between items-center bg-gray-800 p-4 rounded-md">
                  <Stats stats={stats} />
                  <button
                    onClick={togglePopup}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Buy/Sell
                  </button>
                </div>
              </div>
            )
          )}
          {showPopup && <Popup closePopup={togglePopup} />}
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default Research;
