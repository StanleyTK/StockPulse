import ProtectedRoute from '../../components/ProtectedRoute';
import Layout from '../layout';

const Portfolio = () => {
  return (
    <ProtectedRoute>
      <Layout>
        <h1 className="text-4xl mb-4">Your Settings</h1>
      </Layout>
    </ProtectedRoute>
  );
};

export default Portfolio;
