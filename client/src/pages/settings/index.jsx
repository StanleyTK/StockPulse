import ProtectedRoute from '../../components/ProtectedRoute';
import Layout from '../layout';

const Settings = () => {
  return (
    <ProtectedRoute>
      <Layout>
        <h1 className="text-4xl mb-4">Your Settings</h1>
      </Layout>
    </ProtectedRoute>
  );
};

export default Settings;
