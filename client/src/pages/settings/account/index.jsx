import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import Layout from '../../layout';
import ProtectedRoute from '../../../components/ProtectedRoute';
import Modal from './components/Modal';

const Account = () => {
  const { data: session, update } = useSession();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const handleSave = async () => {
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    let changes = [];
    if (username) changes.push('username');
    if (email) changes.push('email');
    if (password) changes.push('password');

    setModalContent(`Are you sure you want to change your ${changes.join(', ')}?`);
    setShowModal(true);
  };

  const confirmUpdate = async () => {
    setIsLoading(true);
    const payload = { id: session?.user?.id };
    if (username) payload.username = username;
    if (email) payload.email = email;
    if (password) payload.password = password;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setMessage('Profile updated successfully.');
        const updatedUser = {};
        if (username) updatedUser.username = username;
        if (email) updatedUser.email = email;
        await update({ user: { ...session.user, ...updatedUser } });
      } else {
        setMessage('Something went wrong. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
    }
    setIsLoading(false);
    setShowModal(false);
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
              placeholder="Enter your new username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400">Email</label>
            <input
              type="email"
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-600 rounded-md bg-gray-700 text-white focus:border-green-500 focus:ring-green-500"
              placeholder="Enter your new email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400">Password</label>
            <input
              type="password"
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-600 rounded-md bg-gray-700 text-white focus:border-green-500 focus:ring-green-500"
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400">Re-enter Password</label>
            <input
              type="password"
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-600 rounded-md bg-gray-700 text-white focus:border-green-500 focus:ring-green-500"
              placeholder="Re-enter your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
        <Modal isOpen={showModal} close={() => setShowModal(false)} confirm={confirmUpdate}>
          {modalContent}
        </Modal>
      </Layout>
    </ProtectedRoute>
  );
};

export default Account;
