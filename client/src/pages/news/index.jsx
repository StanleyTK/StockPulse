import ProtectedRoute from '../../components/ProtectedRoute';
import Layout from '../layout';
import SearchStock from './components/SearchStock';
import StockInfo from './components/StockInfo';

const News = () => {
  return (
    <ProtectedRoute>
      <Layout>
        <div className="container mx-auto p-4">
          <h1 className="text-4xl mb-4 text-center">Stock News</h1>
          <SearchStock />
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default News;
