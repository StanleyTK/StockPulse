import ProtectedRoute from '../../components/ProtectedRoute';
import Layout from '../layout';

const Competitive = () => {
  return (
    <ProtectedRoute>
      <Layout>
        <h1 className="text-4xl mb-4">Personal Game</h1>
      </Layout>
    </ProtectedRoute>
  );
};

export default Competitive;