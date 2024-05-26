import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Layout from '../../layout';
import ProtectedRoute from '../../../components/ProtectedRoute';

const Account = () => {
  const { data: session, update } = useSession();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session) {
      setUsername(session.user.username);
      setEmail(session.user.email);
    }
  }, [session]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: session?.user?.id,
          username: username,
          email: email,
        }),
      });

      if (res.ok) {
        setMessage('Profile updated successfully.');
        await update({
          user: {
            ...session.user,
            username: username,
            email: email,
          },
        });
      } else {
        setMessage('Something went wrong. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
    }
    setIsLoading(false);
  };

  return (
    <ProtectedRoute>
      <Layout>
        <div className="max-w-4xl mx-auto p-8 bg-gray-800 rounded-lg shadow-lg">
          <div className="text-center mb-6">
            <img
              className="h-24 w-24 rounded-full border-4 border-gray-600 mx-auto"
              src="/default_pfp.png"
              alt="Profile Picture"
            />
            <h2 className="mt-4 text-4xl font-bold text-white">Account Settings</h2>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400">Username</label>
            <input
              type="text"
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-600 rounded-md bg-gray-700 text-white focus:border-green-500 focus:ring-green-500"
              value="Enter your new username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400">Email</label>
            <input
              type="email"
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-600 rounded-md bg-gray-700 text-white focus:border-green-500 focus:ring-green-500"
              value="Enter your new email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <p className={`text-sm ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>{message}</p>
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              className={`px-4 py-2 text-white rounded-md shadow-sm focus:outline-none ${isLoading ? 'bg-gray-600 cursor-not-allowed' : 'bg-green-600 hover:bg-green-500'}`}
              onClick={handleSave}
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Submit'}
            </button>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default Account;
