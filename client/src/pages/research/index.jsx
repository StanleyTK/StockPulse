import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../layout';
import StockInfo from './components/StockInfo';
import Graph from './components/Graphs';

import 'chart.js/auto';

const Research = () => {
  const router = useRouter();
  const { query } = router.query;

  const [stockInfo, setStockInfo] = useState(null);
  const [additionalInfo, setAdditionalInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      fetchStockData(query);
    }
  }, [query]);

  const fetchStockData = async (searchQuery) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/stock/history/${searchQuery}`);
      const data = await response.json();
      if (data.error) {
        router.push('/error');
      } else {
        setStockInfo(data);
        fetchAdditionalInfo(searchQuery);
      }
    } catch (error) {
      console.error('Error fetching stock data:', error);
      router.push('/error');
    }
  };

  const fetchAdditionalInfo = async (searchQuery) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/news`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbol: searchQuery }),
      });
      const data = await response.json();
      setAdditionalInfo(data.message);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching additional info:', error);
      router.push('/error');
    }
  };

  const data = {
    labels: stockInfo ? stockInfo.map(item => `${item.month} ${item.year}`) : [],
    datasets: [
      {
        label: 'Stock Price',
        data: stockInfo ? stockInfo.map(item => item.close) : [],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        {loading ? (
          <div className="flex justify-center items-center mt-4">
            <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
          </div>
        ) : (
          stockInfo && additionalInfo && (
            <div>
              <StockInfo info={additionalInfo} />
              <div className="mt-4">
                <Graph data={data} />
              </div>
            </div>
          )
        )}
      </div>
    </Layout>
  );
};

export default Research;
