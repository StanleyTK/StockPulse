import ProtectedRoute from '../../components/ProtectedRoute';
import Layout from '../layout';

const Competitive = () => {
  return (
    <ProtectedRoute>
      <Layout>
        <h1>
          personal
        </h1>
      </Layout>
    </ProtectedRoute>
  );
};

export default Competitive;