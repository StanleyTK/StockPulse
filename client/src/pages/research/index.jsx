import ProtectedRoute from '../../components/ProtectedRoute';
import Layout from '../layout';
import SearchStock from './components/SearchStock';

const News = () => {
  return (
    <ProtectedRoute>
      <Layout>
        <div className="container mx-auto p-4">
          <h1 className="text-4xl mb-4 text-center text-white">Research</h1>
          <p className="text-lg text-center text-gray-400 mb-4">
            Enter the stock ticker to get a summary of the stock. 
          </p>
          <p className="text-lg text-center text-gray-400 mb-4">
          This information is a summary and should be used for research purposes only.
          </p>

          <SearchStock />
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default News;
