import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ProtectedRoute from '../../components/ProtectedRoute';
import Layout from '../layout';
import StockInfo from './components/StockInfo';

const News = () => {
  const router = useRouter();
  const { query } = router.query;

  const [stockInfo, setStockInfo] = useState(null);
  const [loading, setLoading] = useState(false);

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

  return (
    <ProtectedRoute>
      <Layout>
        <div className="container mx-auto p-4">
          {loading ? (
            <div className="flex justify-center items-center mt-4">
              <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
            </div>
          ) : (
            stockInfo && <StockInfo info={stockInfo} />
          )}
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default News;
