import ProtectedRoute from '../../../components/ProtectedRoute';
import Layout from '../../layout';

const Account = () => {
  return (
    <ProtectedRoute>
      <Layout>
        <h1 className="text-4xl mb-4">Account Settings</h1>
      </Layout>
    </ProtectedRoute>
  );
};

export default Account;
