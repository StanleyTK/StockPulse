// components/page.jsx
import Navbar from './components/navbar';
import Footer from './components/footer';
const HomePage = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col justify-between">
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-grow text-center p-4">
        <h1 className="text-4xl mb-4">Welcome to StockPulse</h1>
        <p className="text-lg mb-8">
          Developed a stock portfolio tracking application with features for detailed analysis and real-time updates.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">Portfolio Management</h2>
            <p>Track your stock portfolio with detailed insights and analytics.</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">Real-time Market Analysis</h2>
            <p>Get real-time updates and analysis on market trends and stock prices.</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">Latest News</h2>
            <p>Stay updated with the latest news and developments in the stock market.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
