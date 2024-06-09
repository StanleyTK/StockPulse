import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '../layout';
import StockInfo from './components/StockInfo';
import 'chart.js/auto';
import Graph from './components/Graphs';

const StockDataCard = ({ label, value }) => (
  <div className="bg-gray-800 p-4 rounded-lg shadow-lg text-center">
    <h4 className="text-white text-xl font-semibold">{label}: {value}</h4>
  </div>
);

const Research = () => {
  const router = useRouter();
  const { query } = router.query;

  const [stockInfo, setStockInfo] = useState(null);
  const [additionalInfo, setAdditionalInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [period, setPeriod] = useState('5y');
  const [interval, setInterval] = useState('1mo');
  const [latestStockData, setLatestStockData] = useState(null);

  useEffect(() => {
    if (query) {
      fetchStockData(query, period, interval);
      fetchLatestStockData(query);
    }
  }, [query, period, interval]);

  const fetchStockData = async (searchQuery, period = '5y', interval = '1mo') => {
    setLoading(true);
    try {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/stock/history/${searchQuery}?period=${period}&interval=${interval}`;
      const response = await fetch(url);
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
    } finally {
      setLoading(false);
    }
  };

  const fetchLatestStockData = async (searchQuery) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/stock/latest/${searchQuery}`);
      const data = await response.json();
      if (!data.error) {
        setLatestStockData(data);
      }
    } catch (error) {
      console.error('Error fetching latest stock data:', error);
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

  const handlePeriodChange = (e) => {
    const selectedPeriod = e.target.value;
    setPeriod(selectedPeriod);

    switch (selectedPeriod) {
      case '5y':
        setInterval('1mo');
        break;
      case '2y':
        setInterval('1mo');
        break;
      case '1y':
        setInterval('1wk');
        break;
      case '6mo':
        setInterval('1wk');
        break;
      case '1mo':
        setInterval('1d');
        break;
      default:
        setInterval('1mo');
    }
  };

  const data = {
    labels: stockInfo
      ? stockInfo.map(item => {
          if (interval === '1d' || interval === '1wk') {
            return item.date;
          }
          return `${item.month} ${item.year}`;
        })
      : [],
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
      <div className="container mx-auto p-4 text-white">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">{query?.toUpperCase()}</h1>
        </div>
        <form className="mb-4 flex items-center justify-center space-x-4">
          <label htmlFor="period" className="text-white">Period:</label>
          <select
            id="period"
            value={period}
            onChange={handlePeriodChange}
            className="text-black p-2 rounded"
          >
            <option value="5y">5 Years</option>
            <option value="2y">2 Years</option>
            <option value="1y">1 Year</option>
            <option value="6mo">6 Months</option>
            <option value="1mo">1 Month</option>
          </select>
        </form>

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
              {latestStockData && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <StockDataCard label="Ticker" value={latestStockData.ticker} />
                  <StockDataCard label="Open" value={latestStockData.open} />
                  <StockDataCard label="Close" value={latestStockData.close} />
                  <StockDataCard label="High" value={latestStockData.high} />
                  <StockDataCard label="Low" value={latestStockData.low} />
                  <StockDataCard label="Volume" value={latestStockData.volume} />
                </div>
              )}
            </div>
          )
        )}
      </div>
    </Layout>
  );
};

export default Research;
