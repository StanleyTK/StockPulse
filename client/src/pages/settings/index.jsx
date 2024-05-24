"use client";

import { useState } from 'react'; 
import { faUser, faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import ProtectedRoute from '../../components/ProtectedRoute';
import Layout from '../layout';
import Options from './components/Options';

import { useSession, signOut } from 'next-auth/react';


const Settings = () => {
  const { data: session } = useSession();
  const [showModal, setShowModal] = useState(false);

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    setShowModal(false);
    console.log(session?.user?.username);
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/delete`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({username : session?.user?.username}),
    });
    if (res.ok) {
      console.log('Account deleted');
      signOut();
    }
    else {
      console.log('failed to delete account');
    }


  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  return (
    <ProtectedRoute>
      <Layout>
        <div className="container mx-auto p-8">
          <div className="flex flex-col items-center mb-12">
            <h1 className="text-3xl font-semibold mb-8">Settings</h1>
          </div>
          <div className="space-y-6 w-full max-w-2xl mx-auto">
            <Options
              icon={faUser}
              header="Account"
              context="Privacy, security, change email or number"
              link="/settings/account"
            />
            <Options
              icon={faDeleteLeft}
              header="Delete Account"
              context="Delete your account"
              onClick={handleDeleteClick}
              isToggle={true}
            />
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-white">Are you sure?</h2>
              <p className="mb-4 text-gray-300">
                Do you really want to delete your account? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleCancelDelete}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </Layout>
    </ProtectedRoute>
  );
};

export default Settings;
