import ProtectedRoute from '../../components/ProtectedRoute';
import Layout from '../layout';
import { useSession } from 'next-auth/react';

const Profile = () => {
  const { data: session } = useSession();
  return (
    <ProtectedRoute>
      <Layout>
        <div className="max-w-4xl mx-auto p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex-shrink-0">
              <img
                className="h-16 w-16 rounded-full"
                src="/default_pfp.png"
                alt="Profile Picture"
              />
            </div>
            <div>
              <div className="text-xl font-medium text-white">{session?.user?.username || 'Guest'}</div>
              <div className="text-sm text-gray-300">{session?.user?.email || 'Guest'}</div>
            </div>
          </div>
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-white">Personal Information</h2>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300">Name</label>
            <input
              type="text"
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-700 rounded-md bg-transparent text-white"
              value={session?.user?.username || 'Guest'}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-700 rounded-md bg-transparent text-white"
              value={session?.user?.email || 'guest@stockpulse.com'}
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300">Phone</label>
            <input
              type="tel"
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-700 rounded-md bg-transparent text-white"
              value="+1234567890"
              readOnly
            />
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default Profile;
