import ProtectedRoute from '../../components/ProtectedRoute';
import Layout from '../layout';

const Profile = () => {
  return (
    <ProtectedRoute>
      <Layout>
        <h1 className="text-4xl mb-4">Your Profile</h1>
      </Layout>
    </ProtectedRoute>
  );
};

export default Profile;
