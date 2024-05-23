import ProtectedRoute from '../../components/ProtectedRoute';
import Layout from '../layout';

const News = () => {
  return (
    <ProtectedRoute>
      <Layout>
        <h1 className="text-4xl mb-4">News</h1>
      </Layout>
    </ProtectedRoute>
  );
};

export default News;