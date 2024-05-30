import React from 'react';
import Layout from './layout';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faBookOpen, faPlayCircle, faUsers, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
    <FontAwesomeIcon icon={icon} className="text-white text-5xl" />
    <h4 className="text-2xl font-semibold mt-4 mb-2">{title}</h4>
    <p className="text-gray-400">{description}</p>
  </div>
);

const TestimonialCard = ({ quote, author }) => (
  <div className="bg-gray-700 p-4 rounded-lg shadow text-center">
    <p className="text-white italic">"{quote}"</p>
    <p className="text-blue-400 mt-2">- {author}</p>
  </div>
);

const HomePage = () => {
  return (
    <Layout>
      <div className="flex flex-col min-h-screen bg-gray-900 text-white">
        <main className="flex-grow">
          <div className="container mx-auto py-12 px-8">
            <section className="text-center">
              <h1 className="text-6xl font-bold mt-6 mb-12">
                Master the Art of <span className="text-blue-500">Stock Trading</span>
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <FeatureCard
                  icon={faChartLine}
                  title="Real-Time Market Data"
                  description="Analyze stock performance with up-to-date market insights."
                />
                <FeatureCard
                  icon={faPlayCircle}
                  title="Virtual Trading"
                  description="Hone your trading skills risk-free with virtual money."
                />
                <FeatureCard
                  icon={faBookOpen}
                  title="Educational Resources"
                  description="Expand your knowledge with comprehensive educational materials."
                />
              </div>
            </section>

            {/* User Testimonials */}
            <section className="py-12">
              <h2 className="text-4xl font-bold text-center mb-8">What Our Users Say</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <TestimonialCard
                  quote="StockPulse has revolutionized the way I trade stocks. It's educational resources are top-notch!"
                  author="Jane Doe"
                />
                <TestimonialCard
                  quote="The real-time data feature allows me to make quick decisions confidently."
                  author="John Smith"
                />
                <TestimonialCard
                  quote="I love practicing with virtual money before putting real money on the line."
                  author="Emily Wright"
                />
              </div>
            </section>

          
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default HomePage;
