import ProtectedRoute from '../../components/ProtectedRoute';
import Layout from '../layout';

const Portfolio = () => {
  return (
    <ProtectedRoute>
      <Layout>
        <h1 className="text-4xl mb-4">Your Portfolio</h1>
        {/* Portfolio content goes here */}
      </Layout>
    </ProtectedRoute>
  );
};

export default Portfolio;
