import React from 'react';
import Layout from './layout';

const HomePage = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="w-full max-w-4xl p-8 transition duration-500 ease-in-out transform hover:scale-105">
          <h1 className="text-5xl font-bold mb-6 text-center">Welcome to StockPulse</h1>
          <p className="text-xl mb-8 text-center leading-relaxed">
            Step into the world of stock trading with StockPulse, a premier simulation platform designed for both educational purposes and advanced market research. Trade stocks with virtual capital and gain insights without any risk.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-gray-800 rounded-xl shadow-lg hover:bg-gray-700 transition duration-300">
              <h2 className="text-2xl font-bold mb-3">Portfolio Management</h2>
              <p>Monitor and manage your investments with our comprehensive portfolio tools, offering deep insights into your financial growth and strategy effectiveness.</p>
            </div>
            <div className="p-8 bg-gray-800 rounded-xl shadow-lg hover:bg-gray-700 transition duration-300">
              <h2 className="text-2xl font-bold mb-3">Real-time Market Analysis</h2>
              <p>Utilize real-time data and analytics to make informed decisions and adapt to market changes swiftly and effectively.</p>
            </div>
            <div className="p-8 bg-gray-800 rounded-xl shadow-lg hover:bg-gray-700 transition duration-300">
              <h2 className="text-2xl font-bold mb-3">Latest Market Insights</h2>
              <p>Stay ahead of market trends with timely updates and expert analyses, helping you to capitalize on opportunities as they arise.</p>
            </div>
          </div>
          <div className="mt-10 p-8 bg-gray-800 rounded-xl shadow-lg hover:bg-gray-700 transition duration-300">
            <h2 className="text-2xl font-bold mb-3">Interactive Game Modes</h2>
            <p>Engage with the market in various modes, each designed to challenge and refine your trading strategies.</p>
            <ul className="list-disc pl-5">
              <li><strong>Personal Mode:</strong> Focus on personal financial goals and strategy refinement.</li>
              <li><strong>Competitive Mode:</strong> Pit your skills against other traders in a competitive, timed setting.</li>
            </ul>
          </div>
          <div className="mt-10 p-8 bg-gray-800 rounded-xl shadow-lg hover:bg-gray-700 transition duration-300">
            <h2 className="text-2xl font-bold mb-3">Research and Education</h2>
            <p>
              Deepen your market knowledge with our educational resources powered by the latest in AI technology, providing you with actionable insights and learning opportunities.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
