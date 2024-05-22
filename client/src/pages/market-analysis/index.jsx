import ProtectedRoute from '../../components/ProtectedRoute';
import Layout from '../layout';

const Market = () => {
  return (
    <ProtectedRoute>
      <Layout>
        <h1 className="text-4xl mb-4">market</h1>
      </Layout>
    </ProtectedRoute>
  );
};

export default Market;
